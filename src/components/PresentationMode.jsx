import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, MessageSquare, LayoutDashboard, Users, Box, MapPin, 
  Calculator, BarChart3, Brain, Building2, ShieldCheck, Smartphone, Code2, 
  CheckCircle2, Target, Layers, Zap, BedDouble, Network, CreditCard, PackageSearch, 
  TrendingUp, Wallet, FileText, Globe, KeyRound, UtensilsCrossed, CalendarCheck, Database, Rocket, PieChart, Sparkles, X, Star, Cloud, Bot, ArrowLeft, Image as ImageIcon
} from 'lucide-react';

import '../styles/presentation.css';

const slides = [
  {
    id: 1,
    type: 'cover',
    tag: 'STRATEJİK YAZILIM MİMARİSİ',
    title: 'KURUMSAL DİJİTAL DÖNÜŞÜM',
    subtitle: 'Otelcilik Sektörü İçin Uçtan Uca Bütünleşik Teknoloji Ekosistemi',
    items: [
      { icon: <Building2 size={20} />, text: 'Bütünleşik PMS' },
      { icon: <Brain size={20} />, text: 'Kestirimci (Predictive) CRM' },
      { icon: <Database size={20} />, text: 'Veri Odaklı Mimari' },
      { icon: <Rocket size={20} />, text: 'Yüksek Ölçeklenebilirlik' }
    ],
    notes: 'Değerli yönetim kurulu üyeleri. Sarfea Teknoloji olarak, standart yazılımların sınırlarını aşan, tesisinizin operasyonel verimliliğini maksimize edecek ve tamamen kurumunuza özel kurgulanmış stratejik teknoloji mimarimizi sunmaktan memnuniyet duyarız.'
  },
  {
    id: 2,
    type: 'content',
    tag: 'OPERASYONEL ANALİZ',
    title: 'SEKTÖREL DARBOĞAZLAR',
    subtitle: 'Monolitik Altyapıların Yarattığı Gizli Maliyetler ve Verimsizlik',
    items: [
      { icon: <Database />, text: 'İzole Veri Siloları' },
      { icon: <Wallet />, text: 'Sürekli Lisans Giderleri' },
      { icon: <Network />, text: 'Kısıtlı Entegrasyon Ağları' },
      { icon: <Zap />, text: 'Operasyonel Gecikmeler' }
    ],
    notes: 'Sektördeki en büyük operasyonel kayıplar, entegre olmayan eski nesil sistemlerden kaynaklanmaktadır. Departmanlar arası veri asimetrisi, sürdürülebilir büyümenin önündeki en büyük engeldir.'
  },
  {
    id: 3,
    type: 'content',
    tag: 'ÇÖZÜM MİMARİSİ',
    title: 'MERKEZİLEŞTİRİLMİŞ YÖNETİM',
    subtitle: 'Kurumsal Süreçlere Adapte Edilebilen Çevik Altyapı',
    items: [
      { icon: <LayoutDashboard />, text: 'Merkezi Veri Yönetimi (MDM)' },
      { icon: <Code2 />, text: 'API-First Yaklaşımı' },
      { icon: <Layers />, text: 'Esnek Modüler Yapı' },
      { icon: <TrendingUp />, text: 'Eş Zamanlı Veri Senkronizasyonu' }
    ],
    modules: [{"id": "dashboard", "name": "Yönetici Paneli", "icon": "📊"}, {"id": "executive-vision", "name": "Executive Vision", "icon": "👑"}, {"id": "dashboard-builder", "name": "Dashboard Builder", "icon": "🧩"}],
    notes: 'Çözüm modelimiz, tüm departmanları "Tek Gerçeklik Kaynağı" (Single Source of Truth) prensibiyle birleştirir. Yazılım standartlarına uymak zorunda kalmazsınız; mimarimiz, sizin kurumsal iş akışlarınıza göre şekillenir.'
  },
  {
    id: 4,
    type: 'content',
    tag: 'ÇEKİRDEK OPERASYON',
    title: 'YENİ NESİL PMS',
    subtitle: 'Ön Büro Süreçlerinde Maksimum Hız ve Sıfır Hata Toleransı',
    items: [
      { icon: <Zap />, text: 'Dinamik Envanter Yönetimi' },
      { icon: <BarChart3 />, text: 'Otonom Gece Denetimi' },
      { icon: <CheckCircle2 />, text: 'Algoritmik Oda Blokajı' },
      { icon: <Smartphone />, text: 'Temassız Giriş/Çıkış Akışı' }
    ],
    modules: [{"id": "front-office", "name": "Ön Büro Paneli", "icon": "🛎️"}, {"id": "new-reservation", "name": "Hızlı Rezervasyon", "icon": "📝"}, {"id": "reservations-tape", "name": "Tape Çizelgesi", "icon": "📅"}, {"id": "room-rack", "name": "Room Rack", "icon": "🛏️"}, {"id": "res-list", "name": "Rezervasyon Listesi", "icon": "📋"}, {"id": "res-card", "name": "Rezervasyon Kartı", "icon": "🪪"}, {"id": "group-res", "name": "Grup Rezervasyonları", "icon": "👥"}, {"id": "checkout", "name": "Hızlı Check-out", "icon": "💳"}],
    notes: 'Ön büro modülümüz, manuel işlemleri otonom hale getirerek insan hatası riskini minimize eder. Ergonomik arayüzü, personel adaptasyon sürecini asgari düzeye indirerek operasyonel devamlılık sağlar.'
  },
  {
    id: 5,
    type: 'content',
    tag: 'DENEYİM YÖNETİMİ',
    title: 'KESTİRİMCİ CRM',
    subtitle: 'Yapay Zeka ve Büyük Veri Tabanlı Davranışsal Modelleme',
    items: [
      { icon: <Brain />, text: 'İleri Veri Analitiği' },
      { icon: <Bot />, text: 'Manuel Girdisiz Davranış Analizi' },
      { icon: <Star />, text: 'Proaktif Hizmet Stratejisi' },
      { icon: <Database />, text: 'Geçmiş Veri İle Yüksek Oranlı Talep Tahmini' }
    ],
    modules: [{"id": "crm", "name": "Misafir CRM", "icon": "💝"}, {"id": "loyalty", "name": "Sadakat Mobil", "icon": "🎁"}, {"id": "ai-strategy", "name": "AI Strategy Hub", "icon": "🤖"}, {"id": "surveys", "name": "Anket Yönetimi", "icon": "📝"}],
    notes: 'Geliştirdiğimiz otonom algoritmalar, misafir davranışlarını geçmiş verilere dayanarak modeller. Manuel veri girişine ihtiyaç duymadan, misafir beklentilerini önceden tahmin ederek operasyonunuzu tamamen proaktif bir yapıya kavuşturur.'
  },
  {
    id: 6,
    type: 'content',
    tag: 'GLOBAL DAĞITIM SİSTEMİ',
    title: 'MERKEZİ KANAL YÖNETİMİ',
    subtitle: 'Çevrimiçi Satış Kanallarının Eş Zamanlı Optimizasyonu',
    items: [
      { icon: <Globe />, text: 'Gerçek Zamanlı Senkronizasyon' },
      { icon: <PieChart />, text: 'Algoritmik Fiyatlandırma' },
      { icon: <ShieldCheck />, text: 'Overbooking Koruması' },
      { icon: <Network />, text: 'Çift Yönlü XML Entegrasyonu' }
    ],
    modules: [{"id": "channel", "name": "Kanal Yöneticisi", "icon": "🌐"}, {"id": "crs", "name": "Merkezi Rezervasyon", "icon": "🏢"}],
    notes: 'Tüm OTA ağınızı tek bir kontrol panelinden yönetme imkanı sunuyoruz. Fiyat ve envanter güncellemeleri milisaniyeler içerisinde tüm global ağa entegre edilerek gelir kayıpları ve kapasite aşımı kesin olarak engellenir.'
  },
  {
    id: 7,
    type: 'content',
    tag: 'DİREKT GELİR YÖNETİMİ',
    title: 'OMNİ-CHANNEL REZERVASYON',
    subtitle: 'Üçüncü Parti Bağımlılığını Azaltan Doğrudan Satış Altyapısı',
    items: [
      { icon: <Wallet />, text: 'OTA Komisyon Optimizasyonu' },
      { icon: <Smartphone />, text: 'Responsive Tasarım Mimarisi' },
      { icon: <TrendingUp />, text: 'Dönüşüm Oranı Optimizasyonu (CRO)' },
      { icon: <CreditCard />, text: 'PCI-DSS Uyumlu Ödeme' }
    ],
    modules: [{"id": "revenue", "name": "Revenue Management", "icon": "📈"}, {"id": "forecast", "name": "Gelecek Tahmini", "icon": "🔮"}, {"id": "sales-marketing", "name": "B2B Satış Pazarlama", "icon": "💼"}, {"id": "agency-contracts", "name": "Acente Dosyaları", "icon": "🤝"}, {"id": "contracts", "name": "Fiyat Kontratları", "icon": "📜"}, {"id": "tours", "name": "Tur Yönetimi", "icon": "🚌"}],
    notes: 'Acentelere ödenen yüksek komisyon oranlarını kurum bünyesinde tutmak temel finansal stratejimizdir. Kurumsal kimliğinize entegre çalışan rezervasyon motorumuz, doğrudan satış hacminizi ve net karlılığınızı artırır.'
  },
  {
    id: 8,
    type: 'content',
    tag: 'FİNANSAL ENTEGRASYON',
    title: 'MERKEZİ ADİSYON YÖNETİMİ',
    subtitle: 'Tesis İçi Ekstra Gelirlerin Uçtan Uca İzlenebilirliği',
    items: [
      { icon: <UtensilsCrossed />, text: 'Dijital Adisyon Altyapısı' },
      { icon: <Wallet />, text: 'Eş Zamanlı Folyo Aktarımı' },
      { icon: <ShieldCheck />, text: 'Gelir Kaçağı Denetimi' },
      { icon: <BarChart3 />, text: 'Dinamik Maliyet Analizi' }
    ],
    modules: [{"id": "pos", "name": "Restoran & Bar POS", "icon": "🍽️"}, {"id": "banquet", "name": "Ziyafet & Etkinlik", "icon": "🎊"}, {"id": "minibar", "name": "Mini Bar Takip", "icon": "🍷"}],
    notes: 'F&B ve SPA gibi tüm ekstra harcama noktaları ana PMS sistemi ile anlık entegre çalışır. Konsolide edilen bu yapı, manuel veri girişinden kaynaklı hataları sıfırlayarak tam finansal şeffaflık sağlar.'
  },
  {
    id: 9,
    type: 'content',
    tag: 'SAHA OTOMASYONU',
    title: 'MOBİL İŞ GÜCÜ YÖNETİMİ',
    subtitle: 'Departmanlar Arası Anlık İletişim ve Süreç Optimizasyonu',
    items: [
      { icon: <BedDouble />, text: 'Dijital Housekeeping' },
      { icon: <KeyRound />, text: 'Arıza ve Bakım (SLA) Takibi' },
      { icon: <Smartphone />, text: 'Gerçek Zamanlı Durum Senkronizasyonu' },
      { icon: <Target />, text: 'Personel Verimlilik Metrikleri' }
    ],
    modules: [{"id": "housekeeping", "name": "Kat Hizmetleri (HK)", "icon": "🧹"}, {"id": "tech-service", "name": "Teknik Servis", "icon": "🔧"}, {"id": "laundry", "name": "Çamaşırhane", "icon": "👕"}, {"id": "lost-found", "name": "Kayıp & Bulunan", "icon": "🔍"}, {"id": "stock", "name": "Stok ve Envanter", "icon": "📦"}, {"id": "purchasing", "name": "Satınalma", "icon": "🛒"}],
    notes: 'Kat hizmetleri ve teknik servis ekiplerinin iş akışlarını dijitalleştiriyoruz. Saha operasyonlarındaki anlık durum değişiklikleri, telsiz iletişimine gerek kalmaksızın eş zamanlı olarak ön büro ekranlarına yansır.'
  },
  {
    id: 10,
    type: 'content',
    tag: 'DİJİTAL MİSAFİR YOLCULUĞU',
    title: 'SÜRTÜNMESİZ HİZMET',
    subtitle: 'Kurumsal Standartlarda Temassız Misafir Arayüzleri',
    items: [
      { icon: <CheckCircle2 />, text: 'Pre-Arrival Check-in' },
      { icon: <MessageSquare />, text: 'Dijital Concierge' },
      { icon: <Code2 />, text: 'Uygulama Bağımsız Mimarisi' },
      { icon: <Bot />, text: 'Otonom Talep Yönetimi' }
    ],
    modules: [{"id": "smart-room", "name": "Akıllı Oda (IoT)", "icon": "💡"}, {"id": "spa", "name": "SPA & Wellness", "icon": "💆"}, {"id": "entertainment", "name": "Eğlence", "icon": "🎵"}],
    notes: 'Misafirlerinize cihazlarına uygulama indirme bariyeri oluşturmadan, tamamen cihaz bağımsız web arayüzleri üzerinden kişiselleştirilmiş ve temassız bir konaklama deneyimi sunuyoruz.'
  },
  {
    id: 11,
    type: 'content',
    tag: 'İŞ ZEKASI VE BÜYÜK VERİ',
    title: 'STRATEJİK YÖNETİM PANELLERİ',
    subtitle: 'Makro ve Mikro Ölçekte Finansal Performans Analizi',
    items: [
      { icon: <BarChart3 />, text: 'İleri Düzey KPI Analizi' },
      { icon: <PieChart />, text: 'Konsolide Karlılık Raporları' },
      { icon: <LayoutDashboard />, text: 'Gerçek Zamanlı BI Dashboard' },
      { icon: <FileText />, text: 'Otonom Finansal Raporlama' }
    ],
    modules: [{"id": "accounting", "name": "Muhasebe", "icon": "📖"}, {"id": "cost-control", "name": "Maliyet Kontrol", "icon": "📉"}, {"id": "budget", "name": "Bütçe Planlama", "icon": "💰"}],
    notes: 'Yönetim kurulu kararlarının veri güdümlü alınmasını sağlıyoruz. Statik raporlar yerine, tesisin finansal ve operasyonel performansını anlık olarak izleyebileceğiniz interaktif iş zekası panelleri sunuyoruz.'
  },
  {
    id: 12,
    type: 'content',
    tag: 'BİLİŞİM ALTYAPISI',
    title: 'KURUMSAL BULUT MİMARİSİ',
    subtitle: 'Kesintisiz Erişilebilirlik ve Üst Düzey Veri Güvenliği Standardı',
    items: [
      { icon: <Cloud />, text: 'Yüksek Erişilebilirlik (SLA %99.9)' },
      { icon: <ShieldCheck />, text: 'Global Uyum (KVKK / GDPR)' },
      { icon: <Database />, text: 'Coğrafi Yedekleme' },
      { icon: <Box />, text: 'Felaket Kurtarma' }
    ],
    modules: [{"id": "finance", "name": "e-Fatura & Finans", "icon": "🧾"}, {"id": "night-audit", "name": "Gece Raporu", "icon": "🌙"}, {"id": "folio", "name": "Folio İşlemleri", "icon": "📑"}, {"id": "cash-desk", "name": "Kasa İşlemleri", "icon": "💵"}],
    notes: 'Yerinde sunucu (On-Premise) maliyetlerini ve donanım risklerini tamamen ortadan kaldırıyoruz. Kritik kurum verileriniz, global siber güvenlik standartlarına uygun şekilde şifrelenerek korunmaktadır.'
  },
  {
    id: 13,
    type: 'content',
    tag: 'SİSTEM ENTEGRASYONU',
    title: 'AÇIK API EKOSİSTEMİ',
    subtitle: 'Üçüncü Parti Yazılım ve Donanımlarla Uçtan Uca Uyumluluk',
    items: [
      { icon: <Network />, text: 'Kurumsal ERP Entegrasyonu' },
      { icon: <Zap />, text: 'Donanım (IoT) Uyumluluğu' },
      { icon: <FileText />, text: 'Yasal Bildirim Uyumları' },
      { icon: <Code2 />, text: 'Restful API Desteği' }
    ],
    modules: [{"id": "integrations", "name": "Dış Entegrasyonlar", "icon": "🔌"}],
    notes: 'Kapalı ekosistem yaklaşımını reddediyoruz. Mevcut ERP, muhasebe, donanım veya yasal bildirim altyapılarınızla kesintisiz haberleşebilen, gelecekteki teknoloji yatırımlarınıza hazır açık bir API mimarisi sağlıyoruz.'
  },
  {
    id: 14,
    type: 'content',
    tag: 'UYGULAMA VE DEVREYE ALMA',
    title: 'KESİNTİSİZ GEÇİŞ STRATEJİSİ',
    subtitle: 'Operasyonel Devamlılığı Garanti Eden Güvenli Veri Göçü',
    items: [
      { icon: <Database />, text: 'Kayıpsız Veri Transferi' },
      { icon: <Users />, text: 'Departman Bazlı Sertifikasyon' },
      { icon: <CheckCircle2 />, text: 'Kontrollü Go-Live Süreci' },
      { icon: <MessageSquare />, text: 'Sürekli 7/24 Operasyonel Destek' }
    ],
    modules: [{"id": "hr", "name": "Personel (HR)", "icon": "👥"}, {"id": "system-admin", "name": "Admin Modülü", "icon": "⚙️"}, {"id": "it-infra", "name": "Sistem", "icon": "🖧"}, {"id": "kbs", "name": "KBS Bildirimi", "icon": "👮"}, {"id": "kvkk", "name": "KVKK Uyumu", "icon": "🛡️"}],
    notes: 'Sistem değişimi sürecinde operasyonel süreklilik en büyük önceliğimizdir. Uzman ekiplerimiz, arka planda güvenli veri göçünü sağlarken, personelinizin sisteme kusursuz adaptasyonunu yönetir.'
  },
  {
    id: 15,
    type: 'cover',
    tag: 'KURUMSAL İŞ ORTAKLIĞI',
    title: 'UZUN VADELİ PARTNERLİK',
    subtitle: 'Sürdürülebilir Büyüme İçin Değer Odaklı İş Birliği',
    items: [
      { icon: <Rocket size={20} />, text: 'Kesintisiz AR-GE Yatırımı' },
      { icon: <ShieldCheck size={20} />, text: 'SLA Garantili Hizmet' },
      { icon: <TrendingUp size={20} />, text: 'Büyüme Odaklı Altyapı' },
      { icon: <Target size={20} />, text: 'Stratejik İhtiyaç Analizi' }
    ],
    notes: 'Sarfea olarak amacımız sadece bir yazılım tedarikçisi olmak değil; tesisinizin teknolojik altyapısını geleceğe taşıyan stratejik bir iş ortağı olmaktır. Operasyonel verimliliğinizi artıracak detaylı ihtiyaç analizine başlamak için hazırız.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  }
};

const PresentationMode = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    setSelectedModule(null);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'n' || e.key === 'N') setShowNotes(prev => !prev);
      if (e.key === 'Escape') {
        setSelectedModule(prev => {
          if (prev) return null;
          onBack();
          return null;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, onBack]);

  const slide = slides[currentSlide];

  return (
    <div className="presentation-root" style={{ 
      position: 'fixed', inset: 0, background: '#020617', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    }}>
      <button className="btn-close-presentation" onClick={onBack} style={{ position: 'absolute', top: '2rem', right: '3rem', zIndex: 100000, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '1rem 1.5rem', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s' }}>
        <ArrowLeft size={18} /> Ana Sayfaya Dön
      </button>

      <div style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
      }}>
        <div 
          className="background-overlay-pres" 
          style={{ backgroundImage: `url(/images/bg_${slide.id}.png)`, opacity: 0.55 }}
        ></div>
        <div className="glow-orb glow-1"></div>
        <div className="glow-orb glow-2"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 30, scale: 1.01 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="presentation-slide active"
            style={{ position: 'absolute', inset: 0, padding: '4vw 6vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="slide-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: slide.modules && slide.modules.length > 0 ? '1.5fr 1fr' : '1fr',
                  gap: '4vw',
                  alignItems: 'center',
                  height: 'auto',
                  width: '100%',
                  maxWidth: '1900px',
                  margin: '0 auto',
                }}
              >
                {/* ── SOL SÜTUN: BAŞLIKLAR VE MADDELER ── */}
                <motion.div 
                   variants={containerVariants}
                   initial="hidden"
                   animate="visible"
                   style={{ 
                     display: 'flex', 
                     flexDirection: 'column', 
                     alignItems: slide.modules && slide.modules.length > 0 ? 'flex-start' : 'center', 
                     justifyContent: 'center', 
                     textAlign: slide.modules && slide.modules.length > 0 ? 'left' : 'center',
                     width: '100%' 
                   }}
                >
                  {slide.tag && (
                    <motion.span variants={itemVariants} className="pres-tag" style={{ fontSize: '1.1vw', padding: '0.6vw 1.2vw', marginBottom: '1.5vw' }}>
                      {slide.tag}
                    </motion.span>
                  )}

                  <motion.h1 
                    variants={itemVariants} 
                    style={slide.type !== 'cover' ? { fontSize: '4.2vw', textTransform: 'none', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '1.5vw' } : { fontSize: '5vw' }}
                  >
                    {slide.title}
                  </motion.h1>

                  {slide.subtitle && (
                    <motion.p 
                      variants={itemVariants}
                      style={{ fontSize: '1.6vw', color: 'var(--accent-primary)', marginBottom: '3vw', fontWeight: 500, lineHeight: 1.4 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}

                  {/* Madde listesi */}
                  <motion.div
                    variants={containerVariants}
                    style={{ 
                       display: 'grid', 
                       gridTemplateColumns: slide.modules && slide.modules.length > 0 ? '1fr' : '1fr 1fr', 
                       gap: '1vw', 
                       width: '100%'
                    }}
                  >
                    {slide.items && slide.items.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: '1vw', 
                          padding: '1vw 1.2vw',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(212, 175, 55, 0.1)',
                          borderRadius: '16px',
                        }}
                      >
                        <div style={{ color: 'var(--accent-primary)', display: 'flex' }}>
                          {React.cloneElement(item.icon, { style: { width: '1.8vw', height: '1.8vw' }})}
                        </div>
                        <span style={{ fontSize: '1.2vw', fontWeight: 500, color: '#fff' }}>{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* ── SAĞ SÜTUN: MODÜLLER ── */}
                {slide.modules && slide.modules.length > 0 && (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ 
                       display: 'grid', 
                       gridTemplateColumns: 'repeat(auto-fit, minmax(10vw, 1fr))',
                       gap: '0.8vw', 
                       alignContent: 'center',
                       background: 'rgba(15, 23, 42, 0.4)',
                       padding: '2vw',
                       borderRadius: '24px',
                       marginLeft: '2vw',
                       border: '1px solid rgba(255,255,255,0.05)',
                       height: 'auto'
                    }}
                  >
                    {slide.modules.map(mod => (
                      <motion.button 
                        key={mod.id} 
                        variants={itemVariants} 
                        whileHover={{ y: -3, scale: 1.05 }} 
                        onClick={() => setSelectedModule(mod)} 
                        style={{ 
                          cursor: 'pointer', 
                          background: selectedModule?.id === mod.id ? 'rgba(212,175,55,0.2)' : 'rgba(30, 41, 59, 0.6)', 
                          borderRadius: '1vw', 
                          padding: '1vw 0.5vw', 
                          border: `1px solid ${selectedModule?.id === mod.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`, 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.8vw', 
                          color: '#fff',
                          transition: 'all 0.3s',
                          boxShadow: selectedModule?.id === mod.id ? '0 4px 20px rgba(212,175,55,0.4)' : '0 4px 10px rgba(0,0,0,0.2)'
                        }}
                      >
                         <span style={{ fontSize: '2vw' }}>{mod.icon}</span>
                         <span style={{ fontWeight: 600, fontSize: '0.9vw', textAlign: 'center' }}>{mod.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── POPUP: MERKEZİ EKRAN GÖRÜNTÜSÜ ── */}
        <AnimatePresence>
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(6, 10, 19, 0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem'
              }}
              onClick={() => setSelectedModule(null)}
            >
              <motion.img 
                key={selectedModule.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                src={`/screenshots/${selectedModule.id}.jpg`} 
                alt={selectedModule.name} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
                  display: 'block',
                  cursor: 'pointer'
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes button */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 100 }}>
          <button 
            className="nav-btn" 
            onClick={() => setShowNotes(!showNotes)} 
            title="Konuşma Notları (N)"
            style={{ width: '64px', height: '64px', background: showNotes ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)' }}
          >
            <MessageSquare size={28} color={showNotes ? '#000' : '#fff'} />
          </button>
        </div>

        {/* Nav controls */}
        <div className="nav-controls" style={{ position: 'absolute' }}>
          <button 
            className="nav-btn" 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '0 1.5rem', 
            height: '56px',
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            fontSize: '1rem', 
            fontWeight: 600,
            border: '1px solid var(--glass-border)',
            color: 'var(--accent-primary)',
          }}>
            {currentSlide + 1} <span style={{ opacity: 0.4, margin: '0 0.5rem' }}>/</span> {slides.length}
          </div>
          <button 
            className="nav-btn" 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="progress-bar" style={{ position: 'absolute', width: `${((currentSlide + 1) / slides.length) * 100}%` }} />

        <AnimatePresence>
          {showNotes && (
            <motion.div 
              className="speak-notes"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              style={{ position: 'absolute', left: '8rem', bottom: '3.5rem' }}
            >
              <h4 style={{ color: 'var(--accent-primary)', margin: 0, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.2rem' }}>
                <MessageSquare size={20} /> Not
              </h4>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: 0, color: '#e2e8f0' }}>{slide.notes}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Logo */}
        <div style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', zIndex: 100 }}>
           <div style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              letterSpacing: '2px',
              color: 'var(--accent-primary)',
              textShadow: '0 4px 10px rgba(0,0,0,0.5)',
              textTransform: 'uppercase'
           }}>
             HOTERFEA
           </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationMode;
