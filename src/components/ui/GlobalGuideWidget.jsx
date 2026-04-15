import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, Search, BookOpen, MessageSquare, 
  ChevronRight, AlertTriangle, ChevronDown, 
  Maximize, Minimize, HelpCircle
} from 'lucide-react';
import { guideData } from '../../data/guideData';

const CATEGORIES = ['Tümü', ...new Set(guideData.map(g => g.category))];

// ==========================================
// GELİŞMİŞ NLP ARAMA FONKSİYONU
// Hem tam hem kısmi hem Türkçe eşleşme
// ==========================================
function smartSearch(query) {
  if (!query || query.trim().length < 1) return [];
  
  const q = query.toLowerCase()
    .replace(/[?!.,;]/g, '')
    .replace(/nasıl|nerede|nereden|yapılır|açıkla|göster|yardım|neyin|nedir|neden/gi, '')
    .trim();

  if (!q) return guideData.slice(0, 5);

  const words = q.split(/\s+/).filter(w => w.length > 1);
  
  const scores = guideData.map(g => {
    let score = 0;
    const titleLower = g.title.toLowerCase();
    const purposeLower = g.purpose.toLowerCase();
    const allKeywords = g.keywords.map(k => k.toLowerCase());

    // Tam başlık eşleşmesi — çok yüksek puan
    if (titleLower === q) score += 100;
    if (titleLower.includes(q)) score += 60;

    // Her kelime için ayrı ayrı kontrol
    words.forEach(word => {
      if (titleLower.includes(word)) score += 40;
      if (allKeywords.some(k => k.includes(word) || word.includes(k))) score += 30;
      if (purposeLower.includes(word)) score += 15;
      // Adım içinde arama
      g.steps.forEach(s => {
        if (s.desc.toLowerCase().includes(word)) score += 5;
      });
    });

    return { guide: g, score };
  });

  return scores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(s => s.guide);
}

// ==========================================
// CHATBOT NLP — Çok daha akıllı cevap
// ==========================================
function buildChatResponse(query) {
  const q = query.toLowerCase()
    .replace(/[?!.,;]/g, '')
    .replace(/nasıl|nerede|nereden|yapılır|açıkla|göster|yardım|neyin|nedir|neden|ben|bana|bunu/gi, '')
    .trim();

  // Önce en iyi eşleşmeyi bul
  const results = smartSearch(q);
  
  if (results.length === 0) {
    return `Sorduğunuz konu için eşleşme bulamadım. Lütfen daha kısa yazmayı deneyin.\n\n**Örnek sorular:**\n- "Booking bağlantısını nasıl kontrol ederim"\n- "Misafiri odaya nasıl alırım"\n- "Gece raporunu nasıl kapatırım"\n- "Fatura nasıl kesilir"`;
  }

  const best = results[0];
  let reply = `**${best.category} → ${best.title}** için adım adım yol tarifi:\n\n`;
  reply += `> ${best.purpose}\n\n`;
  
  best.steps.forEach((step, i) => {
    if (step.title && !step.warn) {
      reply += `**${i + 1}. ${step.title}**\n${step.desc}\n\n`;
    } else if (step.warn) {
      reply += `🚨 **Önemli Uyarı:** ${step.warn}\n\n`;
    }
  });

  if (results.length > 1) {
    reply += `---\n*İlgili başka konular: ${results.slice(1, 3).map(r => `**${r.title}**`).join(', ')}*`;
  }

  return reply;
}

const GlobalGuideWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('search'); 
  
  const [searchQ, setSearchQ] = useState('');
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [selectedCat, setSelectedCat] = useState('Tümü');

  const [chatMsgs, setChatMsgs] = useState([
    { role: 'ai', text: 'Merhaba. Sistemdeki herhangi bir işlemin nerede olduğunu veya nasıl yapıldığını buraya sorun.\n\n**Örnek:** "Booking rezervasyonları nerede görünür?" veya "Gece kapatma nasıl yapılır?"' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs, isTyping]);

  const searchResults = useMemo(() => smartSearch(searchQ), [searchQ]);

  const filteredGuides = useMemo(() => 
    selectedCat === 'Tümü' ? guideData : guideData.filter(g => g.category === selectedCat)
  , [selectedCat]);

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatMsgs(p => [...p, { role: 'user', text: msg }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = buildChatResponse(msg);
      setChatMsgs(p => [...p, { role: 'ai', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  const renderChatLine = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('🚨')) {
        return <div key={i} className="chat-alert"><AlertTriangle size={14}/><span>{line.replace('🚨 ', '')}</span></div>;
      }
      if (line.startsWith('>')) {
        return <blockquote key={i} className="chat-blockquote">{line.slice(2)}</blockquote>;
      }
      if (line.startsWith('---')) {
        return <hr key={i} className="chat-divider" />;
      }
      if (!line.trim()) return <div key={i} style={{height:'6px'}} />;
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="chat-line">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="chat-bold">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <>
      <motion.button 
        className="ggw-fab"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <HelpCircle size={20} />
        <span>Nasıl Kullanılır?</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="ggw-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div 
              className={`ggw-modal ${isFullScreen ? 'fs' : ''}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              {/* HEADER */}
              <div className="ggw-header">
                <div className="ggw-brand">
                  <div className="ggw-logo"><Bot size={20}/></div>
                  <div>
                    <h3>Nasıl Kullanılır?</h3>
                    <p>Hangi menüden nereye gidileceğini, adım adım anlatıyoruz.</p>
                  </div>
                </div>
                <div className="ggw-btns">
                  <button onClick={() => setIsFullScreen(v => !v)} title="Tam ekran">
                    {isFullScreen ? <Minimize size={16}/> : <Maximize size={16}/>}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="ggw-close" title="Kapat">
                    <X size={16}/>
                  </button>
                </div>
              </div>

              {/* TABS */}
              <div className="ggw-tabs">
                <button className={activeTab === 'search' ? 'on' : ''} onClick={() => setActiveTab('search')}>
                  <Search size={14}/> Arama Yapın
                </button>
                <button className={activeTab === 'guides' ? 'on' : ''} onClick={() => setActiveTab('guides')}>
                  <BookOpen size={14}/> Tüm Yönergeler
                </button>
                <button className={activeTab === 'chat' ? 'on' : ''} onClick={() => setActiveTab('chat')}>
                  <MessageSquare size={14}/> Asistan
                </button>
              </div>

              {/* BODY */}
              <div className="ggw-body">

                {/* === ARAMA SEKMESİ === */}
                {activeTab === 'search' && (
                  <div className="tab-search">
                    <p className="tab-hint">Ne yapmak istediğinizi kısaca yazın. Hem modülü bulalım hem de yolunu tarif edelim.</p>
                    <div className="search-wrap">
                      <Search size={18} color="#94a3b8"/>
                      <input 
                        autoFocus
                        placeholder="Örn: Booking fiyatını değiştirmek istiyorum, gece kapanışı..."
                        value={searchQ}
                        onChange={e => setSearchQ(e.target.value)}
                      />
                      {searchQ && <button className="clr-btn" onClick={() => setSearchQ('')}><X size={14}/></button>}
                    </div>

                    <div className="results-list">
                      {searchQ === '' ? (
                        <div className="empty-state">
                          <HelpCircle size={40} color="#e2e8f0"/>
                          <p>Aramaya başladığınızda sistem size en doğru kılavuzu anında bulur.</p>
                          <div className="quick-chips">
                            {['Check-in', 'Fatura', 'Gece Raporu', 'Booking', 'Stok', 'Personel'].map(chip => (
                              <button key={chip} onClick={() => setSearchQ(chip)}>{chip}</button>
                            ))}
                          </div>
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="empty-state">
                          <AlertTriangle size={40} color="#fca5a5"/>
                          <p>"{searchQ}" ile eşleşen bir modül bulunamadı. Farklı bir kelime deneyin.</p>
                        </div>
                      ) : (
                        searchResults.map((res, i) => (
                          <div key={i} className="result-card" onClick={() => {
                            setActiveTab('guides');
                            setExpandedGuide(res.id);
                            setSelectedCat(res.category);
                          }}>
                            <div className="rc-icon">{res.icon}</div>
                            <div className="rc-info">
                              <strong>{res.title}</strong>
                              <span>{res.category}</span>
                            </div>
                            <ChevronRight size={16} color="#0ea5e9"/>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* === YÖNERGELER SEKMESİ === */}
                {activeTab === 'guides' && (
                  <div className="tab-guides">
                    <div className="cat-bar">
                      {CATEGORIES.map(cat => (
                        <button key={cat} className={selectedCat === cat ? 'on' : ''} onClick={() => { setSelectedCat(cat); setExpandedGuide(null); }}>
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="guide-scroll">
                      {filteredGuides.map(g => {
                        const open = expandedGuide === g.id;
                        return (
                          <div key={g.id} className={`gcard ${open ? 'open' : ''}`}>
                            <div className="gcard-head" onClick={() => setExpandedGuide(open ? null : g.id)}>
                              <div className="gcard-ico">{g.icon}</div>
                              <div className="gcard-label">
                                <strong>{g.title}</strong>
                                <span>{g.category}</span>
                              </div>
                              <ChevronDown size={18} color={open ? '#0ea5e9' : '#94a3b8'} style={{transform: open ? 'rotate(180deg)' : 'none', flexShrink:0, transition:'0.2s'}}/>
                            </div>
                            {open && (
                              <div className="gcard-body">
                                <div className="gcard-purpose">
                                  <strong>Bu ekran ne işe yarar?</strong>
                                  <p>{g.purpose}</p>
                                </div>
                                <div className="gcard-steps">
                                  {g.steps.map((step, i) => (
                                    step.warn ? (
                                      <div key={i} className="step-warn">
                                        <AlertTriangle size={16} color="#ef4444"/>
                                        <div><strong>Önemli Uyarı:</strong> {step.warn}</div>
                                      </div>
                                    ) : (
                                      <div key={i} className="step-row">
                                        <div className="step-n">{i + 1}</div>
                                        <div className="step-content">
                                          <strong>{step.title}</strong>
                                          <p>{step.desc}</p>
                                        </div>
                                      </div>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* === ASISTAN SEKMESİ === */}
                {activeTab === 'chat' && (
                  <div className="tab-chat">
                    <div className="chat-feed">
                      {chatMsgs.map((m, i) => (
                        <div key={i} className={`bubble ${m.role}`}>
                          {m.role === 'ai' ? renderChatLine(m.text) : m.text}
                        </div>
                      ))}
                      {isTyping && <div className="bubble ai dots"><span/><span/><span/></div>}
                      <div ref={chatEndRef}/>
                    </div>
                    <div className="chat-box">
                      <input
                        placeholder="Örn: Booking fiyatlarını nerede değiştiririm?"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleChatSubmit()}
                      />
                      <button onClick={handleChatSubmit}>Sor</button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* FAB BUTTON */
        .ggw-fab {
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
          display: flex; align-items: center; gap: 8px;
          background: #0f172a; color: white; border: 3px solid white;
          padding: 10px 20px; border-radius: 40px;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; box-shadow: 0 6px 24px rgba(15,23,42,0.25);
          transition: 0.2s;
        }
        .ggw-fab:hover { background: #1e293b; box-shadow: 0 8px 28px rgba(15,23,42,0.35); transform: translateY(-2px); }

        /* OVERLAY + MODAL */
        .ggw-overlay {
          position: fixed; inset: 0; background: rgba(15,23,42,0.55);
          backdrop-filter: blur(6px); z-index: 10000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .ggw-modal {
          width: 100%; max-width: 820px; height: 86vh; max-height: 780px;
          background: #fff; border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          font-family: 'Inter', sans-serif;
        }
        .ggw-modal.fs { max-width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }

        /* HEADER */
        .ggw-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; background: #fff; border-bottom: 1px solid #e2e8f0; flex-shrink: 0;
        }
        .ggw-brand { display: flex; align-items: center; gap: 12px; }
        .ggw-logo {
          width: 40px; height: 40px; border-radius: 10px; background: #0f172a;
          color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ggw-brand h3 { margin: 0 0 2px; font-size: 15px; font-weight: 700; color: #0f172a; }
        .ggw-brand p { margin: 0; font-size: 12px; color: #64748b; }
        .ggw-btns { display: flex; gap: 8px; }
        .ggw-btns button {
          width: 34px; height: 34px; border-radius: 8px; border: 1px solid #e2e8f0;
          background: #f8fafc; color: #475569; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.15s;
        }
        .ggw-btns button:hover { background: #e2e8f0; color: #0f172a; }
        .ggw-close:hover { background: #fee2e2 !important; color: #dc2626 !important; border-color: #fca5a5 !important; }

        /* TABS */
        .ggw-tabs {
          display: flex; border-bottom: 1px solid #e2e8f0; background: #fff; flex-shrink: 0; padding: 0 12px;
        }
        .ggw-tabs button {
          flex: 1; border: none; background: none; padding: 12px 10px; font-size: 13px; font-weight: 600;
          color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px;
          border-bottom: 2px solid transparent; transition: 0.15s;
        }
        .ggw-tabs button:hover { color: #0f172a; }
        .ggw-tabs button.on { color: #0ea5e9; border-bottom-color: #0ea5e9; background: #f0f9ff; }

        /* BODY */
        .ggw-body { flex: 1; overflow: hidden; position: relative; background: #f8fafc; }

        /* ===== ARAMA SEKMESİ ===== */
        .tab-search { position: absolute; inset: 0; display: flex; flex-direction: column; padding: 20px 24px; }
        .tab-hint { font-size: 13px; color: #475569; margin: 0 0 14px; text-align: center; }
        .search-wrap {
          display: flex; align-items: center; gap: 12px; padding: 12px 18px;
          border: 2px solid #e2e8f0; border-radius: 12px; background: #fff; flex-shrink: 0; transition: 0.15s;
        }
        .search-wrap:focus-within { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
        .search-wrap input { flex: 1; border: none; background: none; font-size: 14px; outline: none; color: #0f172a; }
        .clr-btn { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 2px; display: flex; }
        
        .results-list { flex: 1; overflow-y: auto; margin-top: 16px; padding-right: 4px; }
        .results-list::-webkit-scrollbar { width: 6px; }
        .results-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }

        .empty-state { text-align: center; padding: 40px 20px; color: #94a3b8; }
        .empty-state p { font-size: 13px; margin: 12px 0 20px; line-height: 1.5; }
        .quick-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .quick-chips button {
          padding: 6px 14px; border-radius: 40px; border: 1px solid #e2e8f0;
          background: #fff; font-size: 12px; font-weight: 600; color: #475569; cursor: pointer; transition: 0.15s;
        }
        .quick-chips button:hover { border-color: #0ea5e9; color: #0ea5e9; background: #f0f9ff; }

        .result-card {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 10px;
          cursor: pointer; transition: 0.15s;
        }
        .result-card:hover { border-color: #0ea5e9; box-shadow: 0 4px 12px rgba(14,165,233,0.08); transform: translateY(-1px); }
        .rc-icon { width: 40px; height: 40px; border-radius: 10px; background: #f0f9ff; color: #0ea5e9; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rc-info { flex: 1; }
        .rc-info strong { display: block; font-size: 14px; color: #0f172a; font-weight: 700; }
        .rc-info span { font-size: 12px; color: #64748b; }

        /* ===== YÖNERGELER SEKMESİ ===== */
        .tab-guides { position: absolute; inset: 0; display: flex; flex-direction: column; }
        .cat-bar {
          display: flex; overflow-x: auto; gap: 8px; padding: 14px 20px; flex-shrink: 0;
          background: #fff; border-bottom: 1px solid #e2e8f0;
        }
        .cat-bar::-webkit-scrollbar { height: 4px; }
        .cat-bar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .cat-bar button {
          padding: 6px 14px; border-radius: 40px; border: 1px solid #e2e8f0;
          background: #f8fafc; font-size: 12px; font-weight: 600; color: #475569;
          white-space: nowrap; cursor: pointer; transition: 0.15s; flex-shrink: 0;
        }
        .cat-bar button:hover { border-color: #0ea5e9; color: #0ea5e9; }
        .cat-bar button.on { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }

        /* KRITIK: Bu iki kural scroll'u çalıştırır */
        .guide-scroll { flex: 1; overflow-y: auto; padding: 16px 20px; display: block; }
        .guide-scroll::-webkit-scrollbar { width: 6px; }
        .guide-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }

        .gcard { border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; margin-bottom: 12px; overflow: hidden; transition: 0.1s; }
        .gcard.open { border-color: #0ea5e9; border-width: 2px; box-shadow: 0 8px 20px rgba(14,165,233,0.1); }
        .gcard-head { display: flex; align-items: center; gap: 14px; padding: 16px 18px; cursor: pointer; }
        .gcard.open .gcard-head { background: #f0f9ff; border-bottom: 1px solid #bae6fd; }
        .gcard-ico { width: 40px; height: 40px; border-radius: 10px; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #0ea5e9; flex-shrink: 0; }
        .gcard.open .gcard-ico { background: #fff; border-color: #0ea5e9; }
        .gcard-label { flex: 1; }
        .gcard-label strong { display: block; font-size: 14px; color: #0f172a; font-weight: 700; }
        .gcard-label span { font-size: 12px; color: #64748b; }

        .gcard-body { }
        .gcard-purpose { padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        .gcard-purpose strong { font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
        .gcard-purpose p { margin: 6px 0 0; font-size: 13px; color: #1e293b; line-height: 1.55; }
        
        .gcard-steps { padding: 16px 20px; display: flex; flex-direction: column; gap: 16px; }
        .step-row { display: flex; gap: 14px; }
        .step-n { width: 26px; height: 26px; border-radius: 50%; background: #0ea5e9; color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .step-content { flex: 1; }
        .step-content strong { display: block; font-size: 13px; color: #0f172a; font-weight: 700; margin-bottom: 4px; }
        .step-content p { margin: 0; font-size: 13px; color: #334155; line-height: 1.55; }
        .step-warn { display: flex; gap: 10px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 12px; font-size: 13px; color: #991b1b; line-height: 1.5; }
        .step-warn strong { font-weight: 700; }

        /* ===== ASISTAN SEKMESİ ===== */
        .tab-chat { position: absolute; inset: 0; display: flex; flex-direction: column; }
        .chat-feed { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .chat-feed::-webkit-scrollbar { width: 6px; }
        .chat-feed::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }

        .bubble { max-width: 88%; padding: 14px 18px; border-radius: 14px; font-size: 13px; line-height: 1.6; }
        .bubble.ai { background: #fff; border: 1px solid #e2e8f0; color: #1e293b; align-self: flex-start; border-top-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .bubble.user { background: linear-gradient(135deg, #0ea5e9, #2563eb); color: #fff; align-self: flex-end; border-top-right-radius: 4px; font-weight: 600; }
        .bubble.dots { display: flex; gap: 6px; align-items: center; padding: 14px 18px; }
        .bubble.dots span { width: 6px; height: 6px; border-radius: 50%; background: #cbd5e1; animation: blink 1.2s infinite; }
        .bubble.dots span:nth-child(2) { animation-delay: 0.2s; }
        .bubble.dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,80%,100%{opacity:0.3} 40%{opacity:1} }

        .chat-line { margin: 0 0 6px; }
        .chat-bold { color: #0f172a; font-weight: 700; }
        .chat-blockquote { margin: 6px 0; padding: 8px 12px; background: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 0 6px 6px 0; font-size: 13px; color: #166534; }
        .chat-alert { display: flex; gap: 8px; background: #fef2f2; border: 1px solid #fca5a5; padding: 10px; border-radius: 8px; color: #991b1b; font-size: 13px; margin: 8px 0; }
        .chat-divider { border: none; border-top: 1px solid #e2e8f0; margin: 8px 0; }

        .chat-box { display: flex; gap: 10px; padding: 16px 20px; background: #fff; border-top: 1px solid #e2e8f0; flex-shrink: 0; }
        .chat-box input {
          flex: 1; border: 1px solid #cbd5e1; border-radius: 10px; padding: 0 16px;
          height: 44px; font-size: 13px; outline: none; background: #f8fafc; transition: 0.15s;
        }
        .chat-box input:focus { border-color: #0ea5e9; background: #fff; box-shadow: 0 0 0 3px rgba(14,165,233,0.1); }
        .chat-box button {
          background: #0f172a; color: #fff; border: none; border-radius: 10px;
          padding: 0 20px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.15s;
        }
        .chat-box button:hover { background: #0ea5e9; }

        @media(max-width: 768px) {
          .ggw-fab { bottom: 16px; right: 16px; padding: 9px 16px; font-size: 12px; }
          .ggw-modal { height: 100vh; max-height: 100vh; border-radius: 0; }
          .ggw-header, .ggw-tabs, .chat-box { padding: 12px 16px; }
          .tab-search { padding: 16px; }
          .cat-bar, .guide-scroll, .chat-feed { padding: 12px 16px; }
        }
      `}</style>
    </>
  );
};

export default GlobalGuideWidget;
