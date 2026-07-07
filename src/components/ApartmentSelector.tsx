import { useState } from 'react';
import { apartmentsData, residentialComplexes, EXC_RATE_USD_TO_KGS } from '../data';
import { Apartment } from '../types';
import { Sparkles, LayoutGrid, Eye, Compass, Home, ShieldAlert, BadgeCheck } from 'lucide-react';

interface ApartmentSelectorProps {
  currentLang: string;
  onSelectApartment: (aptId: string) => void;
}

export default function ApartmentSelector({ currentLang, onSelectApartment }: ApartmentSelectorProps) {
  const [selectedComplexId, setSelectedComplexId] = useState<string>('ala-archa-residence');
  const [roomFilter, setRoomFilter] = useState<number | 'all'>('all');
  const [mustHaveMountainView, setMustHaveMountainView] = useState(false);
  const [mustHaveTerrace, setMustHaveTerrace] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState<string>('');

  // Filter properties
  const filteredApartments = apartmentsData.filter((apt) => {
    if (apt.complexId !== selectedComplexId) return false;
    if (roomFilter !== 'all' && apt.rooms !== roomFilter) return false;
    if (mustHaveMountainView && !apt.mountainView) return false;
    if (mustHaveTerrace && !apt.terrace) return false;
    return true;
  });

  // Current selected apartment
  const currentApt = filteredApartments.find((a) => a.id === selectedAptId) || filteredApartments[0] || null;

  const formatPrice = (usd: number) => {
    if (currentLang === 'KG' || currentLang === 'RU') {
      const kgs = Math.round(usd * EXC_RATE_USD_TO_KGS);
      return `${kgs.toLocaleString()} KGS (~$${usd.toLocaleString()})`;
    }
    return `$${usd.toLocaleString()} USD`;
  };

  const currentComplex = residentialComplexes.find((c) => c.id === selectedComplexId) || residentialComplexes[0];

  const translations = {
    title: { EN: 'Elite Residence Finder', RU: 'Поиск Элитного Жилья', KG: 'Батир Тандоо' },
    subtitle: {
      EN: 'Filter available configurations and view interactive plan blueprints.',
      RU: 'Интерактивный конфигуратор планировок квартир и пентхаусов.',
      KG: 'Батирлердин жана пентхаустардын ыңгайлуу пландарын тандаңыз.'
    },
    rooms: { EN: 'Rooms', RU: 'Комнаты', KG: 'Бөлмөлөр' },
    all: { EN: 'All', RU: 'Все', KG: 'Баары' },
    mountainFilter: { EN: 'Mountain View', RU: 'Вид на горы', KG: 'Тоо көрүнүшү' },
    terraceFilter: { EN: 'Private Terrace', RU: 'Терраса', KG: 'Террасасы бар' },
    smartFilter: { EN: 'Smart Home', RU: 'Умный Дом', KG: 'Акылдуу үй' },
    area: { EN: 'Area', RU: 'Площадь', KG: 'Аянты' },
    floor: { EN: 'Floor', RU: 'Этаж', KG: 'Кабаты' },
    status: { EN: 'Status', RU: 'Статус', KG: 'Статусу' },
    bookViewing: { EN: 'Book a VIP Tour of', RU: 'Записаться на просмотр', KG: 'Кароого жазылуу' },
    blueprintTitle: { EN: 'Interactive Layout Plan', RU: 'Интерактивная Планировка', KG: 'Батирдин Планы' },
    noResults: { EN: 'No configurations found for the active filters.', RU: 'Нет планировок по выбранным фильтрам.', KG: 'Тандалган фильтрлер боюнча батир табылган жок.' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <section id="selector" className="py-24 bg-[#0D0D0D] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div id="selector-header" className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Interactive Floorplanner</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-light">
            {getTranslation('title')}
          </h2>
          <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed opacity-80">
            {getTranslation('subtitle')}
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div id="selector-dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Filter Panel & Properties List */}
          <div id="selector-left-panel" className="lg:col-span-4 space-y-6">
            
            {/* Filter controls box */}
            <div className="bg-[#121212]/50 p-6 rounded-3xl border border-white/5 space-y-5">
              
              {/* Complex selector dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Select Complex</label>
                <select
                  id="complex-select-dropdown"
                  value={selectedComplexId}
                  onChange={(e) => {
                    setSelectedComplexId(e.target.value);
                    setSelectedAptId(''); // reset selection
                  }}
                  className="w-full bg-[#161616] border border-white/5 text-sm rounded-none py-3 px-4 focus:border-brand focus:outline-none text-white font-medium cursor-pointer"
                >
                  {residentialComplexes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room count selectors */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                  {getTranslation('rooms')}
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['all', 1, 2, 3, 5] as const).map((rooms) => (
                    <button
                      key={rooms}
                      id={`rooms-filter-${rooms}`}
                      onClick={() => {
                        setRoomFilter(rooms);
                        setSelectedAptId('');
                      }}
                      className={`py-2 rounded-none text-xs font-mono font-bold border transition-colors cursor-pointer ${
                        roomFilter === rooms
                          ? 'bg-brand text-neutral-950 border-brand'
                          : 'bg-[#1a1a1a] border-white/5 text-neutral-300 hover:border-brand/40 hover:text-white'
                      }`}
                    >
                      {rooms === 'all' ? 'ALL' : rooms === 5 ? '5+' : `${rooms}R`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox filters */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">Preferences</label>
                
                <label className="flex items-center gap-3 cursor-pointer group text-xs text-neutral-300 hover:text-white">
                  <input
                    id="mountain-view-checkbox"
                    type="checkbox"
                    checked={mustHaveMountainView}
                    onChange={(e) => {
                      setMustHaveMountainView(e.target.checked);
                      setSelectedAptId('');
                    }}
                    className="w-4 h-4 rounded-none bg-neutral-900 border-white/15 text-brand focus:ring-brand focus:ring-opacity-50"
                  />
                  <span>{getTranslation('mountainFilter')}</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group text-xs text-neutral-300 hover:text-white">
                  <input
                    id="terrace-checkbox"
                    type="checkbox"
                    checked={mustHaveTerrace}
                    onChange={(e) => {
                      setMustHaveTerrace(e.target.checked);
                      setSelectedAptId('');
                    }}
                    className="w-4 h-4 rounded-none bg-neutral-900 border-white/15 text-brand focus:ring-brand focus:ring-opacity-50"
                  />
                  <span>{getTranslation('terraceFilter')}</span>
                </label>
              </div>
            </div>

            {/* Matching items scrollable list */}
            <div className="bg-[#121212]/50 rounded-3xl border border-white/5 p-4 space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar">
              <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 px-2 pb-1 border-b border-white/5">
                Available Units ({filteredApartments.length})
              </p>

              {filteredApartments.length === 0 ? (
                <p className="text-xs text-neutral-500 p-4 text-center">{getTranslation('noResults')}</p>
              ) : (
                <div id="apartment-results-list" className="space-y-1.5">
                  {filteredApartments.map((apt) => {
                    const isSelected = selectedAptId === apt.id || (!selectedAptId && filteredApartments[0]?.id === apt.id);
                    return (
                      <button
                        key={apt.id}
                        id={`apt-item-${apt.id}`}
                        onClick={() => setSelectedAptId(apt.id)}
                        className={`w-full text-left p-3.5 rounded-none border flex items-center justify-between transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-brand/10 border-brand text-white'
                            : 'bg-[#181818]/40 border-white/5 hover:border-brand/40 text-neutral-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Home className={`w-4 h-4 ${isSelected ? 'text-brand' : 'text-neutral-500'}`} />
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold uppercase">Apt {apt.id}</span>
                            <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                              {apt.rooms} {apt.rooms === 1 ? 'Room' : 'Rooms'} • {apt.area} m²
                            </span>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none uppercase tracking-wider ${
                            apt.status === 'Available'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-brand/10 text-brand border border-brand/20'
                          }`}>
                            {apt.status}
                          </span>
                          <span className="text-xs font-mono font-bold text-brand mt-1">
                            ${(apt.priceUSD / 1000).toFixed(0)}k
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Blueprint, Details, and CTA */}
          <div id="selector-right-blueprint" className="lg:col-span-8">
            {currentApt ? (
              <div className="bg-[#121212]/30 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                
                {/* Visual architectural stage / layout block */}
                <div className="p-8 border-b border-white/5 bg-black/40 relative flex flex-col items-center justify-center min-h-[350px]">
                  
                  {/* Subtle technical background grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4C7B0_1px,transparent_1px),linear-gradient(to_bottom,#D4C7B0_1px,transparent_1px)] bg-[size:24px_24px] opacity-5" />

                  <p className="absolute top-6 left-6 text-[10px] uppercase font-mono tracking-widest text-brand/80">
                    {currentComplex.name} — Floor plan layout
                  </p>

                  <div className="relative w-full max-w-md aspect-square max-h-[280px] flex items-center justify-center z-10 border border-white/5 bg-black/60 p-6 rounded-3xl shadow-inner mt-4">
                    {/* Architectural Blueprint Vector Outline Mock */}
                    <svg viewBox="0 0 200 200" className="w-full h-full text-brand/20" stroke="currentColor" fill="none" strokeWidth="1.5">
                      {/* Outer boundary wall */}
                      <rect x="20" y="20" width="160" height="160" strokeWidth="2.5" className="text-brand/40" />
                      
                      {/* Living Room */}
                      <rect x="20" y="20" width="100" height="90" />
                      <text x="70" y="65" fontSize="10" fill="currentColor" className="text-brand/50 font-mono text-center" textAnchor="middle">LIVING AREA</text>
                      
                      {/* Master Bedroom */}
                      <rect x="120" y="20" width="60" height="90" />
                      <text x="150" y="65" fontSize="9" fill="currentColor" className="text-brand/50 font-mono" textAnchor="middle">BEDROOM</text>
                      
                      {/* Kitchen / Dining */}
                      <rect x="20" y="110" width="70" height="70" />
                      <text x="55" y="145" fontSize="9" fill="currentColor" className="text-brand/50 font-mono" textAnchor="middle">KITCHEN</text>

                      {/* Bathroom */}
                      <rect x="90" y="110" width="40" height="70" />
                      <text x="110" y="145" fontSize="8" fill="currentColor" className="text-brand/40 font-mono" textAnchor="middle">BATH</text>

                      {/* Balcony / Terrace if applicable */}
                      {currentApt.terrace && (
                        <>
                          <rect x="130" y="110" width="50" height="70" strokeDasharray="3,3" className="text-brand/40" />
                          <text x="155" y="145" fontSize="8" fill="currentColor" className="text-brand/60 font-mono" textAnchor="middle">TERRACE</text>
                        </>
                      )}

                      {/* Doors */}
                      <path d="M 120 40 A 20 20 0 0 1 120 60" />
                      <path d="M 50 110 A 20 20 0 0 1 70 110" />
                      <path d="M 90 140 A 15 15 0 0 1 90 155" />
                    </svg>

                    {/* Interactive Specs Watermark */}
                    <div className="absolute bottom-4 right-4 text-right font-mono text-[9px] text-neutral-500 space-y-0.5">
                      <p>SCALE: 1:75</p>
                      <p>ACC_RATING: 9-GRADE</p>
                      <p>OBA INVESTMENT GROUP</p>
                    </div>
                  </div>
                </div>

                {/* Info and Reservation Deck */}
                <div id="blueprint-info" className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#121212]/40">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-brand uppercase tracking-widest font-bold">
                        Apartment {currentApt.id}
                      </span>
                      <span className="text-neutral-500 font-mono text-xs">|</span>
                      <span className="text-xs text-neutral-400 font-mono">{currentComplex.name}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-black/20 p-3 rounded-none border border-white/5 text-center">
                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">{getTranslation('area')}</p>
                        <p className="text-base font-serif italic font-light text-white mt-1">{currentApt.area} m²</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded-none border border-white/5 text-center">
                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">{getTranslation('floor')}</p>
                        <p className="text-base font-serif italic font-light text-white mt-1">{currentApt.floor}/{currentApt.totalFloors}</p>
                      </div>
                      <div className="bg-black/20 p-3 rounded-none border border-white/5 text-center">
                        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">{getTranslation('rooms')}</p>
                        <p className="text-base font-serif italic font-light text-white mt-1">{currentApt.rooms}</p>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentApt.mountainView && (
                        <span className="flex items-center gap-1 text-[9px] font-mono uppercase bg-brand/5 text-brand border border-brand/20 px-2.5 py-1 rounded-none">
                          <Eye className="w-3 h-3" />
                          <span>Ala-Too Mountains View</span>
                        </span>
                      )}
                      {currentApt.terrace && (
                        <span className="flex items-center gap-1 text-[9px] font-mono uppercase bg-brand/10 text-brand border border-brand/20 px-2.5 py-1 rounded-none">
                          <Compass className="w-3 h-3" />
                          <span>Premium Terrace</span>
                        </span>
                      )}
                      {currentApt.smartHome && (
                        <span className="flex items-center gap-1 text-[9px] font-mono uppercase bg-white/5 text-neutral-300 border border-white/10 px-2.5 py-1 rounded-none">
                          <Sparkles className="w-3 h-3 text-brand" />
                          <span>Smart Home Ready</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing Deck & Reservation CTA */}
                  <div className="space-y-4 md:border-l md:border-white/5 md:pl-8">
                    <div className="space-y-1">
                      <p className="text-xs text-neutral-400 uppercase font-mono tracking-wider">Purchase Price</p>
                      <p className="text-2xl sm:text-3xl font-serif italic font-light text-brand tracking-tight">
                        {formatPrice(currentApt.priceUSD)}
                      </p>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase">
                        ~${(currentApt.priceUSD / currentApt.area).toFixed(0)} USD per m²
                      </p>
                    </div>

                    <button
                      id="select-apartment-cta-btn"
                      onClick={() => onSelectApartment(`Apartment ${currentApt.id} in ${currentComplex.name}`)}
                      className="w-full bg-brand hover:bg-white text-black font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-brand/10 cursor-pointer text-center block"
                    >
                      {getTranslation('bookViewing')} Apt {currentApt.id}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-[#121212]/40 rounded-3xl border border-white/5 p-12 text-center text-neutral-400 font-light">
                {getTranslation('noResults')}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
