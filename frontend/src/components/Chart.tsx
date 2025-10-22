import React, { useEffect, useRef } from 'react'
import uPlot from 'uplot'
import 'uplot/dist/uPlot.min.css'

export type ChartHandle = {
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
					range: [new Date().getFullYear(), new Date().getFullYear() + 59]
				},
				y: {
					range: [0, 12000]
				}
			},
			series: [
				{ label: '(年度)' },
				{ 
					label: '完済年', 
					stroke: '#ff9800',
					width: 4,
					points: { show: true }
				},
				{ 
					label: '支払後借入残高', 
					stroke: '#f44336',
					width: 4,
					points: { show: true }
				},
				{ 
					label: '売却予想額', 
					stroke: '#2196f3',
					width: 4,
					points: { show: true }
				},
				{ 
					label: '収支累計', 
					stroke: '#4caf50',
					width: 4,
					points: { show: true }
				},
				{ 
					label: '売却予想額+収支累計', 
					stroke: '#03a9f4',
					width: 4,
					points: { show: true }
				},
				{ 
					label: '精算収支', 
					stroke: '#1976d2',
					width: 4,
					points: { show: true }
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
		const handle = () => plotRef.current?.setSize({ width: containerRef.current!.clientWidth, height: 300 })
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

	return { containerRef, setData }
}

export default function Chart({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
	return <div ref={containerRef} className="chart" />
}
