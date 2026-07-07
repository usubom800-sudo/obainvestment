import { Shield, Mail, Phone, MapPin, Award, Building2, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentLang: string;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ currentLang, onNavigate }: FooterProps) {
  
  const menuItems = [
    { id: 'about', label: { EN: 'About OBA', RU: 'О компании OBA', KG: 'OBA жөнүндө' } },
    { id: 'complexes', label: { EN: 'Residential Complexes', RU: 'Жилые комплексы', KG: 'Турак-жай комплекстери' } },
    { id: 'selector', label: { EN: 'Apartment Finder', RU: 'Выбор планировок', KG: 'Батирлерди тандоо' } },
    { id: 'calculator', label: { EN: 'Investment Calculator', RU: 'Калькулятор рассрочки', KG: 'Инвестициялык эсептегич' } },
    { id: 'map', label: { EN: 'Bishkek Locations', RU: 'Районы Бишкека', KG: 'Бишкектин райондору' } }
  ];

  const getLabel = (item: typeof menuItems[0]) => {
    return (item.label as Record<string, string>)[currentLang] || item.label.EN;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="oba-footer" className="bg-[#0D0D0D] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative line patterns */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
        
        {/* Brand statement column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center border border-brand/30 bg-[#121212]/30 rounded-none">
              <span className="font-serif italic text-lg text-brand font-light">O</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-light tracking-[0.2em] text-white">
                OBA <span className="text-brand italic">INVESTMENT</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 font-mono mt-0.5">
                Bishkek Prestige
              </span>
            </div>
          </div>

          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed opacity-85">
            OBA Investment is the premier development and real estate construction company in the Kyrgyz Republic. We build landmark properties characterized by neoclassical beauty, cutting-edge thermal comfort, and 9-grade seismic safety.
          </p>

          <div className="flex items-center gap-3 bg-[#121212]/50 p-4 rounded-none border border-white/5 max-w-sm">
            <Shield className="w-5 h-5 text-brand flex-shrink-0" />
            <div className="text-[10px] font-mono text-neutral-400 space-y-0.5 leading-relaxed">
              <p className="font-bold text-neutral-300">BUILDER LICENSE №004829</p>
              <p>State Agency for Architecture, Construction and Housing & Communal Services of KR</p>
            </div>
          </div>
        </div>

        {/* Links Column */}
        <div className="lg:col-span-3 space-y-6">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-brand font-bold border-b border-white/5 pb-2">
            Company Sections
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  id={`footer-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className="text-neutral-400 hover:text-brand transition-colors cursor-pointer text-left py-0.5"
                >
                  {getLabel(item)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact/HQ Column */}
        <div className="lg:col-span-5 space-y-6">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-brand font-bold border-b border-white/5 pb-2">
            Bishkek Headquarters
          </h4>
          
          <div className="space-y-4 text-xs sm:text-sm">
            
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-neutral-400 leading-relaxed">
                <p className="text-white font-semibold">OBA Showroom & Office</p>
                <p>21 Erkindik Boulevard (near Chuy Avenue)</p>
                <p>Bishkek, 720040, Kyrgyz Republic</p>
              </div>
            </div>

            {/* Telephone lines */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-neutral-400 font-mono">
                <p className="text-white font-semibold font-sans">Corporate Lines</p>
                <p>+996 (555) 00-22-22 (VIP Private Clients)</p>
                <p>+996 (312) 90-80-70 (Landline / Reception)</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-neutral-400 font-mono">
                <p className="text-white font-semibold font-sans">Investor Relations</p>
                <p>invest@oba.kg</p>
                <p>vip@oba.kg</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Deep Footer / Copyright / Disclaimers */}
      <div id="footer-deep-bar" className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
        <div className="text-center sm:text-left space-y-1">
          <p>© {currentYear} OBA INVESTMENT COMPANY LLC. ALL RIGHTS RESERVED.</p>
          <p className="text-[9px] text-neutral-600 font-light">
            All plans, visuals, layouts, and specifications displayed are for informational purposes and subject to refinement during development.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://oneconstruction.kg/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors flex items-center gap-1 text-[9px]">
            <span>Inspired by OneConstruction</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>•</span>
          <span>Bishkek, KR</span>
        </div>
      </div>

    </footer>
  );
}
