import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart, { useChart } from '../components/Chart'
// import { useSimulation } from '../hooks/useSimulation'

// const WS_URL = (import.meta.env.VITE_WS_URL as string) || 'ws://localhost:8000/ws/simulate'
const API_URL = "http://localhost:8000/api"

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
	const navigate = useNavigate()
	const [activeTable, setActiveTable] = useState<true | false>(true)
	const [hideTable, setHideTable] = useState(false)
	const [output_one, setOutput_one] = useState<any>({})
	const [output_two, setOutput_two] = useState<any>({})
	const [log_one, setLog_one] = useState<any>({})
	const [log_two, setLog_two] = useState<any>({})
	
	// Mock chart data - replace with actual simulation results
	const chartData: ChartData = {
		years: Array.from({ length: 60 }, (_, i) => new Date().getFullYear() + i),
		saleValue: Array.from({ length: 60 }, (_, i) => activeTable == true ? log_one[`グラフ1!T${i + 6}`] : log_two[`グラフ2!T${i + 6}`]), // Sale value only at year 0
		payments: Array.from({ length: 60 }, (_, i) => activeTable == true ? log_one[`グラフ1!O${i + 6}`] : log_two[`グラフ2!O${i + 6}`]), // Monthly payments converted to 万円
		rentIncome:  Array.from({ length: 60 }, (_, i) => activeTable == true ? log_one[`グラフ1!P${i + 6}`] : log_two[`グラフ2!P${i + 6}`]), // Rent income
		annualBalance: Array.from({ length: 60 }, (_, i) => activeTable == true ? log_one[`グラフ1!Q${i + 6}`] : log_two[`グラフ2!Q${i + 6}`]), // Annual balance
		cumulativeBalance: Array.from({ length: 60 }, (_, i) => activeTable == true ? log_one[`グラフ1!R${i + 6}`] : log_two[`グラフ2!R${i + 6}`]), // Cumulative balance
		loanBalance: Array.from({ length: 60 }, (_, i) => activeTable == true ? log_one[`グラフ1!S${i + 6}`] : log_two[`グラフ2!S${i + 6}`]) // Decreasing loan balance
	}

	const { containerRef, setData } = useChart('収支シミュレーション')

	const loadData = async () => {
		try {
			const result = await fetch(`${API_URL}/display`, {
								method: 'post',
								headers: { 'Content-Type': 'application/json' },
							});
			const total_data = await result.json()
			if(total_data.ok === true) {
				setOutput_one(total_data.result_output_one)
				setOutput_two(total_data.result_output_two)
				setLog_one(total_data.result_log_one)
				setLog_two(total_data.result_log_two)
			} else {
				setOutput_one({})
				setOutput_two({})
				setLog_one({})
				setLog_two({})
			}
		} catch(err) {
			console.error('Error loading data:', err)
			setOutput_one({})
			setOutput_two({})
			setLog_one({})
			setLog_two({})
		}
	}
	useEffect(() => {
		loadData()
	}, [activeTable])
	// loadData()
	useEffect(() => {
		setData(chartData)
	}, [log_one])	

	return (
		<div className="page">
			{/* Header */}
			<div className="simulation-header">
				<div className="header-badge">
					マンション投資収支シミュレーション
				</div>
				<div className="calculation-date">
					試算日: {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
				</div>
			</div>

			{/* Report Details */}
			<div className="report-details">
				<div className="customer-info">
					<div className="customer-name">{log_one["グラフ1!B2"]}</div>
					<div className="report-description">
						年間別収支表(60年) 集金代行・{output_one[`出力1!G2`]} ({output_one[`出力1!B4`]}年{output_one[`出力1!C4`]}月 取得で試算)
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
							<td>{output_one[`出力1!G2`]}</td>
							<td>{output_one[`出力1!O2`]}</td>
							<td>{output_one[`出力1!T2`] == ""?0:output_one[`出力1!T2`]}</td>
							<td>{output_one[`出力1!T3`]}</td>
							<td>{output_one[`出力1!V3`]}年</td>
							<td>{(output_one[`出力1!W3`] * 100).toFixed(3)}%</td>
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
								<th rowSpan={2}>支払後<br />借入残高</th>
								<th colSpan={2}>売却予想額</th>
								<th rowSpan={2}>精算収支</th>
							</tr>
							<tr>
								<th className='sticky'>No</th>
								<th>年度</th>
								<th>経過<br />年数</th>
								<th>年齢</th>
								<th>支払額 <br />(元利合計)</th>
								<th>金利 <br />(%)</th>
								<th>金利<br />引上率</th>
								<th>自己資金/<br />繰上返済</th>
								<th>管理費</th>
								<th>修繕<br />積立金</th>
								<th>集金代行<br />手数料</th>
								<th>設備補<br />修費用</th>
								<th>原状回<br />復費用</th>
								<th>取得税</th>
								<th>固都税</th>
								<th>小計</th>
								<th>年間家賃</th>
								<th>月々家賃</th>
								<th>空室時<br />(Δ)</th>
								<th>更新料</th>
								<th>節税<br />効果</th>
								<th>小計</th>
								<th>年間<br />収支差額</th>
								<th>月々<br />//</th>
								<th>収支累計</th>
								<th></th>
								<th>掛率<br />(対購入価格)</th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 60 }, (_, i) => i).map((num) => (
								<tr key={num}>
									<td>{num + 1}</td>
									<td>{activeTable == true?output_one[`出力1!C${num + 7}`]:output_two[`出力2!C${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!D${num + 7}`]:output_two[`出力2!D${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!E${num + 7}`]:output_two[`出力2!E${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!F${num + 7}`]:output_two[`出力2!F${num + 7}`]}</td>
									<td>{Number(activeTable == true?output_one[`出力1!G${num + 7}`]:output_two[`出力2!G${num + 7}`]).toFixed(2)}</td>
									<td>{activeTable == true?output_one[`出力1!H${num + 7}`]:output_two[`出力2!H${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!J${num + 7}`]:output_two[`出力2!J${num + 7}`]}</td>
									<td>{Number(activeTable == true?output_one[`出力1!L${num + 7}`]:output_two[`出力2!L${num + 7}`]).toFixed(0)}</td>
									<td>{Number(activeTable == true?output_one[`出力1!M${num + 7}`]:output_two[`出力2!M${num + 7}`]).toFixed(0)}</td>
									<td>{activeTable == true?output_one[`出力1!O${num + 7}`]:output_two[`出力2!O${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!P${num + 7}`]:output_two[`出力2!P${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!R${num + 7}`]:output_two[`出力2!R${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!T${num + 7}`]:output_two[`出力2!T${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!U${num + 7}`]:output_two[`出力2!U${num + 7}`]}</td>
									<td>{Number(activeTable == true?output_one[`出力1!V${num + 7}`]:output_two[`出力2!V${num + 7}`]).toFixed(0)}</td>
									<td>{activeTable == true?output_one[`出力1!W${num + 7}`]:output_two[`出力2!W${num + 7}`]}</td>
									<td>{Number(activeTable == true?output_one[`出力1!X${num + 7}`]:output_two[`出力2!X${num + 7}`]).toFixed(0)}</td>
									<td>{Number(activeTable == true?output_one[`出力1!Z${num + 7}`]:output_two[`出力2!Z${num + 7}`]).toFixed(0)}</td>
									<td>{activeTable == true?output_one[`出力1!AB${num + 7}`]:output_two[`出力2!AB${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!AC${num + 7}`]:output_two[`出力2!AC${num + 7}`]}</td>
									<td>{activeTable == true?output_one[`出力1!AD${num + 7}`]:output_two[`出力2!AD${num + 7}`]}</td>
									<td>{Number(activeTable == true?output_one[`出力1!AE${num + 7}`]:output_two[`出力2!AE${num + 7}`]).toFixed(0)}</td>
									<td>{Number(activeTable == true?output_one[`出力1!AF${num + 7}`]:output_two[`出力2!AF${num + 7}`]).toFixed(0)}</td>
									<td>{Number(activeTable == true?output_one[`出力1!AG${num + 7}`]:output_two[`出力2!AG${num + 7}`]).toFixed(0)}</td>
									<td>{activeTable == true?output_one[`出力1!AI${num + 7}`]:output_two[`出力2!AI${num + 7}`]}</td>
									<td>{Number(activeTable == true?output_one[`出力1!AJ${num + 7}`]:output_two[`出力2!AJ${num + 7}`]).toFixed(0)}</td>
									<td>{Number(activeTable == true?output_one[`出力1!AK${num + 7}`]:output_two[`出力2!AK${num + 7}`]).toFixed(2)}</td>
									<td>{Number(activeTable == true?output_one[`出力1!AM${num + 7}`]:output_two[`出力2!AM${num + 7}`]).toFixed(0)}</td>
								</tr>
							))}
							<tr>
								<td colSpan={4}>合計</td>
								<td colSpan={16}></td>
								<td>{activeTable == true?output_one[`出力1!AC67`]:output_two[`出力2!AC67`]}</td>
								<td></td>
								<td>{Number(activeTable == true?output_one[`出力1!AE67`]:output_two[`出力2!AE67`]).toFixed(0)}</td>
								<td colSpan={6}></td>
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
		</div>
	)
}
