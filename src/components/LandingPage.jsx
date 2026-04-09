import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Bed, Utensils, Users, ShieldCheck, Zap,
  Waves, CreditCard, BarChart3, Globe, Bot, ArrowRight,
  Check, ChevronDown, Play, Monitor, Sparkles, Building2,
  Wifi, Lock, Search, Bell, Calendar, FileText,
  TrendingUp, Layers, Database, Shield, Cpu, Eye,
  MousePointer, Command, Rocket, Target, Activity
} from 'lucide-react';

/* ═══════════════════════════════════════════
   Animated Counter Hook
   ═══════════════════════════════════════════ */
const useCounter = (end, duration = 2000, startOnView = false) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
};

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
const CORE_FEATURES = [
  { icon: <Eye size={28} />, title: 'Gerçek Zamanlı Gösterge Paneli', desc: 'Doluluk, gelir, bekleyen check-in/out ve personel görevlerini canlı olarak izleyin. Tek bakışta tüm oteli kavrayın.', gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)' },
  { icon: <Bot size={28} />, title: 'Yapay Zeka Strateji Merkezi', desc: 'AI destekli dinamik fiyatlandırma, talep tahmini, anomali tespiti ve duygu analizi ile gelirinizi maksimize edin.', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  { icon: <Search size={28} />, title: 'Akıllı Fuzzy Arama', desc: 'Yazım hatalarını tolere eden NLP tabanlı arama motoru. "yemek" yazın, Restoran POS açılsın. "hens" yazın, Hans Müller bulansın.', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { icon: <Layers size={28} />, title: 'Modüler Mimari', desc: '45+ bağımsız modül, ihtiyacınıza göre aktif edin. Ön büro, restoran, SPA, muhasebe — hepsi entegre çalışır.', gradient: 'linear-gradient(135deg, #06b6d4, #10b981)' },
  { icon: <Shield size={28} />, title: 'Güvenlik & KBS Uyumu', desc: 'Otomatik polis bildirimi, KVKK veri koruma, rol bazlı yetkilendirme ve SSL şifreli veri transferi.', gradient: 'linear-gradient(135deg, #ef4444, #f97316)' },
  { icon: <TrendingUp size={28} />, title: 'Gelişmiş Analitik & Raporlar', desc: 'RevPAR, ADR, GOP analizleri, departman bazlı performans, bütçe karşılaştırma ve trend tahminleri.', gradient: 'linear-gradient(135deg, #10b981, #3b82f6)' },
];

const ALL_MODULES = [
  { icon: <LayoutDashboard size={18} />, name: 'Dashboard', color: '#3b82f6' },
  { icon: <Bed size={18} />, name: 'Ön Büro', color: '#10b981' },
  { icon: <Calendar size={18} />, name: 'Rezervasyon', color: '#f59e0b' },
  { icon: <Utensils size={18} />, name: 'Restoran POS', color: '#ef4444' },
  { icon: <Users size={18} />, name: 'CRM', color: '#8b5cf6' },
  { icon: <CreditCard size={18} />, name: 'Kasa', color: '#06b6d4' },
  { icon: <Waves size={18} />, name: 'SPA & Wellness', color: '#ec4899' },
  { icon: <FileText size={18} />, name: 'Folio / Hesap', color: '#6366f1' },
  { icon: <Building2 size={18} />, name: 'Housekeeping', color: '#14b8a6' },
  { icon: <ShieldCheck size={18} />, name: 'KBS Bildirimi', color: '#e11d48' },
  { icon: <Globe size={18} />, name: 'Kanal Yönetimi', color: '#0ea5e9' },
  { icon: <Bot size={18} />, name: 'AI Strateji', color: '#a855f7' },
  { icon: <BarChart3 size={18} />, name: 'Raporlama', color: '#f97316' },
  { icon: <Database size={18} />, name: 'Muhasebe', color: '#64748b' },
  { icon: <Bell size={18} />, name: 'Bildirimler', color: '#eab308' },
  { icon: <Activity size={18} />, name: 'Gelir Yönetimi', color: '#22c55e' },
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Misafir Geliyor', desc: 'Rezervasyon sistemi otomatik olarak oda atar, ön büroya bildirim gönderir, oda kartı hazırlanır.', icon: <Calendar size={24} /> },
  { num: '02', title: 'Check-in Yapılıyor', desc: 'Kimlik taraması, KBS bildirimi, oda durumu güncelleme ve hoş geldin mesajı — tek tıkla tamamlanır.', icon: <MousePointer size={24} /> },
  { num: '03', title: 'Konaklama Süresince', desc: 'Restoran, SPA, minibar harcamaları otomatik folio\'ya eklenir. Housekeeping görevleri AI ile planlanır.', icon: <Activity size={24} /> },
  { num: '04', title: 'Check-out & Analiz', desc: 'Tek tuşla hesap kapama, e-fatura, memnuniyet anketi gönderimi ve detaylı gelir raporu oluşturulur.', icon: <Target size={24} /> },
];

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
const LandingPage = ({ onOpenDemo }) => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const searchExamples = ['restoran bölümünü aç...', 'Hans Müller misafir ara...', 'bugünkü doluluk oranı...', 'yemek siparişi ekle...'];
  const [exampleIdx, setExampleIdx] = useState(0);

  // Scroll tracking
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setVisibleSections(prev => new Set([...prev, e.target.id])); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Typing animation for search demo
  useEffect(() => {
    const fullText = searchExamples[exampleIdx];
    let charIdx = 0;
    setTypedText('');
    const typeTimer = setInterval(() => {
      charIdx++;
      setTypedText(fullText.slice(0, charIdx));
      if (charIdx >= fullText.length) {
        clearInterval(typeTimer);
        setTimeout(() => setExampleIdx(prev => (prev + 1) % searchExamples.length), 2000);
      }
    }, 60);
    return () => clearInterval(typeTimer);
  }, [exampleIdx]);

  // Module carousel
  useEffect(() => {
    const t = setInterval(() => setActiveModuleIdx(prev => (prev + 1) % ALL_MODULES.length), 1500);
    return () => clearInterval(t);
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  const modCounter = useCounter(45, 1800, true);
  const channelCounter = useCounter(50, 2000, true);
  const uptimeCounter = useCounter(99, 1600, true);

  return (
    <div className="lp">
      {/* ═══ Floating Particles ═══ */}
      <div className="particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 20}s`,
          }} />
        ))}
      </div>

      {/* ═══ Navbar ═══ */}
      <nav className="lp-nav" style={{
        background: scrollY > 60 ? 'rgba(6,10,19,0.95)' : 'transparent',
        backdropFilter: scrollY > 60 ? 'blur(24px) saturate(1.8)' : 'none',
        borderBottom: scrollY > 60 ? '1px solid rgba(129,140,248,0.08)' : '1px solid transparent',
        boxShadow: scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}>
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="nav-logo"><Sparkles size={18} /></div>
            <strong>HOTERFEA</strong>
          </div>
          <div className="nav-links">
            <a href="#features">Özellikler</a>
            <a href="#modules">Modüller</a>
            <a href="#workflow">Nasıl Çalışır</a>
          </div>
          <button className="nav-cta" onClick={onOpenDemo}>
            <Play size={13} /> Canlı Demo
          </button>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section className="hero">
        <div className="hero-glow g1" />
        <div className="hero-glow g2" />
        <div className="hero-glow g3" />

        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-chip">
              <Cpu size={12} /> <span>AI-Powered Hotel Management</span>
            </div>
            <h1>
              Otel Yönetimini<br />
              <span className="grad">Yeniden Tanımlıyoruz</span>
            </h1>
            <p className="hero-desc">
              <strong>Hoterfea</strong>, yapay zeka destekli akıllı arama motoru, 45+ entegre modül
              ve gerçek zamanlı operasyon paneli ile otellerin tüm departmanlarını
              tek bir platformdan yönetmelerini sağlayan yeni nesil ERP sistemidir.
            </p>
            <div className="hero-btns">
              <button className="btn-primary-xl" onClick={onOpenDemo}>
                <Rocket size={18} /> Demo'yu Başlat <ArrowRight size={16} />
              </button>
            </div>

            {/* Counter stats */}
            <div className="hero-counters" ref={modCounter.ref}>
              <div className="hc-item">
                <strong>{modCounter.count}+</strong>
                <span>Entegre Modül</span>
              </div>
              <div className="hc-divider" />
              <div className="hc-item" ref={channelCounter.ref}>
                <strong>{channelCounter.count}+</strong>
                <span>Kanal Entegrasyonu</span>
              </div>
              <div className="hc-divider" />
              <div className="hc-item" ref={uptimeCounter.ref}>
                <strong>{uptimeCounter.count}.9%</strong>
                <span>Uptime</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup */}
          <div className="hero-mockup-wrap">
            <div className="mockup-float">
              <div className="mock">
                <div className="mock-bar">
                  <div className="mock-dots"><span /><span /><span /></div>
                  <div className="mock-url"><Lock size={8} /> hoterfea.app</div>
                </div>
                <div className="mock-body">
                  <div className="mock-side">
                    <div className="mock-side-logo"><Sparkles size={11} /></div>
                    {ALL_MODULES.slice(0, 8).map((m, i) => (
                      <div key={i} className={`mock-side-item ${i === activeModuleIdx % 8 ? 'active' : ''}`}>
                        <div className="msi-dot" style={{ background: m.color }} />
                      </div>
                    ))}
                  </div>
                  <div className="mock-main">
                    <div className="mock-header">
                      <div className="mock-title-bar" />
                      <div className="mock-search-bar">
                        <Search size={8} color="#64748b" />
                        <span className="mock-typed">{typedText}</span>
                        <span className="mock-cursor" />
                      </div>
                    </div>
                    <div className="mock-kpis">
                      {[
                        { label: 'Doluluk', val: '%84', c: '#3b82f6' },
                        { label: 'İçeride', val: '142', c: '#10b981' },
                        { label: 'Gelir', val: '₺245K', c: '#f59e0b' },
                        { label: 'RevPAR', val: '₺1.2K', c: '#8b5cf6' },
                      ].map((kpi, i) => (
                        <div key={i} className="mock-kpi">
                          <div className="mk-val" style={{ color: kpi.c }}>{kpi.val}</div>
                          <div className="mk-label">{kpi.label}</div>
                          <div className="mk-bar"><div style={{ width: `${55 + i * 12}%`, background: kpi.c }} /></div>
                        </div>
                      ))}
                    </div>
                    <div className="mock-chart-area">
                      <svg viewBox="0 0 340 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="mg2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0 65 C40 58 70 42 110 38 S180 30 220 35 S290 22 340 18 V80 H0Z" fill="url(#mg1)" />
                        <path d="M0 65 C40 58 70 42 110 38 S180 30 220 35 S290 22 340 18" fill="none" stroke="#818cf8" strokeWidth="2" />
                        <path d="M0 70 C50 65 90 55 140 52 S210 48 260 53 S310 42 340 38 V80 H0Z" fill="url(#mg2)" />
                        <path d="M0 70 C50 65 90 55 140 52 S210 48 260 53 S310 42 340 38" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <div className="float-card fc-1">
                <div className="fc-icon" style={{ background: '#10b981' }}><Check size={12} /></div>
                <div><strong>Oda 204</strong><span>Check-in tamamlandı</span></div>
              </div>
              <div className="float-card fc-2">
                <div className="fc-icon" style={{ background: '#f59e0b' }}><Bell size={12} /></div>
                <div><strong>Restoran</strong><span>3 yeni sipariş</span></div>
              </div>
              <div className="float-card fc-3">
                <div className="fc-icon" style={{ background: '#8b5cf6' }}><TrendingUp size={12} /></div>
                <div><strong>Gelir</strong><span>+%12 artış</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-hint"><ChevronDown size={20} /></div>
      </section>

      {/* ═══ Marquee Module Strip ═══ */}
      <div className="module-strip">
        <div className="strip-track">
          {[...ALL_MODULES, ...ALL_MODULES].map((m, i) => (
            <div key={i} className="strip-item">
              <span style={{ color: m.color }}>{m.icon}</span>
              <span>{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Features ═══ */}
      <section id="features" className="sec-features" data-animate>
        <div className="sec-header">
          <div className="sec-chip"><Zap size={12} /> Özellikler</div>
          <h2>Neden <span className="grad">Hoterfea</span>?</h2>
          <p>Her biri otel operasyonlarınız için özel olarak tasarlanmış güçlü yetenekler.</p>
        </div>
        <div className={`feat-grid ${isVisible('features') ? 'in' : ''}`}>
          {CORE_FEATURES.map((f, i) => (
            <div key={i} className="feat-card" style={{ '--d': `${i * 0.1}s` }}>
              <div className="feat-icon" style={{ background: f.gradient }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feat-shine" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Search Demo Section ═══ */}
      <section id="search-demo" className="sec-search" data-animate>
        <div className={`search-demo-inner ${isVisible('search-demo') ? 'in' : ''}`}>
          <div className="sd-left">
            <div className="sec-chip"><Command size={12} /> Akıllı Arama</div>
            <h2>Ne Aklınıza Gelirse <span className="grad">Yazın ve Bulun</span></h2>
            <p>
              Hoterfea'nın NLP tabanlı arama motoru, yazdığınız her şeyi anlar.
              Modül adı, özellik, misafir ismi, hatta yanlış yazılmış kelimeler bile —
              yapay zeka destekli fuzzy matching algoritması sayesinde doğru sonuca ulaşırsınız.
            </p>
            <div className="sd-examples">
              <div className="sd-ex"><Command size={14} /> <code>"yemek"</code> → Restoran POS modülü açılır</div>
              <div className="sd-ex"><Command size={14} /> <code>"hens"</code> → Hans Müller misafiri bulunur</div>
              <div className="sd-ex"><Command size={14} /> <code>"spa randevu"</code> → SPA yönetimi açılır</div>
              <div className="sd-ex"><Command size={14} /> <code>"kasa"</code> → Kasa işlemleri modülü açılır</div>
            </div>
          </div>
          <div className="sd-right">
            <div className="sd-mock-search">
              <div className="sdms-bar">
                <Search size={16} color="#818cf8" />
                <span className="sdms-text">{typedText}</span>
                <span className="sdms-cursor" />
              </div>
              <div className="sdms-results">
                <div className="sdms-section">MODÜLLER / ÖZELLİKLER <span className="ai-chip">AI</span></div>
                <div className="sdms-item active">
                  <div className="sdms-dot" style={{ background: '#ef4444' }} />
                  <div><strong>Restoran POS</strong><span>Yiyecek & İçecek</span></div>
                </div>
                <div className="sdms-item">
                  <div className="sdms-dot" style={{ background: '#06b6d4' }} />
                  <div><strong>SPA & Wellness</strong><span>Operasyon</span></div>
                </div>
                <div className="sdms-section" style={{ marginTop: 12 }}>MİSAFİRLER <span className="ai-chip">FUZZY</span></div>
                <div className="sdms-item">
                  <div className="sdms-dot" style={{ background: '#8b5cf6' }} />
                  <div><strong>Hans Müller</strong><span>Oda 204 · Almanya</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ All Modules Grid ═══ */}
      <section id="modules" className="sec-modules" data-animate>
        <div className="sec-header">
          <div className="sec-chip"><Layers size={12} /> 45+ Modül</div>
          <h2><span className="grad">Her Departman</span> İçin Bir Modül</h2>
          <p>Ön bürodan mutfağa, SPA'dan muhasebeye — tüm otel operasyonları tek çatı altında.</p>
        </div>
        <div className={`mod-grid ${isVisible('modules') ? 'in' : ''}`}>
          {ALL_MODULES.map((m, i) => (
            <div key={i} className="mod-pill" style={{ '--d': `${i * 0.04}s`, '--c': m.color }}>
              <span style={{ color: m.color }}>{m.icon}</span>
              <span>{m.name}</span>
            </div>
          ))}
        </div>
        <div className="mod-cta">
          <button className="btn-primary-xl" onClick={onOpenDemo}>
            <Monitor size={18} /> Tüm Modülleri Keşfet <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section id="workflow" className="sec-workflow" data-animate>
        <div className="sec-header">
          <div className="sec-chip"><Target size={12} /> Nasıl Çalışır</div>
          <h2>Misafir Yolculuğu <span className="grad">Uçtan Uca</span> Otomatik</h2>
          <p>Bir misafirin gelişinden ayrılışına kadar her adım Hoterfea tarafından yönetilir.</p>
        </div>
        <div className={`wf-timeline ${isVisible('workflow') ? 'in' : ''}`}>
          {WORKFLOW_STEPS.map((s, i) => (
            <div key={i} className="wf-step" style={{ '--d': `${i * 0.15}s` }}>
              <div className="wf-num">{s.num}</div>
              <div className="wf-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
          <div className="wf-line" />
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="sec-final" data-animate id="final">
        <div className={`final-box ${isVisible('final') ? 'in' : ''}`}>
          <div className="final-orb" />
          <Sparkles size={36} className="final-sparkle" />
          <h2>Hoterfea'yı <span className="grad">Şimdi Deneyin</span></h2>
          <p>Kurulum gerektirmez. Tek tıkla tam özellikli demo ortamına erişin,<br/>45+ modülü keşfedin ve farkı yaşayın.</p>
          <button className="btn-primary-xl" onClick={onOpenDemo}>
            <Play size={18} /> Canlı Demo'yu Başlat <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="lp-foot">
        <div className="foot-inner">
          <div className="nav-brand">
            <div className="nav-logo"><Sparkles size={16} /></div>
            <strong>HOTERFEA</strong>
          </div>
          <div className="foot-links">
            <a href="#features">Özellikler</a>
            <a href="#modules">Modüller</a>
            <a href="#" onClick={e => { e.preventDefault(); onOpenDemo(); }}>Demo</a>
          </div>
          <span className="foot-copy">© 2026 Hoterfea</span>
        </div>
      </footer>

      {/* ═══════════════════ STYLES ═══════════════════ */}
      <style>{`
        /* ── Reset & Base ─────────── */
        .lp { background: #060a13; color: #e2e8f0; font-family: 'Inter', -apple-system, sans-serif; overflow-x: hidden; position: relative; }
        .grad { background: linear-gradient(135deg, #818cf8, #c084fc, #f0abfc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* ── Particles ────────────── */
        .particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .particle {
          position: absolute; background: #818cf8; border-radius: 50%; opacity: 0;
          animation: particleDrift linear infinite;
        }
        @keyframes particleDrift {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          10% { opacity: 0.4; transform: scale(1); }
          90% { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-100vh) scale(0); }
        }

        /* ── Nav ──────────────────── */
        .lp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all 0.4s; }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; }
        .nav-logo { width: 38px; height: 38px; background: linear-gradient(135deg, #818cf8, #c084fc); border-radius: 11px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 24px rgba(129,140,248,0.3); }
        .nav-brand strong { font-size: 15px; font-weight: 900; letter-spacing: 2px; color: white; }
        .nav-links { display: flex; gap: 28px; }
        .nav-links a { text-decoration: none; color: #64748b; font-size: 13px; font-weight: 600; transition: 0.2s; position: relative; }
        .nav-links a:hover { color: #c084fc; }
        .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #818cf8, #c084fc); border-radius: 2px; transition: width 0.3s; }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta { padding: 10px 22px; background: linear-gradient(135deg, #818cf8, #a855f7); color: white; border: none; border-radius: 10px; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 6px; cursor: pointer; box-shadow: 0 0 20px rgba(168,85,247,0.25); transition: 0.3s; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 0 32px rgba(168,85,247,0.4); }

        /* ── Hero ─────────────────── */
        .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; position: relative; padding: 100px 32px 40px; }
        .hero-glow { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.12; pointer-events: none; animation: glowPulse 12s ease-in-out infinite; }
        .g1 { width: 600px; height: 600px; background: #818cf8; top: -15%; right: -5%; }
        .g2 { width: 450px; height: 450px; background: #c084fc; bottom: 5%; left: -8%; animation-delay: -4s; }
        .g3 { width: 350px; height: 350px; background: #f0abfc; top: 35%; left: 40%; animation-delay: -8s; }
        @keyframes glowPulse { 0%,100% { transform: scale(1); opacity: 0.12; } 50% { transform: scale(1.15); opacity: 0.18; } }

        .hero-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 60px; position: relative; z-index: 1; }
        .hero-text { flex: 1; max-width: 540px; }
        .hero-chip { display: inline-flex; align-items: center; gap: 6px; padding: 7px 16px; background: rgba(129,140,248,0.08); border: 1px solid rgba(129,140,248,0.15); border-radius: 40px; font-size: 11px; font-weight: 700; color: #a5b4fc; margin-bottom: 28px; letter-spacing: 0.5px; }
        .hero-text h1 { font-size: 52px; font-weight: 900; line-height: 1.08; letter-spacing: -1.5px; color: white; margin-bottom: 22px; }
        .hero-desc { font-size: 16px; color: #8892b0; line-height: 1.8; margin-bottom: 36px; }
        .hero-desc strong { color: #c084fc; font-weight: 700; }
        .hero-btns { margin-bottom: 48px; }

        .btn-primary-xl { padding: 16px 34px; background: linear-gradient(135deg, #818cf8, #a855f7); color: white; border: none; border-radius: 14px; font-size: 16px; font-weight: 800; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; box-shadow: 0 0 40px rgba(168,85,247,0.3); transition: all 0.3s; position: relative; overflow: hidden; }
        .btn-primary-xl::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255,255,255,0.08), transparent); transform: rotate(45deg); transition: 0.6s; }
        .btn-primary-xl:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(168,85,247,0.5); }
        .btn-primary-xl:hover::before { left: 100%; }

        .hero-counters { display: flex; align-items: center; gap: 28px; }
        .hc-item strong { font-size: 30px; font-weight: 900; color: white; display: block; }
        .hc-item span { font-size: 11px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .hc-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.06); }

        /* ── Mockup ──────────────── */
        .hero-mockup-wrap { flex: 1; max-width: 520px; position: relative; z-index: 1; }
        .mockup-float { position: relative; animation: mockFloat 6s ease-in-out infinite; }
        @keyframes mockFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        .mock { background: #0b1120; border-radius: 16px; overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.06); }
        .mock-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #111827; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .mock-dots { display: flex; gap: 5px; }
        .mock-dots span { width: 9px; height: 9px; border-radius: 50%; }
        .mock-dots span:nth-child(1) { background: #ef4444; }
        .mock-dots span:nth-child(2) { background: #f59e0b; }
        .mock-dots span:nth-child(3) { background: #10b981; }
        .mock-url { font-size: 10px; color: #334155; display: flex; align-items: center; gap: 4px; }
        .mock-body { display: flex; min-height: 300px; }
        .mock-side { width: 44px; background: #0a0e1a; padding: 8px 5px; display: flex; flex-direction: column; align-items: center; gap: 3px; border-right: 1px solid rgba(255,255,255,0.02); }
        .mock-side-logo { width: 26px; height: 26px; background: linear-gradient(135deg, #818cf8, #a855f7); border-radius: 7px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 6px; }
        .mock-side-item { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: 0.3s; }
        .mock-side-item.active { background: rgba(129,140,248,0.12); }
        .msi-dot { width: 6px; height: 6px; border-radius: 50%; }

        .mock-main { flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        .mock-header { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
        .mock-title-bar { width: 100px; height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; }
        .mock-search-bar { flex: 1; max-width: 200px; height: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; display: flex; align-items: center; gap: 4px; padding: 0 8px; overflow: hidden; }
        .mock-typed { font-size: 8px; color: #64748b; white-space: nowrap; }
        .mock-cursor { width: 1px; height: 10px; background: #818cf8; animation: blink 1s infinite; flex-shrink: 0; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .mock-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        .mock-kpi { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 6px; text-align: center; }
        .mk-val { font-size: 14px; font-weight: 900; }
        .mk-label { font-size: 7px; color: #475569; margin: 2px 0 4px; font-weight: 600; text-transform: uppercase; }
        .mk-bar { height: 3px; background: rgba(255,255,255,0.03); border-radius: 2px; overflow: hidden; }
        .mk-bar > div { height: 100%; border-radius: 2px; transition: width 1s; }

        .mock-chart-area { flex: 1; min-height: 80px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.02); border-radius: 8px; padding: 6px; }
        .mock-chart-area svg { width: 100%; height: 100%; }

        /* Floating cards */
        .float-card { position: absolute; display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: rgba(15,23,42,0.9); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; z-index: 2; box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
        .float-card strong { font-size: 11px; color: white; display: block; }
        .float-card span { font-size: 9px; color: #64748b; }
        .fc-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; }
        .fc-1 { top: 20%; right: -30px; animation: floatCard 5s ease-in-out infinite; }
        .fc-2 { bottom: 30%; left: -35px; animation: floatCard 5s ease-in-out infinite 1.5s; }
        .fc-3 { bottom: 8%; right: -20px; animation: floatCard 5s ease-in-out infinite 3s; }
        @keyframes floatCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .scroll-hint { text-align: center; color: #334155; animation: bounceD 2s infinite; margin-top: 20px; position: relative; z-index: 1; }
        @keyframes bounceD { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ── Module Strip (Marquee) ── */
        .module-strip { overflow: hidden; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03); background: rgba(255,255,255,0.01); position: relative; z-index: 1; }
        .strip-track { display: flex; gap: 32px; animation: marquee 30s linear infinite; width: max-content; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .strip-item { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #475569; white-space: nowrap; }

        /* ── Section Shared ────────── */
        .sec-header { text-align: center; margin-bottom: 56px; }
        .sec-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; background: rgba(129,140,248,0.06); border: 1px solid rgba(129,140,248,0.12); border-radius: 30px; font-size: 11px; font-weight: 700; color: #a5b4fc; margin-bottom: 16px; }
        .sec-header h2 { font-size: 38px; font-weight: 900; color: white; margin-bottom: 12px; }
        .sec-header p { font-size: 15px; color: #64748b; max-width: 520px; margin: 0 auto; line-height: 1.7; }

        /* ── Features ─────────────── */
        .sec-features { padding: 120px 32px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .feat-grid.in .feat-card { animation: cardIn 0.6s ease forwards; animation-delay: var(--d); }
        .feat-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 18px; padding: 32px 26px; transition: 0.4s; opacity: 0; transform: translateY(24px); position: relative; overflow: hidden; }
        .feat-grid:not(.in) .feat-card { opacity: 1; transform: none; }
        .feat-card:hover { border-color: rgba(129,140,248,0.15); transform: translateY(-4px); background: rgba(255,255,255,0.035); }
        .feat-card:hover .feat-shine { opacity: 1; }
        .feat-shine { position: absolute; top: -50%; right: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 30% 30%, rgba(129,140,248,0.04), transparent 60%); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
        .feat-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 20px; }
        .feat-card h3 { font-size: 18px; font-weight: 800; color: white; margin-bottom: 8px; }
        .feat-card p { font-size: 13px; color: #8892b0; line-height: 1.7; }
        @keyframes cardIn { to { opacity: 1; transform: translateY(0); } }

        /* ── Search Demo ──────────── */
        .sec-search { padding: 80px 32px; position: relative; z-index: 1; }
        .search-demo-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 56px; background: linear-gradient(135deg, rgba(129,140,248,0.05), rgba(168,85,247,0.03)); border: 1px solid rgba(129,140,248,0.07); border-radius: 24px; padding: 56px; opacity: 0; transform: translateY(24px); transition: 0.7s; }
        .search-demo-inner.in { opacity: 1; transform: translateY(0); }
        .sd-left { flex: 1; }
        .sd-left h2 { font-size: 32px; font-weight: 900; color: white; margin-bottom: 14px; }
        .sd-left p { font-size: 14px; color: #8892b0; line-height: 1.8; margin-bottom: 24px; }
        .sd-examples { display: flex; flex-direction: column; gap: 8px; }
        .sd-ex { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #cbd5e1; font-weight: 600; }
        .sd-ex svg { color: #818cf8; flex-shrink: 0; }
        .sd-ex code { background: rgba(129,140,248,0.1); padding: 2px 8px; border-radius: 4px; font-size: 12px; color: #a5b4fc; }

        .sd-right { flex: 0 0 320px; }
        .sd-mock-search { background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .sdms-bar { display: flex; align-items: center; gap: 8px; padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .sdms-text { font-size: 13px; color: #94a3b8; }
        .sdms-cursor { width: 2px; height: 14px; background: #818cf8; animation: blink 1s infinite; }
        .sdms-results { padding: 12px; }
        .sdms-section { font-size: 10px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px; padding: 4px 8px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
        .ai-chip { background: linear-gradient(135deg, #818cf8, #a855f7); color: white; padding: 1px 5px; border-radius: 3px; font-size: 8px; font-weight: 900; }
        .sdms-item { display: flex; align-items: center; gap: 10px; padding: 10px 10px; border-radius: 8px; transition: 0.2s; margin-bottom: 2px; }
        .sdms-item.active { background: rgba(129,140,248,0.08); }
        .sdms-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .sdms-item strong { font-size: 13px; color: white; display: block; font-weight: 700; }
        .sdms-item span { font-size: 10px; color: #64748b; }

        /* ── Modules Grid ─────────── */
        .sec-modules { padding: 120px 32px; max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }
        .mod-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
        .mod-grid.in .mod-pill { animation: pillIn 0.4s ease forwards; animation-delay: var(--d); }
        .mod-pill { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; font-size: 13px; font-weight: 700; color: #cbd5e1; transition: 0.3s; opacity: 0; transform: scale(0.9); cursor: default; }
        .mod-grid:not(.in) .mod-pill { opacity: 1; transform: none; }
        .mod-pill:hover { border-color: var(--c); background: rgba(255,255,255,0.04); transform: translateY(-2px) !important; }
        @keyframes pillIn { to { opacity: 1; transform: scale(1); } }
        .mod-cta { text-align: center; margin-top: 48px; }

        /* ── Workflow ─────────────── */
        .sec-workflow { padding: 120px 32px; max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }
        .wf-timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; }
        .wf-line { position: absolute; top: 56px; left: 12%; right: 12%; height: 2px; background: linear-gradient(90deg, rgba(129,140,248,0.1), rgba(168,85,247,0.2), rgba(129,140,248,0.1)); z-index: 0; }
        .wf-timeline.in .wf-step { animation: cardIn 0.6s ease forwards; animation-delay: var(--d); }
        .wf-step { text-align: center; position: relative; z-index: 1; opacity: 0; transform: translateY(20px); }
        .wf-timeline:not(.in) .wf-step { opacity: 1; transform: none; }
        .wf-num { font-size: 11px; font-weight: 900; color: #818cf8; margin-bottom: 12px; letter-spacing: 2px; }
        .wf-icon { width: 56px; height: 56px; margin: 0 auto 16px; background: rgba(129,140,248,0.06); border: 1px solid rgba(129,140,248,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #a5b4fc; }
        .wf-step h3 { font-size: 15px; font-weight: 800; color: white; margin-bottom: 8px; }
        .wf-step p { font-size: 12px; color: #64748b; line-height: 1.6; }

        /* ── Final CTA ────────────── */
        .sec-final { padding: 80px 32px; position: relative; z-index: 1; }
        .final-box { max-width: 700px; margin: 0 auto; text-align: center; background: linear-gradient(135deg, #0f172a, #1a1444); border: 1px solid rgba(129,140,248,0.1); border-radius: 28px; padding: 64px; position: relative; overflow: hidden; opacity: 0; transform: translateY(24px); transition: 0.7s; }
        .final-box.in { opacity: 1; transform: translateY(0); }
        .final-orb { position: absolute; top: -40%; left: -20%; width: 250px; height: 250px; background: radial-gradient(circle, rgba(129,140,248,0.08), transparent); pointer-events: none; }
        .final-sparkle { color: #818cf8; margin-bottom: 20px; }
        .final-box h2 { font-size: 32px; font-weight: 900; color: white; margin-bottom: 14px; }
        .final-box p { font-size: 15px; color: #8892b0; line-height: 1.7; margin-bottom: 28px; }

        /* ── Footer ───────────────── */
        .lp-foot { background: #030711; padding: 32px; border-top: 1px solid rgba(255,255,255,0.03); position: relative; z-index: 1; }
        .foot-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .foot-links { display: flex; gap: 20px; }
        .foot-links a { font-size: 12px; color: #334155; text-decoration: none; font-weight: 600; transition: 0.2s; }
        .foot-links a:hover { color: #a5b4fc; }
        .foot-copy { font-size: 11px; color: #1e293b; }

        /* ── Responsive ───────────── */
        @media (max-width: 900px) {
          .hero-inner { flex-direction: column; gap: 40px; }
          .hero-text h1 { font-size: 34px; }
          .hero-mockup-wrap { max-width: 100%; }
          .feat-grid { grid-template-columns: 1fr 1fr; }
          .search-demo-inner { flex-direction: column; padding: 36px; }
          .sd-right { flex: unset; width: 100%; }
          .wf-timeline { grid-template-columns: 1fr 1fr; }
          .wf-line { display: none; }
          .nav-links { display: none; }
          .hero-counters { gap: 16px; }
          .float-card { display: none; }
        }
        @media (max-width: 600px) {
          .feat-grid { grid-template-columns: 1fr; }
          .wf-timeline { grid-template-columns: 1fr; }
          .hero-text h1 { font-size: 28px; }
          .hero-counters { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
