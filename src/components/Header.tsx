import { useState, useEffect } from 'react';
import { Phone, Globe, Menu, X, Sparkles, Shield, FileText } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  currentLang: string;
  setLang: (lang: string) => void;
}

export default function Header({ onNavigate, currentLang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'RU', name: 'Русский' },
    { code: 'KG', name: 'Кыргызча' },
  ];

  const menuItems = [
    { id: 'about', label: { EN: 'About', RU: 'О компании', KG: 'Биз жөнүндө' } },
    { id: 'complexes', label: { EN: 'Complexes', RU: 'Комплексы', KG: 'Комплекстер' } },
    { id: 'selector', label: { EN: 'Apartment Finder', RU: 'Выбор квартир', KG: 'Батир тандоо' } },
    { id: 'calculator', label: { EN: 'Investment', RU: 'Инвестиции', KG: 'Инвестициялар' } },
    { id: 'map', label: { EN: 'Bishkek Locations', RU: 'Локации', KG: 'Жайгашуусу' } },
    { id: 'gmail-portal-section', label: { EN: 'Gmail Mailroom', RU: 'Почта Gmail', KG: 'Gmail Почтасы' } },
    { id: 'consultation', label: { EN: 'VIP Request', RU: 'VIP Консультация', KG: 'VIP Консультация' } },
  ];

  const getLabel = (item: typeof menuItems[0]) => {
    return (item.label as Record<string, string>)[currentLang] || item.label.EN;
  };

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-bg-dark/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl shadow-black/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          id="header-logo"
          className="flex items-baseline gap-2 cursor-pointer group"
          onClick={() => handleItemClick('hero')}
        >
          <span className="text-3xl font-bold tracking-tighter text-brand transition-colors group-hover:text-white">OBA</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 text-neutral-300 font-sans hidden sm:inline">
            Investment Bishkek
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className="text-xs uppercase tracking-widest font-medium text-neutral-300 hover:text-brand transition-colors duration-300 cursor-pointer relative py-1 group"
            >
              {getLabel(item)}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div id="header-actions" className="hidden lg:flex items-center gap-5">
          {/* Download Brochure (PDF) */}
          <button
            id="download-pdf-brochure-btn"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs text-brand hover:text-white font-medium tracking-wider bg-brand/10 border border-brand/20 hover:bg-brand hover:text-black hover:border-brand px-3.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer"
            title="Download/Print Investment Brochure as PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{currentLang === 'RU' ? 'Брошюра PDF' : currentLang === 'KG' ? 'Сунуш (PDF)' : 'Brochure PDF'}</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              id="lang-selector-btn"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white font-medium tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-colors duration-300"
            >
              <Globe className="w-3.5 h-3.5 text-brand" />
              <span>{currentLang}</span>
            </button>

            {isLangDropdownOpen && (
              <>
                <div
                  id="lang-dropdown-backdrop"
                  className="fixed inset-0 z-10"
                  onClick={() => setIsLangDropdownOpen(false)}
                ></div>
                <div
                  id="lang-dropdown"
                  className="absolute right-0 mt-2 w-28 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl z-20 py-1 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-opt-${lang.code}`}
                      onClick={() => {
                        setLang(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors duration-150 ${
                        currentLang === lang.code
                          ? 'bg-brand/10 text-brand'
                          : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Contact */}
          <a
            id="header-phone-btn"
            href="tel:+996555555555"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-brand transition-colors duration-300"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand/10 border border-brand/20 text-brand">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">Call VIP Desk</span>
              <span className="font-mono text-[11px] text-brand font-medium">+996 (555) 00-22-22</span>
            </div>
          </a>

          {/* Exclusive Badge */}
          <div className="flex items-center gap-1 bg-brand/10 border border-brand/30 text-brand px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-widest">
            <Sparkles className="w-3 h-3 text-brand animate-pulse" />
            <span>9-Grade Seismic Safety</span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            id="mobile-lang-btn"
            onClick={() => setLang(currentLang === 'EN' ? 'RU' : currentLang === 'RU' ? 'KG' : 'EN')}
            className="text-xs text-neutral-300 bg-[#121212] border border-white/10 px-2.5 py-1.5 rounded-lg uppercase"
          >
            {currentLang}
          </button>
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-200 hover:text-brand transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-panel"
          className="fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-[#0D0D0D]/98 z-40 flex flex-col justify-between py-8 px-6 border-t border-white/5"
        >
          <div className="flex flex-col gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className="text-left text-base uppercase tracking-widest text-neutral-200 hover:text-brand transition-colors py-2 border-b border-white/5"
              >
                {getLabel(item)}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5 bg-neutral-900/40 p-5 rounded-2xl border border-white/5">
            {/* Mobile PDF Download */}
            <button
              id="mobile-download-pdf-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.print();
              }}
              className="flex items-center justify-center gap-2 border border-brand/40 bg-brand/10 hover:bg-brand hover:text-black hover:border-brand text-brand font-medium py-3.5 rounded-xl transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest"
            >
              <FileText className="w-4 h-4" />
              <span>{currentLang === 'RU' ? 'Скачать PDF Брошюру' : currentLang === 'KG' ? 'Баракчаны PDF Жүктөө' : 'Download PDF Brochure'}</span>
            </button>

            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-brand" />
              <div>
                <p className="text-xs font-semibold text-white">OBA Investment Group</p>
                <p className="text-[10px] text-neutral-400">License №004829, Bishkek</p>
              </div>
            </div>
            <a
              id="mobile-call-hotline"
              href="tel:+996555555555"
              className="flex items-center justify-center gap-2 bg-brand hover:bg-[#C0B097] text-neutral-950 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand/15"
            >
              <Phone className="w-4 h-4 text-black" />
              <span className="text-black">+996 (555) 00-22-22</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
