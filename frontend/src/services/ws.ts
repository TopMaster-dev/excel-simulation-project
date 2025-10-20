export type SimConfig = {
	frequency: number
	sampleRate: number
	duration: number
	name: string
	persist: boolean
}

export type Point = { t: number; value: number }

export function createSimSocket(url: string, config: SimConfig, onPoint: (p: Point) => void, onClose: () => void) {
	const ws = new WebSocket(url)
	ws.onopen = () => ws.send(JSON.stringify(config))
	ws.onmessage = (ev) => {
		const msg = JSON.parse(ev.data)
		if (!msg.error) onPoint(msg)
	}
	ws.onclose = onClose
	ws.onerror = onClose
	return ws
}
