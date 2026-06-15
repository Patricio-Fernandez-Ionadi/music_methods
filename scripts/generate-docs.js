import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'fs'
import { join, relative, resolve } from 'path'

const SRC = resolve('src')
const OUT = resolve('DOCS.md')

const SKIP_DIRS = new Set(['style', 'node_modules', 'dist'])

function isDir(path) {
	return statSync(path).isDirectory()
}

function jsFiles(dir) {
	if (!existsSync(dir)) return []
	return readdirSync(dir).flatMap((entry) => {
		const full = join(dir, entry)
		if (isDir(full)) return SKIP_DIRS.has(entry) ? [] : jsFiles(full)
		if (/\.(jsx?|tsx?)$/.test(entry) && !entry.startsWith('_')) return [full]
		return []
	})
}

function extractDocs(filePath) {
	const src = readFileSync(filePath, 'utf-8')
	const rel = relative(SRC, filePath).replace(/\\/g, '/')
	const lines = src.split('\n')

	const exports = []
	let currentComment = null
	let inBlock = false

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		if (/^\s*\/\*\*/.test(line)) {
			inBlock = true
			currentComment = line.replace(/^\s*\/\*\*\s*/, '')
			continue
		}
		if (inBlock) {
			if (/\*\/\s*$/.test(line)) {
				currentComment = (currentComment + ' ' + line.replace(/\s*\*\/\s*$/, '')).trim()
				inBlock = false
				currentComment = currentComment
					.split('\n')
					.map((l) => l.replace(/^\s*\*\s?/, '').trim())
					.filter(Boolean)
					.join(' ')
				continue
			}
			currentComment += ' ' + line
			continue
		}

		if (/^\s*\/\/\/?\s/.test(line)) {
			currentComment = line.replace(/^\s*\/\/\/?\s?/, '').trim()
			continue
		}

		const exportMatch = line.match(
			/^\s*export\s+(default\s+)?(function|const|class)\s+(\w+)/,
		)
		if (exportMatch) {
			exports.push({
				type: exportMatch[2],
				name: exportMatch[3],
				default: !!exportMatch[1],
				comment: currentComment || '',
			})
			currentComment = null
			continue
		}

		if (currentComment !== null) {
			const namedExport = line.match(/^\s*export\s+\{\s*(\w+)/)
			if (namedExport) {
				exports.push({
					type: 'named',
					name: namedExport[1],
					default: false,
					comment: currentComment,
				})
			}
			currentComment = null
		}
	}
	return { path: rel, exports }
}

function groupedDocs() {
	const groups = {
		Views: jsFiles(join(SRC, 'views')),
		Modules: jsFiles(join(SRC, 'modules')),
		'Shared Components': jsFiles(join(SRC, 'app', 'components')),
		Data: jsFiles(join(SRC, 'data')),
		'App Shell': [
			...jsFiles(join(SRC, 'app', 'context')),
			...jsFiles(join(SRC, 'app', 'router')),
			...jsFiles(join(SRC, 'app', 'layout')),
		],
	}

	let md = `# Project Documentation\n\n_Generated on ${new Date().toISOString().split('T')[0]}_\n\n`

	for (const [group, files] of Object.entries(groups)) {
		const entries = []
		for (const file of files) {
			const { path, exports } = extractDocs(file)
			if (!exports.length) continue
			const items = exports.map((exp) => {
				const label = exp.default ? ' *(default)*' : ''
				const comment = exp.comment ? ` — ${exp.comment}` : ''
				return `  - \`${exp.name}\`${label}${comment}`
			})
			entries.push({ path, items })
		}
		if (!entries.length) continue
		md += `## ${group}\n\n`
		for (const { path, items } of entries.sort((a, b) => a.path.localeCompare(b.path))) {
			if (path.endsWith('views/index.js')) continue
			md += `### \`${path}\`\n${items.join('\n')}\n\n`
		}
	}

	return md
}

const docs = groupedDocs()
try { readFileSync(OUT, 'utf-8') } catch { /* first run */ }
writeFileSync(OUT, docs, 'utf-8')
console.log(`✓ Generated ${OUT}`)
