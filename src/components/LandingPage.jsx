import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Bed, Utensils, Users, ShieldCheck, Zap,
  Waves, CreditCard, BarChart3, Globe, Bot, ArrowRight,
  Check, Star, ChevronDown, Play, Monitor, Smartphone, Tablet,
  Clock, TrendingUp, Lock, Headphones, Sparkles, Building2,
  Wifi, Coffee, Sunset, Mountain, Gem, Award, Heart
} from 'lucide-react';

const MODULES = [
  { icon: <LayoutDashboard size={24} />, title: 'Akıllı Dashboard', desc: 'Tüm operasyonları gerçek zamanlı tek ekrandan yönetin.', color: '#3b82f6' },
  { icon: <Bed size={24} />, title: 'Ön Büro & Rezervasyon', desc: 'Check-in/out, oda planı ve 50+ kanal entegrasyonu.', color: '#10b981' },
  { icon: <Utensils size={24} />, title: 'Restoran & Bar', desc: 'Masa yönetimi, adisyon ve oda servisi bir arada.', color: '#f59e0b' },
  { icon: <Users size={24} />, title: 'CRM & Sadakat', desc: 'Misafir profilleri ve kişiselleştirilmiş deneyimler.', color: '#8b5cf6' },
  { icon: <CreditCard size={24} />, title: 'Finans & Muhasebe', desc: 'Kasa, folio, e-fatura ve bütçe yönetimi.', color: '#ef4444' },
  { icon: <Waves size={24} />, title: 'SPA & Wellness', desc: 'Randevu, terapist ve paket satış yönetimi.', color: '#06b6d4' },
  { icon: <Bot size={24} />, title: 'AI Strateji Merkezi', desc: 'Yapay zeka ile fiyatlama ve talep tahmini.', color: '#7c3aed' },
  { icon: <Globe size={24} />, title: 'Kanal Yönetimi', desc: 'Tüm OTA kanallarını tek noktadan kontrol edin.', color: '#0ea5e9' },
  { icon: <ShieldCheck size={24} />, title: 'Güvenlik & KBS', desc: 'KVKK uyumu ve otomatik polis bildirimi.', color: '#e11d48' },
];

