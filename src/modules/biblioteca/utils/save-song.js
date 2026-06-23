const API_URL = '/api/songs/save'

export async function saveSongToFile(song) {
	const payload = {
		artist: song.artist,
		title: song.name,
		key: song.key,
		lyrics: song.lyrics,
		tabs: song.tabs || [],
	}

	try {
		const res = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		})
		if (!res.ok) {
			const data = await res.json().catch(() => ({}))
			throw new Error(data.error || `HTTP ${res.status}`)
		}
		return { ok: true }
	} catch (err) {
		if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
			return { ok: false, offline: true }
		}
		return { ok: false, error: err.message }
	}
}
