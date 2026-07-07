import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Award, MapPin, Building } from 'lucide-react';

interface HeroProps {
  currentLang: string;
  onExploreClick: (sectionId: string) => void;
}

export default function Hero({ currentLang, onExploreClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/src/assets/images/premium_residence_exterior_1783314045768.jpg',
      tag: { EN: 'Flagship Complex', RU: 'Флагманский Комплекс', KG: 'Башкы Комплекс' },
      title: {
        EN: 'OBA Ala-Archa Residence',
        RU: 'OBA Ала-Арча Резиденс',
        KG: 'OBA Ала-Арча Резиденс'
      },
      subtitle: {
        EN: 'Luxury living nestled at the majestic foothills of Bishkek.',
        RU: 'Премиум виллы и резиденции у подножия заснеженных гор Ала-Тоо.',
        KG: 'Ала-Тоо тоолорунун этегиндеги премиум батирлер жана резиденциялар.'
      }
    },
    {
      image: '/src/assets/images/luxury_penthouse_interior_1783314062981.jpg',
      tag: { EN: 'Elite Interiors', RU: 'Элитные Интерьеры', KG: 'Элиталык Интерьерлер' },
      title: {
        EN: 'Redefining Kyrgyz Grandeur',
        RU: 'Новые Стандарты Роскоши',
        KG: 'Азем жашоонун жаңы стандарттары'
      },
      subtitle: {
        EN: 'Double-height ceilings, Italian natural marble, and panoramic city vistas.',
        RU: 'Двухуровневые пентхаусы с потолками 3.6м и панорамным остеклением.',
        KG: 'Бийик шыптуу, италия мраморлуу жана панорамалык терезелери бар батирлер.'
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const translations = {
    viewComplexes: { EN: 'View Complexes', RU: 'Наши Комплексы', KG: 'Комплекстер' },
    scheduleTour: { EN: 'Schedule VIP Tour', RU: 'Заказать VIP Тур', KG: 'Тур заказ кылуу' },
    yearsExp: { EN: 'Years of Excellence', RU: 'Лет Превосходства', KG: 'Жылдык Иш Тажрыйба' },
    seismic: { EN: 'Seismic Protection', RU: 'Сейсмостойкость', KG: 'Сейсмокадамдуулук' },
    sqmBuilt: { EN: 'Sqm Delivered Area', RU: 'кв.м Сданного Жилья', KG: 'кв.м Курулган Аянт' },
    satisfied: { EN: 'Premium Residences', RU: 'Элитных Квартир', KG: 'Элиталык Батирлер' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <section id="hero-section" className="relative h-screen min-h-[700px] w-full bg-[#0D0D0D] overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            id={`slide-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* Ambient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/75 to-[#0D0D0D]/30 z-10" />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title.EN}
              className="w-full h-full object-cover transform transition-transform duration-[8000ms] ease-out"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      {/* Decorative vertical rail text representing Artistic layout */}
      <div className="absolute left-6 bottom-32 z-20 hidden xl:flex items-end h-40 pointer-events-none">
        <p className="origin-bottom-left -rotate-90 text-[9px] uppercase tracking-[0.6em] whitespace-nowrap opacity-30 text-white">
          Kyrgyz Republic — Central Asia
        </p>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 lg:pb-24">
        <div className="max-w-7xl mx-auto w-full px-6 pl-6 xl:pl-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Primary Copy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-brand"></span>
                <span className="text-[10px] font-mono tracking-[0.3em] text-brand uppercase">
                  {slides[currentSlide].tag[currentLang as keyof typeof slides[0]['tag']] || slides[currentSlide].tag.EN}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[76px] font-serif italic text-white tracking-tight leading-[0.95] font-light">
                {slides[currentSlide].title[currentLang as keyof typeof slides[0]['title']] || slides[currentSlide].title.EN}
              </h1>

              <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl font-sans font-light leading-relaxed opacity-80">
                {slides[currentSlide].subtitle[currentLang as keyof typeof slides[0]['subtitle']] || slides[currentSlide].subtitle.EN}
              </p>

              {/* Action Triggers */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  id="hero-view-complexes-btn"
                  onClick={() => onExploreClick('complexes')}
                  className="flex items-center gap-2 bg-brand hover:bg-white text-black text-xs uppercase font-bold tracking-widest px-10 py-4 transition-all duration-300 shadow-xl shadow-brand/10 cursor-pointer"
                >
                  <span>{getTranslation('viewComplexes')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-schedule-tour-btn"
                  onClick={() => onExploreClick('consultation')}
                  className="border border-white/20 hover:border-brand bg-[#0D0D0D]/40 hover:bg-white/5 text-white text-xs uppercase font-bold tracking-widest px-10 py-4 transition-all duration-300 cursor-pointer"
                >
                  {getTranslation('scheduleTour')}
                </button>
              </div>
            </div>

            {/* Slider Navigation Dots / Controls */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end items-center gap-4">
              <button
                id="hero-prev-slide-btn"
                onClick={prevSlide}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-brand bg-black/40 hover:bg-black text-white transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    id={`hero-dot-${index}`}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-[3px] transition-all duration-300 ${
                      index === currentSlide ? 'w-8 bg-brand' : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                  ></button>
                ))}
              </div>
              <button
                id="hero-next-slide-btn"
                onClick={nextSlide}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-brand bg-black/40 hover:bg-black text-white transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Luxury Company Stats Panel */}
          <div
            id="hero-stats-panel"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-12 border-t border-white/10"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-brand">
                <Building className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">OBA Standard</span>
              </div>
              <p className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight">180k+ m²</p>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{getTranslation('sqmBuilt')}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-brand">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Certified</span>
              </div>
              <p className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight">9-Grade</p>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{getTranslation('seismic')}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-brand">
                <Award className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Pioneer</span>
              </div>
              <p className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight">12+ Years</p>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{getTranslation('yearsExp')}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-brand">
                <MapPin className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">Exclusive</span>
              </div>
              <p className="text-2xl sm:text-3xl font-serif font-light text-white tracking-tight">1,250+</p>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{getTranslation('satisfied')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
