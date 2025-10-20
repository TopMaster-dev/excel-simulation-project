import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Chart, { useChart } from '../components/Chart'
import { useSimulation } from '../hooks/useSimulation'

const WS_URL = (import.meta.env.VITE_WS_URL as string) || 'ws://localhost:8000/ws/simulate'

type State = {
	frequency: number
	sampleRate: number
	duration: number
	name: string
	persist: boolean
}

export default function DisplayPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const params = (location.state || {}) as Partial<State>
	const cfg = useMemo(() => ({
		frequency: params.frequency ?? 2,
		sampleRate: params.sampleRate ?? 120,
		duration: params.duration ?? 5,
		name: params.name ?? 'run',
		persist: params.persist ?? true,
	}), [location.state])

	const { containerRef, appendPoint, reset } = useChart('Simulation')
	const { start, stop, running } = useSimulation(WS_URL, appendPoint, reset)

	return (
		<div className="page">
			<h1>Display</h1>
			<div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
				<button onClick={() => start(cfg)} disabled={running}>Start</button>
				<button onClick={stop} disabled={!running}>Stop</button>
				<button onClick={() => navigate('/')}>Edit inputs</button>
			</div>
			<Chart containerRef={containerRef} />
			<DataTable cfg={cfg} />
		</div>
	)
}

function DataTable({ cfg }: { cfg: State }) {
	return (
		<div style={{ marginTop: 12 }}>
			<h3>Parameters</h3>
			<table className="table">
				<tbody>
					<tr><td>Frequency</td><td>{cfg.frequency}</td></tr>
					<tr><td>Sample rate</td><td>{cfg.sampleRate}</td></tr>
					<tr><td>Duration</td><td>{cfg.duration}</td></tr>
					<tr><td>Name</td><td>{cfg.name}</td></tr>
					<tr><td>Persist</td><td>{cfg.persist ? 'Yes' : 'No'}</td></tr>
				</tbody>
			</table>
		</div>
	)
}
