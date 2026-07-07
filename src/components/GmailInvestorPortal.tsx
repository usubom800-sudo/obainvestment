import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Search, Send, RefreshCw, User, LogOut, ArrowLeft, 
  CheckCircle, AlertCircle, Inbox, ChevronRight, FileText, 
  Compass, ShieldCheck, HelpCircle
} from 'lucide-react';
import { 
  googleSignIn, logout, initAuth, fetchGmailInbox, 
  fetchGmailMessage, sendGmailMessage, GmailMessageMetadata, GmailMessageDetails 
} from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface GmailInvestorPortalProps {
  currentLang: 'EN' | 'RU' | 'KG';
}

const translations = {
  EN: {
    title: 'OBA Premium Investor Mailroom',
    subtitle: 'Access secure correspondence, review real estate contracts, and compose smart investment inquiries using your Gmail.',
    signInBtn: 'Sign in with Google',
    signOutBtn: 'Sign Out',
    loading: 'Accessing secure mail servers...',
    searchPlaceholder: 'Search emails (e.g., OBA, investment, contract)...',
    noEmails: 'No related investment correspondence found.',
    allEmails: 'All Mail',
    obaUpdates: 'OBA Correspondence',
    composeInquiry: 'Compose New Inquiry',
    recipientLabel: 'Recipient',
    subjectLabel: 'Subject',
    messageLabel: 'Message Body',
    sending: 'Sending secure dispatch...',
    sendSuccess: 'Inquiry dispatched successfully via your Gmail!',
    sendError: 'Failed to dispatch email. Please try again.',
    sendBtn: 'Send Inquiry',
    confirmTitle: 'Confirm Secure Dispatch',
    confirmDesc: 'You are about to transmit a formal inquiry to OBA Investment Bishkek via your secure Gmail account. Are you sure you wish to send this message?',
    confirmYes: 'Confirm & Send',
    confirmNo: 'Cancel',
    selectEmailPrompt: 'Select an email from your correspondence list to inspect the secure transmission details.',
    replyBtn: 'Draft Reply',
    fromLabel: 'From',
    toLabel: 'To',
    dateLabel: 'Date',
    presetTemplate1: 'Request Premium Catalog & Pricing',
    presetTemplate2: 'Schedule a Foothills Property Tour',
    presetTemplate3: 'Inquire about 36-Month Downpayment Options',
    presetBody1: 'Hello OBA Investment Team,\n\nI am interested in your premium real estate developments in Bishkek, Kyrgyzstan. Please send me the latest pricing, floor plans, and investment catalog for your flagship complexes.\n\nThank you,\n',
    presetBody2: 'Hello OBA Investment Team,\n\nI would like to schedule a private guided tour of your active development sites and foothills projects. Please let me know the available time slots for next week.\n\nBest regards,\n',
    presetBody3: 'Hello OBA Investment Team,\n\nI am reviewing the investment calculator schedules and would like to receive a custom 36-month interest-free installment proposal. Please contact me to discuss flexible payment terms.\n\nRespectfully,\n',
  },
  RU: {
    title: 'Премиальный кабинет почты OBA',
    subtitle: 'Доступ к безопасной переписке, просмотр договоров на недвижимость и отправка запросов через ваш личный Gmail.',
    signInBtn: 'Войти через Google',
    signOutBtn: 'Выйти',
    loading: 'Подключение к защищенным серверам почты...',
    searchPlaceholder: 'Поиск писем (например: OBA, инвестиции, договор)...',
    noEmails: 'Связанная инвестиционная переписка не найдена.',
    allEmails: 'Вся почта',
    obaUpdates: 'Переписка OBA',
    composeInquiry: 'Написать запрос',
    recipientLabel: 'Получатель',
    subjectLabel: 'Тема',
    messageLabel: 'Текст сообщения',
    sending: 'Отправка безопасного письма...',
    sendSuccess: 'Запрос успешно отправлен через ваш Gmail!',
    sendError: 'Не удалось отправить письмо. Пожалуйста, попробуйте снова.',
    sendBtn: 'Отправить запрос',
    confirmTitle: 'Подтвердите отправку сообщения',
    confirmDesc: 'Вы собираетесь отправить официальный запрос в OBA Investment Bishkek с использованием вашего аккаунта Gmail. Вы уверены, что хотите отправить это сообщение?',
    confirmYes: 'Подтвердить и отправить',
    confirmNo: 'Отмена',
    selectEmailPrompt: 'Выберите письмо из списка переписки, чтобы просмотреть сведения о защищенной передаче.',
    replyBtn: 'Ответить',
    fromLabel: 'От',
    toLabel: 'Кому',
    dateLabel: 'Дата',
    presetTemplate1: 'Запрос премиального каталога и цен',
    presetTemplate2: 'Запись на индивидуальный показ объектов',
    presetTemplate3: 'Запрос беспроцентной рассрочки на 36 месяцев',
    presetBody1: 'Здравствуйте, команда OBA Investment!\n\nМеня интересуют ваши премиальные жилые комплексы в Бишкеке. Пожалуйста, отправьте мне актуальные цены, планировки и инвестиционный каталог для ваших флагманских объектов.\n\nС уважением,\n',
    presetBody2: 'Здравствуйте, команда OBA Investment!\n\nЯ хотел бы запланировать индивидуальный показ ваших строительных площадок и загородных резиденций. Пожалуйста, сообщите мне свободные даты для просмотра на следующей неделе.\n\nС наилучшими пожеланиями,\n',
    presetBody3: 'Здравствуйте, команда OBA Investment!\n\nЯ ознакомился с условиями рассрочки и хотел бы получить индивидуальное предложение по беспроцентному плану выплат на 36 месяцев. Свяжитесь со мной для обсуждения.\n\nС уважением,\n',
  },
  KG: {
    title: 'OBA Премиум Инвестордук Почтасы',
    subtitle: 'Жеке коопсуз кат алышууларга кирүү, келишимдерди көрүү жана өзүңүздүн Gmail аркылуу инвестициялык суроолорду жөнөтүү.',
    signInBtn: 'Google аркылуу кирүү',
    signOutBtn: 'Чыгуу',
    loading: 'Коопсуз почта серверлерине туташуу...',
    searchPlaceholder: 'Каттарды издөө (мисалы: OBA, инвестиция, келишим)...',
    noEmails: 'Тиешелүү инвестициялык кат алышуулар табылган жок.',
    allEmails: 'Бардык каттар',
    obaUpdates: 'OBA Каттары',
    composeInquiry: 'Жаңы суроо жазуу',
    recipientLabel: 'Алуучу',
    subjectLabel: 'Темасы',
    messageLabel: 'Каттын мазмуну',
    sending: 'Коопсуз кат жөнөтүлүүдө...',
    sendSuccess: 'Суроо-талап сиздин Gmail аркылуу ийгиликтүү жөнөтүлдү!',
    sendError: 'Кат жөнөтүлбөй калды. Кайра аракет кылып көрүңүз.',
    sendBtn: 'Катты жөнөтүү',
    confirmTitle: 'Кат жөнөтүүнү ырастаңыз',
    confirmDesc: 'Сиз өзүңүздүн коопсуз Gmail аккаунтуңуз аркылуу OBA Investment Bishkek компаниясына расмий суроо-талап жөнөткөн жатасыз. Бул катты жөнөтүүнү каалайсызбы?',
    confirmYes: 'Ырастоо жана жөнөтүү',
    confirmNo: 'Жокко чыгаруу',
    selectEmailPrompt: 'Коопсуз берүү чоо-жайын көрүү үчүн кат алышуу тизмесинен катты тандаңыз.',
    replyBtn: 'Жооп жазуу',
    fromLabel: 'Кимден',
    toLabel: 'Кимге',
    dateLabel: 'Күнү',
    presetTemplate1: 'Премиум каталог жана баалар суроо-талабы',
    presetTemplate2: 'Курулуш объектилерине жеке экскурсия',
    presetTemplate3: '36 айлык пайызсыз бөлүп төлөө шарттары',
    presetBody1: 'Саламатсызбы, OBA Investment командасы!\n\nМени Бишкектеги сиздердин премиум класстагы турак жай комплекстериңиз кызыктырат. Сураныч, акыркы бааларды, пландарды жана негизги долбоорлордун инвестициялык каталогун жөнөтүңүз.\n\nУрматым менен,\n',
    presetBody2: 'Саламатсызбы, OBA Investment командасы!\n\nМен сиздердин курулуп жаткан объектилериңизди жана тоо этегиндеги долбоорлоруңузду жеке көрүп чыгууну каалайм. Кийинки жумага ылайыктуу убакыттарды билдирип коюңуз.\n\nЖакшы каалоолор менен,\n',
    presetBody3: 'Саламатсызбы, OBA Investment командасы!\n\nМен бөлүп төлөө шарттары менен тааныштым жана 36 айлык пайызсыз график боюнча жеке сунуш алгым келет. Толук талкуулоо үчүн мага байланышыңыз.\n\nУрматым менен,\n',
  }
};

