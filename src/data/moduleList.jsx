import React, { lazy } from 'react';
import {
  Bell, BookOpen, Wallet, Bed, Wrench,
  Box, ShoppingCart, Users, HeartHandshake,
  FileText, Waves, Utensils,
  ShieldCheck, Receipt, Moon,
  Layers, ClipboardCheck, Globe, Zap, Cpu,
  LayoutDashboard,
  Calendar as CalendarIcon, Server, TrendingUp,
  Bot, Database, LayoutGrid, Handshake,
  Wine, Shirt, Package,
  List, Calculator, TrendingDown,
  Music, ShieldCheck as ShieldIcon,
  Globe as GlobeIcon, Heart,
  CreditCard, Compass
} from 'lucide-react';

export const modulesConfig = [
  // Dashboard & Analytics
  { id: 'dashboard', category: 'Dashboard & Analitik', categoryEN: 'Dashboard & Analytics', name: 'Yönetici Paneli', nameEN: 'Executive Dashboard', icon: <LayoutDashboard />, count: 0, color: '#3498db', keywords: ['dashboard', 'panel', 'ana ekran', 'yönetim', 'özet', 'rapor'], component: lazy(() => import('../components/modules/ExecutiveDashboard')) },
  { id: 'global-vision', category: 'Dashboard & Analitik', categoryEN: 'Dashboard & Analytics', name: 'Global Vision', nameEN: 'Global Vision', icon: <Globe />, count: 0, color: '#2c3e50', keywords: ['vizyon', 'global', 'dünya', 'genel bakış'], component: lazy(() => import('../components/modules/GlobalVision')) },
  { id: 'ai-strategy', category: 'Dashboard & Analitik', categoryEN: 'Dashboard & Analytics', name: 'AI Strategy Hub', nameEN: 'AI Strategy Hub', icon: <Bot />, count: 1, color: '#8b5cf6', keywords: ['yapay zeka', 'ai', 'strateji', 'akıllı', 'bot', 'asistan'], component: lazy(() => import('../components/modules/AIStrategy')) },
  { id: 'forecast', category: 'Dashboard & Analitik', categoryEN: 'Dashboard & Analytics', name: 'Gelecek Tahmini', nameEN: 'Forecast', icon: <TrendingUp />, count: 0, color: '#3b82f6', keywords: ['tahmin', 'gelecek', 'forecast', 'öngörü'], component: lazy(() => import('../components/modules/Forecast')) },
  { id: 'dashboard-builder', category: 'Dashboard & Analitik', categoryEN: 'Dashboard & Analytics', name: 'Dashboard Oluşturucu', nameEN: 'Dashboard Builder', icon: <LayoutDashboard />, count: 0, color: '#6366f1', keywords: ['dashboard', 'builder', 'oluşturucu', 'tasarım'], component: lazy(() => import('../components/modules/DashboardBuilder')) },
  { id: 'executive-vision', category: 'Dashboard & Analitik', categoryEN: 'Dashboard & Analytics', name: 'Yönetici Görüşü', nameEN: 'Executive Vision', icon: <Globe />, count: 0, color: '#0ea5e9', keywords: ['yönetici', 'executive', 'ceo', 'müdür', 'rapor'], component: lazy(() => import('../components/modules/ExecutiveVision')) },

  // Front Office & Reservations
  { id: 'front-office', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Ön Büro', nameEN: 'Front Office', icon: <Bell />, count: 5, color: '#f39c12', keywords: ['ön büro', 'resepsiyon', 'reception', 'giriş', 'hoşgeldin'], component: lazy(() => import('../components/modules/FrontOffice')) },
  { id: 'reservations-tape', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Rezervasyon Takvimi', nameEN: 'Reservation Calendar', icon: <CalendarIcon />, count: 12, color: '#2ecc71', keywords: ['takvim', 'tape', 'chart', 'rezervasyonlar', 'zaman'], component: lazy(() => import('../components/modules/TapeChart')) },
  { id: 'new-reservation', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Yeni Rezervasyon', nameEN: 'New Reservation', icon: <BookOpen />, count: 0, color: '#e53935', keywords: ['yeni', 'rezervasyon', 'ekle', 'kayıt', 'oda ayır'], component: lazy(() => import('../components/modules/NewReservationWizard')) },
  { id: 'room-rack', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Room Rack', nameEN: 'Room Rack', icon: <LayoutGrid />, count: 0, color: '#3b82f6', keywords: ['oda', 'rack', 'odalar', 'plan', 'yerleşim'], component: lazy(() => import('../components/modules/RoomRack')) },
  { id: 'res-list', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Rezervasyon Listesi', nameEN: 'Reservation List', icon: <List />, count: 342, color: '#10b981', keywords: ['liste', 'rezervasyon', 'arayüz', 'tümü'], component: lazy(() => import('../components/modules/ReservationList')) },
  { id: 'res-card', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Rezervasyon Kartı', nameEN: 'Reservation Card', icon: <FileText />, count: 0, color: '#1e293b', keywords: ['kart', 'rezervasyon', 'detay'], component: lazy(() => import('../components/modules/ReservationCard')) },
  { id: 'group-res', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Grup Rezervasyonları', nameEN: 'Group Reservations', icon: <Users />, count: 12, color: '#8b5cf6', keywords: ['grup', 'toplu', 'rezervasyon', 'kafile'], component: lazy(() => import('../components/modules/GroupReservations')) },
  { id: 'channel', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Kanal Yönetimi', nameEN: 'Channel Manager', icon: <Layers />, count: 5, color: '#e67e22', keywords: ['kanal', 'channel', 'manager', 'booking', 'expedia', 'ota'], component: lazy(() => import('../components/modules/ChannelManager')) },
  { id: 'crs', category: 'Ön Büro & Rez.', categoryEN: 'Front Office & Res.', name: 'Merkezi Rezervasyon', nameEN: 'Central Reservation', icon: <GlobeIcon />, count: 0, color: '#34495e', keywords: ['merkez', 'rezervasyon', 'crs', 'ağ'], component: lazy(() => import('../components/modules/CRS')) },

  // Operations & Services
  { id: 'housekeeping', category: 'Operasyon', categoryEN: 'Operations', name: 'Kat Hizmetleri (HK)', nameEN: 'Housekeeping', icon: <Bed />, count: 16, color: '#9b59b6', keywords: ['kat', 'hizmetleri', 'housekeeping', 'temizlik', 'oda', 'kirli', 'temiz', 'meydan'], component: lazy(() => import('../components/modules/Housekeeping')) },
  { id: 'tech-service', category: 'Operasyon', categoryEN: 'Operations', name: 'Teknik Servis', nameEN: 'Technical Service', icon: <Wrench />, count: 4, color: '#e67e22', keywords: ['teknik', 'servis', 'arıza', 'tamir', 'bakım', 'bozuk', 'klima'], component: lazy(() => import('../components/modules/TechService')) },
  { id: 'spa', category: 'Operasyon', categoryEN: 'Operations', name: 'SPA & Wellness', nameEN: 'SPA & Wellness', icon: <Waves />, count: 2, color: '#16a085', keywords: ['spa', 'wellness', 'masaj', 'hamam', 'sauna', 'terapi'], component: lazy(() => import('../components/modules/SpaManagement')) },
  { id: 'banquet', category: 'Operasyon', categoryEN: 'Operations', name: 'Ziyafet & Etkinlik', nameEN: 'Banquet & Events', icon: <Users />, count: 3, color: '#8e44ad', keywords: ['ziyafet', 'etkinlik', 'banquet', 'düğün', 'toplantı', 'salon', 'organizasyon'], component: lazy(() => import('../components/modules/BanquetEvents')) },
  { id: 'smart-room', category: 'Operasyon', categoryEN: 'Operations', name: 'Smart Room & Energy', nameEN: 'Smart Room & Energy', icon: <Zap />, count: 0, color: '#f1c40f', keywords: ['akıllı', 'oda', 'smart', 'enerji', 'elektrik', 'tasarruf'], component: lazy(() => import('../components/modules/SmartRoom')) },
  { id: 'lost-found', category: 'Operasyon', categoryEN: 'Operations', name: 'Kayıp & Bulunan', nameEN: 'Lost & Found', icon: <Package />, count: 2, color: '#f39c12', keywords: ['kayıp', 'bulunan', 'eşya', 'lost', 'found', 'unutulan'], component: lazy(() => import('../components/modules/LostAndFound')) },
  { id: 'laundry', category: 'Operasyon', categoryEN: 'Operations', name: 'Çamaşırhane', nameEN: 'Laundry', icon: <Shirt />, count: 3, color: '#3b82f6', keywords: ['çamaşır', 'çamaşırhane', 'laundry', 'yıkama', 'ütülme', 'kuru temizleme'], component: lazy(() => import('../components/modules/Laundry')) },
  { id: 'entertainment', category: 'Operasyon', categoryEN: 'Operations', name: 'Entertainment', nameEN: 'Entertainment', icon: <Music />, count: 12, color: '#d946ef', keywords: ['eğlence', 'animasyon', 'etkinlik', 'show', 'müzik', 'konser'], component: lazy(() => import('../components/modules/Entertainment')) },

  // Food & Beverage
  { id: 'pos', category: 'Yiyecek & İçecek', categoryEN: 'Food & Beverage', name: 'Restoran POS', nameEN: 'Restaurant POS', icon: <Utensils />, count: 6, color: '#8e44ad', keywords: ['restoran', 'pos', 'yemek', 'içecek', 'sipariş', 'adisyon', 'garson', 'mutfak', 'açlık', 'bar'], component: lazy(() => import('../components/modules/RestaurantPOS')) },
  { id: 'minibar', category: 'Yiyecek & İçecek', categoryEN: 'Food & Beverage', name: 'Mini Bar & İkram', nameEN: 'Minibar & Amenities', icon: <Wine />, count: 5, color: '#8e44ad', keywords: ['minibar', 'ikram', 'içecek', 'oda', 'dolap', 'atıştırmalık'], component: lazy(() => import('../components/modules/MiniBar')) },

  // Sales & Marketing
  { id: 'revenue', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Gelir Yönetimi', nameEN: 'Revenue Management', icon: <TrendingUp />, count: 0, color: '#10b981', keywords: ['gelir', 'revenue', 'fiyat', 'satış', 'kazanç'], component: lazy(() => import('../components/modules/RevenueManagement')) },
  { id: 'crm', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Pazarlama (CRM)', nameEN: 'Marketing (CRM)', icon: <HeartHandshake />, count: 2, color: '#c0392b', keywords: ['pazarlama', 'crm', 'müşteri', 'ilişkiler', 'kampanya', 'mail'], component: lazy(() => import('../components/modules/GuestCRM')) },
  { id: 'loyalty', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Sadakat & Mobil', nameEN: 'Loyalty & Mobile', icon: <Heart />, count: 4, color: '#db2777', keywords: ['sadakat', 'loyalty', 'mobil', 'puan', 'üyelik', 'vip'], component: lazy(() => import('../components/modules/LoyaltyMobile')) },
  { id: 'sales-marketing', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Satış & Pazarlama', nameEN: 'Sales & Marketing', icon: <TrendingUp />, count: 0, color: '#3b82f6', keywords: ['satış', 'pazarlama', 'b2b', 'acente', 'müşteri'], component: lazy(() => import('../components/modules/SalesMarketing')) },
  { id: 'tours', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Tur & Acente', nameEN: 'Tours & Agency', icon: <Compass />, count: 3, color: '#f59e0b', keywords: ['tur', 'acente', 'sedna', 'gezi', 'safari', 'transfer'], component: lazy(() => import('../components/modules/TourManagement')) },
  { id: 'contracts', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Acente Kontratları', nameEN: 'Agency Contracts', icon: <Handshake />, count: 7, color: '#27ae60', keywords: ['kontrat', 'sözleşme', 'acente', 'fiyat', 'anlaşma'], component: lazy(() => import('../components/modules/Contracts')) },
  { id: 'agency-contracts', category: 'Satış & Pazarlama', categoryEN: 'Sales & Marketing', name: 'Acente Sözleşmeleri', nameEN: 'Agency Agreements', icon: <Handshake />, count: 0, color: '#059669', keywords: ['acente', 'sözleşme', 'kontrat'], component: lazy(() => import('../components/modules/AgencyContracts')) },

  // Finance & Accounting
  { id: 'folio', category: 'Finans', categoryEN: 'Finance', name: 'Folio Yönetimi', nameEN: 'Folio Management', icon: <FileText />, count: 8, color: '#f1c40f', keywords: ['folio', 'hesap', 'fatura', 'borç', 'ekstra', 'tahsilat'], component: lazy(() => import('../components/modules/Folio')) },
  { id: 'cash-desk', category: 'Finans', categoryEN: 'Finance', name: 'Kasa İşlemleri', nameEN: 'Cash Desk', icon: <Wallet />, count: 3, color: '#2ecc71', keywords: ['kasa', 'para', 'ödeme', 'nakit', 'kredi', 'gelir', 'gider'], component: lazy(() => import('../components/modules/CashDesk')) },
  { id: 'finance', category: 'Finans', categoryEN: 'Finance', name: 'E-Fatura / Finans', nameEN: 'E-Invoice / Finance', icon: <Receipt />, count: 5, color: '#2980b9', keywords: ['fatura', 'e-fatura', 'finans', 'resmi', 'mali', 'vergi'], component: lazy(() => import('../components/modules/Finance')) },
  { id: 'night-audit', category: 'Finans', categoryEN: 'Finance', name: 'Gece Raporu', nameEN: 'Night Audit', icon: <Moon />, count: 4, color: '#2c3e50', keywords: ['gece', 'rapor', 'audit', 'gün', 'sonu', 'kapanış'], component: lazy(() => import('../components/modules/NightAudit')) },
  { id: 'accounting', category: 'Finans', categoryEN: 'Finance', name: 'Genel Muhasebe', nameEN: 'General Accounting', icon: <FileText />, count: 0, color: '#2980b9', keywords: ['muhasebe', 'hesaplar', 'defter', 'mali', 'bilanço'], component: lazy(() => import('../components/modules/Accounting')) },
  { id: 'cost-control', category: 'Finans', categoryEN: 'Finance', name: 'Maliyet Kontrol', nameEN: 'Cost Control', icon: <TrendingDown />, count: 0, color: '#ef4444', keywords: ['maliyet', 'kontrol', 'gider', 'alış', 'satış', 'analiz'], component: lazy(() => import('../components/modules/CostControl')) },
  { id: 'checkout', category: 'Finans', categoryEN: 'Finance', name: 'Hızlı Check-out', nameEN: 'Quick Check-out', icon: <CreditCard />, count: 3, color: '#1e293b', keywords: ['çıkış', 'checkout', 'ödeme', 'hesap', 'hızlı'], component: lazy(() => import('../components/modules/Checkout')) },
  { id: 'budget', category: 'Finans', categoryEN: 'Finance', name: 'Bütçe Planlama', nameEN: 'Budget Planning', icon: <Calculator />, count: 0, color: '#27ae60', keywords: ['bütçe', 'plan', 'hedf', 'kalkülatör', 'hesaplama'], component: lazy(() => import('../components/modules/BudgetPlanning')) },

  // Materials & HR
  { id: 'stock', category: 'Malzeme & İK', categoryEN: 'Materials & HR', name: 'Stok & Depo', nameEN: 'Stock & Warehouse', icon: <Box />, count: 7, color: '#1abc9c', keywords: ['stok', 'depo', 'envanter', 'malzeme', 'ürün', 'sayım'], component: lazy(() => import('../components/modules/Inventory')) },
  { id: 'purchasing', category: 'Malzeme & İK', categoryEN: 'Materials & HR', name: 'Satın Alma', nameEN: 'Purchasing', icon: <ShoppingCart />, count: 9, color: '#34495e', keywords: ['satın', 'alma', 'sipariş', 'tedarik', 'alışveriş', 'talep'], component: lazy(() => import('../components/modules/Procurement')) },
  { id: 'hr', category: 'Malzeme & İK', categoryEN: 'Materials & HR', name: 'Personel (HR)', nameEN: 'Human Resources', icon: <Users />, count: 3, color: '#d35400', keywords: ['insan', 'kaynakları', 'ik', 'hr', 'personel', 'çalışan', 'maaş', 'vardiya'], component: lazy(() => import('../components/modules/HumanResources')) },

  // System & Settings
  { id: 'it-infra', category: 'Sistem', categoryEN: 'System', name: 'IT & Veritabanı', nameEN: 'IT & Database', icon: <Database />, count: 0, color: '#34495e', keywords: ['it', 'veritabanı', 'altyapı', 'database', 'sunucu', 'sistem'], component: lazy(() => import('../components/modules/ITInfrastructure')) },
  { id: 'integrations', category: 'Sistem', categoryEN: 'System', name: 'Entegrasyonlar', nameEN: 'Integrations', icon: <Cpu />, count: 5, color: '#2c3e50', keywords: ['entegrasyon', 'api', 'bağlantı', 'dış', 'sistem'], component: lazy(() => import('../components/modules/Integrations')) },
  { id: 'kbs', category: 'Sistem', categoryEN: 'System', name: 'Polis Listesi (KBS)', nameEN: 'Police Registry (KBS)', icon: <ShieldCheck />, count: 1, color: '#c0392b', keywords: ['kbs', 'polis', 'jandarma', 'bildirim', 'liste', 'kimlik'], component: lazy(() => import('../components/modules/KBS')) },
  { id: 'surveys', category: 'Sistem', categoryEN: 'System', name: 'Anket Yönetimi', nameEN: 'Survey Management', icon: <ClipboardCheck />, count: 6, color: '#c0392b', keywords: ['anket', 'araştırma', 'soru', 'cevap', 'form', 'değerlendirme'], component: lazy(() => import('../components/modules/Surveys')) },
  { id: 'system-admin', category: 'Sistem', categoryEN: 'System', name: 'Sistem Yönetimi', nameEN: 'System Administration', icon: <Cpu />, count: 0, color: '#475569', keywords: ['sistem', 'yönetim', 'admin', 'ayarlar', 'kullanıcılar', 'yetki'], component: lazy(() => import('../components/modules/SystemAdmin')) },
  { id: 'kvkk', category: 'Sistem', categoryEN: 'System', name: 'KVKK & Güvenlik', nameEN: 'GDPR & Security', icon: <ShieldIcon />, count: 0, color: '#ef4444', keywords: ['kvkk', 'güvenlik', 'gizlilik', 'veri', 'koruma'], component: lazy(() => import('../components/modules/KVKK')) },
];
