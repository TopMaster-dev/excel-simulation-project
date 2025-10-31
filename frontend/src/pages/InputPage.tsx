import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:5000/api';
const excelToFormKeys = {
	"入力!E4": 'customerName',
	"入力!E5": 'age',
	"入力!E7": 'propertyName',
	"入力!E8": 'purchaseY',
	"入力!G8": 'purchaseM',
	"入力!E9": 'propertyPrice',
	"入力!E10": 'ownPrice',
	"入力!E12": 'borrowPrice',
	"入力!E13": 'loanPeriod',
	"入力!E14": 'interestRate',
	"入力!E15": 'riseIYears',
	"入力!G15": 'riseIRate',
	"入力!E17": 'earlyRYears',
	"入力!G17": 'earlyRPrice',
	"入力!E16": 'minRiseIYear',
	"入力!G16": 'maxRiseIYear',
	"入力!E18": 'earlyNum',
	"入力!E20": 'rentMonthly',
	"入力!E21": 'declineRYears',
	"入力!G21": 'declineRate',
	"入力!E22": 'minDeclineRYear',
	"入力!G22": 'maxDeclineRYear',
	"入力!E23": 'changeRYears',
	"入力!G23": 'changeRentPrice',
	"入力!E24": 'renewalFeeYears',
	"入力!G24": 'renewalFeePrice',
	"入力!E25": 'manageFeeMonthly',
	"入力!E26": 'repairFundMonthly',
	"入力!E27": 'nextRepairYears',
	"入力!G27": 'nextRepairRate',
	"入力!E29": 'collectFeeMonthly',
	"入力!E28": 'minCollectFeeYear',
	"入力!G28": 'maxCollectFeeYear',
	"入力!E30": 'equipmentRepairYears',
	"入力!G30": 'equipmentRepairPrice',
	"入力!E31": 'emptyRoomYears',
	"入力!G31": 'emptyRoomMonth',
	"入力!E32": 'originalRestorationYears',
	"入力!G32": 'originalRestorationPrice',
	"入力!E33": 'landPropertyPrice',
	"入力!E34": 'landPropertyPrice1',
	"入力!E35": 'landPropertyPrice2',
	"入力!E36": 'landPropertyPrice3',
	"入力!G36": 'landPropertyPrice4',
	"入力!E37": 'landPropertyPrice5',
	"入力!E39": 'sellPrice',
	"入力!G39": 'sellRate',
	"入力!E40": 'sellYears',
	"入力!G40": 'sellRate1',
	"入力!E41": 'minSellYear',
	"入力!G41": 'maxSellYear',
	"入力!E43": 'fixedAssetTaxRate',
	"入力!E44": 'fixedAssetTaxRate1',
	"入力!E45": 'fixedAssetTaxRate2',
	"入力!E47": 'taxEffect',
}
const initFormData = {
	customerName: '',
	age: '',
	propertyName: '',
	purchaseY: '',
	purchaseM: '',
	propertyPrice: '',
	ownPrice: '',
	borrowPrice: '',
	loanPeriod: '',
	interestRate: '',
	riseIYears: '',
	riseIRate: '',
	earlyRYears: '',
	earlyRPrice: '',
	minRiseIYear: '',
	maxRiseIYear: '',
	earlyNum: '',
	rentMonthly: '',
	declineRYears: '',
	declineRate: '',
	minDeclineRYear: '',
	maxDeclineRYear: '',
	changeRYears: '',
	changeRentPrice: '',
	renewalFeeYears: '',
	renewalFeePrice: '',
	manageFeeMonthly: '',
	repairFundMonthly: '',
	nextRepairYears: '',
	nextRepairRate: '',
	collectFeeMonthly: '',
	minCollectFeeYear: '',
	maxCollectFeeYear: '',
	equipmentRepairYears: '',
	equipmentRepairPrice: '',
	emptyRoomYears: '',
	emptyRoomMonth: '',
	originalRestorationYears: '',
	originalRestorationPrice: '',
	landPropertyPrice: '',
	landPropertyPrice1: '',
	landPropertyPrice2: '',
	landPropertyPrice3: '',
	landPropertyPrice4: '',
	landPropertyPrice5: '',
	sellPrice: '',
	sellRate: '',
	sellYears: '',
	sellRate1: '',
	minSellYear: '',
	maxSellYear: '',
	fixedAssetTaxRate: '',
	fixedAssetTaxRate1: '',
	fixedAssetTaxRate2: '',
	taxEffect: '',
}
export default function InputPage() {
	const [formData, setFormData] = useState(initFormData);
	const navigate = useNavigate()
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value, // auto-convert to number if possible
		}));
	};
	const newFormData = { ...formData }; // copy existing state
	const resetInputData = async (data: any) => {
		if (data) {
			for (const [excelKey, formKey] of Object.entries(excelToFormKeys)) {
				newFormData[formKey as keyof typeof newFormData] = data[excelKey] ?? ''; // default to empty string
			}
			setFormData(newFormData);
		} else {
			setFormData(initFormData);
			try {
				const response = await fetch(`${API_URL}/reset`, {
					method: 'get',
					headers: { 'Content-Type': 'application/json' },
				});
				if (response.ok) {
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
		setFormData(prev => ({
			...prev,
			borrowPrice: String(Number(prev.propertyPrice || 0) - Number(prev.ownPrice || 0)),
		}));
	}, [formData.propertyPrice, formData.ownPrice]);

	const updateInputData = async () => {
		try {
			const response = await fetch(`${API_URL}/simulation`, {
				method: 'get',
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				const data = await response.json()
				if (data.ok === true) {
					resetInputData(data.result)
				} else {
					alert("入力値を正しく入力してください。");
				}
			} else {
				alert("入力値を正しく入力してください。");
			}
		} catch (err) {
			console.log(err);
		}
	}

	const goDisplay = async (e: React.FormEvent) => {
		e.preventDefault()
		const safeNum = (value: any) => (value === "" || value == null ? 0 : value);
		const data = {};
		for (const [excelKey, formKey] of Object.entries(excelToFormKeys)) {
			(data as Record<string, any>)[excelKey] = safeNum(formData[formKey as keyof typeof formData]);
		}
		try {
			const response = await fetch(`${API_URL}/simulation`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
			if (response.ok) {
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
								<input className="input" type='text' name='customerName' value={formData.customerName as string} onChange={handleChange} placeholder="氏名" required/>
							</div>
						</label>
						<label className="field">
							<span className="field-label">年齢</span>
							<div className="input-adorn">
								<input className="input" type="number" min={0} max={100} name='age' value={formData.age} onChange={handleChange} placeholder='0' required/>
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
								<input className="input" type='text' name='propertyName' value={formData.propertyName as string} onChange={handleChange} placeholder="物件名" required/>
							</div>
						</label>
						<label className="field">
							<span className="field-label">購入年月</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='purchaseY' value={formData.purchaseY} max={9999} min={0} placeholder='2025' onChange={handleChange} required/>
									<span className="adorn">年</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='purchaseM' value={formData.purchaseM} max={12} min={1} placeholder='10' onChange={handleChange} required/>
									<span className="adorn">月</span>
								</div>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">物件価格</span>
							<div className="input-adorn">
								<input className="input" type="number" name='propertyPrice' value={formData.propertyPrice} onChange={handleChange} placeholder='0' required />
								<span className="adorn">円</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">自己資金</span>
							<div className="input-adorn">
								<input className="input" type="number" name='ownPrice' value={formData.ownPrice} onChange={handleChange} max={Number(formData.propertyPrice) + 1 || undefined} placeholder='0' required />
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
								<span className="field-label">{formData.borrowPrice || 0}</span>
								<span className="adorn">円</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">借入期間</span>
							<div className="input-adorn">
								<input className="input" type="number" min={10} max={45} name='loanPeriod' value={formData.loanPeriod} onChange={handleChange} placeholder='0' />
								<span className="adorn">年 (10～45年)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">金利</span>
							<div className="input-adorn">
								<input className="input" type="number" name='interestRate' value={formData.interestRate} onChange={handleChange} placeholder='0.00' />
								<span className="adorn">％</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">金利上昇</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='riseIYears' value={formData.riseIYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='riseIRate' value={formData.riseIRate} onChange={handleChange} placeholder='0.00' />
									<span className="adorn note">％上昇</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-pc'>
							<span className="field-label">繰上返済</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='earlyRYears' value={formData.earlyRYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='earlyRPrice' value={formData.earlyRPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">金利上昇(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='minRiseIYear' value={formData.minRiseIYear} onChange={handleChange} placeholder="開始年" />
									<span className="adorn">～</span>
								</div>
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='maxRiseIYear' value={formData.maxRiseIYear} onChange={handleChange} placeholder="終了年" />
									<span className="adorn">年迄</span>
								</div>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className='field hide-input-sp'>
							<span className="field-label">繰上返済</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='earlyRYears' value={formData.earlyRYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='earlyRPrice' value={formData.earlyRPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">繰上返済時の処理</span>
							<div className="input-adorn">
								<input className="input" type="number" min={0} name='earlyNum' value={formData.earlyNum} onChange={handleChange} placeholder='0' />
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
								<input className="input" type="number" name='rentMonthly' value={formData.rentMonthly} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消費税込)</span>
							</div>
						</label>
						<label className="field">
							<span className="field-label">家賃下落率</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='declineRYears' value={formData.declineRYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='declineRate' value={formData.declineRate} onChange={handleChange} placeholder='0.00' />
									<span className="adorn note">%下落</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-pc'>
							<span className="field-label">家賃変更</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='changeRYears' value={formData.changeRYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='changeRentPrice' value={formData.changeRentPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円に変更</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">家賃下落率(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='minDeclineRYear' value={formData.minDeclineRYear} onChange={handleChange} placeholder="開始年" />
									<span className="adorn">～</span>
								</div>
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='maxDeclineRYear' value={formData.maxDeclineRYear} onChange={handleChange} placeholder="終了年" />
									<span className="adorn">年迄</span>
								</div>
								<span className="adorn">(西暦で入力)</span>
							</div>
						</label>
						<label className='field hide-input-sp'>
							<span className="field-label">家賃変更</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='changeRYears' value={formData.changeRYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='changeRentPrice' value={formData.changeRentPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円に変更</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">更新料</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='renewalFeeYears' value={formData.renewalFeeYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='renewalFeePrice' value={formData.renewalFeePrice} onChange={handleChange} placeholder='0' />
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
								<input className="input" type="number" name='manageFeeMonthly' value={formData.manageFeeMonthly} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消貢税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金</span>
							<div className="input-adorn">
								<input className="input" type="number" name='repairFundMonthly' value={formData.repairFundMonthly} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円/月</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金(次年度以降)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='nextRepairYears' value={formData.nextRepairYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='nextRepairRate' value={formData.nextRepairRate} onChange={handleChange} placeholder='0.00' />
									<span className="adorn note">％上昇</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-pc'>
							<span className="field-label">集金代行手数料</span>
							<div className="input-adorn">
								<input className="input" type="number" name='collectFeeMonthly' value={formData.collectFeeMonthly} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消貢税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">修繕積立金(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='minCollectFeeYear' value={formData.minCollectFeeYear} onChange={handleChange} placeholder="開始年" />
									<span className="adorn">～</span>
								</div>
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='maxCollectFeeYear' value={formData.maxCollectFeeYear} onChange={handleChange} placeholder="終了年" />
									<span className="adorn">年迄</span>
									<span className="adorn">(西暦で入力)</span>
								</div>
							</div>
						</label>
						<label className='field hide-input-sp'>
							<span className="field-label">集金代行手数料</span>
							<div className="input-adorn">
								<input className="input" type="number" name='collectFeeMonthly' value={formData.collectFeeMonthly} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円/月</span>
								<span className="adorn note">(消貢税込)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">設備補修費用</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='equipmentRepairYears' value={formData.equipmentRepairYears as string} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input" type="number" name='equipmentRepairPrice' value={formData.equipmentRepairPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">空室</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='emptyRoomYears' value={formData.emptyRoomYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='emptyRoomMonth' value={formData.emptyRoomMonth} onChange={handleChange} placeholder='0' />
									<span className="adorn note">ヶ月</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">原状回復費用</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='originalRestorationYears' value={formData.originalRestorationYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='originalRestorationPrice' value={formData.originalRestorationPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円</span>
									<span className="adorn note">(不動産取得税(土地)=31,766円)</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">土地 固定資産評価額</span>
							<div className="input-adorn">
								<input className="input" type="number" name='landPropertyPrice' value={formData.landPropertyPrice} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円</span>
								<span className="adorn note">(不動産取得税(建物)=165,033円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">固定資産課税標準額</span>
							<div className="input-adorn">
								<input className="input" type="number" name='landPropertyPrice1' value={formData.landPropertyPrice1} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円</span>
								<span className="adorn note">(固定資産税(土地)=4,941円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">都市計画税課税標準額</span>
							<div className="input-adorn">
								<input className="input" type="number" name='landPropertyPrice2' value={formData.landPropertyPrice2} onChange={handleChange} placeholder='0' />
								<span className="adorn note">円</span>
								<span className="adorn note">(固定資産税(建物)=77,015円)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">共用土地持分</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='landPropertyPrice3' value={formData.landPropertyPrice3} onChange={handleChange} placeholder='0' />
									<span className="adorn note">/</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='landPropertyPrice4' value={formData.landPropertyPrice4} onChange={handleChange} placeholder='0' />
									<span className="adorn note">(都市計画税(土地)=2,117円)</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">建物固定資産課税標準額</span>
							<div className="input-adorn">
								<input className="input" type="number" name='landPropertyPrice5' value={formData.landPropertyPrice5} onChange={handleChange} placeholder='0' />
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
									<input className="input input-number" type="number" name='sellPrice' value={formData.sellPrice} onChange={handleChange} placeholder='0' />
									<span className="adorn note">円</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='sellRate' value={formData.sellRate} onChange={handleChange} placeholder='0' />
									<span className="adorn note">% </span>
								</div>
								<span className="adorn note">(金額または売却率を入力)</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">売却予想額(次年度以降)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input input-number" type="number" min={0} name='sellYears' value={formData.sellYears} onChange={handleChange} placeholder='0' />
									<span className="adorn note">年毎に</span>
								</div>
								<div className='input-adorn'>
									<input className="input input-number" type="number" name='sellRate1' value={formData.sellRate1} onChange={handleChange} placeholder='0.00' />
									<span className="adorn note">％上昇</span>
								</div>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">(対象期間)</span>
							<div className="input-adorn">
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='minSellYear' value={formData.minSellYear} onChange={handleChange} placeholder="開始年" />
									<span className="adorn">年～</span>
								</div>
								<div className='input-adorn'>
									<input className="input" type="number" min={0} max={5000} name='maxSellYear' value={formData.maxSellYear} onChange={handleChange} placeholder="終了年" />
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
								<input className="input" type="number" name='fixedAssetTaxRate' value={formData.fixedAssetTaxRate} onChange={handleChange} placeholder='0.00' />
								<span className="adorn note">％</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">固定資産税率</span>
							<div className="input-adorn">
								<input className="input" type="number" name='fixedAssetTaxRate1' value={formData.fixedAssetTaxRate1} onChange={handleChange} placeholder='0.00' />
								<span className="adorn note">％</span>
							</div>
						</label>
						<label className='field'>
							<span className="field-label">都市計画税率</span>
							<div className="input-adorn">
								<input className="input" type="number" name='fixedAssetTaxRate2' value={formData.fixedAssetTaxRate2} onChange={handleChange} placeholder='0.00' />
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
								<input className="input" type="number" min={0} name='taxEffect' value={formData.taxEffect} onChange={handleChange} placeholder='0' />
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