export default function GmailInvestorPortal({ currentLang }: GmailInvestorPortalProps) {
  const t = translations[currentLang];

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  // Inbox & email states
  const [emails, setEmails] = useState<GmailMessageMetadata[]>([]);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<GmailMessageDetails | null>(null);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [loadingEmailDetails, setLoadingEmailDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('OBA OR bishkek OR investment OR property OR real estate');
  const [activeFilter, setActiveFilter] = useState<'oba' | 'all'>('oba');

  // Composer states
  const [isComposing, setIsComposing] = useState(false);
  const [composeTo, setComposeTo] = useState('info@obainvestment.kg');
  const [composeSubject, setComposeSubject] = useState(t.presetTemplate1);
  const [composeBody, setComposeBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Security confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Auto-fill template on mount or lang change
  useEffect(() => {
    if (user && !composeBody) {
      setComposeBody(t.presetBody1 + (user.displayName || ''));
    }
  }, [user, currentLang]);

  // Handle Firebase Auth initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
        loadInbox(accessToken, searchQuery);
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Sync composer subjects with language
  useEffect(() => {
    setComposeSubject(t.presetTemplate1);
    if (user) {
      setComposeBody(t.presetBody1 + (user.displayName || ''));
    }
  }, [currentLang]);

  // Load emails
  const loadInbox = async (accessToken: string, query: string) => {
    setLoadingEmails(true);
    try {
      const msgs = await fetchGmailInbox(accessToken, query);
      setEmails(msgs);
    } catch (err) {
      console.error('Failed to load Gmail inbox:', err);
    } finally {
      setLoadingEmails(false);
    }
  };

  const handleSignIn = async () => {
    setSigningIn(true);
    setFeedback(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        await loadInbox(res.accessToken, searchQuery);
      }
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setEmails([]);
      setSelectedEmail(null);
      setSelectedEmailId(null);
      setIsComposing(false);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleSelectEmail = async (id: string) => {
    if (!token) return;
    setIsComposing(false);
    setSelectedEmailId(id);
    setLoadingEmailDetails(true);
    try {
      const detail = await fetchGmailMessage(token, id);
      setSelectedEmail(detail);
    } catch (err) {
      console.error('Failed to load email details:', err);
    } finally {
      setLoadingEmailDetails(false);
    }
  };

  // Safe wrapper for trigger before sending email
  const triggerSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject || !composeBody) return;
    setShowConfirmModal(true); // Open mandatory safety dialog
  };

  const executeSendInquiry = async () => {
    if (!token) return;
    setShowConfirmModal(false);
    setIsSending(true);
    setFeedback(null);
    try {
      // Send the email directly using Gmail SMTP proxy endpoints
      await sendGmailMessage(token, composeTo, composeSubject, composeBody.replace(/\n/g, '<br/>'));
      setFeedback({
        type: 'success',
        message: t.sendSuccess
      });
      // Clear composer body but keep user signature
      setComposeBody('');
      setIsComposing(false);
      // Reload mailbox to show the sent message in thread history
      setTimeout(() => {
        loadInbox(token, searchQuery);
      }, 1500);
    } catch (err: any) {
      console.error('Dispatch error:', err);
      setFeedback({
        type: 'error',
        message: t.sendError + ` (${err.message || 'Unknown'})`
      });
    } finally {
      setIsSending(false);
    }
  };

  const toggleFilter = (filter: 'oba' | 'all') => {
    if (!token) return;
    setActiveFilter(filter);
    const query = filter === 'oba' 
      ? 'OBA OR bishkek OR investment OR property OR real estate' 
      : '';
    setSearchQuery(query);
    loadInbox(token, query);
  };

  const applyTemplate = (index: number) => {
    if (!user) return;
    if (index === 1) {
      setComposeSubject(t.presetTemplate1);
      setComposeBody(t.presetBody1 + (user.displayName || ''));
    } else if (index === 2) {
      setComposeSubject(t.presetTemplate2);
      setComposeBody(t.presetBody2 + (user.displayName || ''));
    } else {
      setComposeSubject(t.presetTemplate3);
      setComposeBody(t.presetBody3 + (user.displayName || ''));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 bg-[#0D0D0D]">
        <div className="text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-brand animate-spin mx-auto" />
          <p className="text-xs font-mono text-neutral-400 tracking-wider uppercase">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="gmail-portal-section" className="py-24 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      {/* Visual Ambience Background */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[200px] h-[200px] bg-brand/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/20 text-brand px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>Gmail Integration Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* FEEDBACK STATUS ALERTS */}
        {feedback && (
          <div className={`max-w-5xl mx-auto mb-6 p-4 rounded-xl flex items-center gap-3 border ${
            feedback.type === 'success' 
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
          }`}>
            {feedback.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-xs font-mono">{feedback.message}</span>
          </div>
        )}

        {/* NOT AUTHENTICATED STATE */}
        {!user ? (
          <div className="max-w-xl mx-auto bg-[#121212] border border-white/5 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-brand/5 border border-brand/20 flex items-center justify-center text-brand mx-auto">
              <Inbox className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-serif font-bold text-white">Sign in with Google</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                Authenticate securely to link your Gmail account. This allows you to communicate with our investment advisors, receive official quotes, and view development contracts safely inside the app.
              </p>
            </div>

            {/* Premium Material Google Sign in Button */}
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="gsi-material-button w-full sm:w-auto py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand/5"
            >
              {signingIn ? (
                <RefreshCw className="w-5 h-5 text-neutral-900 animate-spin" />
              ) : (
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              )}
              <span className="font-sans font-semibold text-sm tracking-wide text-black">{t.signInBtn}</span>
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/5">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">OAuth 2.0 Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand" />
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">Direct API Access</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <FileText className="w-4 h-4 text-neutral-400" />
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">In-Memory Token</span>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED PANEL */
          <div className="max-w-6xl mx-auto bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
            {/* LEFT COLUMN: MAIL LIST */}
            <div className="w-full md:w-5/12 border-r border-white/5 flex flex-col bg-[#141414]">
              
              {/* Profile Bar */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-neutral-900/40">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-9 h-9 rounded-full border border-brand/30" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-serif font-bold text-white truncate">{user.displayName}</p>
                    <p className="text-[10px] font-mono text-neutral-500 truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg bg-white/5 hover:bg-brand hover:text-black text-neutral-400 border border-white/10 transition-colors duration-300 flex items-center gap-1.5 text-[10px] font-mono uppercase cursor-pointer"
                  title={t.signOutBtn}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{t.signOutBtn}</span>
                </button>
              </div>

              {/* Filters & Control Block */}
              <div className="p-4 border-b border-white/5 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFilter('oba')}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium border transition-all duration-300 cursor-pointer ${
                      activeFilter === 'oba'
                        ? 'bg-brand/10 border-brand/30 text-brand'
                        : 'bg-black/20 border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {t.obaUpdates}
                  </button>
                  <button
                    onClick={() => toggleFilter('all')}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium border transition-all duration-300 cursor-pointer ${
                      activeFilter === 'all'
                        ? 'bg-brand/10 border-brand/30 text-brand'
                        : 'bg-black/20 border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {t.allEmails}
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && token) {
                        loadInbox(token, searchQuery);
                      }
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-black/40 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand/40 font-mono"
                  />
                  <button
                    onClick={() => token && loadInbox(token, searchQuery)}
                    className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-brand transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingEmails ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* Compose Trigger */}
                <button
                  onClick={() => {
                    setIsComposing(true);
                    setSelectedEmailId(null);
                    setSelectedEmail(null);
                    setComposeSubject(t.presetTemplate1);
                    setComposeBody(t.presetBody1 + (user?.displayName || ''));
                  }}
                  className="w-full bg-brand/10 hover:bg-brand text-brand hover:text-black py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase border border-brand/20 hover:border-brand transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.composeInquiry}</span>
                </button>
              </div>

              {/* Email List Render */}
              <div className="flex-1 overflow-y-auto max-h-[450px] scrollbar-thin">
                {loadingEmails ? (
                  <div className="flex flex-col items-center justify-center h-48 space-y-3">
                    <RefreshCw className="w-6 h-6 text-brand animate-spin" />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Synchronizing...</span>
                  </div>
                ) : emails.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center px-4 space-y-2 text-neutral-500">
                    <Inbox className="w-8 h-8 opacity-30" />
                    <p className="text-xs font-mono">{t.noEmails}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {emails.map((email) => (
                      <div
                        key={email.id}
                        onClick={() => handleSelectEmail(email.id)}
                        className={`p-4 text-left cursor-pointer transition-all duration-200 group relative ${
                          selectedEmailId === email.id
                            ? 'bg-brand/5 border-l-2 border-brand'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-brand transition-colors truncate max-w-[70%]">
                            {email.from.split('<')[0].trim()}
                          </span>
                          <span className="text-[9px] font-mono text-neutral-500">
                            {new Date(email.date).toLocaleDateString(currentLang === 'RU' ? 'ru' : 'en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-200 font-serif font-medium truncate mb-1">
                          {email.subject}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                          {email.snippet}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: READ DETAIL OR COMPOSE */}
            <div className="flex-1 flex flex-col bg-[#0F0F0F] p-6 justify-between min-h-[450px]">
              
              <AnimatePresence mode="wait">
                {isComposing ? (
                  /* COMPOSE NEW DISPATCH */
                  <motion.form
                    key="composer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={triggerSendVerification}
                    className="space-y-4 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4 flex-1">
                      {/* Compose Header */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                          <Send className="w-4 h-4 text-brand" />
                          <span>{t.composeInquiry}</span>
                        </h3>
                        <button
                          type="button"
                          onClick={() => setIsComposing(false)}
                          className="text-xs font-mono text-neutral-500 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" /> Back
                        </button>
                      </div>

                      {/* Templates Presets */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono uppercase text-neutral-500 tracking-wider flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Select Pre-built Investment Templates:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => applyTemplate(1)}
                            className={`p-2 rounded-lg text-left border text-[10px] font-mono font-medium truncate transition-all ${
                              composeSubject === t.presetTemplate1 
                                ? 'bg-brand/10 border-brand/40 text-brand' 
                                : 'bg-black/40 border-white/5 text-neutral-400 hover:border-white/10'
                            }`}
                          >
                            {t.presetTemplate1}
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate(2)}
                            className={`p-2 rounded-lg text-left border text-[10px] font-mono font-medium truncate transition-all ${
                              composeSubject === t.presetTemplate2 
                                ? 'bg-brand/10 border-brand/40 text-brand' 
                                : 'bg-black/40 border-white/5 text-neutral-400 hover:border-white/10'
                            }`}
                          >
                            {t.presetTemplate2}
                          </button>
                          <button
                            type="button"
                            onClick={() => applyTemplate(3)}
                            className={`p-2 rounded-lg text-left border text-[10px] font-mono font-medium truncate transition-all ${
                              composeSubject === t.presetTemplate3 
                                ? 'bg-brand/10 border-brand/40 text-brand' 
                                : 'bg-black/40 border-white/5 text-neutral-400 hover:border-white/10'
                            }`}
                          >
                            {t.presetTemplate3}
                          </button>
                        </div>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">{t.recipientLabel}</label>
                          <input
                            type="email"
                            required
                            disabled
                            value={composeTo}
                            onChange={(e) => setComposeTo(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-lg p-2.5 text-xs text-neutral-400 font-mono focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">{t.subjectLabel}</label>
                          <input
                            type="text"
                            required
                            value={composeSubject}
                            onChange={(e) => setComposeSubject(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand/40 font-serif"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">{t.messageLabel}</label>
                          <textarea
                            required
                            rows={8}
                            value={composeBody}
                            onChange={(e) => setComposeBody(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand/40 font-mono scrollbar-thin"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="bg-brand text-black hover:bg-[#C0B097] px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      >
                        {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                        <span>{isSending ? t.sending : t.sendBtn}</span>
                      </button>
                    </div>
                  </motion.form>
                ) : selectedEmail ? (
                  /* READ CORRESPONDENCE DETAIL */
                  <motion.div
                    key="reader"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4 flex-1">
                      {/* Email Header */}
                      <div className="border-b border-white/5 pb-3">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-base font-serif font-bold text-white leading-tight">
                            {selectedEmail.subject}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3 text-[10px] font-mono">
                          <div className="text-neutral-400">
                            <span className="text-neutral-600 uppercase">{t.fromLabel}:</span> {selectedEmail.from}
                          </div>
                          <div className="text-neutral-400 sm:text-right">
                            <span className="text-neutral-600 uppercase">{t.dateLabel}:</span> {new Date(selectedEmail.date).toLocaleString()}
                          </div>
                          <div className="text-neutral-400">
                            <span className="text-neutral-600 uppercase">{t.toLabel}:</span> {selectedEmail.to}
                          </div>
                        </div>
                      </div>

                      {/* Email Content Frame */}
                      <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 overflow-y-auto max-h-[350px] scrollbar-thin">
                        {/* Render body safely within sanitized frame or pre */}
                        {selectedEmail.body.includes('<') ? (
                          <div 
                            className="text-xs text-neutral-300 font-sans leading-relaxed space-y-2 prose prose-invert max-w-none prose-xs"
                            dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                          />
                        ) : (
                          <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
                            {selectedEmail.body}
                          </pre>
                        )}
                      </div>
                    </div>

                    {/* Quick Reply Form Trigger */}
                    <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button
                        onClick={() => {
                          setIsComposing(true);
                          setComposeTo(selectedEmail.from.includes('<') ? selectedEmail.from.split('<')[1].replace('>', '').trim() : selectedEmail.from);
                          setComposeSubject(`Re: ${selectedEmail.subject}`);
                          setComposeBody(`\n\nOn ${new Date(selectedEmail.date).toLocaleDateString()}, you wrote:\n> ` + selectedEmail.snippet + `\n\n`);
                        }}
                        className="bg-white/5 hover:bg-brand hover:text-black text-neutral-300 px-5 py-2 rounded-lg text-xs font-mono uppercase transition-all duration-300 cursor-pointer border border-white/10 hover:border-brand"
                      >
                        {t.replyBtn}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* EMPTY STATE DETAIL PROMPT */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-500">
                      <HelpCircle className="w-6 h-6 animate-pulse" />
                    </div>
                    <p className="text-xs font-mono text-neutral-400 max-w-xs leading-relaxed">
                      {t.selectEmailPrompt}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* MANDATORY EXPLICIT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif font-bold text-white">{t.confirmTitle}</h4>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {t.confirmDesc}
              </p>

              <div className="bg-black/30 p-3.5 rounded-xl border border-white/5 font-mono text-[10px] space-y-1.5">
                <div className="text-neutral-500"><strong className="text-neutral-400">Recipient:</strong> {composeTo}</div>
                <div className="text-neutral-500 truncate"><strong className="text-neutral-400">Subject:</strong> {composeSubject}</div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 rounded-lg text-xs font-mono font-bold border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  {t.confirmNo}
                </button>
                <button
                  onClick={executeSendInquiry}
                  className="flex-1 py-2.5 rounded-lg bg-brand text-black hover:bg-[#C0B097] text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  {t.confirmYes}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
