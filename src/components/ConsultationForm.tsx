import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, ShieldCheck, CheckCircle2, Calendar, Award, Sparkles } from 'lucide-react';

interface ConsultationFormProps {
  currentLang: string;
  preselectedOption: string;
  clearPreselectedOption: () => void;
}

export default function ConsultationForm({ currentLang, preselectedOption, clearPreselectedOption }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'general',
    channel: 'whatsapp',
    preferredTime: 'morning'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedConcierge, setAssignedConcierge] = useState({
    name: 'Aida Alieva',
    role: 'Senior Private Client Partner',
    phone: '+996 (555) 00-22-22',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
  });

  // Sync preselected option from parents (such as layout selector or financing calculator)
  useEffect(() => {
    if (preselectedOption) {
      setFormData((prev) => ({
        ...prev,
        interest: 'custom',
        customText: preselectedOption
      }));
    }
  }, [preselectedOption]);

  const [customText, setCustomText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Alternate concierge just to be fun and dynamic
    if (Math.random() > 0.5) {
      setAssignedConcierge({
        name: 'Ulan Sydykov',
        role: 'VIP Concierge Director',
        phone: '+996 (777) 11-33-33',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80'
      });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      interest: 'general',
      channel: 'whatsapp',
      preferredTime: 'morning'
    });
    setCustomText('');
    clearPreselectedOption();
  };

  const translations = {
    title: { EN: 'Arrange a VIP Presentation', RU: 'VIP Презентация Недвижимости', KG: 'Жеке Көрсөтүүгө Жазылуу' },
    subtitle: {
      EN: 'Schedule a private physical or virtual tour with our Senior Wealth Partners.',
      RU: 'Запланируйте персональный визит или виртуальный тур с вашим личным партнером.',
      KG: 'Жеке көрсөтүү же виртуалдык тур өткөрүү үчүн биздин өнөктөшкө жазылыңыз.'
    },
    nameLabel: { EN: 'Your Name', RU: 'Ваше имя', KG: 'Сиздин атыңыз' },
    phoneLabel: { EN: 'Contact Number', RU: 'Номер телефона', KG: 'Телефон номериңиз' },
    interestLabel: { EN: 'I am interested in', RU: 'Меня интересует', KG: 'Мени кызыктырган нерсе' },
    channelLabel: { EN: 'Preferred Contact Method', RU: 'Предпочтительный способ связи', KG: 'Байланыш ыкмасы' },
    timeLabel: { EN: 'Preferred Meeting Time', RU: 'Удобное время для звонка', KG: 'Чалуу убактысы' },
    submitBtn: { EN: 'Request Private Presentation', RU: 'Отправить VIP запрос', KG: 'VIP суроо-талап жөнөтүү' },
    whatsapp: { EN: 'WhatsApp Chat', RU: 'Чат в WhatsApp', KG: 'WhatsApp Чат' },
    telegram: { EN: 'Telegram Direct', RU: 'Telegram Direct', KG: 'Telegram Direct' },
    gsm: { EN: 'Direct GSM Phone Call', RU: 'Телефонный звонок GSM', KG: 'Түз телефон чалуу' },
    successHeader: { EN: 'VIP Request Received', RU: 'Запрос принят', KG: 'Кабыл алынды' },
    successDesc: {
      EN: 'Your personal broker has been assigned and will establish contact within 15 minutes.',
      RU: 'Ваш персональный брокер назначен и свяжется с вами в течение 15 минут.',
      KG: 'Сиздин жеке брокериңиз дайындалды. Ал 15 мүнөттүн ичинде байланышка чыгат.'
    },
    contactAssigned: { EN: 'Assigned Specialist', RU: 'Ваш специалист', KG: 'Жеке адис' },
    scheduleAgain: { EN: 'Send another request', RU: 'Отправить новый запрос', KG: 'Жаңы суроо жөнөтүү' },
    timeMorning: { EN: 'Morning (09:00 - 12:00)', RU: 'Утро (09:00 - 12:00)', KG: 'Эртең менен (09:00 - 12:00)' },
    timeAfternoon: { EN: 'Afternoon (12:00 - 17:00)', RU: 'День (12:00 - 17:00)', KG: 'Түштөн кийин (12:00 - 17:00)' },
    timeEvening: { EN: 'Evening (17:00 - 20:00)', RU: 'Вечер (17:00 - 20:00)', KG: 'Кечинде (17:00 - 20:00)' }
  };

  const getTranslation = (key: keyof typeof translations) => {
    return translations[key][currentLang as keyof typeof translations[typeof key]] || translations[key].EN;
  };

  return (
    <section id="consultation" className="py-24 bg-[#0D0D0D] text-white relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-transparent opacity-40 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Pitch and Assigned Specialist card */}
          <div id="consultation-pitch" className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 text-brand px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Concierge Desk</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif italic tracking-tight font-light text-white">
                {getTranslation('title')}
              </h2>
              <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed opacity-85">
                {getTranslation('subtitle')}
              </p>
            </div>

            {/* Concierge Bio Block */}
            <div className="bg-[#121212]/30 rounded-none border border-white/5 p-6 flex items-center gap-5">
              <img
                src={assignedConcierge.image}
                alt={assignedConcierge.name}
                className="w-16 h-16 rounded-none object-cover border-2 border-brand/30"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-brand uppercase tracking-wider font-semibold">Ready to assist you</p>
                <p className="font-serif font-light italic text-lg text-white">{assignedConcierge.name}</p>
                <p className="text-xs text-neutral-400">{assignedConcierge.role}</p>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">{assignedConcierge.phone}</p>
              </div>
            </div>

            {/* Exclusive client terms checklist */}
            <div className="space-y-3 pt-2 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span>NDA & Absolute Financial Privacy Guarded</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand" />
                <span>Bespoke 1-on-1 Presentation in Bishkek Showroom</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand" />
                <span>Official Builder License #004829 KG</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Booking Card */}
          <div id="consultation-form-container" className="lg:col-span-7">
            <div className="bg-[#121212]/30 border border-white/5 rounded-none p-8 shadow-2xl">
              
              {!isSubmitted ? (
                <form id="vip-booking-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">
                        {getTranslation('nameLabel')}
                      </label>
                      <input
                        id="form-name-input"
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/10 text-xs sm:text-sm rounded-none py-3.5 px-4 focus:border-brand focus:outline-none text-white font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">
                        {getTranslation('phoneLabel')}
                      </label>
                      <input
                        id="form-phone-input"
                        type="tel"
                        name="phone"
                        required
                        placeholder="+996 (555) 01-02-03"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/10 text-xs sm:text-sm rounded-none py-3.5 px-4 focus:border-brand focus:outline-none text-white font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: Interest dropdown / text input */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">
                      {getTranslation('interestLabel')}
                    </label>
                    <select
                      id="form-interest-select"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-white/10 text-xs sm:text-sm rounded-none py-3.5 px-4 focus:border-brand focus:outline-none text-white font-medium cursor-pointer"
                    >
                      <option value="general">Request general investment presentation</option>
                      <option value="ala-archa">Viewing: OBA Ala-Archa Residence</option>
                      <option value="erkindik">Viewing: OBA Erkindik Boulevard</option>
                      <option value="heights">Viewing: OBA Bishkek Heights</option>
                      <option value="custom">Specific Selected Apartment / Calculator Plan</option>
                    </select>
                  </div>

                  {formData.interest === 'custom' && (
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">Selected Detail</label>
                      <textarea
                        id="form-custom-textarea"
                        name="customText"
                        value={formData.customText || customText}
                        onChange={(e) => {
                          setCustomText(e.target.value);
                          handleInputChange(e);
                        }}
                        rows={2}
                        className="w-full bg-black border border-white/10 text-xs sm:text-sm rounded-none py-3 px-4 focus:border-brand focus:outline-none text-white font-medium leading-relaxed"
                      />
                    </div>
                  )}

                  {/* Row 3: Communication channels and meeting times */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">
                        {getTranslation('channelLabel')}
                      </label>
                      <select
                        id="form-channel-select"
                        name="channel"
                        value={formData.channel}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/10 text-xs sm:text-sm rounded-none py-3.5 px-4 focus:border-brand focus:outline-none text-white font-medium cursor-pointer"
                      >
                        <option value="whatsapp">{getTranslation('whatsapp')}</option>
                        <option value="telegram">{getTranslation('telegram')}</option>
                        <option value="gsm">{getTranslation('gsm')}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">
                        {getTranslation('timeLabel')}
                      </label>
                      <select
                        id="form-time-select"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-white/10 text-xs sm:text-sm rounded-none py-3.5 px-4 focus:border-brand focus:outline-none text-white font-medium cursor-pointer"
                      >
                        <option value="morning">{getTranslation('timeMorning')}</option>
                        <option value="afternoon">{getTranslation('timeAfternoon')}</option>
                        <option value="evening">{getTranslation('timeEvening')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Trigger */}
                  <button
                    id="submit-consultation-btn"
                    type="submit"
                    className="w-full bg-brand hover:bg-white text-black font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-brand/10 cursor-pointer text-center block"
                  >
                    {getTranslation('submitBtn')}
                  </button>

                </form>
              ) : (
                /* VIP Submission Success Card */
                <div id="booking-success-receipt" className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-brand/10 text-brand border border-brand/20 rounded-none flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif italic font-light text-2xl text-brand">{getTranslation('successHeader')}</h3>
                    <p className="text-sm text-neutral-300 max-w-md mx-auto">{getTranslation('successDesc')}</p>
                  </div>

                  {/* Formal Receipt Block */}
                  <div className="bg-black border border-white/5 rounded-none p-6 text-left max-w-md mx-auto space-y-4">
                    <p className="text-[10px] font-mono text-brand uppercase tracking-widest font-bold border-b border-white/5 pb-2">VIP Schedule Receipt</p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div className="flex flex-col">
                        <span className="text-neutral-500">Client Name</span>
                        <span className="text-neutral-200 font-bold mt-0.5">{formData.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-neutral-500">Phone Number</span>
                        <span className="text-neutral-200 mt-0.5">{formData.phone}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-neutral-500">Preferred Channel</span>
                        <span className="text-brand uppercase font-bold mt-0.5">{formData.channel}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-neutral-500">Scheduled Period</span>
                        <span className="text-neutral-200 mt-0.5 uppercase">{formData.preferredTime}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center gap-3">
                      <img
                        src={assignedConcierge.image}
                        alt="Broker"
                        className="w-10 h-10 rounded-none object-cover border border-brand/20"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-[10px] text-neutral-500 uppercase">{getTranslation('contactAssigned')}</p>
                        <p className="text-xs font-serif font-light italic text-white mt-0.5">{assignedConcierge.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                    <a
                      id="direct-whatsapp-chat-link"
                      href={`https://wa.me/996555002222?text=Hello%20OBA%20Investment,%20I%20have%20just%20submitted%20a%20VIP%20presentation%20request%20on%20your%20website.%20My%20name%20is%20${encodeURIComponent(formData.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-brand hover:bg-white text-black font-bold py-3.5 px-6 rounded-none text-xs uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    
                    <button
                      id="schedule-another-request-btn"
                      onClick={handleReset}
                      className="flex-1 border border-white/10 hover:border-brand hover:text-brand bg-transparent text-white font-bold py-3.5 px-6 rounded-none text-xs uppercase tracking-wider transition-colors duration-300 cursor-pointer"
                    >
                      {getTranslation('scheduleAgain')}
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
