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
	cumulativeBalance: number[]
	loanBalance: number[]
}

export function useChart(title: string, saleValue: number) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const plotRef = useRef<uPlot | null>(null)
	const dataRef = useRef<[number[], number[], number[], number[], number[], number[]]>([[], [], [], [], [], []])
	const nonZeroYearsRef = useRef<number[]>([])
	const saleValueRef = useRef<number>(saleValue)
	const maxValueYearRef = useRef<number | null>(null)
	
	useEffect(() => {
		if (!containerRef.current) return
		const opts: uPlot.Options = {
			title,
			width: containerRef.current.clientWidth,
			height: 600,
			scales: { 
				x: { 
					time: false,
					range: (u, dataMin, dataMax) => [dataMin, dataMax]
				},
				y: {
					range: [0, 10000]
				}
			},
			hooks: {
				draw: [
					(u: uPlot) => {
						const ctx = u.ctx
						
						// Draw bars/sticks for saleValue series (index 1) - 完済年
						const saleValueData = u.data[1] as number[]
						const yearsData = u.data[0] as number[]
						const zeroY = u.valToPos(0, 'y', true)
						
						ctx.save()
						ctx.strokeStyle = '#607D8B'
						ctx.fillStyle = '#607D8B'
						ctx.lineWidth = 4
						
						// Draw vertical bars/sticks for each year
						for (let i = 0; i < saleValueData.length; i++) {
							const value = saleValueData[i]
							if (value !== null && value !== undefined && !isNaN(value)) {
								const year = yearsData[i]
								const xPos = u.valToPos(year, 'x', true)
								const yPos = u.valToPos(value, 'y', true)
								
								// Draw vertical stick from zero to value
								const barHeight = Math.abs(zeroY - yPos)
								if (barHeight > 0 || value === 0) {
									ctx.beginPath()
									ctx.moveTo(xPos, zeroY)
									ctx.lineTo(xPos, yPos)
									ctx.stroke()
								}
							}
						}
						
						ctx.restore()
						
						// Draw vertical line at year where saleValue is maximum (same style as sticks)
						if (maxValueYearRef.current !== null) {
							ctx.save()
							ctx.strokeStyle = '#607D8B'
							ctx.lineWidth = 4 // Same width as sticks
							// No dash - solid line like sticks
							
							const xPos = u.valToPos(maxValueYearRef.current, 'x', true)
							ctx.beginPath()
							ctx.moveTo(xPos, u.bbox.top)
							ctx.lineTo(xPos, u.bbox.top + u.bbox.height)
							ctx.stroke()
							
							ctx.restore()
						}
						
						// Draw vertical dashed lines where startYear + saleValue equals a year on the X-axis
						ctx.save()
						ctx.strokeStyle = '#ff9800'
						ctx.lineWidth = 2
						ctx.setLineDash([5, 5]) // Dashed line
						
						nonZeroYearsRef.current.forEach(year => {
							const xPos = u.valToPos(year, 'x', true)
							ctx.beginPath()
							ctx.moveTo(xPos, u.bbox.top)
							ctx.lineTo(xPos, u.bbox.top + u.bbox.height)
							ctx.stroke()
						})
						
						ctx.restore()
					}
				]
			},
			series: [
				{ label: '(年度)' },
				{ 
					label: '完済年', 
					stroke: '#607D8B',
					width: 0, // No line - bars are drawn in custom draw function
					points: { show: false }
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
					label: '売却予想額+収支累計', 
					stroke: '#00ffe5',
					width: 4,
					points: { show: true }
				},
				{ 
					label: '精算収支', 
					stroke: '#8f00ff',
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
					},
					values: (u, splits) => splits.map(v => Math.round(v))
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
		const handle = () => plotRef.current?.setSize({ width: containerRef.current!.clientWidth, height: 600 })
		window.addEventListener('resize', handle)
		return () => {
			window.removeEventListener('resize', handle)
			plotRef.current?.destroy()
			plotRef.current = null
		}
	}, [title, saleValue])
	
	// Update saleValue ref when it changes
	useEffect(() => {
		saleValueRef.current = saleValue
	}, [saleValue])
	const setData = (data: ChartData) => {
		// Find the largest value between cumulativeBalance and loanBalance
		const maxCumulative = Math.max(...data.cumulativeBalance, 0)
		const maxLoan = Math.max(...data.loanBalance, 0)
		const largeNum = Math.max(maxCumulative, maxLoan)
		
		// Add 10% padding to the max value for better visualization, with a minimum of 10
		const yAxisMax = Math.max(largeNum * 1.1, 10)
		
		// Get min and max years from the years array
		const minYear = Math.min(...data.years)
		const maxYear = Math.max(...data.years)
		
		// Find year where saleValue is maximum
		let maxValue = -Infinity
		let maxValueYear: number | null = null
		for (let i = 0; i < data.saleValue.length; i++) {
			const value = data.saleValue[i]
			if (value !== null && value !== undefined && !isNaN(value) && value > maxValue) {
				maxValue = value
				maxValueYear = data.years[i]
			}
		}
		maxValueYearRef.current = maxValueYear
		
		// Find year where startYear + saleValue equals a year on the X-axis
		const startYear = Math.min(...data.years)
		const yearsSet = new Set(data.years)
		const matchingYears: number[] = []
		
		// Use the single saleValue parameter (not the array)
		if (saleValueRef.current != null && !isNaN(saleValueRef.current) && saleValueRef.current !== 0) {
			const calculatedYear = startYear + saleValueRef.current
			// Check if the calculated year exists in the years array
			if (yearsSet.has(calculatedYear)) {
				matchingYears.push(calculatedYear)
			}
		}
		nonZeroYearsRef.current = matchingYears
		
		dataRef.current = [
			data.years,
			data.saleValue,
			data.payments,
			data.rentIncome,
			data.cumulativeBalance,
			data.loanBalance
		]
		plotRef.current?.setData(dataRef.current)
		
		// Update X-axis scale dynamically using years array
		plotRef.current?.setScale('x', { min: minYear, max: maxYear })
		
		// Update Y-axis scale dynamically
		plotRef.current?.setScale('y', { min: 0, max: yAxisMax })
	}

	return { containerRef, setData }
}

export default function Chart({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
	return <div ref={containerRef} className="chart" />
}
