import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:8000/api';

export default function InputPage() {
	const [customerName, setCustomerName] = useState('') //入力!E4
	const [age, setAge] = useState<number | ''>('') //入力!E5
	const [propertyName, setPropertyName] = useState('') //入力!E7
	const [purchaseY, setPurchaseY] = useState<number | ''>('') // 入力!E8 
	const [purchaseM, setPurchaseM] = useState<number | ''>('') //  入力!G8
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

	const resetInputData = async (data: any) => {
		if(data) {
			setCustomerName(data["入力!E4"] || '')
			setAge(data["入力!E5"] || '')
			setPropertyName(data["入力!E7"] || '')
			setPurchaseY(data["入力!E8"] || '')
			setPurchaseM(data["入力!G8"] || '')
			setPropertyPrice(data["入力!E9"] || '')
			setOwnPrice(data["入力!E10"] || '')
			setBorrowPrice(data["入力!E12"] || '')
			setLoanPeriod(data["入力!E13"] || '')
			setInterestRate(data["入力!E14"] || '')
			setRiseIYears(data["入力!E15"] || '')
			setRiseIRate(data["入力!G15"] || '')
			setEarlyRYears(data["入力!E17"] || '')
			setEarlyRPrice(data["入力!G17"] || '')
			setMinRiseIYear(data["入力!E16"] || '')
			setMaxRiseIYear(data["入力!G16"] || '')
			setEarlyNum(data["入力!E18"] || '')
			setRentMonthly(data["入力!E20"] || '')
			setDeclineRYears(data["入力!E21"] || '')
			setDeclineRate(data["入力!G21"] || '')
			setMinDeclineRYear(data["入力!E22"] || '')
			setMaxDeclineRYear(data["入力!G22"] || '')
			setChangeRYears(data["入力!E23"] || '')
			setChangeRentPrice(data["入力!G23"] || '')
			setRenewalFeeYears(data["入力!E24"] || '')
			setRenewalFeePrice(data["入力!G24"] || '')
			setManageFeeMonthly(data["入力!E25"] || '')
			setRepairFundMonthly(data["入力!E26"] || '')
			setNextRepairYears(data["入力!E27"] || '')
			setNextRepairRate(data["入力!G27"] || '')
			setCollectFeeMonthly(data["入力!E29"] || '')
			setMinCollectFeeYear(data["入力!E28"] || '')
			setMaxCollectFeeYear(data["入力!G28"] || '')
			setEquipmentRepairYears(data["入力!E30"] || '')
			setEquipmentRepairPrice(data["入力!G30"] || '')
			setEmptyRoomYears(data["入力!E31"] || '')
			setEmptyRoomMonth(data["入力!G31"] || '')
			setOriginalRestorationYears(data["入力!E32"] || '')
			setOriginalRestorationPrice(data["入力!G32"] || '')
			setLandPropertyPrice(data["入力!E33"] || '')
			setLandPropertyPrice1(data["入力!E34"] || '')
			setLandPropertyPrice2(data["入力!E35"] || '')
			setLandPropertyPrice3(data["入力!E36"] || '')
			setLandPropertyPrice4(data["入力!G36"] || '')
			setLandPropertyPrice5(data["入力!E37"] || '')
			setSellPrice(data["入力!E39"] || '')
			setSellRate(data["入力!G39"] || '')
			setSellYears(data["入力!E40"] || '')
			setSellRate1(data["入力!G40"] || '')
			setMinSellYear(data["入力!E41"] || '')
			setMaxSellYear(data["入力!G41"] || '')
			setFixedAssetTaxRate(data["入力!E43"] || '')
			setFixedAssetTaxRate1(data["入力!E44"] || '')
			setFixedAssetTaxRate2(data["入力!E45"] || '')
			setTaxEffect(data["入力!E47"] || '')
		} else {
			setCustomerName('サンプル')
			setAge(30)
			setPropertyName('ミラージュ')
			setPurchaseY(2025)
			setPurchaseM(9)
			setPropertyPrice(43800000)
			setOwnPrice(0)
			setBorrowPrice(30660000)
			setLoanPeriod(35)
			setInterestRate(1.675)
			setRiseIYears(5)
			setRiseIRate(0.1)
			setEarlyRYears(2)
			setEarlyRPrice(350000)
			setMinRiseIYear(2026)
			setMaxRiseIYear(2040)
			setEarlyNum(1)
			setRentMonthly(210000)
			setDeclineRYears(5)
			setDeclineRate(0.5)
			setMinDeclineRYear(2026)
			setMaxDeclineRYear(2040)
			setChangeRYears(4)
			setChangeRentPrice(140000)
			setRenewalFeeYears(0)
			setRenewalFeePrice(0)
			setManageFeeMonthly(8920)
			setRepairFundMonthly(12090)
			setNextRepairYears(2)
			setNextRepairRate(0.5)
			setCollectFeeMonthly(0)
			setMinCollectFeeYear(2026)
			setMaxCollectFeeYear(2036)
			setEquipmentRepairYears(10)
			setEquipmentRepairPrice(150000)
			setEmptyRoomYears(4)
			setEmptyRoomMonth(2)
			setOriginalRestorationYears(4)
			setOriginalRestorationPrice(150000)
			setLandPropertyPrice(126758716)
			setLandPropertyPrice1(21126452)
			setLandPropertyPrice2(42242905)
			setLandPropertyPrice3(5376)
			setLandPropertyPrice4(321776)
			setLandPropertyPrice5(5501100)
			setSellPrice(43800000)
			setSellRate(100)
			setSellYears(3)
			setSellRate1(1)
			setMinSellYear(2026)
			setMaxSellYear(2040)
			setFixedAssetTaxRate(3)
			setFixedAssetTaxRate1(1.4)
			setFixedAssetTaxRate2(0.3)
			setTaxEffect(15)
			try {			
				const response = await fetch(`${API_URL}/reset`, {
					method: 'get',
					headers: { 'Content-Type': 'application/json' },
				});
				if(response.ok) {
					console.log('reset success');
				} else {
					console.log(response.statusText as string);
				}
			} catch (err) {
				console.log(err as string);
			}
		}
	}

	useEffect(() => {
		setBorrowPrice(Number(propertyPrice) - Number(ownPrice));
	}, [ownPrice, propertyPrice])

	const updateInputData = async () => {
		try {
            const response = await fetch(`${API_URL}/simulation`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            });
			if(response.ok) {
				const data = await response.json()
				if(data.ok === true) {
					resetInputData(data.result)
				} else {
					alert("入力値を正しく入力してください。");
				}
			} else {
				alert("入力値を正しく入力してください。");
			}
        } catch (err) {
            alert("サーバーエラー");
        }
	}

    const goDisplay = async (e: React.FormEvent) => {
        e.preventDefault()
		const data = {
			"入力!E4": customerName,
			"入力!E5": age,
			"入力!E7": propertyName,
			"入力!E8": purchaseY,
			"入力!G8": purchaseM,
			"入力!E9": propertyPrice,
			"入力!E10": ownPrice,
			"入力!E12": borrowPrice,
			"入力!E13": loanPeriod,
			"入力!E14": interestRate,
			"入力!E15": riseIYears,
			"入力!G15": riseIRate,
			"入力!E17": earlyRYears,
			"入力!G17": earlyRPrice,
			"入力!E16": minRiseIYear,
			"入力!G16": maxRiseIYear,
			"入力!E18": earlyNum,
			"入力!E20": rentMonthly,
			"入力!E21": declineRYears,
			"入力!G21": declineRate,
			"入力!E22": minDeclineRYear,
			"入力!G22": maxDeclineRYear,
			"入力!E23": changeRYears,
			"入力!G23": changeRentPrice,
			"入力!E24": renewalFeeYears,
			"入力!G24": renewalFeePrice,
			"入力!E25": manageFeeMonthly,
			"入力!E26": repairFundMonthly,
			"入力!E27": nextRepairYears,
			"入力!G27": nextRepairRate,
			"入力!E29": collectFeeMonthly,
			"入力!E28": minCollectFeeYear,
			"入力!G28": maxCollectFeeYear,
			"入力!E30": equipmentRepairYears,
			"入力!G30": equipmentRepairPrice,
			"入力!E31": emptyRoomYears,
			"入力!G31": emptyRoomMonth,
			"入力!E32": originalRestorationYears,
			"入力!G32": originalRestorationPrice,
			"入力!E33": landPropertyPrice,
			"入力!E34": landPropertyPrice1,
			"入力!E35": landPropertyPrice2,
			"入力!E36": landPropertyPrice3,
			"入力!G36": landPropertyPrice4,
			"入力!E37": landPropertyPrice5,
			"入力!E39": sellPrice,
			"入力!G39": sellRate,
			"入力!E40": sellYears,
			"入力!G40": sellRate1,
			"入力!E41": minSellYear,
			"入力!G41": maxSellYear,
			"入力!E43": fixedAssetTaxRate,
			"入力!E44": fixedAssetTaxRate1,
			"入力!E45": fixedAssetTaxRate2,
			"入力!E47": taxEffect,
		};
        try {			
            const response = await fetch(`${API_URL}/simulation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
			if(response.ok) {
				navigate('/display');
			} else {
				alert("入力値を正しく入力してください。");
			}
        } catch (err) {
            alert("サーバーエラー");
        }
	}

	const today = new Date()
	const todayStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`

	useEffect(() => {
		updateInputData()
	}, [])

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
								<input className="input" type='text' value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="氏名" />
							</div>
						</label>
						<label className="field">
							<span className="field-label">年齢</span>
							<div className="input-adorn">
                            <input className="input" type="number" min={0} max={100} value={age || ''} placeholder='0'  onChange={(e) => setAge(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
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
								<input className="input" type='text' placeholder="物件名" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
							</div>
						</label>
						<label className="field">
							<span className="field-label">購入年月</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" value={purchaseY || ''} max={9999} min={1000} placeholder='2025' onChange={(e) => setPurchaseY(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn">年</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" value={purchaseM || ''} max={12} min={1} placeholder='10' onChange={(e) => setPurchaseM(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn">月</span>
								</div>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">物件価格</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={propertyPrice || ''} onChange={(e) => setPropertyPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} placeholder='0' />
								<span className="adorn">円</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">自己資金</span>
							<div className="input-adorn">
								<input
									className="input"
									type="text"
									value={ownPrice || ''}
									max={Number(propertyPrice) + 1 || undefined}
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
								<span className="field-label">{borrowPrice || 0}</span>
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
									value={loanPeriod || ''}
									placeholder='10'
									onChange={(e) => setLoanPeriod(e.target.value === '' ? 10 : parseInt(e.target.value, 10))}
									
								/>
								<span className="adorn">年 (10～45年)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">金利</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={interestRate || ''} placeholder='0.00' onChange={(e) => setInterestRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn">％</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">金利上昇</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={riseIYears || ''} placeholder='0' onChange={(e) => setRiseIYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={riseIRate || ''} placeholder='0.00' onChange={(e) => setRiseIRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">％上昇</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-pc'>
							<span className="field-label">繰上返済</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={earlyRYears || ''} placeholder='0' onChange={(e) => setEarlyRYears(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={earlyRPrice || ''} placeholder='0' onChange={(e) => setEarlyRPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} />
									<span className="adorn note">円</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">金利上昇(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min={1800}
										max={2200}
										value={minRiseIYear || ''}
										onChange={e => setMinRiseIYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
										placeholder="開始年"
										
									/>
									<span className="adorn">～</span>
								</div>
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min={1800}
										max={2200}
										value={maxRiseIYear || ''}
										onChange={e => setMaxRiseIYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
										placeholder="終了年"
										
									/>
									<span className="adorn">年迄</span>
								</div>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className='field hide-input-sp'>
							<span className="field-label">繰上返済</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={earlyRYears || ''} placeholder='0' onChange={(e) => setEarlyRYears(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={earlyRPrice || ''} placeholder='0' onChange={(e) => setEarlyRPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} />
									<span className="adorn note">円</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">繰上返済時の処理</span>
							<div className="input-adorn">
                                <input className="input" type="number" min={0} value={earlyNum || ''} placeholder='0' onChange={(e) => setEarlyNum(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
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
                                <input className="input" type="text" value={rentMonthly || ''} placeholder='0' onChange={(e) => setRentMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消費税込)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">家賃下落率</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={declineRYears || ''} placeholder='0' onChange={(e) => setDeclineRYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={declineRate || ''} placeholder='0.00' onChange={(e) => setDeclineRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">%下落</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-pc'>
							<span className="field-label">家賃変更</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={changeRYears || ''} placeholder='0' onChange={(e) => setChangeRYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={changeRentPrice || ''} placeholder='0' onChange={(e) => setChangeRentPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">円に変更</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">家賃下落率(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min="1800"
										max="2200"
										value={minDeclineRYear || ''}
										onChange={e => setMinDeclineRYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
										placeholder="開始年"
										
									/>
									<span className="adorn">～</span>
								</div>
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min="1800"
										max="2200"
										value={maxDeclineRYear || ''}
										onChange={e => setMaxDeclineRYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
										placeholder="終了年"
										
									/>
									<span className="adorn">年迄</span>
								</div>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className='field hide-input-sp'>
							<span className="field-label">家賃変更</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={changeRYears || ''} placeholder='0' onChange={(e) => setChangeRYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={changeRentPrice || ''} placeholder='0' onChange={(e) => setChangeRentPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">円に変更</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">更新料</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={renewalFeeYears || ''} placeholder='0' onChange={(e) => setRenewalFeeYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={renewalFeePrice || ''} placeholder='0' onChange={(e) => setRenewalFeePrice(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">ヶ月分</span>
								</div>
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
                                <input className="input" type="text" value={manageFeeMonthly || ''} placeholder='0' onChange={(e) => setManageFeeMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消貢税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={repairFundMonthly || ''} placeholder='0' onChange={(e) => setRepairFundMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金(次年度以降)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={nextRepairYears || ''} placeholder='0' onChange={(e) => setNextRepairYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={nextRepairRate || ''} placeholder='0.00' onChange={(e) => setNextRepairRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">％上昇</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-pc'>
							<span className="field-label">集金代行手数料</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={collectFeeMonthly || ''} placeholder='0' onChange={(e) => setCollectFeeMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消貢税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min="1800"
										max="2200"
										value={minCollectFeeYear || ''}
										onChange={e => setMinCollectFeeYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
										placeholder="開始年"
										
									/>
									<span className="adorn">～</span>
								</div>
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min="1800"
										max="2200"
										value={maxCollectFeeYear || ''}
										onChange={e => setMaxCollectFeeYear(e.target.value === '' ? 0 : parseInt(e.target.value, 10))}
										placeholder="終了年"
										
									/>
									<span className="adorn">年迄</span>
									<span className="adorn">(西暦で入力)</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-sp'>
							<span className="field-label">集金代行手数料</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={collectFeeMonthly || ''} placeholder='0' onChange={(e) => setCollectFeeMonthly(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消貢税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">設備補修費用</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={equipmentRepairYears || ''} placeholder='0' onChange={(e) => setEquipmentRepairYears(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input" type="text" value={equipmentRepairPrice || ''} placeholder='0' onChange={(e) => setEquipmentRepairPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} />
									<span className="adorn note">円</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">空室</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={emptyRoomYears || ''} placeholder='0' onChange={(e) => setEmptyRoomYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={emptyRoomMonth || ''} placeholder='0' onChange={(e) => setEmptyRoomMonth(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">ヶ月</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">原状回復費用</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={originalRestorationYears || ''} placeholder='0' onChange={(e) => setOriginalRestorationYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={originalRestorationPrice || ''} placeholder='0' onChange={(e) => setOriginalRestorationPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">円</span>
									<span className="adorn note">(不動産取得税(土地)=31,766円)</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">土地 固定資産評価額</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={landPropertyPrice || ''} placeholder='0' onChange={(e) => setLandPropertyPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
								<span className="adorn note">(不動産取得税(建物)=165,033円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">固定資産課税標準額</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={landPropertyPrice1 || ''} placeholder='0' onChange={(e) => setLandPropertyPrice1(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
								<span className="adorn note">(固定資産税(土地)=4,941円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">都市計画税課税標準額</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={landPropertyPrice2 || ''} placeholder='0' onChange={(e) => setLandPropertyPrice2(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
								<span className="adorn note">(固定資産税(建物)=77,015円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">共用土地持分</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={landPropertyPrice3 || ''} placeholder='0' onChange={(e) => setLandPropertyPrice3(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">/</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={landPropertyPrice4 || ''} placeholder='0' onChange={(e) => setLandPropertyPrice4(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">(都市計画税(土地)=2,117円)</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">建物固定資産課税標準額</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={landPropertyPrice5 || ''} placeholder='0' onChange={(e) => setLandPropertyPrice5(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">円</span>
								<span className="adorn note">(都市計画税(建物)=16,503円)</span>
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
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={sellPrice || ''} placeholder='0' onChange={(e) => setSellPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">円</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={sellRate || ''} placeholder='0' onChange={(e) => setSellRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">% </span>
								</div>
								<span className="adorn note">(金額または売却率を入力)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">売却予想額(次年度以降)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} value={sellYears || ''} placeholder='0' onChange={(e) => setSellYears(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="text" value={sellRate1 || ''} placeholder='0.00' onChange={(e) => setSellRate1(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
									<span className="adorn note">％上昇</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min="1800"
										max="2200"
										value={minSellYear || ''}
										onChange={e => setMinSellYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
										placeholder="開始年"
									/>
									<span className="adorn">年～</span>
								</div>
								<div className='input-adorn'>
									<input
										className="input"
										type="number"
										min="1800"
										max="2200"
										value={maxSellYear || ''}
										onChange={e => setMaxSellYear(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
										placeholder="終了年"
									/>
									<span className="adorn">年迄</span>
									<span className="adorn">(西暦で入力)</span>
								</div>
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
                                <input className="input" type="text" value={fixedAssetTaxRate || ''} placeholder='0.00' onChange={(e) => setFixedAssetTaxRate(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">固定資産税率</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={fixedAssetTaxRate1 || ''} placeholder='0.00' onChange={(e) => setFixedAssetTaxRate1(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
								<span className="adorn note">％</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">都市計画税率</span>
							<div className="input-adorn">
                                <input className="input" type="text" value={fixedAssetTaxRate2 || ''} placeholder='0.00' onChange={(e) => setFixedAssetTaxRate2(e.target.value === '' ? 0 : parseFloat(e.target.value))} />
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
                                <input className="input" type="number" min={0} value={taxEffect || ''} placeholder='0' onChange={(e) => setTaxEffect(e.target.value === '' ? 0 : parseInt(e.target.value, 10))} />
								<span className="adorn note">万円</span>
								<span className="adorn note">(購入時から65歳迄)</span>
							</div>
						</label>
					</div>
				</section>

				<div className="actions">
					<button type="button" className="btn secondary" onClick={() => resetInputData(false)}>リセット</button>
					<button type="submit" className="btn primary">計算へ</button>
				</div>
			</form>
		</div >
	)
}
