import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComplexShowcase from './components/ComplexShowcase';
import ApartmentSelector from './components/ApartmentSelector';
import InvestmentCalculator from './components/InvestmentCalculator';
import BishkekMap from './components/BishkekMap';
import Amenities from './components/Amenities';
import ConsultationForm from './components/ConsultationForm';
import GmailInvestorPortal from './components/GmailInvestorPortal';
import Footer from './components/Footer';
import PrintBrochure from './components/PrintBrochure';
import { clientReviews } from './data';
import { Quote, MessageSquare, Phone, ChevronLeft, ChevronRight, Award, ShieldAlert, Sparkles } from 'lucide-react';

export default function App() {
  const [currentLang, setLang] = useState<string>('EN');
  const [preselectedOption, setPreselectedOption] = useState<string>('');
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Smooth scroll logic to target elements
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectApartment = (aptId: string) => {
    setPreselectedOption(`Interested in: ${aptId}`);
    scrollToSection('consultation');
  };

  const handleApplyFinancing = (calcSummary: string) => {
    setPreselectedOption(`Calculated financing plan: ${calcSummary}`);
    scrollToSection('consultation');
  };

  const handleBookTour = (complexName: string) => {
    setPreselectedOption(`Requesting private viewing tour of ${complexName}`);
    scrollToSection('consultation');
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % clientReviews.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + clientReviews.length) % clientReviews.length);
  };

  const translations = {
    reviewsTitle: { EN: 'Client Testimonials', RU: 'Отзывы Клиентов', KG: 'Кардарлардын Пикирлери' },
    reviewsSubtitle: {
      EN: 'What distinguished investors and luxury residents say about OBA Investment standards.',
      RU: 'Мнения крупных инвесторов и жителей элитных домов о качестве и сервисе OBA.',
      KG: 'OBA өнөктөштүгү жана сапаты тууралуу инвесторлордун жана жашоочулардын пикирлери.'
    },
    floatingText: { EN: 'Direct Concierge Desk', RU: 'Связаться в WhatsApp', KG: 'WhatsApp аркылуу байланыш' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-bg-dark text-[#E5E5E5] font-sans overflow-x-hidden antialiased selection:bg-brand selection:text-neutral-950">
      
      {/* Premium Navigation Header */}
      <Header
        currentLang={currentLang}
        setLang={setLang}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main id="oba-main-content">
        
        {/* Widescreen Interactive Hero */}
        <Hero
          currentLang={currentLang}
          onExploreClick={scrollToSection}
        />

        {/* Quality Standards & Builders Credentials */}
        <Amenities currentLang={currentLang} />

        {/* Residential Complexes Interactive Showcase */}
        <ComplexShowcase
          currentLang={currentLang}
          onBookTour={handleBookTour}
        />

        {/* Interactive Floor / Configuration Selector */}
        <ApartmentSelector
          currentLang={currentLang}
          onSelectApartment={handleSelectApartment}
        />

        {/* Investment & Interest-free Installment Calculator */}
        <InvestmentCalculator
          currentLang={currentLang}
          onApplyFinancing={handleApplyFinancing}
        />

        {/* Spatial Map analyzer of Bishkek Prime zones */}
        <BishkekMap currentLang={currentLang} />

        {/* Exclusive VIP Testimonials Carousel */}
        <section id="testimonials-section" className="py-24 bg-bg-dark text-white border-t border-white/5 relative">
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand/5 rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6">
            
            {/* Header */}
            <div id="reviews-header" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-1 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Reviews</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight">
                {getTranslation('reviewsTitle')}
              </h2>
              <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed">
                {getTranslation('reviewsSubtitle')}
              </p>
            </div>

            {/* Testimonials Card */}
            <div id="testimonial-card-frame" className="bg-[#121212] border border-white/5 rounded-3xl p-8 sm:p-12 relative shadow-2xl overflow-hidden">
              <div className="absolute top-6 left-6 text-brand/10 pointer-events-none">
                <Quote className="w-24 h-24 stroke-1" />
              </div>

              <div className="relative z-10 space-y-6">
                
                {/* Review Text */}
                <p className="font-serif italic text-lg sm:text-2xl leading-relaxed text-neutral-100">
                  "{clientReviews[activeReviewIndex].text}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="space-y-1">
                    <p className="font-serif font-bold text-base sm:text-lg text-white">
                      {clientReviews[activeReviewIndex].name}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {clientReviews[activeReviewIndex].role}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono uppercase bg-brand/10 text-brand border border-brand/20 px-3 py-1.5 rounded-xl">
                    Owner at {clientReviews[activeReviewIndex].project}
                  </span>
                </div>

              </div>

              {/* Slider Controls */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <button
                  id="testimonial-prev-btn"
                  onClick={prevReview}
                  className="w-10 h-10 rounded-lg bg-black border border-white/10 text-neutral-400 hover:text-white hover:border-brand flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="testimonial-next-btn"
                  onClick={nextReview}
                  className="w-10 h-10 rounded-lg bg-black border border-white/10 text-neutral-400 hover:text-white hover:border-brand flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* Secure Gmail Investor Desk */}
        <GmailInvestorPortal currentLang={currentLang as 'EN' | 'RU' | 'KG'} />

        {/* Private Concierge & VIP Booking Desk */}
        <ConsultationForm
          currentLang={currentLang}
          preselectedOption={preselectedOption}
          clearPreselectedOption={() => setPreselectedOption('')}
        />

      </main>

      {/* Corporate Deep Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={scrollToSection}
      />

      {/* Floating Call Action Desk (WhatsApp Launcher) */}
      <div id="floating-whatsapp-trigger" className="fixed bottom-6 right-6 z-40 group flex items-center gap-3">
        <span className="bg-[#0D0D0D]/90 text-neutral-200 border border-white/5 rounded-xl px-4 py-2.5 text-xs font-mono font-medium tracking-wide shadow-2xl pointer-events-none opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-sm">
          {getTranslation('floatingText')}
        </span>
        <a
          href="https://wa.me/996555002222?text=Hello%20OBA%20Investment%20Group,%20I%20am%20interested%20in%20your%20premium%20real%20estate%20developments%20in%20Bishkek."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-brand hover:bg-[#C0B097] text-neutral-950 rounded-full flex items-center justify-center shadow-2xl shadow-brand/20 transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce-slow relative"
        >
          <MessageSquare className="w-6 h-6 text-black" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-neutral-950 animate-pulse flex items-center justify-center text-[8px] font-bold text-black">1</span>
        </a>
      </div>

      {/* Hidden Print-only Portfolio PDF Deck */}
      <PrintBrochure />

    </div>
  );
}
