import { residentialComplexes, EXC_RATE_USD_TO_KGS } from '../data';
import { Award, ShieldCheck, MapPin, Building, Globe, Phone, Mail, FileText, Compass, Heart } from 'lucide-react';

export default function PrintBrochure() {
  return (
    <div
      id="print-brochure-container"
      className="hidden print:block w-full text-white bg-[#0D0D0D] font-sans relative"
      style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
    >
      {/* PAGE 1: COVER PAGE */}
      <section className="pdf-page relative flex flex-col justify-between p-16 min-h-screen border-8 border-brand/20 bg-[#0A0A0A] overflow-hidden page-break-after-always">
        {/* Background Decorative Circles */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full border border-brand/5 pointer-events-none" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full border border-brand/5 pointer-events-none" />

        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-brand flex items-center justify-center bg-brand/5">
              <span className="font-serif italic text-xl text-brand font-bold">O</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-white">OBA</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-brand font-mono">INVESTMENT BISHKEK</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Official Investor Deck</span>
            <p className="text-[9px] text-neutral-500 font-mono mt-0.5">EST. 2014 • KYRGYZ REPUBLIC</p>
          </div>
        </div>

        {/* Center Title Block */}
        <div className="my-auto space-y-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/30 text-brand px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest">
            <Award className="w-4 h-4 text-brand" />
            <span>Premium Property & Development Portfolio</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-serif italic text-white tracking-tight leading-none font-bold">
            Redefining <br/>
            <span className="text-brand not-italic font-normal">Luxury & Seismic Safety</span> <br/>
            in Bishkek
          </h1>
          
          <div className="w-24 h-[2px] bg-brand"></div>
          
          <p className="text-neutral-300 text-sm font-light leading-relaxed max-w-xl">
            A prestigious curated catalog of premium residential complexes, luxury foothills estates, and high-performance master-planned smart communities. Powered by swiss-grade engineering, 9-grade earthquake structural resistance, and world-class luxury finishes.
          </p>
        </div>

        {/* Bottom Metadata & Contact */}
        <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 mt-auto">
          <div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Headquarters</span>
            <p className="text-xs text-neutral-300 font-medium mt-1">Toktonaliev / Southern Magistral Sector</p>
            <p className="text-[10px] text-neutral-500 font-sans">Bishkek, Kyrgyz Republic</p>
          </div>
          <div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Client Service Desk</span>
            <p className="text-xs text-brand font-mono font-medium mt-1">+996 (555) 00-22-22</p>
            <p className="text-[10px] text-neutral-500 font-sans">wa.me/996555002222</p>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Digital Platform</span>
            <p className="text-xs text-neutral-300 font-medium mt-1">obainvestment.kg</p>
            <p className="text-[10px] text-neutral-500 font-sans">info@obainvestment.kg</p>
          </div>
        </div>
      </section>

      {/* PAGE 2: ENGINEERING EXCELLENCE & HIGH STANDARDS */}
      <section className="pdf-page relative flex flex-col justify-between p-16 min-h-screen border-8 border-brand/10 bg-[#0D0D0D] page-break-after-always">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-brand">Section I</p>
              <h2 className="text-3xl font-serif italic font-bold">Engineering & Safety Standards</h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">Page 2</span>
          </div>

          {/* Standards Grid */}
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="bg-[#121212] p-6 border border-white/5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">9-Grade Seismic Core</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Every building structure utilizes high-grade heavy monolithic concrete blocks and active steel reinforcement framing compliant with highest seismicity safety parameters. Rigid testing and premium structural density ensures complete safety against 9-grade tectonic incidents.
              </p>
            </div>

            <div className="bg-[#121212] p-6 border border-white/5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">Sary-Tash Travertine Facades</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Our facade selections fuse timeless cultural heritage with premium longevity. Using natural Kyrgyz Sary-Tash limestone, Brazilian structural granite, and pristine white Italian marble, which look highly striking and deliver advanced double-layer thermal preservation.
              </p>
            </div>

            <div className="bg-[#121212] p-6 border border-white/5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">Pure Mountain Airflow Microclimate</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Specially calculated heights and window ventilation channels capture mountain winds descending directly from the Ala-Archa glaciers. This natural mountain airflow, paired with premium smart filtration, guarantees ultra-clean air for our residents.
              </p>
            </div>

            <div className="bg-[#121212] p-6 border border-white/5 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-white">White-Glove VIP Service</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Enjoy complete peace of mind with 24/7 dedicated professional concierges, secure underground garages with automated fast-charging electric vehicle hubs, and ultra-secure biometric restricted gateways surrounding landscaped private parks.
              </p>
            </div>
          </div>

          {/* Key Achievements Statistics */}
          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6 grid grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-serif font-bold text-brand">180,000+</p>
              <p className="text-[10px] uppercase text-neutral-400 font-mono mt-1 tracking-wider">Sqm Delivered Area</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-brand">100%</p>
              <p className="text-[10px] uppercase text-neutral-400 font-mono mt-1 tracking-wider">Monolithic Integrity</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-brand">12+ Years</p>
              <p className="text-[10px] uppercase text-neutral-400 font-mono mt-1 tracking-wider">Market Authority</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-brand">1,250+</p>
              <p className="text-[10px] uppercase text-neutral-400 font-mono mt-1 tracking-wider">Elite Families Served</p>
            </div>
          </div>
        </div>

        {/* Footer Page Number */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-[0.2em]">OBA Investment Bishkek • Confidential Investor Document</p>
        </div>
      </section>

      {/* PAGE 3: THE PREMIUM PORTFOLIO */}
      <section className="pdf-page relative flex flex-col justify-between p-16 min-h-screen border-8 border-brand/10 bg-[#0A0A0A] page-break-after-always">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-brand">Section II</p>
              <h2 className="text-3xl font-serif italic font-bold">Curated Flagship Catalog</h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">Page 3</span>
          </div>

          {/* Property List */}
          <div className="space-y-6">
            {residentialComplexes.map((complex) => {
              const priceKGS = complex.priceMinUSD * EXC_RATE_USD_TO_KGS;
              return (
                <div key={complex.id} className="border-b border-white/5 pb-5 last:border-0 last:pb-0 flex gap-6 items-start">
                  {/* Left Column - Meta & Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-serif font-bold text-white">{complex.name}</h3>
                      <span className="text-[9px] font-mono uppercase bg-brand/15 text-brand border border-brand/20 px-2 py-0.5 rounded-md">
                        {complex.completionDate}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-brand font-light italic tracking-wide">{complex.tagline}</p>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">{complex.description}</p>
                    
                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {complex.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[8px] font-mono bg-white/5 text-neutral-300 px-2 py-0.5 rounded border border-white/10">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Specs & Price */}
                  <div className="w-64 text-right space-y-2 bg-[#121212] p-4 border border-white/5 rounded-xl">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-mono">Location</span>
                      <p className="text-[10px] font-medium text-neutral-200 mt-0.5 truncate">{complex.address}</p>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-mono">Ceiling Height / Floors</span>
                      <p className="text-[10px] font-semibold text-white mt-0.5">
                        {complex.specs.ceilingHeight}m • {complex.specs.floors} Floors
                      </p>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-mono">Starting Price</span>
                      <p className="text-xs font-mono text-brand font-bold mt-0.5">
                        ${complex.priceMinUSD.toLocaleString()} USD
                      </p>
                      <p className="text-[9px] text-neutral-500 font-mono">
                        ≈ {Math.round(priceKGS / 1000).toLocaleString()}K KGS
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Page Number */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-[0.2em]">OBA Investment Bishkek • Curated Premium Catalog</p>
        </div>
      </section>

      {/* PAGE 4: INVESTMENT MODEL & CONTACT INFORMATION */}
      <section className="pdf-page relative flex flex-col justify-between p-16 min-h-screen border-8 border-brand/20 bg-[#0D0D0D]">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-brand">Section III</p>
              <h2 className="text-3xl font-serif italic font-bold">Investment Parameters & VIP Concierge</h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">Page 4</span>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Investment Yields */}
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-white border-b border-white/10 pb-2">Yield Analysis & Returns</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Premium real estate in Bishkek's prestigious Southern Magistral and foothills zones yields an average of <strong className="text-brand">10% - 14% annual ROI</strong> in long-term lease capital appreciation and executive lettings.
              </p>
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs border-b border-white/5 pb-1.5">
                  <span className="text-neutral-400">Capital Appreciation Rate</span>
                  <span className="text-white font-mono font-medium">+15% to 22% annually</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-1.5">
                  <span className="text-neutral-400">Average Monthly Lease Yield</span>
                  <span className="text-white font-mono font-medium">$1,500 - $3,500 USD</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-1.5">
                  <span className="text-neutral-400">Interest-Free Company Financing</span>
                  <span className="text-brand font-mono font-medium">Up to 36 Months</span>
                </div>
              </div>
            </div>

            {/* Downpayment Schedules */}
            <div className="space-y-4">
              <h3 className="text-base font-serif font-bold text-white border-b border-white/10 pb-2">Flexible Installment Options</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Direct in-house financing with zero interest rates allows flexible downpayments with the remaining balance spread evenly across construction cycles.
              </p>
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs border-b border-white/5 pb-1.5">
                  <span className="text-neutral-400">Bronze Entrance Schedule</span>
                  <span className="text-white font-mono font-medium">30% Down • 36m installment</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-1.5">
                  <span className="text-neutral-400">Silver Executive Schedule</span>
                  <span className="text-white font-mono font-medium">50% Down • 24m installment</span>
                </div>
                <div className="flex justify-between text-xs border-b border-white/5 pb-1.5">
                  <span className="text-neutral-400">Gold Absolute Schedule</span>
                  <span className="text-brand font-mono font-medium">100% Down • VIP Discount Offered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Block */}
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-8 space-y-6">
            <h3 className="text-lg font-serif font-bold text-center text-white">Arrange a Private Guided Viewing Tour</h3>
            <p className="text-xs text-center text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
              Our dedicated premium real estate advisors will arrange a bespoke guided viewing of our model apartments, active construction frameworks, and scenic foothills panoramas.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 text-center border-t border-white/5">
              <div className="space-y-1">
                <div className="mx-auto w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Phone className="w-4 h-4" />
                </div>
                <p className="text-xs font-mono font-bold text-white">+996 (555) 00-22-22</p>
                <p className="text-[10px] text-neutral-500 font-mono">WhatsApp Hotline 24/7</p>
              </div>

              <div className="space-y-1">
                <div className="mx-auto w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-xs font-mono font-bold text-white">info@obainvestment.kg</p>
                <p className="text-[10px] text-neutral-500 font-mono">Primary Corporate Inbox</p>
              </div>

              <div className="space-y-1">
                <div className="mx-auto w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Globe className="w-4 h-4" />
                </div>
                <p className="text-xs font-mono font-bold text-white">obainvestment.kg</p>
                <p className="text-[10px] text-neutral-500 font-mono">Bishkek, Kyrgyz Republic</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Page Number */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-[0.2em]">OBA Investment Bishkek • Private Advisory Document</p>
        </div>
      </section>
    </div>
  );
}
