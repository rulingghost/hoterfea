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
  // Dashboard & Analitik
  { id: 'dashboard', category: 'Dashboard & Analitik', name: 'Yönetici Paneli', icon: <LayoutDashboard />, count: 0, color: '#3498db', keywords: ['dashboard', 'panel', 'ana ekran', 'yönetim', 'özet', 'rapor'], component: lazy(() => import('../components/modules/ExecutiveDashboard')) },
  { id: 'global-vision', category: 'Dashboard & Analitik', name: 'Global Vision', icon: <Globe />, count: 0, color: '#2c3e50', keywords: ['vizyon', 'global', 'dünya', 'genel bakış'], component: lazy(() => import('../components/modules/GlobalVision')) },
  { id: 'ai-strategy', category: 'Dashboard & Analitik', name: 'AI Strategy Hub', icon: <Bot />, count: 1, color: '#8b5cf6', keywords: ['yapay zeka', 'ai', 'strateji', 'akıllı', 'bot', 'asistan'], component: lazy(() => import('../components/modules/AIStrategy')) },
  { id: 'forecast', category: 'Dashboard & Analitik', name: 'Gelecek Tahmini', icon: <TrendingUp />, count: 0, color: '#3b82f6', keywords: ['tahmin', 'gelecek', 'forecast', 'öngörü'], component: lazy(() => import('../components/modules/Forecast')) },
  { id: 'dashboard-builder', category: 'Dashboard & Analitik', name: 'Dashboard Oluşturucu', icon: <LayoutDashboard />, count: 0, color: '#6366f1', keywords: ['dashboard', 'builder', 'oluşturucu', 'tasarım'], component: lazy(() => import('../components/modules/DashboardBuilder')) },
  { id: 'executive-vision', category: 'Dashboard & Analitik', name: 'Yönetici Görüşü', icon: <Globe />, count: 0, color: '#0ea5e9', keywords: ['yönetici', 'executive', 'ceo', 'müdür', 'rapor'], component: lazy(() => import('../components/modules/ExecutiveVision')) },

  // Ön Büro & Rezervasyon
  { id: 'front-office', category: 'Ön Büro & Rez.', name: 'Ön Büro', icon: <Bell />, count: 5, color: '#f39c12', keywords: ['ön büro', 'resepsiyon', 'reception', 'giriş', 'hoşgeldin'], component: lazy(() => import('../components/modules/FrontOffice')) },
  { id: 'reservations-tape', category: 'Ön Büro & Rez.', name: 'Rezervasyon Takvimi', icon: <CalendarIcon />, count: 12, color: '#2ecc71', keywords: ['takvim', 'tape', 'chart', 'rezervasyonlar', 'zaman'], component: lazy(() => import('../components/modules/TapeChart')) },
  { id: 'new-reservation', category: 'Ön Büro & Rez.', name: 'Yeni Rezervasyon', icon: <BookOpen />, count: 0, color: '#e53935', keywords: ['yeni', 'rezervasyon', 'ekle', 'kayıt', 'oda ayır'], component: lazy(() => import('../components/modules/NewReservationWizard')) },
  { id: 'room-rack', category: 'Ön Büro & Rez.', name: 'Room Rack', icon: <LayoutGrid />, count: 0, color: '#3b82f6', keywords: ['oda', 'rack', 'odalar', 'plan', 'yerleşim'], component: lazy(() => import('../components/modules/RoomRack')) },
  { id: 'res-list', category: 'Ön Büro & Rez.', name: 'Rezervasyon Listesi', icon: <List />, count: 342, color: '#10b981', keywords: ['liste', 'rezervasyon', 'arayüz', 'tümü'], component: lazy(() => import('../components/modules/ReservationList')) },
  { id: 'res-card', category: 'Ön Büro & Rez.', name: 'Rezervasyon Kartı', icon: <FileText />, count: 0, color: '#1e293b', keywords: ['kart', 'rezervasyon', 'detay'], component: lazy(() => import('../components/modules/ReservationCard')) },
  { id: 'group-res', category: 'Ön Büro & Rez.', name: 'Grup Rezervasyonları', icon: <Users />, count: 12, color: '#8b5cf6', keywords: ['grup', 'toplu', 'rezervasyon', 'kafile'], component: lazy(() => import('../components/modules/GroupReservations')) },
  { id: 'channel', category: 'Ön Büro & Rez.', name: 'Kanal Yönetimi', icon: <Layers />, count: 5, color: '#e67e22', keywords: ['kanal', 'channel', 'manager', 'booking', 'expedia', 'ota'], component: lazy(() => import('../components/modules/ChannelManager')) },
  { id: 'crs', category: 'Ön Büro & Rez.', name: 'Merkezi Rezervasyon', icon: <GlobeIcon />, count: 0, color: '#34495e', keywords: ['merkez', 'rezervasyon', 'crs', 'ağ'], component: lazy(() => import('../components/modules/CRS')) },

  // Operasyon & Hizmetler
  { id: 'housekeeping', category: 'Operasyon', name: 'Kat Hizmetleri (HK)', icon: <Bed />, count: 16, color: '#9b59b6', keywords: ['kat', 'hizmetleri', 'housekeeping', 'temizlik', 'oda', 'kirli', 'temiz', 'meydan'], component: lazy(() => import('../components/modules/Housekeeping')) },
  { id: 'tech-service', category: 'Operasyon', name: 'Teknik Servis', icon: <Wrench />, count: 4, color: '#e67e22', keywords: ['teknik', 'servis', 'arıza', 'tamir', 'bakım', 'bozuk', 'klima'], component: lazy(() => import('../components/modules/TechService')) },
  { id: 'spa', category: 'Operasyon', name: 'SPA & Wellness', icon: <Waves />, count: 2, color: '#16a085', keywords: ['spa', 'wellness', 'masaj', 'hamam', 'sauna', 'terapi'], component: lazy(() => import('../components/modules/SpaManagement')) },
  { id: 'banquet', category: 'Operasyon', name: 'Ziyafet & Etkinlik', icon: <Users />, count: 3, color: '#8e44ad', keywords: ['ziyafet', 'etkinlik', 'banquet', 'düğün', 'toplantı', 'salon', 'organizasyon'], component: lazy(() => import('../components/modules/BanquetEvents')) },
  { id: 'smart-room', category: 'Operasyon', name: 'Smart Room & Energy', icon: <Zap />, count: 0, color: '#f1c40f', keywords: ['akıllı', 'oda', 'smart', 'enerji', 'elektrik', 'tasarruf'], component: lazy(() => import('../components/modules/SmartRoom')) },
  { id: 'lost-found', category: 'Operasyon', name: 'Kayıp & Bulunan', icon: <Package />, count: 2, color: '#f39c12', keywords: ['kayıp', 'bulunan', 'eşya', 'lost', 'found', 'unutulan'], component: lazy(() => import('../components/modules/LostAndFound')) },
  { id: 'laundry', category: 'Operasyon', name: 'Çamaşırhane', icon: <Shirt />, count: 3, color: '#3b82f6', keywords: ['çamaşır', 'çamaşırhane', 'laundry', 'yıkama', 'ütülme', 'kuru temizleme'], component: lazy(() => import('../components/modules/Laundry')) },
  { id: 'entertainment', category: 'Operasyon', name: 'Entertainment', icon: <Music />, count: 12, color: '#d946ef', keywords: ['eğlence', 'animasyon', 'etkinlik', 'show', 'müzik', 'konser'], component: lazy(() => import('../components/modules/Entertainment')) },

  // Restoran & POS
  { id: 'pos', category: 'Yiyecek & İçecek', name: 'Restoran POS', icon: <Utensils />, count: 6, color: '#8e44ad', keywords: ['restoran', 'pos', 'yemek', 'içecek', 'sipariş', 'adisyon', 'garson', 'mutfak', 'açlık', 'bar'], component: lazy(() => import('../components/modules/RestaurantPOS')) },
  { id: 'minibar', category: 'Yiyecek & İçecek', name: 'Mini Bar & İkram', icon: <Wine />, count: 5, color: '#8e44ad', keywords: ['minibar', 'ikram', 'içecek', 'oda', 'dolap', 'atıştırmalık'], component: lazy(() => import('../components/modules/MiniBar')) },

  // Satış & Pazarlama
  { id: 'revenue', category: 'Satış & Pazarlama', name: 'Gelir Yönetimi', icon: <TrendingUp />, count: 0, color: '#10b981', keywords: ['gelir', 'revenue', 'fiyat', 'satış', 'kazanç'], component: lazy(() => import('../components/modules/RevenueManagement')) },
  { id: 'crm', category: 'Satış & Pazarlama', name: 'Pazarlama (CRM)', icon: <HeartHandshake />, count: 2, color: '#c0392b', keywords: ['pazarlama', 'crm', 'müşteri', 'ilişkiler', 'kampanya', 'mail'], component: lazy(() => import('../components/modules/GuestCRM')) },
  { id: 'loyalty', category: 'Satış & Pazarlama', name: 'Sadakat & Mobil', icon: <Heart />, count: 4, color: '#db2777', keywords: ['sadakat', 'loyalty', 'mobil', 'puan', 'üyelik', 'vip'], component: lazy(() => import('../components/modules/LoyaltyMobile')) },
  { id: 'sales-marketing', category: 'Satış & Pazarlama', name: 'Satış & Pazarlama', icon: <TrendingUp />, count: 0, color: '#3b82f6', keywords: ['satış', 'pazarlama', 'b2b', 'acente', 'müşteri'], component: lazy(() => import('../components/modules/SalesMarketing')) },
  { id: 'tours', category: 'Satış & Pazarlama', name: 'Tur & Acente (Sedna)', icon: <Compass />, count: 3, color: '#f59e0b', keywords: ['tur', 'acente', 'sedna', 'gezi', 'safari', 'transfer'], component: lazy(() => import('../components/modules/TourManagement')) },
  { id: 'contracts', category: 'Satış & Pazarlama', name: 'Acente Kontratları', icon: <Handshake />, count: 7, color: '#27ae60', keywords: ['kontrat', 'sözleşme', 'acente', 'fiyat', 'anlaşma'], component: lazy(() => import('../components/modules/Contracts')) },
  { id: 'agency-contracts', category: 'Satış & Pazarlama', name: 'Acente Sözleşmeleri', icon: <Handshake />, count: 0, color: '#059669', keywords: ['acente', 'sözleşme', 'kontrat'], component: lazy(() => import('../components/modules/AgencyContracts')) },

  // Finans & Muhasebe
  { id: 'folio', category: 'Finans', name: 'Folio Yönetimi', icon: <FileText />, count: 8, color: '#f1c40f', keywords: ['folio', 'hesap', 'fatura', 'borç', 'ekstra', 'tahsilat'], component: lazy(() => import('../components/modules/Folio')) },
  { id: 'cash-desk', category: 'Finans', name: 'Kasa İşlemleri', icon: <Wallet />, count: 3, color: '#2ecc71', keywords: ['kasa', 'para', 'ödeme', 'nakit', 'kredi', 'gelir', 'gider'], component: lazy(() => import('../components/modules/CashDesk')) },
  { id: 'finance', category: 'Finans', name: 'E-Fatura / Finans', icon: <Receipt />, count: 5, color: '#2980b9', keywords: ['fatura', 'e-fatura', 'finans', 'resmi', 'mali', 'vergi'], component: lazy(() => import('../components/modules/Finance')) },
  { id: 'night-audit', category: 'Finans', name: 'Gece Raporu', icon: <Moon />, count: 4, color: '#2c3e50', keywords: ['gece', 'rapor', 'audit', 'gün', 'sonu', 'kapanış'], component: lazy(() => import('../components/modules/NightAudit')) },
  { id: 'accounting', category: 'Finans', name: 'Genel Muhasebe', icon: <FileText />, count: 0, color: '#2980b9', keywords: ['muhasebe', 'hesaplar', 'defter', 'mali', 'bilanço'], component: lazy(() => import('../components/modules/Accounting')) },
  { id: 'cost-control', category: 'Finans', name: 'Maliyet Kontrol', icon: <TrendingDown />, count: 0, color: '#ef4444', keywords: ['maliyet', 'kontrol', 'gider', 'alış', 'satış', 'analiz'], component: lazy(() => import('../components/modules/CostControl')) },
  { id: 'checkout', category: 'Finans', name: 'Hızlı Check-out', icon: <CreditCard />, count: 3, color: '#1e293b', keywords: ['çıkış', 'checkout', 'ödeme', 'hesap', 'hızlı'], component: lazy(() => import('../components/modules/Checkout')) },
  { id: 'budget', category: 'Finans', name: 'Bütçe Planlama', icon: <Calculator />, count: 0, color: '#27ae60', keywords: ['bütçe', 'plan', 'hedf', 'kalkülatör', 'hesaplama'], component: lazy(() => import('../components/modules/BudgetPlanning')) },

  // Stok & İK
  { id: 'stock', category: 'Malzeme & İK', name: 'Stok & Depo', icon: <Box />, count: 7, color: '#1abc9c', keywords: ['stok', 'depo', 'envanter', 'malzeme', 'ürün', 'sayım'], component: lazy(() => import('../components/modules/Inventory')) },
  { id: 'purchasing', category: 'Malzeme & İK', name: 'Satın Alma', icon: <ShoppingCart />, count: 9, color: '#34495e', keywords: ['satın', 'alma', 'sipariş', 'tedarik', 'alışveriş', 'talep'], component: lazy(() => import('../components/modules/Procurement')) },
  { id: 'hr', category: 'Malzeme & İK', name: 'Personel (HR)', icon: <Users />, count: 3, color: '#d35400', keywords: ['insan', 'kaynakları', 'ik', 'hr', 'personel', 'çalışan', 'maaş', 'vardiya'], component: lazy(() => import('../components/modules/HumanResources')) },

  // Sistem & Ayarlar
  { id: 'it-infra', category: 'Sistem', name: 'IT & Veritabanı', icon: <Database />, count: 0, color: '#34495e', keywords: ['it', 'veritabanı', 'altyapı', 'database', 'sunucu', 'sistem'], component: lazy(() => import('../components/modules/ITInfrastructure')) },
  { id: 'integrations', category: 'Sistem', name: 'Entegrasyonlar', icon: <Cpu />, count: 5, color: '#2c3e50', keywords: ['entegrasyon', 'api', 'bağlantı', 'dış', 'sistem'], component: lazy(() => import('../components/modules/Integrations')) },
  { id: 'kbs', category: 'Sistem', name: 'Polis Listesi (KBS)', icon: <ShieldCheck />, count: 1, color: '#c0392b', keywords: ['kbs', 'polis', 'jandarma', 'bildirim', 'liste', 'kimlik'], component: lazy(() => import('../components/modules/KBS')) },
  { id: 'surveys', category: 'Sistem', name: 'Anket Yönetimi', icon: <ClipboardCheck />, count: 6, color: '#c0392b', keywords: ['anket', 'araştırma', 'soru', 'cevap', 'form', 'değerlendirme'], component: lazy(() => import('../components/modules/Surveys')) },
  { id: 'system-admin', category: 'Sistem', name: 'Sistem Yönetimi', icon: <Cpu />, count: 0, color: '#475569', keywords: ['sistem', 'yönetim', 'admin', 'ayarlar', 'kullanıcılar', 'yetki'], component: lazy(() => import('../components/modules/SystemAdmin')) },
  { id: 'kvkk', category: 'Sistem', name: 'KVKK & Güvenlik', icon: <ShieldIcon />, count: 0, color: '#ef4444', keywords: ['kvkk', 'güvenlik', 'gizlilik', 'veri', 'koruma'], component: lazy(() => import('../components/modules/KVKK')) },
];

