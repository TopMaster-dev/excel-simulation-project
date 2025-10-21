import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Chart, { useChart } from '../components/Chart'
// import { useSimulation } from '../hooks/useSimulation'

// const WS_URL = (import.meta.env.VITE_WS_URL as string) || 'ws://localhost:8000/ws/simulate'
const API_URL = "http://localhost:8000/api"

type SimulationData = {
	customerName: string
	propertyName: string
	propertyPrice: number
	ownFunds: number
	loanAmount: number
	loanPeriod: number
	interestRate: number
	calculationDate: string
}

type ChartData = {
	years: number[]
	saleValue: number[]
	payments: number[]
	rentIncome: number[]
	annualBalance: number[]
	cumulativeBalance: number[]
	loanBalance: number[]
}

export default function DisplayPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const [activeTable, setActiveTable] = useState<true | false>(true)
	const [hideTable, setHideTable] = useState(false)
	
	// Mock simulation data - replace with actual data from backend
	const simulationData: SimulationData = {
		customerName: '鈴木貴裕',
		propertyName: 'エステム ミラージュ',
		propertyPrice: 33800000,
		ownFunds: 2000000,
		loanAmount: 31800000,
		loanPeriod: 35,
		interestRate: 1.675,
		calculationDate: '2025年9月28日'
	}

	// Mock chart data - replace with actual simulation results
	const chartData: ChartData = {
		years: Array.from({ length: 81 }, (_, i) => 2025 + i),
		saleValue: [3300, ...Array(80).fill(0)], // Sale value only at year 0
		payments: Array(81).fill(330), // Monthly payments converted to 万円
		rentIncome: Array(81).fill(330), // Rent income
		annualBalance: Array(81).fill(0), // Annual balance
		cumulativeBalance: Array(81).fill(0), // Cumulative balance
		loanBalance: Array.from({ length: 81 }, (_, i) => Math.max(0, 3000 - (i * 37.5))) // Decreasing loan balance
	}

	const { containerRef, appendPoint, reset, setData } = useChart('収支シミュレーション')

	const loadData = async () => {
		try {
			const result = await fetch(`${API_URL}/display`, {
								method: 'post',
								headers: { 'Content-Type': 'application/json' },
							});
							simulationData.customerName = "123"
			console.log(result, simulationData);
		} catch(err) {
			
		}
	}

	// Populate chart with simulation data
	useEffect(() => {
		loadData()
		setData(chartData)
	}, [])

	return (
		<div className="page">
			{/* Header */}
			<div className="simulation-header">
				<div className="header-badge">
					マンション投資収支シミュレーション
				</div>
				<div className="calculation-date">
					試算日: {simulationData.calculationDate}
				</div>
			</div>

			{/* Report Details */}
			<div className="report-details">
				<div className="customer-info">
					<div className="customer-name">{simulationData.customerName} 様</div>
					<div className="report-description">
						年間別収支表(60年) 集金代行・{simulationData.propertyName} (2025年12月 取得で試算)
					</div>
				</div>
				
				<div className="table-controls">
					<div className="table-switch-container">
						<span className={`switch-label ${activeTable === false ? '' : 'table-active'}`}>テーブル1</span>
						<button
							className={`switch-toggle${activeTable === false ? ' switched' : ''}`}
							aria-pressed={activeTable === false}
							onClick={() => setActiveTable(activeTable === true ? false : true)}
							type="button"
						>
							<span className="switch-knob"></span>
						</button>
						<span className={`switch-label ${activeTable === false ? 'table-active' : ''}`}>テーブル2</span>
					</div>
					<div className='table-control-item'>
						<label className="hide-table" style={{ display: 'flex', alignItems: 'center', gap: '6px' , justifyContent: 'center', flexDirection: 'row'}}>
							<span style={{ 
								display: 'inline-block',
								width: '28px',
								height: '28px',
								position: 'relative',
								border: '4px solid #1b5763'
							}}>
								<input
									type="checkbox"
									checked={hideTable}
									onChange={e => setHideTable(e.target.checked)}
									style={{
										opacity: 0,
										width: '20px',
										height: '20px',
										position: 'absolute',
										left: 0,
										top: 0,
										margin: 0,
										cursor: 'pointer',
										zIndex: 2
									}}
									aria-label="表を隠す"
								/>
								{hideTable ? (
									<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
										<rect x="0" y="0" width="20" height="20" fill="#fff"/>
										<polyline points="2,10 9,16 20,2" fill="none" stroke="#1b5763" strokeWidth="4"/>
									</svg>
								) : (
									<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
										<rect x="0" y="0" width="20" height="20" fill="#fff"/>
									</svg>
								)}
							</span>
							<span>表を隠す</span>
						</label>
						<div>
							<button onClick={() => navigate('/')} className='btn primary'>
								入力編集
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="property-summary">
				<table className="summary-table">
					<thead>
						<tr>
							<th>物件名</th>
							<th>物件価格</th>
							<th>自己資金</th>
							<th>借入金</th>
							<th>期間</th>
							<th>金利</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{simulationData.propertyName}</td>
							<td>{simulationData.propertyPrice.toLocaleString()}</td>
							<td>{simulationData.ownFunds.toLocaleString()}</td>
							<td>{simulationData.loanAmount.toLocaleString()}</td>
							<td>{simulationData.loanPeriod}年</td>
							<td>{simulationData.interestRate}%</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Property Summary Table */}
			{!hideTable && (
				<div className="property-summary property-data">
					<table className="summary-table summary-data">
						<thead>
							<tr>
								<th colSpan={4} className='sticky'>年度</th>
								<th colSpan={12}>支出</th>
								<th colSpan={6}>収入</th>
								<th colSpan={3}>収支差額</th>
								<th rowSpan={2}>支払後借入残高</th>
								<th colSpan={2}>売却予想額</th>
								<th rowSpan={2}>精算収支</th>
							</tr>
							<tr>
								<th className='sticky'>No</th>
								<th>年度</th>
								<th>経過年数</th>
								<th>年齢</th>
								<th>支払額 (元利合計)</th>
								<th>金利 (%)</th>
								<th>金利引上率</th>
								<th>自己資金/繰上返済</th>
								<th>管理費</th>
								<th>修繕積立金</th>
								<th>集金代行手数料</th>
								<th>設備補修費用</th>
								<th>原状回復費用</th>
								<th>取得税</th>
								<th>固都税</th>
								<th>小計</th>
								<th>年間家賃</th>
								<th>月々家賃</th>
								<th>空室時(Δ)</th>
								<th>更新料</th>
								<th>節税効果</th>
								<th>小計</th>
								<th>年間収支差額</th>
								<th>月々 //</th>
								<th>収支累計</th>
								<th></th>
								<th>掛率(対購入価格)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>{simulationData.propertyPrice.toLocaleString()}</td>
								<td>{simulationData.ownFunds.toLocaleString()}</td>
								<td>{simulationData.loanAmount.toLocaleString()}</td>
								<td>{simulationData.loanPeriod}年</td>
								<td>{simulationData.interestRate}%</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}

			{/* Chart Section */}
			<div className="chart-section">
				<div className="chart-header">
					<span className="chart-unit">(万円)</span>
				</div>
				<Chart containerRef={containerRef} />
				<div className="chart-legend">
					<div className="legend-item">
						<div className="legend-color orange-bar"></div>
						<span>売却時</span>
					</div>
					<div className="legend-item">
						<div className="legend-color red-line"></div>
						<span>支払額</span>
					</div>
					<div className="legend-item">
						<div className="legend-color blue-line"></div>
						<span>家賃収入</span>
					</div>
					<div className="legend-item">
						<div className="legend-color green-line"></div>
						<span>年間収支</span>
					</div>
					<div className="legend-item">
						<div className="legend-color light-blue-line"></div>
						<span>累計収支</span>
					</div>
					<div className="legend-item">
						<div className="legend-color dark-blue-line"></div>
						<span>借入残高</span>
					</div>
				</div>
			</div>

			{/* Controls */}
			{/* <div className="simulation-controls">
				<button onClick={() => start({ frequency: 2, sampleRate: 120, duration: 5, name: 'run', persist: true })} disabled={running}>
					Start Simulation
				</button>
				<button onClick={stop} disabled={!running}>
					Stop Simulation
				</button>
				<button onClick={() => navigate('/')}>
					Edit Inputs
				</button>
			</div> */}
		</div>
	)
}
