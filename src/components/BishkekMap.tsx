import { useState } from 'react';
import { bishkekDistricts } from '../data';
import { MapPin, Info, Wind, Compass, Sparkles, Map } from 'lucide-react';

interface BishkekMapProps {
  currentLang: string;
}

export default function BishkekMap({ currentLang }: BishkekMapProps) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('magistral-toktonaliev');
  const [mapType, setMapType] = useState<'2gis' | 'blueprint'>('2gis');

  const selectedDistrict = bishkekDistricts.find((d) => d.id === selectedDistrictId) || bishkekDistricts[0];

  const get2GisIframeSrc = (id: string) => {
    switch (id) {
      case 'magistral-toktonaliev':
        return 'https://www.openstreetmap.org/export/embed.html?bbox=74.575824%2C42.814839%2C74.601824%2C42.830839&layer=mapnik&marker=42.822839%2C74.588824';
      case 'ala-archa-foothills':
        return 'https://www.openstreetmap.org/export/embed.html?bbox=74.572%2C42.797%2C74.598%2C42.813&layer=mapnik&marker=42.805%2C74.585';
      case 'erkindik':
        return 'https://www.openstreetmap.org/export/embed.html?bbox=74.594%2C42.869%2C74.620%2C42.885&layer=mapnik&marker=42.877%2C74.607';
      case 'southern-magistral':
        return 'https://www.openstreetmap.org/export/embed.html?bbox=74.609%2C42.816%2C74.635%2C42.832&layer=mapnik&marker=42.824%2C74.622';
      default:
        return 'https://www.openstreetmap.org/export/embed.html?bbox=74.55%2C42.80%2C74.65%2C42.89&layer=mapnik';
    }
  };

  const get2GisUrl = (id: string) => {
    switch (id) {
      case 'magistral-toktonaliev':
        return 'https://2gis.kg/bishkek/search/42.822839%2C74.588824';
      case 'ala-archa-foothills':
        return 'https://2gis.kg/bishkek/search/42.805%2C74.585';
      case 'erkindik':
        return 'https://2gis.kg/bishkek/search/42.877%2C74.607';
      case 'southern-magistral':
        return 'https://2gis.kg/bishkek/search/42.824%2C74.622';
      default:
        return 'https://2gis.kg/bishkek';
    }
  };

  const translations = {
    title: { EN: 'Prime Bishkek Locations', RU: 'Премиальные Локации в Бишкеке', KG: 'Бишкектеги Алдыңкы Райондор' },
    subtitle: {
      EN: 'Explore Bishkek\'s elite districts chosen specifically for micro-climates, security, and capital growth.',
      RU: 'Анализ экологии, безопасности и потенциала роста цен в престижных районах столицы.',
      KG: 'Борбор калаабыздын эң таза, коопсуз жана келечектүү делген элиталык райондору.'
    },
    airQuality: { EN: 'Mountain Air Quality', RU: 'Чистота воздуха', KG: 'Абанын тазалыгы' },
    prestige: { EN: 'Prestige Grade', RU: 'Уровень престижа', KG: 'Престиж деңгээли' },
    growth: { EN: 'Annual Capital Growth', RU: 'Ежегодный рост цены', KG: 'Баанын жылдык өсүшү' },
    closestObject: { EN: 'Key Anchors Nearby', RU: 'Главные объекты рядом', KG: 'Жакын жайгашкан имараттар' },
    viewOn2GIS: { EN: 'Open in 2GIS Map', RU: 'Открыть в 2ГИС', KG: '2ГИС картасынан ачуу' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  // Sourcing extra localized metrics
  const getMetrics = (id: string) => {
    switch (id) {
      case 'magistral-toktonaliev':
        return {
          air: '96% / Clean Mountain Breeze',
          prestige: 'AAA / Elite Masterplan',
          growth: '+15% annually',
          anchors: 'Cambridge Int. School, Ala-Archa Mall, Yntymak & Adinai Parks, Baytik Sky Park'
        };
      case 'ala-archa-foothills':
        return {
          air: '98% / Glacial Airflow',
          prestige: 'AAA+ / Absolute Elite',
          growth: '+14% annually',
          anchors: 'Ala-Archa Mall, President Residence, Golf Club'
        };
      case 'erkindik':
        return {
          air: '84% / Oak Alley Filter',
          prestige: 'AAA / Historical Elite',
          growth: '+11% annually',
          anchors: 'Central Square Chuy, Kyrgyz Opera & Ballet, Sierra Café'
        };
      case 'southern-magistral':
        return {
          air: '92% / Foothill Breezes',
          prestige: 'AA+ / Premium Modern',
          growth: '+13% annually',
          anchors: 'Asanbay Amusement Park, Oxford School, Globus Mall'
        };
      default:
        return {
          air: '78% / Regular',
          prestige: 'AA / Active Urban',
          growth: '+10% annually',
          anchors: 'Philharmonic, Chuy Avenue Retail, Bishkek Park'
        };
    }
  };

  const activeMetrics = getMetrics(selectedDistrict.id);

  // Vector coordinates for pins
  const pins = [
    { id: 'magistral-toktonaliev', x: 110, y: 265, label: 'OBA Magistral-Toktonaliev' },
    { id: 'ala-archa-foothills', x: 120, y: 160, label: 'OBA Ala-Archa' },
    { id: 'erkindik', x: 200, y: 80, label: 'OBA Erkindik' },
    { id: 'southern-magistral', x: 260, y: 150, label: 'OBA Bishkek Heights' }
  ];

  return (
    <section id="map" className="py-24 bg-[#0D0D0D] text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div id="map-header" className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
            <Map className="w-3.5 h-3.5" />
            <span>Spatial Urban Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-light text-white">
            {getTranslation('title')}
          </h2>
          <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed opacity-85">
            {getTranslation('subtitle')}
          </p>
        </div>

        <div id="map-dashboard-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Custom Interactive Map of Bishkek Grid */}
          <div id="map-vector-col" className="lg:col-span-7 flex flex-col h-full">
            {/* Map Mode Tabs */}
            <div className="flex border border-white/5 border-b-0 bg-[#0A0A0A] rounded-none overflow-hidden">
              <button
                type="button"
                onClick={() => setMapType('2gis')}
                className={`flex-1 py-4 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  mapType === '2gis'
                    ? 'bg-[#66c02a]/10 text-[#66c02a] border-b-2 border-[#66c02a] font-bold'
                    : 'text-neutral-500 hover:text-neutral-300 border-b border-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#66c02a] animate-pulse"></span>
                2GIS Interactive Map
              </button>
              <button
                type="button"
                onClick={() => setMapType('blueprint')}
                className={`flex-1 py-4 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  mapType === 'blueprint'
                    ? 'bg-brand/10 text-brand border-b-2 border-brand font-bold'
                    : 'text-neutral-500 hover:text-neutral-300 border-b border-transparent'
                }`}
              >
                Architectural Blueprint
              </button>
            </div>

            <div className="bg-black border border-white/5 rounded-none relative shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              {mapType === '2gis' ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={get2GisIframeSrc(selectedDistrictId)}
                    width="100%"
                    height="100%"
                    style={{ 
                      border: 'none',
                      filter: 'invert(90%) hue-rotate(100deg) saturate(180%) contrast(115%) brightness(95%)'
                    }}
                    allowFullScreen
                    loading="lazy"
                    title="2GIS Interactive Map"
                    className="w-full h-full transition-all duration-500 bg-[#121212]"
                  />
                  {/* Floating District Indicator overlay */}
                  <div className="absolute top-4 left-4 bg-black/90 border border-[#66c02a]/30 text-[#66c02a] text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 backdrop-blur-md shadow-2xl pointer-events-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#66c02a] animate-ping"></span>
                    <span>2GIS Connected: {selectedDistrict.name}</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Subtle map blueprint design */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                  {/* Vector grid showing roads & rivers */}
                  <svg className="absolute inset-0 w-full h-full text-neutral-800/40" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none">
                    {/* Chuy Avenue (Horizontal Main) */}
                    <line x1="0" y1="80" x2="100%" y2="80" strokeWidth="1.5" className="text-neutral-800" />
                    <text x="30" y="72" fontSize="8" className="font-mono fill-neutral-600">CHUY AVE</text>

                    {/* Southern Magistral (Aaly Tokombaev St) */}
                    <line x1="0" y1="280" x2="100%" y2="280" strokeWidth="2" className="text-neutral-800/80" />
                    <text x="30" y="272" fontSize="8" className="font-mono fill-neutral-600">SOUTHERN MAGISTRAL (TOKOMBAEV ST)</text>

                    {/* Baitik Baatyr / Abdrakhmanov (Vertical Main) */}
                    <line x1="160" y1="0" x2="160" y2="100%" strokeWidth="1.5" className="text-neutral-800" />
                    <text x="168" y="20" fontSize="8" className="font-mono fill-neutral-600 transform rotate-90 origin-left">BAITIK BAATYR ST</text>

                    {/* Erkindik Boulevard (Double central green alley) */}
                    <line x1="200" y1="20" x2="200" y2="200" strokeWidth="6" className="text-emerald-950/20" />
                    <line x1="200" y1="20" x2="200" y2="200" strokeWidth="1" strokeDasharray="3,3" className="text-emerald-500/30" />
                    <text x="210" y="45" fontSize="8" className="font-mono fill-emerald-600/60">ERKINDIK BLVD</text>

                    {/* Ala-Archa River (Wavy stream on the left) */}
                    <path d="M 80,0 Q 110,100 70,200 T 90,400" strokeWidth="1.5" className="text-blue-950/20" />
                    <text x="50" y="320" fontSize="7" className="font-mono fill-blue-800/30 transform -rotate-12">ALA-ARCHA RIVER</text>

                    {/* Ala-Too Foothills border contour at the bottom */}
                    <path d="M 0,340 Q 100,320 200,335 T 400,310 L 400,400 L 0,400 Z" className="fill-neutral-900/10 text-neutral-800/60" strokeWidth="1" />
                    <text x="320" y="375" fontSize="10" className="font-serif italic font-light fill-neutral-700 tracking-wider">ALA-TOO RANGE</text>
                  </svg>

                  {/* Render dynamic pins */}
                  <div className="absolute inset-0">
                    {pins.map((pin) => {
                      const isActive = selectedDistrictId === pin.id;
                      // Converting coordinates into percentages for responsiveness
                      const percentX = (pin.x / 400) * 100;
                      const percentY = (pin.y / 300) * 100;

                      return (
                        <button
                          key={pin.id}
                          id={`pin-btn-${pin.id}`}
                          onClick={() => setSelectedDistrictId(pin.id)}
                          style={{ left: `${percentX}%`, top: `${percentY}%` }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none cursor-pointer"
                        >
                          {/* Interactive Radar pulses */}
                          <span className={`absolute inset-0 rounded-none bg-brand/40 animate-ping duration-1500 ${
                            isActive ? 'scale-180 opacity-100' : 'scale-110 opacity-0 group-hover:opacity-40'
                          }`} />
                          
                          <div className={`w-8 h-8 rounded-none flex items-center justify-center border shadow-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-brand border-brand text-neutral-950 scale-110'
                              : 'bg-black border-white/10 text-brand hover:border-brand hover:scale-105'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>

                          {/* Tooltip Label */}
                          <span className={`absolute top-9 left-1/2 -translate-x-1/2 bg-black border text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-none shadow-2xl transition-all duration-300 pointer-events-none whitespace-nowrap ${
                            isActive
                              ? 'opacity-100 scale-100 text-brand border-brand/50'
                              : 'opacity-0 scale-90 text-neutral-400 border-white/5 group-hover:opacity-100 group-hover:scale-100'
                          }`}>
                            {pin.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Map scale watermarks */}
                  <div className="absolute bottom-4 left-4 font-mono text-[8px] text-neutral-500 uppercase tracking-widest space-y-0.5 pointer-events-none">
                    <p>Coordinates: 42.87° N, 74.59° E</p>
                    <p>Projection: WGS-84 UTM Zone 43N</p>
                    <p>Bishkek Municipal Plan © OBA Group</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Analytical District Details Card */}
          <div id="map-analytics-col" className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-brand/90 font-bold tracking-widest">Selected Territory</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light italic text-white">{selectedDistrict.name}</h3>
              <p className="text-neutral-400 text-sm font-light leading-relaxed opacity-95">{selectedDistrict.description}</p>
            </div>

            {/* Micro-metrics metrics bar */}
            <div className="bg-[#121212]/30 rounded-none border border-white/5 p-6 space-y-5">
              
              {/* Metric 1: Breath Air Flow */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                  <Wind className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase">
                    <span>{getTranslation('airQuality')}</span>
                    <span className="text-brand font-bold">{activeMetrics.air}</span>
                  </div>
                  <div className="w-full bg-black h-1.5 rounded-none overflow-hidden">
                    <div
                      className="bg-brand h-full rounded-none transition-all duration-1000"
                      style={{ width: selectedDistrict.id === 'ala-archa-foothills' ? '98%' : selectedDistrict.id === 'southern-magistral' ? '92%' : '84%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Metric 2: Price value index */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase">
                    <span>{getTranslation('prestige')}</span>
                    <span className="text-brand font-bold">{activeMetrics.prestige}</span>
                  </div>
                  <div className="w-full bg-black h-1.5 rounded-none overflow-hidden">
                    <div
                      className="bg-brand h-full rounded-none transition-all duration-1000"
                      style={{ width: selectedDistrict.id === 'ala-archa-foothills' ? '100%' : selectedDistrict.id === 'erkindik' ? '95%' : '90%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Metric 3: Capital Growth Index */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 uppercase">
                    <span>{getTranslation('growth')}</span>
                    <span className="text-brand font-bold">{activeMetrics.growth}</span>
                  </div>
                  <div className="w-full bg-black h-1.5 rounded-none overflow-hidden">
                    <div
                      className="bg-brand h-full rounded-none transition-all duration-1000"
                      style={{ width: selectedDistrict.id === 'ala-archa-foothills' ? '94%' : selectedDistrict.id === 'southern-magistral' ? '88%' : '75%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Metric 4: Anchor points info */}
              <div className="pt-4 border-t border-white/5 space-y-1.5 pb-2">
                <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-mono uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 text-brand" />
                  <span>{getTranslation('closestObject')}</span>
                </div>
                <p className="text-xs text-neutral-300 font-serif leading-relaxed italic opacity-90">{activeMetrics.anchors}</p>
              </div>

              {/* 2GIS Map Link */}
              <div className="pt-4 border-t border-white/5">
                <a
                  href={get2GisUrl(selectedDistrictId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group flex items-center justify-center gap-2 border border-[#66c02a]/30 bg-[#66c02a]/5 hover:bg-[#66c02a] text-[#66c02a] hover:text-white text-[10px] font-mono uppercase tracking-widest py-3 transition-all duration-300 rounded-none cursor-pointer"
                >
                  <Map className="w-4 h-4 text-[#66c02a] group-hover:text-white transition-colors duration-300" />
                  <span className="font-bold">2GIS • {getTranslation('viewOn2GIS')}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
