import React, { useEffect, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

export type ChartHandle = {
	appendPoint: (t: number, v: number) => void
	reset: () => void
	setData: (data: ChartData) => void
}

export type ChartData = {
	years: number[]
	saleValue: number[]
	payments: number[]
	rentIncome: number[]
	annualBalance: number[]
	cumulativeBalance: number[]
	loanBalance: number[]
}

export function useChart(title: string) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const plotRef = useRef<uPlot | null>(null)
	const dataRef = useRef<[number[], number[], number[], number[], number[], number[], number[]]>([[], [], [], [], [], [], []])

	useEffect(() => {
		if (!containerRef.current) return
		const opts: uPlot.Options = {
			title,
			width: containerRef.current.clientWidth,
			height: 400,
			scales: { 
				x: { 
					time: false,
					range: [2025, 2105]
				},
				y: {
					range: [0, 4000]
				}
			},
			series: [
				{ label: 'Year' },
				{ 
					label: '売却時', 
					stroke: '#ff9800',
					width: 4,
					points: { show: false }
				},
				{ 
					label: '支払額', 
					stroke: '#f44336',
					width: 4,
					points: { show: true, size: 4 }
				},
				{ 
					label: '家賃収入', 
					stroke: '#2196f3',
					width: 4,
					points: { show: true, size: 4 }
				},
				{ 
					label: '年間収支', 
					stroke: '#4caf50',
					width: 4,
					points: { show: true, size: 4 }
				},
				{ 
					label: '累計収支', 
					stroke: '#03a9f4',
					width: 4,
					points: { show: true, size: 4 }
				},
				{ 
					label: '借入残高', 
					stroke: '#1976d2',
					width: 4,
					points: { show: true, size: 4 }
				}
			],
			axes: [
				{ 
					grid: { show: true },
					ticks: {
						show: true,
						size: 4
					}
				}, 
				{ 
					grid: { show: true },
					ticks: {
						show: true,
						size: 4
					}
				}
			],
		}
		plotRef.current = new uPlot(opts, dataRef.current, containerRef.current)
		const handle = () => plotRef.current?.setSize({ width: containerRef.current!.clientWidth, height: 400 })
		window.addEventListener('resize', handle)
		return () => {
			window.removeEventListener('resize', handle)
			plotRef.current?.destroy()
			plotRef.current = null
		}
	}, [title])

	const appendPoint = (t: number, v: number) => {
		const [xs, ...series] = dataRef.current
		xs.push(t)
		series[0].push(v) // Add to first series (sale value)
		plotRef.current?.setData(dataRef.current)
	}

	const setData = (data: ChartData) => {
		dataRef.current = [
			data.years,
			data.saleValue,
			data.payments,
			data.rentIncome,
			data.annualBalance,
			data.cumulativeBalance,
			data.loanBalance
		]
		plotRef.current?.setData(dataRef.current)
	}

	const reset = () => {
		dataRef.current = [[], [], [], [], [], [], []]
		plotRef.current?.setData(dataRef.current)
	}

	return { containerRef, appendPoint, reset, setData }
}

export default function Chart({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
	return <div ref={containerRef} className="chart" />
}
