import { ShieldCheck, Sparkles, VolumeX, Flame, ArrowUpRight, HelpCircle } from 'lucide-react';

interface AmenitiesProps {
  currentLang: string;
}

export default function Amenities({ currentLang }: AmenitiesProps) {
  
  const standards = [
    {
      icon: ShieldCheck,
      title: {
        EN: '9-Grade Seismic Resistance',
        RU: 'Сейсмостойкость 9 Баллов',
        KG: '9 Балдык Сейсмокоргоо'
      },
      desc: {
        EN: 'Engineered with double-reinforced monolithic concrete frames and continuous columns certified to withstand 9-grade earthquakes on the Richter scale.',
        RU: 'Высокопрочный монолитный железобетонный каркас, рассчитанный на землетрясение мощностью 9 баллов.',
        KG: '9 баллдык жер титирөөгө туруштук бере ала турган бекем темир-бетондук монолиттүү каркас.'
      },
      spec: 'Reinforcement Steel A500C, Concrete grade M400+'
    },
    {
      icon: Sparkles,
      title: {
        EN: 'Natural Sary-Tash Travertine',
        RU: 'Фасад из Сары-Таш Травертина',
        KG: 'Сары-Таш Травертин Фасады'
      },
      desc: {
        EN: 'Clad in iconic local natural Sary-Tash limestone and black granite. Offers timeless neoclassical/modern luxury appearance, durable thermal shielding, and rain protection.',
        RU: 'Натуральный экологически чистый известняк Сары-Таш первого слоя, дополненный полированным гранитом.',
        KG: 'Жаратылыштын таза Сары-Таш акиташ ташы жана жалтыратылган гранит менен капталган сырткы фасад.'
      },
      spec: 'Breathable ventilated facade, 30mm thickness plates'
    },
    {
      icon: VolumeX,
      title: {
        EN: 'Advanced Soundproofing',
        RU: 'Шумоизоляция Премиум Класса',
        KG: 'Премиум Ызы-Чууну Бөгөттөө'
      },
      desc: {
        EN: 'Multi-layer floor acoustic membranes and eco-ceramic red bricks with high acoustic absorption, cutting out ambient urban hums and neighborhood sounds.',
        RU: 'Шумопоглощающие мембраны в стяжках пола и межквартирные стены из красного экологического кирпича.',
        KG: 'Кабаттардын ортосундагы атайын мембраналар жана батирлер арасындагы кызыл кыштан салынган дубалдар.'
      },
      spec: 'Noise suppression index up to 58dB'
    },
    {
      icon: Flame,
      title: {
        EN: 'German Schuco Profiles',
        RU: 'Алюминиевые Окна Schuco',
        KG: 'Германиялык Schuco Терезелери'
      },
      desc: {
        EN: 'German-designed panoramic triple-glazed energy-efficient aluminum profiles. Maximizes natural warm sunlight while ensuring zero thermal leakage during cold winter months.',
        RU: 'Немецкие панорамные профили Schuco с тройным остеклением и защитой от ультрафиолета.',
        KG: 'Германиялык Schuco панорамалык терезелери, үч кабаттуу айнек жана жылуулукту сактоо.'
      },
      spec: 'Argon filled, low-emissivity smart glass'
    }
  ];

  const translations = {
    title: { EN: 'OBA Master Builder Quality', RU: 'Стандарты Строительства OBA', KG: 'OBA Курулуш Стандарттары' },
    subtitle: {
      EN: 'An uncompromising obsession with engineering details, structural materials, and seismic safety.',
      RU: 'Бескомпромиссный подход к качеству материалов, сейсмической безопасности и премиум-инженерии.',
      KG: 'Материалдардын сапатына, сейсмикалык коопсуздукка жана премиум-инженерияга кылдат мамиле.'
    },
    techTitle: { EN: 'Technical Standard', RU: 'Стандарт качества', KG: 'Сапат стандарты' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <section id="about" className="py-24 bg-[#0D0D0D] text-white relative overflow-hidden border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div id="amenities-header" className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-1 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Premium Materials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
            {getTranslation('title')}
          </h2>
          <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed opacity-80">
            {getTranslation('subtitle')}
          </p>
        </div>

        {/* Standards Grid */}
        <div id="standards-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {standards.map((standard, idx) => {
            const IconComp = standard.icon;
            return (
              <div
                key={idx}
                id={`standard-card-${idx}`}
                className="bg-[#121212]/35 border border-white/5 rounded-3xl p-8 hover:border-brand/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
                    <IconComp className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-xl font-serif italic text-white font-medium">
                    {standard.title[currentLang as keyof typeof standard.title] || standard.title.EN}
                  </h3>

                  <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed opacity-85">
                    {standard.desc[currentLang as keyof typeof standard.desc] || standard.desc.EN}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                    {getTranslation('techTitle')}
                  </span>
                  <span className="text-[10px] font-mono text-brand font-semibold uppercase tracking-wider bg-brand/5 border border-brand/10 px-2.5 py-1 rounded-lg">
                    {standard.spec}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Signature builder statement */}
        <div id="company-statement" className="mt-20 bg-[#121212]/60 rounded-3xl p-8 border border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h4 className="font-serif italic text-xl text-brand font-light">OBA Environmental & Quality Guarantee</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans opacity-85">
              All properties are developed in alignment with stringent international eco-standards. We minimize carbon footprint by sourcing local Sary-Tash limestone directly from premium quarries in the Kyrgyz Republic, ensuring minimal transport emissions and providing maximum community contribution.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="flex items-center gap-1.5 bg-brand text-black font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-none shadow-lg shadow-brand/10 hover:bg-white transition-colors cursor-pointer">
              <span>SGS Safety Approved</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