const APP_FEATURES = [
  { icon: <Sunset size={40} />, title: 'Gerçek Zamanlı İzleme', desc: 'Doluluk oranı, gelir, check-in/out durumları ve tüm operasyonları anlık olarak tek panelden takip edin.', gradient: 'linear-gradient(135deg, #f97316, #ec4899)' },
  { icon: <Gem size={40} />, title: 'AI Destekli Fiyatlama', desc: 'Yapay zeka algoritmaları ile dinamik fiyatlandırma yapın, gelir optimizasyonunu otomatikleştirin.', gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' },
  { icon: <Coffee size={40} />, title: 'Akıllı Arama Motoru', desc: 'Yazım hataları tolere eden fuzzy search ile modülleri, misafirleri ve özellikleri saniyede bulun.', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { icon: <Waves size={40} />, title: 'Tam Entegrasyon', desc: 'Ön büro, restoran, SPA, housekeeping ve muhasebe modülleri birbirine entegre çalışır.', gradient: 'linear-gradient(135deg, #06b6d4, #10b981)' },
  { icon: <Mountain size={40} />, title: 'Kolay Kullanım', desc: 'Modern ve sezgisel arayüz sayesinde personel eğitim süresi minimuma iner, verimlilik artar.', gradient: 'linear-gradient(135deg, #10b981, #3b82f6)' },
  { icon: <Award size={40} />, title: 'Detaylı Raporlama', desc: 'Gelir, doluluk, departman performansı ve misafir analitiği gibi kapsamlı raporlara anında erişin.', gradient: 'linear-gradient(135deg, #f59e0b, #8b5cf6)' },
];

const STATS = [
  { value: '45+', label: 'Entegre Modül' },
  { value: '500+', label: 'Lüks Oda & Suite' },
  { value: '50+', label: 'Kanal Entegrasyonu' },
  { value: '7/24', label: 'Concierge Hizmeti' },
];

const LandingPage = ({ onOpenDemo }) => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  return (
    <div className="landing-page">
      {/* ── Navbar ─────────────────────────────── */}
      <nav className="lp-nav" style={{ background: scrollY > 50 ? 'rgba(8,12,21,0.92)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none', borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent' }}>
        <div className="lp-nav-inner">
          <div className="lp-brand">
            <div className="lp-logo-icon">
              <Sparkles size={18} />
            </div>
            <div>
              <strong>HOTERFEA</strong>
            </div>
          </div>
          <div className="lp-nav-links">
            <a href="#highlights">Özellikler</a>
            <a href="#modules">Modüller</a>
            <a href="#experience">Deneyim</a>
          </div>
          <div className="lp-nav-actions">
            <button className="lp-btn-glow" onClick={onOpenDemo}>
              <Play size={14} /> Canlı Demo
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────── */}
      <section className="lp-hero">
        <div className="hero-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={12} /> Yapay Zeka Destekli Otel Yönetim Platformu
          </div>
          <h1>
            Misafirlerinize <br/>
            <span className="gradient-text-hero">Unutulmaz</span> Deneyimler Sunun
          </h1>
          <p>
            500+ lüks oda, 5 restoran, SPA merkezi ve 45+ akıllı modül ile 
            otelinizi geleceğe taşıyın. AI destekli yönetim sistemiyle her detayı kontrol altında tutun.
          </p>
          <div className="hero-actions">
            <button className="lp-btn-hero" onClick={onOpenDemo}>
              <Monitor size={18} /> Canlı Demo'yu Keşfet <ArrowRight size={16} />
            </button>
          </div>
          <div className="hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-mockup">
            <div className="mockup-glow" />
            <div className="mockup-bar">
              <div className="mockup-dots">
                <span style={{background:'#ef4444'}} />
                <span style={{background:'#f59e0b'}} />
                <span style={{background:'#10b981'}} />
              </div>
              <span className="mockup-url">
                <Lock size={9} /> hoterfea.app
              </span>
            </div>
            <div className="mockup-screen">
              <div className="mockup-sidebar-v">
                <div className="msv-logo"><Sparkles size={14} /></div>
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`msv-item ${i === 1 ? 'active' : ''}`}>
                    <div className="msv-dot" style={{background: ['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#e11d48'][i-1]}} />
                  </div>
                ))}
              </div>
              <div className="mockup-main-v">
                <div className="mmv-top">
                  <div className="mmv-title" />
                  <div className="mmv-search"><Wifi size={10} color="#475569" /></div>
                </div>
                <div className="mmv-cards">
                  {[{c:'#3b82f6',v:'%84'},{c:'#10b981',v:'142'},{c:'#f59e0b',v:'₺245K'},{c:'#8b5cf6',v:'98%'}].map((card,i) => (
                    <div key={i} className="mmv-card">
                      <div className="mmv-card-icon" style={{background: `${card.c}20`, color: card.c}}><Building2 size={12}/></div>
                      <div className="mmv-card-val" style={{color: card.c}}>{card.v}</div>
                      <div className="mmv-card-bar"><div style={{width:`${60+i*10}%`, background: card.c}} /></div>
                    </div>
                  ))}
                </div>
                <div className="mmv-chart">
                  <svg viewBox="0 0 320 90" style={{width:'100%',height:'100%'}}>
                    <defs>
                      <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 70 Q40 60 80 50 T160 35 T240 42 T320 28 V90 H0Z" fill="url(#cg1)" />
                    <path d="M0 70 Q40 60 80 50 T160 35 T240 42 T320 28" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M0 75 Q40 68 80 62 T160 55 T240 60 T320 48 V90 H0Z" fill="url(#cg2)" />
                    <path d="M0 75 Q40 68 80 62 T160 55 T240 60 T320 48" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── Hotel Highlights ────────────────────── */}
      <section id="highlights" className="lp-highlights" data-animate>
        <div className="section-header dark-header">
          <div className="section-badge-glow"><Gem size={12} /> Özellikler</div>
          <h2>Neden <span className="gradient-text-hero">Hoterfea</span>?</h2>
          <p>Otelinizin tüm ihtiyaçlarını karşılayan güçlü özelliklerle operasyonlarınızı dönüştürün.</p>
        </div>
        <div className={`highlights-grid ${isVisible('highlights') ? 'animate-in' : ''}`}>
          {APP_FEATURES.map((h, i) => (
            <div key={i} className="highlight-card" style={{'--delay': `${i * 0.1}s`}}>
              <div className="hc-icon-wrap" style={{background: h.gradient}}>
                {h.icon}
              </div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience / CTA ──────────────────── */}
      <section id="experience" className="lp-experience" data-animate>
        <div className={`exp-inner ${isVisible('experience') ? 'animate-in' : ''}`}>
          <div className="exp-left">
            <div className="section-badge-glow" style={{marginBottom:20}}><Heart size={12} /> Deneyim</div>
            <h2>Her Anı <span className="gradient-text-hero">Özel</span> Kılıyoruz</h2>
            <p>Misafirlerimizin %96'sı tekrar gelmeyi tercih ediyor. Kişiye özel hizmet anlayışımız, yapay zeka destekli operasyonlarımız ve eğitimli kadromuzla farkı yaşayın.</p>
            <div className="exp-features">
              <div className="exp-f"><Check size={16} /> AI destekli kişisel öneri sistemi</div>
              <div className="exp-f"><Check size={16} /> 7/24 özel concierge hizmeti</div>
              <div className="exp-f"><Check size={16} /> Anlık oda servisi ve talep yönetimi</div>
              <div className="exp-f"><Check size={16} /> Çok dilli personel kadrosu</div>
              <div className="exp-f"><Check size={16} /> Çocuk dostu animasyon programları</div>
              <div className="exp-f"><Check size={16} /> Özel transfer ve tur organizasyonu</div>
            </div>
            <button className="lp-btn-hero" onClick={onOpenDemo} style={{marginTop:28}}>
              <Play size={18} /> Sistemi Keşfedin <ArrowRight size={16} />
            </button>
          </div>
          <div className="exp-right">
            <div className="exp-card ec-1">
              <div className="ec-num">%96</div>
              <div className="ec-label">Misafir Memnuniyeti</div>
            </div>
            <div className="exp-card ec-2">
              <div className="ec-num">4.9<Star size={16} fill="#f59e0b" color="#f59e0b" /></div>
              <div className="ec-label">Google Değerlendirme</div>
            </div>
            <div className="exp-card ec-3">
              <div className="ec-num">15K+</div>
              <div className="ec-label">Yıllık Misafir</div>
            </div>
            <div className="exp-card ec-4">
              <div className="ec-num">12</div>
              <div className="ec-label">Uluslararası Ödül</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technology / Modules ────────────────── */}
      <section id="modules" className="lp-modules" data-animate>
        <div className="section-header dark-header">
          <div className="section-badge-glow"><Zap size={12} /> Teknoloji</div>
          <h2>45+ Akıllı Modül ile <span className="gradient-text-hero">Tam Kontrol</span></h2>
          <p>Yapay zeka destekli yönetim sistemiyle otel operasyonlarınızı optimize edin.</p>
        </div>
        <div className={`modules-grid ${isVisible('modules') ? 'animate-in' : ''}`}>
          {MODULES.map((m, i) => (
            <div key={i} className="module-card" style={{'--delay': `${i * 0.06}s`, '--accent': m.color}}>
              <div className="mc-icon" style={{color: m.color, background: `${m.color}10`, border: `1px solid ${m.color}20`}}>
                {m.icon}
              </div>
              <div>
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="modules-cta">
          <button className="lp-btn-hero" onClick={onOpenDemo}>
            <Monitor size={18} /> Tüm Modülleri Deneyin <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────── */}
      <section className="lp-final-cta" data-animate id="final-cta">
        <div className={`final-cta-inner ${isVisible('final-cta') ? 'animate-in' : ''}`}>
          <Sparkles size={32} className="fci-sparkle" />
          <h2>Geleceğin Otel Yönetimi <span className="gradient-text-hero">Bugün Başlıyor</span></h2>
          <p>Kurulum gerektirmez. Tek tıkla tam özellikli demo ortamına erişin ve 45+ modülün gücünü keşfedin.</p>
          <div className="fci-actions">
            <button className="lp-btn-hero" onClick={onOpenDemo}>
              <Play size={18} /> Canlı Demo <ArrowRight size={16} />
            </button>
          </div>
          <div className="fci-badges">
            <span><Clock size={13} /> Anında Erişim</span>
            <span><Lock size={13} /> Güvenli Bağlantı</span>
            <span><TrendingUp size={13} /> 45+ Modül</span>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="lp-footer">
        <div className="footer-simple">
          <div className="lp-brand">
            <div className="lp-logo-icon"><Sparkles size={18} /></div>
            <div><strong>HOTERFEA</strong></div>
          </div>
          <div className="footer-nav">
            <a href="#highlights">Özellikler</a>
            <a href="#modules">Modüller</a>
            <a href="#" onClick={(e)=>{e.preventDefault();onOpenDemo();}}>Demo</a>
          </div>
          <p className="footer-copy">© 2026 Hoterfea. Tüm hakları saklıdır.</p>
        </div>
      </footer>

      <style>{`
        /* ── BASE ────────────────────────────────── */
        .landing-page {
          background: #060a13;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        .gradient-text-hero {
          background: linear-gradient(135deg, #818cf8, #c084fc, #f0abfc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── NAV ─────────────────────────────────── */
        .lp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all 0.4s; }
        .lp-nav-inner { max-width: 1200px; margin: 0 auto; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; }
        .lp-brand { display: flex; align-items: center; gap: 10px; }
        .lp-logo-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #818cf8, #c084fc);
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 900; font-size: 17px; flex-shrink: 0;
          box-shadow: 0 0 20px rgba(129,140,248,0.3);
        }
        .lp-brand strong { font-size: 15px; font-weight: 900; letter-spacing: 2px; display: block; color: white; }
        .lp-brand span { font-size: 10px; color: #64748b; font-weight: 600; }
        .lp-nav-links { display: flex; gap: 32px; }
        .lp-nav-links a { text-decoration: none; color: #94a3b8; font-size: 14px; font-weight: 600; transition: 0.2s; }
        .lp-nav-links a:hover { color: #c084fc; }
        .lp-nav-actions { display: flex; gap: 10px; align-items: center; }

        .lp-btn-ghost { padding: 10px 20px; background: transparent; border: none; color: #94a3b8; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .lp-btn-ghost:hover { color: #c084fc; }

        .lp-btn-glow {
          padding: 10px 22px; background: linear-gradient(135deg, #818cf8, #a855f7);
          color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
          display: flex; align-items: center; gap: 6px; cursor: pointer;
          box-shadow: 0 0 25px rgba(168,85,247,0.3); transition: all 0.3s;
        }
        .lp-btn-glow:hover { transform: translateY(-1px); box-shadow: 0 0 35px rgba(168,85,247,0.5); }

        .lp-btn-hero {
          padding: 16px 32px;
          background: linear-gradient(135deg, #818cf8, #a855f7);
          color: white; border: none; border-radius: 14px; font-size: 16px; font-weight: 800;
          display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
          box-shadow: 0 0 35px rgba(168,85,247,0.3); transition: all 0.3s;
        }
        .lp-btn-hero:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(168,85,247,0.5); }

        .lp-btn-outline-dark {
          padding: 16px 28px; background: transparent; border: 1.5px solid rgba(255,255,255,0.12);
          color: #cbd5e1; border-radius: 14px; font-size: 15px; font-weight: 700;
          display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.3s;
        }
        .lp-btn-outline-dark:hover { border-color: #818cf8; color: #818cf8; }

        /* ── HERO ────────────────────────────────── */
        .lp-hero {
          min-height: 100vh; display: flex; align-items: center; position: relative;
          padding: 120px 32px 80px; gap: 60px; max-width: 1300px; margin: 0 auto;
        }
        .hero-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .orb {
          position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.15;
          animation: orbFloat 20s ease-in-out infinite;
        }
        .orb-1 { width: 500px; height: 500px; background: #818cf8; top: -10%; right: -5%; animation-delay: 0s; }
        .orb-2 { width: 400px; height: 400px; background: #c084fc; bottom: 10%; left: -10%; animation-delay: -7s; }
        .orb-3 { width: 300px; height: 300px; background: #f0abfc; top: 40%; right: 30%; animation-delay: -14s; }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }

        .hero-content { flex: 1; position: relative; z-index: 1; max-width: 560px; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px; background: rgba(129,140,248,0.1);
          border: 1px solid rgba(129,140,248,0.2); border-radius: 40px;
          font-size: 12px; font-weight: 700; color: #a5b4fc; margin-bottom: 28px;
        }
        .hero-content h1 {
          font-size: 50px; font-weight: 900; line-height: 1.1; margin-bottom: 22px;
          letter-spacing: -1px; color: white;
        }
        .hero-content p { font-size: 17px; color: #94a3b8; line-height: 1.8; margin-bottom: 36px; }
        .hero-actions { display: flex; gap: 14px; margin-bottom: 52px; flex-wrap: wrap; }
        .hero-stats { display: flex; gap: 36px; flex-wrap: wrap; }
        .hero-stat strong { font-size: 28px; font-weight: 900; color: white; display: block; }
        .hero-stat span { font-size: 12px; color: #64748b; font-weight: 600; }

        .hero-visual { flex: 1; position: relative; z-index: 1; max-width: 500px; }
        .hero-mockup {
          background: #0c1322; border-radius: 18px; overflow: hidden; position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
          transform: perspective(1000px) rotateY(-4deg) rotateX(2deg); transition: transform 0.6s;
        }
        .hero-mockup:hover { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
        .mockup-glow {
          position: absolute; top: -50%; right: -30%; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(129,140,248,0.15), transparent); pointer-events: none; z-index: 0;
        }
        .mockup-bar { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: #111827; border-bottom: 1px solid rgba(255,255,255,0.04); position: relative; z-index: 1; }
        .mockup-dots { display: flex; gap: 6px; }
        .mockup-dots span { width: 10px; height: 10px; border-radius: 50%; }
        .mockup-url { font-size: 11px; color: #475569; font-weight: 500; display: flex; align-items: center; gap: 4px; }
        .mockup-screen { display: flex; min-height: 300px; position: relative; z-index: 1; }

        .mockup-sidebar-v {
          width: 48px; background: #0a0f1a; padding: 10px 6px;
          display: flex; flex-direction: column; gap: 4px; align-items: center;
          border-right: 1px solid rgba(255,255,255,0.03);
        }
        .msv-logo {
          width: 30px; height: 30px; background: linear-gradient(135deg, #818cf8, #a855f7);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: white; margin-bottom: 8px;
        }
        .msv-item { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 7px; transition: 0.2s; }
        .msv-item.active { background: rgba(129,140,248,0.15); }
        .msv-dot { width: 7px; height: 7px; border-radius: 50%; }

        .mockup-main-v { flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 10px; background: #0c1322; }
        .mmv-top { display: flex; justify-content: space-between; align-items: center; }
        .mmv-title { width: 140px; height: 12px; background: rgba(255,255,255,0.06); border-radius: 6px; }
        .mmv-search { width: 100px; height: 26px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 7px; display: flex; align-items: center; justify-content: center; }
        .mmv-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        .mmv-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 10px; padding: 10px 6px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .mmv-card-icon { width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .mmv-card-val { font-size: 14px; font-weight: 900; }
        .mmv-card-bar { width: 80%; height: 3px; background: rgba(255,255,255,0.04); border-radius: 2px; overflow: hidden; }
        .mmv-card-bar > div { height: 100%; border-radius: 2px; }
        .mmv-chart { flex: 1; min-height: 90px; background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.03); border-radius: 10px; padding: 10px; }

        .scroll-indicator { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: #475569; animation: bounceDown 2s infinite; z-index: 1; }
        @keyframes bounceDown {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        /* ── SECTION SHARED ──────────────────────── */
        .section-header, .dark-header { text-align: center; margin-bottom: 56px; }
        .section-badge-glow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 18px; background: rgba(129,140,248,0.08);
          border: 1px solid rgba(129,140,248,0.15); border-radius: 30px;
          font-size: 12px; font-weight: 700; color: #a5b4fc; margin-bottom: 16px;
        }
        .dark-header h2 { font-size: 38px; font-weight: 900; margin-bottom: 14px; color: white; }
        .dark-header p { font-size: 16px; color: #64748b; max-width: 560px; margin: 0 auto; line-height: 1.7; }

        /* ── HIGHLIGHTS ──────────────────────────── */
        .lp-highlights { padding: 120px 32px; max-width: 1200px; margin: 0 auto; }
        .highlights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .highlights-grid.animate-in .highlight-card { animation: cardUp 0.7s ease forwards; animation-delay: var(--delay); }
        .highlight-card {
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px; padding: 36px 28px; transition: all 0.4s;
          opacity: 0; transform: translateY(30px);
        }
        .highlights-grid:not(.animate-in) .highlight-card { opacity: 1; transform: none; }
        .highlight-card:hover { transform: translateY(-6px); border-color: rgba(129,140,248,0.2); background: rgba(255,255,255,0.04); box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .hc-icon-wrap { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 22px; }
        .highlight-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 10px; color: white; }
        .highlight-card p { font-size: 14px; color: #94a3b8; line-height: 1.7; }
        @keyframes cardUp { to { opacity: 1; transform: translateY(0); } }

        /* ── EXPERIENCE ──────────────────────────── */
        .lp-experience { padding: 80px 32px; }
        .exp-inner {
          max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 60px;
          background: linear-gradient(135deg, rgba(129,140,248,0.06), rgba(168,85,247,0.04));
          border: 1px solid rgba(129,140,248,0.08); border-radius: 28px; padding: 64px;
          opacity: 0; transform: translateY(30px); transition: all 0.7s;
        }
        .exp-inner.animate-in { opacity: 1; transform: translateY(0); }
        .exp-left { flex: 1; }
        .exp-left h2 { font-size: 34px; font-weight: 900; margin-bottom: 16px; color: white; line-height: 1.2; }
        .exp-left p { font-size: 15px; color: #94a3b8; line-height: 1.8; margin-bottom: 24px; }
        .exp-features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .exp-f { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
        .exp-f svg { color: #818cf8; }

        .exp-right { flex: 0 0 280px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .exp-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; padding: 24px 16px; text-align: center; transition: 0.3s;
        }
        .exp-card:hover { transform: translateY(-4px); border-color: rgba(129,140,248,0.2); }
        .ec-num { font-size: 28px; font-weight: 900; color: white; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .ec-label { font-size: 11px; color: #64748b; font-weight: 600; margin-top: 4px; }
        .ec-1 { border-color: rgba(129,140,248,0.15); }
        .ec-2 { border-color: rgba(245,158,11,0.15); }
        .ec-3 { border-color: rgba(16,185,129,0.15); }
        .ec-4 { border-color: rgba(239,68,68,0.15); }

        /* ── MODULES ─────────────────────────────── */
        .lp-modules { padding: 120px 32px; max-width: 1100px; margin: 0 auto; }
        .modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .modules-grid.animate-in .module-card { animation: cardUp 0.5s ease forwards; animation-delay: var(--delay); }
        .module-card {
          display: flex; align-items: flex-start; gap: 14px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
          border-radius: 14px; padding: 22px 20px; transition: all 0.3s;
          opacity: 0; transform: translateY(20px);
        }
        .modules-grid:not(.animate-in) .module-card { opacity: 1; transform: none; }
        .module-card:hover { border-color: var(--accent); background: rgba(255,255,255,0.04); transform: translateY(-3px); }
        .mc-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .module-card h4 { font-size: 15px; font-weight: 800; color: white; margin-bottom: 4px; }
        .module-card p { font-size: 12px; color: #64748b; line-height: 1.5; }
        .modules-cta { text-align: center; margin-top: 48px; }

        /* ── FINAL CTA ───────────────────────────── */
        .lp-final-cta { padding: 80px 32px; }
        .final-cta-inner {
          max-width: 700px; margin: 0 auto; text-align: center;
          background: linear-gradient(135deg, #0f172a, #1e1b4b);
          border: 1px solid rgba(129,140,248,0.12); border-radius: 28px; padding: 64px;
          opacity: 0; transform: translateY(30px); transition: all 0.7s;
          position: relative; overflow: hidden;
        }
        .final-cta-inner::before {
          content: ''; position: absolute; top: -50%; left: -20%; width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(129,140,248,0.1), transparent); pointer-events: none;
        }
        .final-cta-inner.animate-in { opacity: 1; transform: translateY(0); }
        .fci-sparkle { color: #818cf8; margin-bottom: 20px; }
        .final-cta-inner h2 { font-size: 30px; font-weight: 900; color: white; margin-bottom: 14px; }
        .final-cta-inner p { font-size: 15px; color: #94a3b8; margin-bottom: 28px; line-height: 1.7; }
        .fci-actions { margin-bottom: 24px; }
        .fci-badges { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
        .fci-badges span { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; font-weight: 600; }
        .fci-badges svg { color: #818cf8; }

        /* ── FOOTER ──────────────────────────────── */
        .lp-footer { background: #030711; color: white; padding: 40px 32px; border-top: 1px solid rgba(255,255,255,0.04); }
        .footer-simple { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
        .footer-nav { display: flex; gap: 24px; }
        .footer-nav a { font-size: 13px; color: #475569; text-decoration: none; font-weight: 600; transition: 0.2s; }
        .footer-nav a:hover { color: #a5b4fc; }
        .footer-copy { font-size: 12px; color: #334155; margin: 0; }

        /* ── RESPONSIVE ──────────────────────────── */
        @media (max-width: 900px) {
          .lp-hero { flex-direction: column; padding-top: 100px; gap: 40px; }
          .hero-content h1 { font-size: 34px; }
          .highlights-grid, .modules-grid { grid-template-columns: 1fr 1fr; }
          .exp-inner { flex-direction: column; padding: 40px; }
          .exp-right { flex: unset; width: 100%; }
          .footer-inner { grid-template-columns: 1fr 1fr; }
          .lp-nav-links { display: none; }
          .hero-visual { max-width: 100%; }
          .hero-stats { gap: 20px; }
        }
        @media (max-width: 600px) {
          .highlights-grid, .modules-grid { grid-template-columns: 1fr; }
          .hero-content h1 { font-size: 28px; }
          .footer-inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
