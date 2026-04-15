import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    // App level
    mobileWarning: 'Lütfen masaüstü üzerinden giriniz.',

    // Language toggle
    langCode: 'TR',

    // Header
    backToHub: '← Hub',
    operationCenter: 'Hoterfea — Operasyon Merkezi',
    allModulesAccessible: 'Tüm modüller erişilebilir',
    occupancyStat: 'Doluluk',
    inHouseStat: 'İç Misafir',
    balanceStat: 'Bakiye',
    smartSearchPlaceholder: 'Akıllı arama (Örn: restoran bölümünü aç)',
    searchModulesLabel: 'Modüller / Özellikler',
    aiCompatible: 'AI UYUMLU',
    searchGuestsLabel: 'Misafirler (Fuzzy Match)',
    noResultsMsg: 'Aradığınız kriterlere uygun sonuç bulunamadı.',
    noResultsHint: 'Eşanlamlı veya farklı kelimeler deneyin.',
    notificationsTitle: 'Bildirimler',
    superAdminTitle: 'Süper Yönetici',
    logoutTitle: 'Çıkış Yap',

    // Sidebar
    modulesLabel: 'MODÜLLER',
    searchModulePlaceholder: 'Modül veya özellik ara...',
    noModuleFound: 'Hiçbir sonuç bulunamadı.',
    occupancyShort: 'Doluluk',
    inHouseShort: 'İçeride',
    taskShort: 'Görev',
    systemSettings: 'Sistem Ayarları',

    // ModuleGrid
    welcomeTitle: 'Hoş Geldiniz 👋',
    welcomeDesc: (ci, co) => `Tüm otel operasyonunuz tek ekranda. Bugün ${ci} giriş, ${co} çıkış bekleniyor.`,
    pendingCheckIn: 'Bekleyen Giriş',
    checkedIn: 'İçerideki',
    occupancyLabel: 'Doluluk',
    openBalance: 'Açık Bakiye',
    moduleSearchPlaceholder: 'Modül ara... (Restoran, KBS, Kasa...)',
    grouped: 'Kategorili',
    grid: 'Izgara',
    searchResultsLabel: (q, count) => `"${q}" için ${count} sonuç:`,
    pinnedModules: 'Sabitlenmiş Modüller',
    operationalModule: 'Operasyonel Modül',
    pinned: 'Sabitlenmiş',
    pin: 'Sabitle',
    modules: 'modül',

    // Group labels
    groupFront: '🏨 Ön Büro & Operasyon',
    groupRevenue: '💰 Gelir & Finans',
    groupFB: '🍽️ Yiyecek & İçecek',
    groupGuest: '👥 Misafir İlişkileri',
    groupOperations: '⚙️ Operasyon & Destek',
    groupAnalytics: '📊 Analiz & Raporlama',
    groupSystem: '🔧 Sistem & Entegrasyon',

    // Login
    usernameLabel: 'Kullanıcı Adı',
    usernamePlaceholder: 'Kullanıcı adınızı girin...',
    passwordLabel: 'Şifre',
    passwordPlaceholder: 'Şifre',
    workYearLabel: 'Çalışma Yılı',
    branchLabel: 'Şube/Otel Seçiniz',
    selectOption: 'Seçiniz...',
    loginBtn: 'Sisteme Giriş',
    exchangeRates: 'Döviz Kurları',
    serverActive: 'Sunucu: Aktif',
    userIP: 'Kullanıcı IP: 192.168.1.1',

    // MainHub
    loadingModule: 'Modül Yükleniyor...',
    moduleNotFound: 'Modül içeriği bulunamadı.',

    // Landing page
    lpFeatures: 'Özellikler',
    lpModules: 'Modüller',
    lpHowItWorks: 'Nasıl Çalışır',
    lpSeePresentation: 'Sunumu Gör',
    lpLiveDemo: 'Canlı Demo',
    lpHeroChip: 'AI-Powered Hotel Management',
    lpHeroTitle1: 'Otel Yönetimini',
    lpHeroTitle2: 'Yeniden Tanımlıyoruz',
    lpHeroDesc: 'Hoterfea, yapay zeka destekli akıllı arama motoru, 45+ entegre modül ve gerçek zamanlı operasyon paneli ile otellerin tüm departmanlarını tek bir platformdan yönetmelerini sağlayan yeni nesil ERP sistemidir.',
    lpStartDemo: "Demo'yu Başlat",
    lpViewPresentation: 'Sunumu İzle',
    lpFeaturesTitle: 'Her Departman,',
    lpFeaturesTitle2: 'Tek Platformda',
    lpModulesTitle: 'Hangi Modüller',
    lpModulesTitle2: 'Dahil?',
    lpModulesDesc: 'İhtiyacınıza göre aktif edin. Tüm modüller birbirine entegre çalışır.',
    lpWorkflowTitle: 'Misafir Deneyimi,',
    lpWorkflowTitle2: 'Baştan Sona Otomatik',
    lpCtaTitle: 'Geleceğin Otel Yönetimini',
    lpCtaTitle2: 'Bugün Deneyin',
    lpCtaDesc: 'Demo hesabıyla tüm özellikleri ücretsiz keşfedin. Kurulum gerektirmez.',
    lpCtaBtn: "Demo'yu Başlat",
    lpModuleCount: 'Modül',
    lpChannelCount: '+ OTA Kanalı',
    lpUptime: '% Uptime',
    lpFooter: '© 2026 Hoterfea. Tüm hakları saklıdır.',

    // Category names (for moduleList)
    catDashboard: 'Dashboard & Analitik',
    catFrontOffice: 'Ön Büro & Rez.',
    catOperations: 'Operasyon',
    catFoodBeverage: 'Yiyecek & İçecek',
    catSalesMarketing: 'Satış & Pazarlama',
    catFinance: 'Finans',
    catMaterialsHR: 'Malzeme & İK',
    catSystem: 'Sistem',
  },

  en: {
    // App level
    mobileWarning: 'Please access from a desktop device.',

    // Language toggle
    langCode: 'EN',

    // Header
    backToHub: '← Hub',
    operationCenter: 'Hoterfea — Operations Center',
    allModulesAccessible: 'All modules accessible',
    occupancyStat: 'Occupancy',
    inHouseStat: 'In-House',
    balanceStat: 'Balance',
    smartSearchPlaceholder: 'Smart search (e.g., open restaurant section)',
    searchModulesLabel: 'Modules / Features',
    aiCompatible: 'AI POWERED',
    searchGuestsLabel: 'Guests (Fuzzy Match)',
    noResultsMsg: 'No results found matching your criteria.',
    noResultsHint: 'Try synonyms or different keywords.',
    notificationsTitle: 'Notifications',
    superAdminTitle: 'Super Admin',
    logoutTitle: 'Logout',

    // Sidebar
    modulesLabel: 'MODULES',
    searchModulePlaceholder: 'Search module or feature...',
    noModuleFound: 'No results found.',
    occupancyShort: 'Occupancy',
    inHouseShort: 'In-House',
    taskShort: 'Tasks',
    systemSettings: 'System Settings',

    // ModuleGrid
    welcomeTitle: 'Welcome 👋',
    welcomeDesc: (ci, co) => `All hotel operations in one screen. Today: ${ci} check-ins, ${co} check-outs expected.`,
    pendingCheckIn: 'Pending Check-in',
    checkedIn: 'Checked In',
    occupancyLabel: 'Occupancy',
    openBalance: 'Open Balance',
    moduleSearchPlaceholder: 'Search module... (Restaurant, POS, Cash...)',
    grouped: 'Grouped',
    grid: 'Grid',
    searchResultsLabel: (q, count) => `${count} results for "${q}":`,
    pinnedModules: 'Pinned Modules',
    operationalModule: 'Operational Module',
    pinned: 'Pinned',
    pin: 'Pin',
    modules: 'modules',

    // Group labels
    groupFront: '🏨 Front Office & Operations',
    groupRevenue: '💰 Revenue & Finance',
    groupFB: '🍽️ Food & Beverage',
    groupGuest: '👥 Guest Relations',
    groupOperations: '⚙️ Operations & Support',
    groupAnalytics: '📊 Analytics & Reporting',
    groupSystem: '🔧 System & Integrations',

    // Login
    usernameLabel: 'Username',
    usernamePlaceholder: 'Enter your username...',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Password',
    workYearLabel: 'Working Year',
    branchLabel: 'Select Branch/Hotel',
    selectOption: 'Select...',
    loginBtn: 'Sign In',
    exchangeRates: 'Exchange Rates',
    serverActive: 'Server: Active',
    userIP: 'User IP: 192.168.1.1',

    // MainHub
    loadingModule: 'Loading Module...',
    moduleNotFound: 'Module content not found.',

    // Landing page
    lpFeatures: 'Features',
    lpModules: 'Modules',
    lpHowItWorks: 'How It Works',
    lpSeePresentation: 'View Presentation',
    lpLiveDemo: 'Live Demo',
    lpHeroChip: 'AI-Powered Hotel Management',
    lpHeroTitle1: 'Redefining',
    lpHeroTitle2: 'Hotel Management',
    lpHeroDesc: 'Hoterfea is a next-generation ERP system that enables hotels to manage all departments from a single platform with an AI-powered smart search engine, 45+ integrated modules, and real-time operations dashboard.',
    lpStartDemo: 'Start Demo',
    lpViewPresentation: 'View Presentation',
    lpFeaturesTitle: 'Every Department,',
    lpFeaturesTitle2: 'One Platform',
    lpModulesTitle: 'What Modules',
    lpModulesTitle2: 'Are Included?',
    lpModulesDesc: 'Activate as needed. All modules work integrated with each other.',
    lpWorkflowTitle: 'Guest Experience,',
    lpWorkflowTitle2: 'Automated End-to-End',
    lpCtaTitle: 'Try the Future of',
    lpCtaTitle2: 'Hotel Management Today',
    lpCtaDesc: 'Explore all features for free with a demo account. No setup required.',
    lpCtaBtn: 'Start Demo',
    lpModuleCount: 'Modules',
    lpChannelCount: '+ OTA Channels',
    lpUptime: '% Uptime',
    lpFooter: '© 2026 Hoterfea. All rights reserved.',

    // Category names
    catDashboard: 'Dashboard & Analytics',
    catFrontOffice: 'Front Office & Res.',
    catOperations: 'Operations',
    catFoodBeverage: 'Food & Beverage',
    catSalesMarketing: 'Sales & Marketing',
    catFinance: 'Finance',
    catMaterialsHR: 'Materials & HR',
    catSystem: 'System',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('hf_lang') || 'tr'; } catch { return 'tr'; }
  });

  const toggleLang = () => {
    const newLang = lang === 'tr' ? 'en' : 'tr';
    setLang(newLang);
    try { localStorage.setItem('hf_lang', newLang); } catch {}
  };

  const t = (key) => {
    const val = translations[lang]?.[key];
    if (val !== undefined) return val;
    return translations['tr']?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
