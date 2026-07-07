import React, { useState } from 'react';
import { residentialComplexes, EXC_RATE_USD_TO_KGS } from '../data';
import { ResidentialComplex } from '../types';
import {
  Wind,
  ShieldCheck,
  Trees,
  Sparkles,
  Crown,
  Key,
  Wine,
  CarFront,
  Waves,
  Dumbbell,
  Tv,
  Layers,
  Calendar,
  MapPin,
  Map,
  Ruler,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wind,
  ShieldCheck,
  Trees,
  Sparkles,
  Crown,
  Key,
  Wine,
  CarFront,
  Waves,
  Dumbbell,
  Tv,
  Layers
};

interface ComplexShowcaseProps {
  currentLang: string;
  onBookTour: (complexName: string) => void;
}

export default function ComplexShowcase({ currentLang, onBookTour }: ComplexShowcaseProps) {
  const [selectedComplexId, setSelectedComplexId] = useState<string>('oba-magistral-toktonaliev');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const selectedComplex = residentialComplexes.find((c) => c.id === selectedComplexId) || residentialComplexes[0];

  const getComplex2GisUrl = (id: string) => {
    switch (id) {
      case 'oba-magistral-toktonaliev':
        return 'https://2gis.kg/bishkek/search/42.822839%2C74.588824';
      case 'ala-archa-residence':
        return 'https://2gis.kg/bishkek/search/42.805%2C74.585';
      case 'oba-boulevard':
        return 'https://2gis.kg/bishkek/search/42.877%2C74.607';
      case 'bishkek-heights':
        return 'https://2gis.kg/bishkek/search/42.824%2C74.622';
      default:
        return 'https://2gis.kg/bishkek';
    }
  };

  const handlePrevImage = () => {
    setActiveGalleryIndex((prev) =>
      prev === 0 ? selectedComplex.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveGalleryIndex((prev) =>
      prev === selectedComplex.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const formatPrice = (usd: number) => {
    if (currentLang === 'KG' || currentLang === 'RU') {
      const kgs = Math.round(usd * EXC_RATE_USD_TO_KGS);
      return `${kgs.toLocaleString()} KGS (~$${usd.toLocaleString()})`;
    }
    return `$${usd.toLocaleString()} USD`;
  };

  const translations = {
    title: { EN: 'Flagship Complexes', RU: 'Наши Проекты', KG: 'Биздин Проекттер' },
    subtitle: {
      EN: 'Discover the ultimate standard of modern architecture in Kyrgyzstan.',
      RU: 'Эксклюзивные строительные шедевры в лучших районах столицы.',
      KG: 'Борбор калаабыздын эң кооз жерлериндеги эксклюзивдүү курулуш шедеврлери.'
    },
    completion: { EN: 'Completion', RU: 'Сдача объекта', KG: 'Бүтүү мөөнөтү' },
    district: { EN: 'District', RU: 'Район', KG: 'Район' },
    startingPrice: { EN: 'Starting from', RU: 'Цена от', KG: 'Баасы' },
    specs: { EN: 'Technical Specifications', RU: 'Технические Характеристики', KG: 'Техникалык Мүнөздөмөсү' },
    ceilings: { EN: 'Ceilings', RU: 'Высота потолков', KG: 'Шыптын бийиктиги' },
    floors: { EN: 'Flooring', RU: 'Этажность', KG: 'Кабаттуулугу' },
    facade: { EN: 'Premium Facade', RU: 'Материал фасада', KG: 'Фасад материалы' },
    structure: { EN: 'Structural Frame', RU: 'Каркас здания', KG: 'Имараттын каркасы' },
    bookVIP: { EN: 'Reserve a Private Presentation', RU: 'Записаться на презентацию', KG: 'Презентацияга жазылуу' },
    m: { EN: 'meters', RU: 'м', KG: 'метр' },
    viewOn2GIS: { EN: 'View Location on 2GIS', RU: 'Показать на карте 2ГИС', KG: '2ГИС картасынан ачуу' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <section id="complexes" className="py-24 bg-[#0D0D0D] text-white relative border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-transparent opacity-40 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div id="complexes-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Standards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
            {getTranslation('title')}
          </h2>
          <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed opacity-80">
            {getTranslation('subtitle')}
          </p>
        </div>

        {/* Complex Filter Tabs */}
        <div id="complexes-tabs" className="flex flex-wrap justify-center gap-3 mb-12">
          {residentialComplexes.map((complex) => (
            <button
              key={complex.id}
              id={`tab-btn-${complex.id}`}
              onClick={() => {
                setSelectedComplexId(complex.id);
                setActiveGalleryIndex(0);
              }}
              className={`px-6 py-3.5 rounded-none text-xs uppercase font-bold tracking-widest transition-all duration-300 border cursor-pointer ${
                selectedComplexId === complex.id
                  ? 'bg-brand text-neutral-950 border-brand shadow-lg shadow-brand/15'
                  : 'bg-white/5 text-neutral-300 border-white/10 hover:border-brand/40 hover:text-white'
              }`}
            >
              {complex.name}
            </button>
          ))}
        </div>

        {/* Detailed Complex Layout Grid */}
        <div id="complex-details-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Gallery & Renders Viewer */}
          <div id="complex-gallery-col" className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-2xl bg-neutral-900 border border-white/5">
              <img
                src={selectedComplex.gallery[activeGalleryIndex]}
                alt={`${selectedComplex.name} view`}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay elements */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex items-center justify-between">
                <p className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                  {selectedComplex.name} — Gallery {activeGalleryIndex + 1} / {selectedComplex.gallery.length}
                </p>
                <button
                  id="lightbox-btn"
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Slider controls */}
              <button
                id="gallery-prev-btn"
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="gallery-next-btn"
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail selector */}
            <div id="gallery-thumbnails" className="grid grid-cols-4 gap-3">
              {selectedComplex.gallery.map((img, i) => (
                <button
                  key={i}
                  id={`thumb-btn-${i}`}
                  onClick={() => setActiveGalleryIndex(i)}
                  className={`aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    activeGalleryIndex === i ? 'border-brand scale-102' : 'border-white/5 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Property Details & Amenities */}
          <div id="complex-info-col" className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-brand font-mono text-xs uppercase tracking-widest font-semibold">
                {selectedComplex.tagline}
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif italic text-white font-light">
                {selectedComplex.name}
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed opacity-85">
                {selectedComplex.description}
              </p>
            </div>

            {/* Location & Sourcing Stats */}
            <div className="grid grid-cols-2 gap-4 bg-[#121212]/40 p-5 rounded-3xl border border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand" />
                  <span>{getTranslation('district')}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white">{selectedComplex.district}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-brand" />
                  <span>{getTranslation('completion')}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white">{selectedComplex.completionDate}</p>
              </div>

              <div className="col-span-2 space-y-1 pt-3 border-t border-white/5">
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">{getTranslation('startingPrice')}</p>
                <p className="text-lg font-mono font-bold text-brand">{formatPrice(selectedComplex.priceMinUSD)}</p>
              </div>
            </div>

            {/* Spec Sheet */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-brand font-semibold border-b border-white/5 pb-2">
                {getTranslation('specs')}
              </h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs font-mono">
                <div className="flex flex-col">
                  <span className="text-neutral-400">{getTranslation('ceilings')}</span>
                  <span className="text-neutral-200 mt-1">{selectedComplex.specs.ceilingHeight} {getTranslation('m')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-400">{getTranslation('floors')}</span>
                  <span className="text-neutral-200 mt-1">{selectedComplex.specs.floors}</span>
                </div>
                <div className="col-span-2 flex flex-col pt-1">
                  <span className="text-neutral-400">{getTranslation('facade')}</span>
                  <span className="text-neutral-200 mt-1 leading-relaxed text-[11px]">{selectedComplex.specs.facadeMaterial}</span>
                </div>
                <div className="col-span-2 flex flex-col pt-1">
                  <span className="text-neutral-400">{getTranslation('structure')}</span>
                  <span className="text-neutral-200 mt-1 leading-relaxed text-[11px]">{selectedComplex.specs.wallMaterial}</span>
                </div>
              </div>
            </div>

            {/* CTA VIP Request & 2GIS Link */}
            <div className="space-y-3">
              <button
                id="reserve-presentation-btn"
                onClick={() => onBookTour(selectedComplex.name)}
                className="w-full bg-brand text-black hover:bg-white font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer"
              >
                {getTranslation('bookVIP')}
              </button>
              <a
                href={getComplex2GisUrl(selectedComplexId)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-center gap-2 border border-[#66c02a]/30 bg-[#66c02a]/5 hover:bg-[#66c02a] text-[#66c02a] hover:text-white text-xs font-bold py-4 rounded-none uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                <Map className="w-4 h-4 text-[#66c02a] group-hover:text-white transition-colors duration-300" />
                <span>2GIS • {getTranslation('viewOn2GIS')}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Dynamic Amenities Row */}
        <div id="complex-amenities" className="mt-20 border-t border-white/5 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {selectedComplex.amenities.map((amenity, idx) => {
              const IconComp = iconMap[amenity.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  id={`amenity-card-${idx}`}
                  className="bg-[#121212]/30 p-6 rounded-3xl border border-white/5 hover:border-brand/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20 mb-4 group-hover:bg-brand group-hover:text-black group-hover:border-brand transition-all duration-500">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif italic text-lg mb-2 text-white font-light">
                    {amenity.title}
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed opacity-85">
                    {amenity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Lightbox / Gallery Fullscreen Overlay */}
      {isLightboxOpen && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 z-[100] bg-black/98 flex flex-col justify-center items-center p-4 animate-in fade-in duration-300"
        >
          <button
            id="lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl w-full aspect-video">
            <img
              src={selectedComplex.gallery[activeGalleryIndex]}
              alt="Fullscreen"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />

            {/* Overlay Navigation */}
            <button
              id="lightbox-prev"
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900/80 border border-white/5 text-white cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="lightbox-next"
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900/80 border border-white/5 text-white cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <p className="mt-4 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {selectedComplex.name} — Image {activeGalleryIndex + 1} of {selectedComplex.gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
