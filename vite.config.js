import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'api-songs',
      configureServer(server) {
        server.middlewares.use('/api/songs/save', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }

          try {
            let body = ''
            for await (const chunk of req) body += chunk
            const { artist, title, key, lyrics, tabs } = JSON.parse(body)

            if (!title) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'title is required' }))
              return
            }

            // Build .txt content from the song model
            const artistSlug = (artist || 'desconocido').replace(/\s+/g, '_')
            const titleSlug = title.replace(/\s+/g, '_')
            const fileName = `${artistSlug}-${titleSlug}.txt`
            const songsDir = resolve('src/data/songs')

            if (!existsSync(songsDir)) mkdirSync(songsDir, { recursive: true })

            // Convert lyrics segments back to text[Chord] format
            const lyricLines = (lyrics || []).map(line =>
              (line.segments || []).map(seg =>
                seg.chord ? `${seg.text}[${seg.chord}]` : seg.text
              ).join('')
            ).join('\n')

            // Build tab sections
            const tabSections = (tabs || []).map((tab, i) => {
              const header = i === 0 ? '== *1' : `== *${i + 1}`
              const label = tab.label ? `label: ${tab.label}` : ''
              return `${header}\n${label}\n${tab.content}`
            }).join('\n\n')

            const content = `KEY: ${key || 'C'}\nTITLE: ${title}\nARTIST: ${artist || ''}\n\n${lyricLines}${tabSections ? '\n\n' + tabSections : ''}\n`

            writeFileSync(resolve(songsDir, fileName), content, 'utf-8')

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, file: fileName }))
          } catch (err) {
            console.error('[api/songs/save] error:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      },
    },
  ],
})
