import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimulation } from '../hooks/useSimulation'

const WS_URL = (import.meta.env.VITE_WS_URL as string) || 'ws://localhost:8000/ws/simulate';
const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000/api';

export default function InputPage() {
	const [customerName, setCustomerName] = useState('') //入力!E4
	const [age, setAge] = useState<number | ''>('') //入力!E5
	const [propertyName, setPropertyName] = useState('') //入力!E7
	const [purchaseY, setPurchaseY] = useState('') // 入力!E8 
	const [purchaseM, setPurchaseM] = useState('') //  入力!G8
	const [propertyPrice, setPropertyPrice] = useState<number | ''>('') //入力!E9
	const [ownPrice, setOwnPrice] = useState<number | ''>('') //入力!E10
	const [borrowPrice, setBorrowPrice] = useState<number | ''>('') //
	const [loanPeriod, setLoanPeriod] = useState<number | ''>('') //入力!E13
	const [interestRate, setInterestRate] = useState<number | ''>('') //入力!E14
	const [riseIYears, setRiseIYears] = useState<number | ''>('') //入力!E15
	const [riseIRate, setRiseIRate] = useState<number | ''>('') //入力!G15
	const [earlyRYears, setEarlyRYears] = useState<number | ''>('') //入力!E17
	const [earlyRPrice, setEarlyRPrice] = useState<number | ''>('') //入力!G17
	const [minRiseIYear, setMinRiseIYear] = useState<number | ''>('') //入力!E16
	const [maxRiseIYear, setMaxRiseIYear] = useState<number | ''>('') //入力!G16
	const [earlyNum, setEarlyNum] = useState<number | ''>('') //入力!E18
	const [rentMonthly, setRentMonthly] = useState<number | ''>('') //入力!E20
	const [declineRYears, setDeclineRYears] = useState<number | ''>('') //入力!E21
	const [declineRate, setDeclineRate] = useState<number | ''>('') //入力!G21
	const [minDeclineRYear, setMinDeclineRYear] = useState<number | ''>('') //入力!E22
	const [maxDeclineRYear, setMaxDeclineRYear] = useState<number | ''>('') //入力!E22
	const [changeRYears, setChangeRYears] = useState<number | ''>('') //入力!E23
	const [changeRentPrice, setChangeRentPrice] = useState<number | ''>('') //入力!G23
	const [renewalFeeYears, setRenewalFeeYears] = useState<number | ''>('') //入力!E24
	const [renewalFeePrice, setRenewalFeePrice] = useState<number | ''>('') //入力!G24====
	const [manageFeeMonthly, setManageFeeMonthly] = useState<number | ''>('') //入力!E25
	const [repairFundMonthly, setRepairFundMonthly] = useState<number | ''>('') //入力!E26
	const [nextRepairYears, setNextRepairYears] = useState<number | ''>('') //入力!E27
	const [nextRepairRate, setNextRepairRate] = useState<number | ''>('') //入力!G27
	const [collectFeeMonthly, setCollectFeeMonthly] = useState<number | ''>('') //入力!E29
	const [minCollectFeeYear, setMinCollectFeeYear] = useState<number | ''>('') //入力!E28
	const [maxCollectFeeYear, setMaxCollectFeeYear] = useState<number | ''>('') //入力!G28
	const [equipmentRepairYears, setEquipmentRepairYears] = useState<number | ''>('') //入力!E30
	const [equipmentRepairPrice, setEquipmentRepairPrice] = useState<number | ''>('') //入力!G30
	const [emptyRoomYears, setEmptyRoomYears] = useState<number | ''>('') //入力!E31
	const [emptyRoomMonth, setEmptyRoomMonth] = useState<number | ''>('') //入力!G31
	const [originalRestorationYears, setOriginalRestorationYears] = useState<number | ''>('') //入力!E32
	const [originalRestorationPrice, setOriginalRestorationPrice] = useState<number | ''>('') //入力!G32
	const [landPropertyPrice, setLandPropertyPrice] = useState<number | ''>('') //入力!E33
	const [landPropertyPrice1, setLandPropertyPrice1] = useState<number | ''>('') //入力!E34
	const [landPropertyPrice2, setLandPropertyPrice2] = useState<number | ''>('') //入力!E35
	const [landPropertyPrice3, setLandPropertyPrice3] = useState<number | ''>('') //入力!E36
	const [landPropertyPrice4, setLandPropertyPrice4] = useState<number | ''>('') //入力!G36
	const [landPropertyPrice5, setLandPropertyPrice5] = useState<number | ''>('') //入力!E37
	const [sellPrice, setSellPrice] = useState<number | ''>('') //入力!E39
	const [sellRate, setSellRate] = useState<number | ''>('') //入力!G39
	const [sellYears, setSellYears] = useState<number | ''>('') //入力!E40
	const [sellRate1, setSellRate1] = useState<number | ''>('') //入力!G40
	const [minSellYear, setMinSellYear] = useState<number | ''>('') //入力!E41
	const [maxSellYear, setMaxSellYear] = useState<number | ''>('') //入力!G41
	const [fixedAssetTaxRate, setFixedAssetTaxRate] = useState<number | ''>('') //入力!E43
	const [fixedAssetTaxRate1, setFixedAssetTaxRate1] = useState<number | ''>('') //入力!E44
	const [fixedAssetTaxRate2, setFixedAssetTaxRate2] = useState<number | ''>('') //入力!E45
	const [taxEffect, setTaxEffect] = useState<number | ''>('') //入力!E47
	const navigate = useNavigate()

	const reset = () => {
		setCustomerName('')
		setAge('')
		setPropertyName('')
		setPurchaseY('')
		setPurchaseM('')
		setPropertyPrice('')
		setOwnPrice('')
		setBorrowPrice('')
		setLoanPeriod('')
		setInterestRate('')
		setRiseIYears('')
		setRiseIRate('')
		setEarlyRYears('')
		setEarlyRPrice('')
		setMinRiseIYear('')
		setMaxRiseIYear('')
		setEarlyNum('')
		setRentMonthly('')
		setDeclineRYears('')
		setDeclineRate('')
		setMinDeclineRYear('')
		setMaxDeclineRYear('')
		setChangeRYears('')
		setChangeRentPrice('')
		setRenewalFeeYears('')
		setRenewalFeePrice('')
		setManageFeeMonthly('')
		setRepairFundMonthly('')
		setNextRepairYears('')
		setNextRepairRate('')
		setCollectFeeMonthly('')
		setMinCollectFeeYear('')
		setMaxCollectFeeYear('')
		setEquipmentRepairYears('')
		setEquipmentRepairPrice('')
		setEmptyRoomYears('')
		setEmptyRoomMonth('')
		setOriginalRestorationYears('')
		setOriginalRestorationPrice('')
		setLandPropertyPrice('')
		setLandPropertyPrice1('')
		setLandPropertyPrice2('')
		setLandPropertyPrice3('')
		setLandPropertyPrice4('')
		setLandPropertyPrice5('')
		setSellPrice('')
		setSellRate('')
		setSellYears('')
		setSellRate1('')
		setMinSellYear('')
		setMaxSellYear('')
		setFixedAssetTaxRate('')
		setFixedAssetTaxRate1('')
		setFixedAssetTaxRate2('')
		setTaxEffect('')
	}

	useEffect(() => {
		setBorrowPrice(Number(propertyPrice) - Number(ownPrice));
	}, [ownPrice, propertyPrice])

    const goDisplay = async (e: React.FormEvent) => {
        e.preventDefault()
		const data = {
			customerName: customerName,
			age: age,
			propertyName: propertyName,
			purchaseY: purchaseY,
			purchaseM: purchaseM,
			propertyPrice: propertyPrice,
			ownPrice: ownPrice,
			borrowPrice: borrowPrice,
			loanPeriod: loanPeriod,
			interestRate: interestRate,
			riseIYears: riseIYears,
			riseIRate: riseIRate,
			earlyRYears: earlyRYears,
			earlyRPrice: earlyRPrice,
			minRiseIYear: minRiseIYear,
			maxRiseIYear: maxRiseIYear,
			earlyNum: earlyNum,
			rentMonthly: rentMonthly,
			declineRYears: declineRYears,
			declineRate: declineRate,
			minDeclineRYear: minDeclineRYear,
			maxDeclineRYear: maxDeclineRYear,
			changeRYears: changeRYears,
			changeRentPrice: changeRentPrice,
			renewalFeeYears: renewalFeeYears,
			renewalFeePrice: renewalFeePrice,
			manageFeeMonthly: manageFeeMonthly,
			repairFundMonthly: repairFundMonthly,
			nextRepairYears: nextRepairYears,
			nextRepairRate: nextRepairRate,
			collectFeeMonthly: collectFeeMonthly,
			minCollectFeeYear: minCollectFeeYear,
			maxCollectFeeYear: maxCollectFeeYear,
			equipmentRepairYears: equipmentRepairYears,
			equipmentRepairPrice: equipmentRepairPrice,
			emptyRoomYears: emptyRoomYears,
			emptyRoomMonth: emptyRoomMonth,
			originalRestorationYears: originalRestorationYears,
			originalRestorationPrice: originalRestorationPrice,
			landPropertyPrice: landPropertyPrice,
			landPropertyPrice1: landPropertyPrice1,
			landPropertyPrice2: landPropertyPrice2,
			landPropertyPrice3: landPropertyPrice3,
			landPropertyPrice4: landPropertyPrice4,
			landPropertyPrice5: landPropertyPrice5,
			sellPrice: sellPrice,
			sellRate: sellRate,
			sellYears: sellYears,
			sellRate1: sellRate1,
			minSellYear: minSellYear,
			maxSellYear: maxSellYear,
			fixedAssetTaxRate: fixedAssetTaxRate,
			fixedAssetTaxRate1: fixedAssetTaxRate1,
			fixedAssetTaxRate2: fixedAssetTaxRate2,
			taxEffect: taxEffect,
		};
        try {
            await fetch(`${API_URL}/simulation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (_) {
            // swallow error and continue navigation
        }

        navigate('/display', { state: { frequency: 2, sampleRate: 120, duration: 5, name: 'run', persist: true } })
	}

	const today = new Date()
	const todayStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`

	return (
		<div className="page">
			<header className="header">
				<div className="badge">マンション投 マンション投資収支シミュレーション</div>
				<div className="date">試算日: {todayStr}</div>
			</header>
			<form className="form-card" onSubmit={goDisplay}>
				<section className="section">
					<h2 className="section-title">顧客</h2>
					<div className="grid">
						<label className="field">
							<span className="field-label">氏名</span>
							<div className="input-adorn">
								<input className="input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="氏名" />
							</div>
						</label>
						<label className="field">
							<span className="field-label">年齢</span>
							<div className="input-adorn">
                            <input className="input" type="number" min={0} max={100} value={age} placeholder='0'  onChange={(e) => setAge(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
							</div>
						</label>
					</div>
				</section>
				<section className="section">
					<h2 className="section-title">物件</h2>
					<div className="grid">
						<label className="field">
							<span className="field-label">物件名・部屋番号</span>
							<div className="input-row">
								<input className="input" placeholder="物件名" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
							</div>
						</label>
						<label className="field">
							<span className="field-label">購入年月</span>
							<div className="input-adorn">
								<input className="input input-number" type="number" value={purchaseY} onChange={(e) => setPurchaseY(e.target.value)} />
								<span className="adorn">年</span>
								<input className="input input-number" type="number" value={purchaseM} onChange={(e) => setPurchaseM(e.target.value)} />
								<span className="adorn">月</span>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">物件価格</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={propertyPrice} onChange={(e) => setPropertyPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} placeholder='0' />
								<span className="adorn">円</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">自己資金</span>
							<div className="input-adorn">
                                <input
									className="input"
									type="number"
                                    min={0}
									value={ownPrice}
									max={Number(propertyPrice) + 1}
									onChange={(e) => {
										const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
										if (0 <= value && value <= Number(propertyPrice) + 1) {
											setOwnPrice(value);
										}
									}}
									placeholder='0'
								/>
								<span className="adorn note">(消費税込)</span>
							</div>
						</label>
					</div>
				</section>
				<section className="section">
					<h2 className="section-title">借入</h2>
					<div className="grid">
						<label className="field">
							<span className="field-label">借入金額</span>
							<div className="input-row">
								<span className="field-label">{borrowPrice}</span>
								<span className="adorn">円</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">借入期間</span>
							<div className="input-adorn">
								<input
									className="input"
									type="number"
									min={10}
									max={45}
									value={loanPeriod}
									placeholder='10'
									onChange={(e) => setLoanPeriod(e.target.value === '' ? 10 : parseInt(e.target.value, 10))}
								/>
								<span className="adorn">年 (10～45年)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">金利</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} max={100} value={interestRate} placeholder='0.00' onChange={(e) => setInterestRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn">％</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">金利上昇</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={riseIYears} placeholder='0' onChange={(e) => setRiseIYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={riseIRate} placeholder='0.00' onChange={(e) => setRiseIRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％上昇</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">繰上返済</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={earlyRYears} placeholder='0' onChange={(e) => setEarlyRYears(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={earlyRPrice} placeholder='0' onChange={(e) => setEarlyRPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">(対象期間)</span>
							<div className="input-adorn">
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={minRiseIYear}
									onChange={e => setMinRiseIYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
									placeholder="開始年"
								/>
								<span className="adorn">～</span>
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={maxRiseIYear}
									onChange={e => setMaxRiseIYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
									placeholder="終了年"
								/>
								<span className="adorn">年迄 (西暦で入力)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">繰上返済時の処理</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={earlyNum} placeholder='0' onChange={(e) => setEarlyNum(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">期間短縮…1、金額減額…2</span>
							</div>
						</label>
					</div>
				</section>
				<section className='section'>
					<h2 className="section-title">収入</h2>
					<div className="grid">
						<label className='field'>
							<span className="field-label">家賃</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={rentMonthly} placeholder='0' onChange={(e) => setRentMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月 (消費税込)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">家賃下落率</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={declineRYears} placeholder='0' onChange={(e) => setDeclineRYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={declineRate} placeholder='0.00' onChange={(e) => setDeclineRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">%下落</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">家賃変更</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={changeRYears} placeholder='0' onChange={(e) => setChangeRYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={changeRentPrice} placeholder='0' onChange={(e) => setChangeRentPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円に変更</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">(対象期間)</span>
							<div className="input-adorn">
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={minDeclineRYear}
									onChange={e => setMinDeclineRYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
									placeholder="開始年"
								/>
								<span className="adorn">～</span>
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={maxDeclineRYear}
									onChange={e => setMaxDeclineRYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
									placeholder="終了年"
								/>
								<span className="adorn">年迄 (西暦で入力)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">更新料</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={renewalFeeYears} placeholder='0' onChange={(e) => setRenewalFeeYears(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={renewalFeePrice} placeholder='0' onChange={(e) => setRenewalFeePrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">ヶ月分</span>
							</div>
						</label>
					</div>
				</section>
				<section className='section'>
					<h2 className='section-title'>諸経費等</h2>
					<div className="grid">
						<label className='field'>
							<span className="field-label">管理費</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={manageFeeMonthly} placeholder='0' onChange={(e) => setManageFeeMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月(消費税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={repairFundMonthly} placeholder='0' onChange={(e) => setRepairFundMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金(次年度以降)</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={nextRepairYears} placeholder='0' onChange={(e) => setNextRepairYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={nextRepairRate} placeholder='0.00' onChange={(e) => setNextRepairRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％上昇</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">集金代行手数料</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={collectFeeMonthly} placeholder='0' onChange={(e) => setCollectFeeMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月 (消費税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">(対象期間)</span>
							<div className="input-adorn">
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={minCollectFeeYear}
									onChange={e => setMinCollectFeeYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
									placeholder="開始年"
								/>
								<span className="adorn">～</span>
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={maxCollectFeeYear}
									onChange={e => setMaxCollectFeeYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
									placeholder="終了年"
								/>
								<span className="adorn">年迄 (西暦で入力)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">設備補修費用</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={equipmentRepairYears} placeholder='0' onChange={(e) => setEquipmentRepairYears(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={equipmentRepairPrice} placeholder='0' onChange={(e) => setEquipmentRepairPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">空室</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={emptyRoomYears} placeholder='0' onChange={(e) => setEmptyRoomYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={emptyRoomMonth} placeholder='0' onChange={(e) => setEmptyRoomMonth(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">ヶ月</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">原状回復費用</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={originalRestorationYears} placeholder='0' onChange={(e) => setOriginalRestorationYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={originalRestorationPrice} placeholder='0' onChange={(e) => setOriginalRestorationPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円 (不動産取得税(土地)=31,766円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">土地 固定資産評価額</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={landPropertyPrice} placeholder='0' onChange={(e) => setLandPropertyPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円 (不動産取得税(建物)=165,033円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">固定資産課税標準額</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={landPropertyPrice1} placeholder='0' onChange={(e) => setLandPropertyPrice1(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円 (固定資産税(土地)=4,941円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">都市計画税課税標準額</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={landPropertyPrice2} placeholder='0' onChange={(e) => setLandPropertyPrice2(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円 (固定資産税(建物)=77,015円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">共用土地持分</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={landPropertyPrice3} placeholder='0' onChange={(e) => setLandPropertyPrice3(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">/</span>
                                <input className="input input-number" type="number" min={0} value={landPropertyPrice4} placeholder='0' onChange={(e) => setLandPropertyPrice4(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">(都市計画税(土地)=2,117円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">建物固定資産課税標準額</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={landPropertyPrice5} placeholder='0' onChange={(e) => setLandPropertyPrice5(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円 (都市計画税(建物)=16,503円)</span>
							</div>
						</label>
					</div>
				</section>
				<section className='section'>
					<h2 className='section-title'>売却</h2>
					<div className="grid">
						<label className='field'>
							<span className="field-label">売却予想額(初年度)</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={sellPrice} placeholder='0' onChange={(e) => setSellPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
                                <input className="input input-number" type="number" min={0} value={sellRate} placeholder='0' onChange={(e) => setSellRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">% (金額または売却率を入力)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">売却予想額(次年度以降)</span>
							<div className="input-adorn">
                                <input className="input input-number" type="number" min={0} value={sellYears} placeholder='0' onChange={(e) => setSellYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">年毎に</span>
                                <input className="input input-number" type="number" min={0} value={sellRate1} placeholder='0.00' onChange={(e) => setSellRate1(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％上昇</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">(対象期間)</span>
							<div className="input-adorn">
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={minSellYear}
									onChange={e => setMinSellYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
									placeholder="開始年"
								/>
								<span className="adorn">年～</span>
								<input
									className="input"
									type="number"
									min="1800"
									max="2200"
									value={maxSellYear}
									onChange={e => setMaxSellYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
									placeholder="終了年"
								/>
								<span className="adorn">年迄 (西暦で入力)</span>
							</div>
						</label>
					</div>
				</section>
				<section className='section'>
					<h2 className='section-title'>基本税率</h2>
					<div className="grid">
						<label className='field'>
							<span className="field-label">固定資産取得税率</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={fixedAssetTaxRate} placeholder='0.00' onChange={(e) => setFixedAssetTaxRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">固定資産税率</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={fixedAssetTaxRate1} placeholder='0.00' onChange={(e) => setFixedAssetTaxRate1(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">都市計画税率</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={fixedAssetTaxRate2} placeholder='0.00' onChange={(e) => setFixedAssetTaxRate2(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％</span>
							</div>
						</label>
					</div>
				</section>
				<section className='section'>
					<div className="grid">
						<label className='field'>
							<span className="field-label">節税効果</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={taxEffect} placeholder='0' onChange={(e) => setTaxEffect(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">万円 (購入時から65歳迄)</span>
							</div>
						</label>
					</div>
				</section>

				<div className="actions">
					<button type="button" className="btn secondary" onClick={reset}>リセット</button>
					<button type="submit" className="btn primary">計算へ</button>
				</div>
			</form>
		</div >
	)
}
