import { useState } from 'react';
import { EXC_RATE_USD_TO_KGS } from '../data';
import { Calculator, DollarSign, Wallet, CalendarRange, TrendingUp, Landmark } from 'lucide-react';

interface InvestmentCalculatorProps {
  currentLang: string;
  onApplyFinancing: (calcSummary: string) => void;
}

export default function InvestmentCalculator({ currentLang, onApplyFinancing }: InvestmentCalculatorProps) {
  const [propertyPriceUSD, setPropertyPriceUSD] = useState<number>(350000);
  const [currency, setCurrency] = useState<'USD' | 'KGS'>('USD');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [durationMonths, setDurationMonths] = useState<number>(24);
  const [financingType, setFinancingType] = useState<'Direct' | 'Bank'>('Direct');

  const exchangeRate = EXC_RATE_USD_TO_KGS;

  const currentPrice = currency === 'USD' ? propertyPriceUSD : Math.round(propertyPriceUSD * exchangeRate);
  
  // Down payment calculation
  const downPaymentAmount = Math.round((currentPrice * downPaymentPercent) / 100);
  
  // Remaining balance
  const remainingBalance = currentPrice - downPaymentAmount;

  // Yearly interest rates
  const interestRate = financingType === 'Direct' ? 0 : currency === 'USD' ? 9.5 : 15.5;

  // Monthly payment calculation using standard formula: P * (r*(1+r)^n) / ((1+r)^n - 1)
  const getMonthlyPayment = () => {
    if (interestRate === 0) {
      return Math.round(remainingBalance / durationMonths);
    }
    const r = (interestRate / 100) / 12; // monthly rate
    const n = durationMonths; // term in months
    const monthly = (remainingBalance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(monthly);
  };

  const monthlyPayment = getMonthlyPayment();

  // Total paid interest & total cost
  const totalPaid = monthlyPayment * durationMonths + downPaymentAmount;
  const totalInterestPaid = totalPaid - currentPrice;

  const formatValue = (val: number) => {
    if (currency === 'KGS') {
      return `${val.toLocaleString()} KGS`;
    }
    return `$${val.toLocaleString()} USD`;
  };

  const handleApply = () => {
    const summary = `${financingType === 'Direct' ? 'Direct Interest-Free' : 'Bank Mortgage'} plan: Property Value ${formatValue(currentPrice)}, Down Payment ${downPaymentPercent}% (${formatValue(downPaymentAmount)}), Period ${durationMonths} months, Monthly Payment: ${formatValue(monthlyPayment)}`;
    onApplyFinancing(summary);
  };

  const translations = {
    title: { EN: 'OBA Private Capital Planner', RU: 'Финансовый Планировщик OBA', KG: 'Инвестициялык Эсептегич' },
    subtitle: {
      EN: 'Plan your bespoke investment or interest-free installments tailored to your liquidity.',
      RU: 'Расчет беспроцентной рассрочки от застройщика или выгодной ипотеки.',
      KG: 'Ыңгайлуу пайызсыз бөлүп төлөө же ипотека шарттарын эсептеп алыңыз.'
    },
    priceLabel: { EN: 'Property Value', RU: 'Стоимость недвижимости', KG: 'Мүлктүн баасы' },
    downPayment: { EN: 'Down Payment', RU: 'Первоначальный взнос', KG: 'Алгачкы төлөм' },
    duration: { EN: 'Installment Period', RU: 'Срок рассрочки / ипотеки', KG: 'Төлөө мөөнөтү' },
    months: { EN: 'months', RU: 'мес.', KG: 'ай' },
    scheme: { EN: 'Financing Model', RU: 'Схема финансирования', KG: 'Төлөм схемасы' },
    directTitle: { EN: 'OBA Interest-Free', RU: 'OBA Беспроцентно', KG: 'OBA Пайызсыз' },
    directDesc: { EN: '0% interest direct payment plan over construction period.', RU: 'Рассрочка 0% напрямую от OBA во время строительства.', KG: 'Курулуш учурунда 0% бөлүп төлөө планы.' },
    bankTitle: { EN: 'Partner Bank Mortgage', RU: 'Ипотека от Банка-Партнера', KG: 'Банк аркылуу ипотека' },
    bankDesc: { EN: 'Extended terms up to 5 years via elite banks in Kyrgyzstan.', RU: 'Долгосрочная ипотека через крупные банки КР.', KG: 'Ири банктар аркылуу узак мөөнөттүү ипотека.' },
    summary: { EN: 'Financial Summary', RU: 'Расчетный Лист', KG: 'Жыйынтык баракчасы' },
    monthly: { EN: 'Monthly Installment', RU: 'Ежемесячный платеж', KG: 'Ай сайын төлөм' },
    remaining: { EN: 'Remaining Balance', RU: 'Остаток к оплате', KG: 'Калган суммасы' },
    totalInterest: { EN: 'Accumulated Interest', RU: 'Начисленные проценты', KG: 'Пайыздык кошумча' },
    applyBtn: { EN: 'Apply for Personal Investment Plan', RU: 'Получить индивидуальный график платежей', KG: 'Индивидуалдык график алуу' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <section id="calculator" className="py-24 bg-[#0D0D0D] text-white border-t border-white/5 relative overflow-hidden">
      {/* Dynamic graphic glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div id="calculator-header" className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>Investment Engine v1.4</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
            {getTranslation('title')}
          </h2>
          <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed opacity-80">
            {getTranslation('subtitle')}
          </p>
        </div>

        {/* Calculator layout grid */}
        <div id="calculator-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Inputs Section */}
          <div id="calculator-inputs" className="lg:col-span-7 bg-[#121212]/35 p-8 rounded-3xl border border-white/5 space-y-8">
            
            {/* Currency Selector & Quick Presets Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">Configure Liquidity</span>
              <div className="flex bg-[#1a1a1a] p-1 rounded-none border border-white/10">
                <button
                  id="currency-usd-btn"
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-none text-xs font-mono font-bold transition-all cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-brand text-neutral-950 shadow'
                      : 'text-neutral-400 hover:text-white bg-transparent'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  id="currency-kgs-btn"
                  onClick={() => setCurrency('KGS')}
                  className={`px-4 py-2 rounded-none text-xs font-mono font-bold transition-all cursor-pointer ${
                    currency === 'KGS'
                      ? 'bg-brand text-neutral-950 shadow'
                      : 'text-neutral-400 hover:text-white bg-transparent'
                  }`}
                >
                  KGS (с)
                </button>
              </div>
            </div>

            {/* Slider 1: Property Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase text-neutral-400 font-semibold">{getTranslation('priceLabel')}</span>
                <span className="font-serif italic font-light text-xl text-brand">
                  {formatValue(currentPrice)}
                </span>
              </div>
              <input
                id="property-price-range"
                type="range"
                min={150000}
                max={1200000}
                step={10000}
                value={propertyPriceUSD}
                onChange={(e) => setPropertyPriceUSD(Number(e.target.value))}
                className="w-full accent-brand bg-black h-2 rounded-none cursor-pointer border border-white/10"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>{formatValue(currency === 'USD' ? 150000 : Math.round(150000 * exchangeRate))}</span>
                <span>{formatValue(currency === 'USD' ? 1200000 : Math.round(1200000 * exchangeRate))}</span>
              </div>
            </div>

            {/* Slider 2: Down Payment */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                  {getTranslation('downPayment')} ({downPaymentPercent}%)
                </span>
                <span className="font-serif italic font-light text-xl text-brand">
                  {formatValue(downPaymentAmount)}
                </span>
              </div>
              <input
                id="down-payment-range"
                type="range"
                min={20}
                max={100}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-brand bg-black h-2 rounded-none cursor-pointer border border-white/10"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>20%</span>
                <span>100% (Full payment discount)</span>
              </div>
            </div>

            {/* Slider 3: Term */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                  {getTranslation('duration')}
                </span>
                <span className="font-serif italic font-light text-xl text-brand">
                  {durationMonths} {getTranslation('months')}
                </span>
              </div>
              <input
                id="duration-months-range"
                type="range"
                min={12}
                max={60}
                step={6}
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full accent-brand bg-black h-2 rounded-none cursor-pointer border border-white/10"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>12 {getTranslation('months')} (1 Year)</span>
                <span>60 {getTranslation('months')} (5 Years)</span>
              </div>
            </div>

            {/* Financing Scheme Selector */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-neutral-400 font-semibold block">{getTranslation('scheme')}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* OBA Direct */}
                <button
                  id="scheme-direct-btn"
                  onClick={() => setFinancingType('Direct')}
                  className={`p-5 rounded-none border text-left transition-all cursor-pointer relative overflow-hidden ${
                    financingType === 'Direct'
                      ? 'bg-brand/10 border-brand text-white'
                      : 'bg-black/20 border-white/5 hover:border-brand/40 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className={`w-5 h-5 ${financingType === 'Direct' ? 'text-brand' : 'text-neutral-500'}`} />
                    <span className="font-serif italic font-light text-sm">{getTranslation('directTitle')}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed opacity-80">{getTranslation('directDesc')}</p>
                  <div className="absolute top-3 right-3 flex items-center gap-1 font-mono text-[9px] bg-brand text-black font-bold px-2 py-0.5 rounded-none">
                    0% APR
                  </div>
                </button>

                {/* Partner Bank */}
                <button
                  id="scheme-bank-btn"
                  onClick={() => setFinancingType('Bank')}
                  className={`p-5 rounded-none border text-left transition-all cursor-pointer relative ${
                    financingType === 'Bank'
                      ? 'bg-brand/10 border-brand text-white'
                      : 'bg-black/20 border-white/5 hover:border-brand/40 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Landmark className={`w-5 h-5 ${financingType === 'Bank' ? 'text-brand' : 'text-neutral-500'}`} />
                    <span className="font-serif italic font-light text-sm">{getTranslation('bankTitle')}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed opacity-80">{getTranslation('bankDesc')}</p>
                  <div className="absolute top-3 right-3 font-mono text-[9px] bg-white/10 text-neutral-300 px-2 py-0.5 rounded-none border border-white/10">
                    {interestRate}% APR
                  </div>
                </button>

              </div>
            </div>

          </div>

          {/* Outputs / Live Summary Sheet */}
          <div id="calculator-outputs-sheet" className="lg:col-span-5 space-y-8">
            <div className="bg-[#121212]/30 border border-white/5 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-brand/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-[10px] uppercase font-mono tracking-widest text-brand font-bold pb-3 border-b border-white/5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{getTranslation('summary')}</span>
              </h3>

              {/* Monthly payment massive display */}
              <div className="space-y-1 py-2">
                <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest">{getTranslation('monthly')}</p>
                <p className="text-4xl sm:text-5xl font-serif italic font-light text-brand tracking-tight leading-none">
                  {formatValue(monthlyPayment)}
                </p>
                <p className="text-[9px] text-neutral-500 font-mono tracking-wider uppercase mt-1">
                  for the next {durationMonths} consecutive months
                </p>
              </div>

              {/* Breakdowns */}
              <div className="space-y-4 pt-4 border-t border-white/5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">{getTranslation('downPayment')} ({downPaymentPercent}%)</span>
                  <span className="text-white font-bold">{formatValue(downPaymentAmount)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">{getTranslation('remaining')}</span>
                  <span className="text-white font-bold">{formatValue(remainingBalance)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">{getTranslation('totalInterest')}</span>
                  <span className="text-white font-bold">
                    {interestRate === 0 ? '0% (Interest-Free)' : formatValue(totalInterestPaid)}
                  </span>
                </div>
              </div>

              {/* Premium Perks Callout inside Outputs */}
              {financingType === 'Direct' && (
                <div className="p-4 bg-brand/5 rounded-none border border-brand/10 text-[11px] text-brand leading-relaxed font-sans font-light">
                  <p className="font-semibold mb-1">✓ Exclusive OBA Developer Advantage</p>
                  No bank approval required. No mortgage registration fees. Secured directly by the real estate asset with 0% extra commissions.
                </div>
              )}

              {/* Apply CTA */}
              <button
                id="apply-financing-btn"
                onClick={handleApply}
                className="w-full bg-brand hover:bg-white text-black font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-brand/10 cursor-pointer text-center block"
              >
                {getTranslation('applyBtn')}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
