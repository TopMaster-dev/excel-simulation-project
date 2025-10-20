import { useEffect, useRef, useState } from 'react'
import { createSimSocket, SimConfig } from '../services/ws'

export function useSimulation(wsUrl: string, appendPoint: (t: number, v: number) => void, reset: () => void) {
	const wsRef = useRef<WebSocket | null>(null)
	const [running, setRunning] = useState(false)

	useEffect(() => () => { wsRef.current?.close() }, [])

	const start = (cfg: SimConfig) => {
		if (running) return
		reset()
		wsRef.current = createSimSocket(wsUrl, cfg, (p) => appendPoint(p.t, p.value), () => setRunning(false))
		setRunning(true)
	}

	const stop = () => {
		wsRef.current?.close()
		setRunning(false)
	}

	return { start, stop, running }
}
