import React, { useEffect, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

export type ChartHandle = {
	appendPoint: (t: number, v: number) => void
	reset: () => void
}

export function useChart(title: string) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const plotRef = useRef<uPlot | null>(null)
	const dataRef = useRef<[number[], number[]]>([[], []])

	useEffect(() => {
		if (!containerRef.current) return
		const opts: uPlot.Options = {
			title,
			width: containerRef.current.clientWidth,
			height: 360,
			scales: { x: { time: false } },
			series: [{}, { label: 'value', stroke: 'rgb(33,150,243)' }],
			axes: [{ grid: { show: true } }, { grid: { show: true } }],
		}
		plotRef.current = new uPlot(opts, dataRef.current, containerRef.current)
		const handle = () => plotRef.current?.setSize({ width: containerRef.current!.clientWidth, height: 360 })
		window.addEventListener('resize', handle)
		return () => {
			window.removeEventListener('resize', handle)
			plotRef.current?.destroy()
			plotRef.current = null
		}
	}, [title])

	const appendPoint = (t: number, v: number) => {
		const [xs, ys] = dataRef.current
		xs.push(t)
		ys.push(v)
		plotRef.current?.setData(dataRef.current)
	}

	const reset = () => {
		dataRef.current = [[], []]
		plotRef.current?.setData(dataRef.current)
	}

	return { containerRef, appendPoint, reset }
}

export default function Chart({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
	return <div ref={containerRef} className="chart" />
}
