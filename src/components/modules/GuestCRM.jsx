import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Star, Phone, Mail, Globe,
  Edit, X, CheckCircle, CreditCard, Award,
  Calendar, TrendingUp, User, Heart
} from 'lucide-react';

const LOYALTY_COLORS = {
  Platinum: { bg:'#1e293b', text:'white'  },
  Gold:     { bg:'#f59e0b', text:'white'  },
  Silver:   { bg:'#64748b', text:'white'  },
  None:     { bg:'#f1f5f9', text:'#64748b'},
};

const GuestFormModal = ({ guest, onClose, onSave }) => {
  const [form, setForm] = useState(guest || { name:'', nationality:'TR', phone:'', email:'', loyalty:'None', dob:'', tcNo:'', passport:'' });
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="gf-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9,y:20}} animate={{scale:1,y:0}}>
        <div className="modal-head">
          <h3>{guest ? 'Misafir Düzenle' : 'Yeni Misafir Kaydı'}</h3>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        <div className="gf-body">
          <div className="form-grid">
            <div className="fg-group full"><label>Ad Soyad *</label><input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Ad Soyad"/></div>
            <div className="fg-group"><label>Uyruk</label>
              <select value={form.nationality} onChange={e=>set('nationality',e.target.value)}>
                {['TR','DE','US','UK','FR','ES','IT','RU','AE'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="fg-group"><label>Sadakat Seviyesi</label>
              <select value={form.loyalty} onChange={e=>set('loyalty',e.target.value)}>
                {['None','Silver','Gold','Platinum'].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="fg-group"><label>Telefon</label><input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+90..."/></div>
            <div className="fg-group"><label>E-posta</label><input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="email@example.com"/></div>
            <div className="fg-group"><label>Doğum Tarihi</label><input type="date" value={form.dob} onChange={e=>set('dob',e.target.value)}/></div>
            <div className="fg-group"><label>TC Kimlik No</label><input value={form.tcNo} onChange={e=>set('tcNo',e.target.value)} placeholder="12345678900"/></div>
            <div className="fg-group"><label>Pasaport No</label><input value={form.passport} onChange={e=>set('passport',e.target.value)} placeholder="A1234567"/></div>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-cancel" onClick={onClose}>İptal</button>
          <button className="btn-save" onClick={()=>{ onSave(form); onClose(); }} disabled={!form.name}>
            {guest ? 'Güncelle' : 'Misafir Oluştur'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GuestDetailPanel = ({ guest, reservations, onClose, onEdit }) => {
  const guestRes = reservations.filter(r => r.guestId === guest.id || r.guest === guest.name);
  const lc = LOYALTY_COLORS[guest.loyalty];

  return (
    <motion.div className="detail-panel" initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} exit={{x:40,opacity:0}}>
      <div className="dp-head">
        <div className="dp-avatar">{guest.name[0]}</div>
        <div>
          <h3>{guest.name}</h3>
          <span className="loyalty-tag" style={{background:lc.bg,color:lc.text}}>{guest.loyalty}</span>
        </div>
        <button onClick={onClose} style={{marginLeft:'auto'}}><X size={20}/></button>
      </div>

      <div className="dp-stats">
        <div className="dps"><Calendar size={16}/><div><strong>{guest.visits}</strong><span>Konaklama</span></div></div>
        <div className="dps"><TrendingUp size={16}/><div><strong>₺{guest.totalSpent.toLocaleString()}</strong><span>Toplam Harcama</span></div></div>
        <div className="dps"><Star size={16}/><div><strong>{guest.lastVisit}</strong><span>Son Ziyaret</span></div></div>
      </div>

      <div className="dp-contact">
        <div className="dc-row"><Phone size={14}/><span>{guest.phone||'—'}</span></div>
        <div className="dc-row"><Mail size={14}/><span>{guest.email||'—'}</span></div>
        <div className="dc-row"><Globe size={14}/><span>{guest.nationality}</span></div>
        {guest.tcNo  && <div className="dc-row"><User size={14}/><span>TC: {guest.tcNo}</span></div>}
        {guest.passport && <div className="dc-row"><User size={14}/><span>Pasaport: {guest.passport}</span></div>}
      </div>

      <div className="dp-section">
        <h4>Rezervasyon Geçmişi</h4>
        {guestRes.length === 0 ? <p className="no-res">Rezervasyon bulunamadı.</p> :
          guestRes.map(r => (
            <div key={r.id} className="res-mini">
              <div className="rm-left">
                <strong>{r.id}</strong>
                <span>Oda {r.room||'—'} · {r.checkIn} / {r.checkOut}</span>
              </div>
              <span className={`rmtag ${r.status}`}>{r.status==='check-in'?'İçeride':r.status==='check-out'?'Çıktı':'Bekliyor'}</span>
            </div>
          ))
        }
      </div>

      <button className="dp-edit-btn" onClick={()=>onEdit(guest)}><Edit size={14}/> Misafiri Düzenle</button>
    </motion.div>
  );
};

const GuestCRM = () => {
  const { guests, addGuest, reservations } = useHotel();
  const [search, setSearch] = useState('');
  const [loyaltyFilter, setLoyaltyFilter] = useState('Tümü');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);

  const filtered = guests.filter(g => {
    const q = search.toLowerCase();
    const matchQ = !q || g.name.toLowerCase().includes(q) || g.email?.toLowerCase().includes(q) || g.phone?.includes(q);
    const matchL = loyaltyFilter === 'Tümü' || g.loyalty === loyaltyFilter;
    return matchQ && matchL;
  });

  const handleSave = (form) => {
    if (editingGuest) return; // update not implemented with current simple state
    addGuest(form);
  };

  return (
    <div className="crm-layout">
      {/* Left: Guest List */}
      <div className="crm-list-panel">
        <div className="cls-head">
          <h2>Misafir CRM</h2>
          <button className="btn-primary" onClick={()=>{ setEditingGuest(null); setShowForm(true); }}>
            <Plus size={16}/> Yeni Misafir
          </button>
        </div>

        {/* Stats */}
        <div className="crm-mini-stats">
          {['Platinum','Gold','Silver'].map(l => (
            <div key={l} className="cms">
              <strong>{guests.filter(g=>g.loyalty===l).length}</strong>
              <span>{l}</span>
            </div>
          ))}
          <div className="cms"><strong>{guests.length}</strong><span>Toplam</span></div>
        </div>

        {/* Search & Filter */}
        <div className="crm-filters">
          <div className="search-box">
            <Search size={15} color="#94a3b8"/>
            <input placeholder="İsim, e-posta, telefon..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="loyalty-filter">
            {['Tümü','Platinum','Gold','Silver','None'].map(l=>(
              <button key={l} className={`lf-btn ${loyaltyFilter===l?'active':''}`} onClick={()=>setLoyaltyFilter(l)}>{l}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="guest-cards">
          {filtered.map((g, i) => {
            const lc = LOYALTY_COLORS[g.loyalty];
            return (
              <motion.div
                key={g.id}
                className={`gc-card ${selectedGuest?.id===g.id?'active':''}`}
                onClick={()=>setSelectedGuest(g)}
                whileHover={{scale:1.01}}
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                transition={{delay:i*0.04}}
              >
                <div className="gc-avatar">{g.name[0]}</div>
                <div className="gc-info">
                  <strong>{g.name}</strong>
                  <span>{g.email||g.phone}</span>
                </div>
                <div>
                  <span className="loyalty-tag sm" style={{background:lc.bg,color:lc.text}}>{g.loyalty}</span>
                  <div className="gc-stat">₺{g.totalSpent.toLocaleString()} · {g.visits}×</div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length===0 && <p className="no-res" style={{padding:'30px',textAlign:'center',color:'#94a3b8'}}>Misafir bulunamadı.</p>}
        </div>
      </div>

      {/* Right: Detail */}
      <div className="crm-detail-panel">
        <AnimatePresence mode="wait">
          {selectedGuest ? (
            <GuestDetailPanel
              key={selectedGuest.id}
              guest={selectedGuest}
              reservations={reservations}
              onClose={()=>setSelectedGuest(null)}
              onEdit={(g)=>{ setEditingGuest(g); setShowForm(true); }}
            />
          ) : (
            <motion.div className="no-selection" initial={{opacity:0}} animate={{opacity:1}}>
              <Heart size={64} color="#e2e8f0"/>
              <p>Misafir detayları için listeden birini seçin</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <GuestFormModal
            guest={editingGuest}
            onClose={()=>{ setShowForm(false); setEditingGuest(null); }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      <style>{`
        .crm-layout { display:flex; height:calc(100vh - 70px); }
        .crm-list-panel { width:440px; border-right:1px solid #e2e8f0; background:white; display:flex; flex-direction:column; overflow:hidden; }
        .cls-head { padding:20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; }
        .cls-head h2 { font-size:20px; font-weight:800; color:#1e293b; }
        .btn-primary { padding:9px 16px; border-radius:10px; border:none; background:#3b82f6; color:white; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; }

        .crm-mini-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-bottom:1px solid #f1f5f9; }
        .cms { text-align:center; padding:14px 8px; border-right:1px solid #f1f5f9; }
        .cms strong { display:block; font-size:20px; font-weight:900; color:#1e293b; }
        .cms span { font-size:11px; color:#94a3b8; font-weight:700; }

        .crm-filters { padding:14px; display:flex; flex-direction:column; gap:10px; border-bottom:1px solid #f1f5f9; }
        .search-box { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; padding:9px 14px; border-radius:10px; }
        .search-box input { border:none; background:transparent; outline:none; font-size:13px; width:100%; }
        .loyalty-filter { display:flex; gap:6px; flex-wrap:wrap; }
        .lf-btn { padding:5px 12px; border-radius:20px; border:1.5px solid #e2e8f0; background:white; font-size:11px; font-weight:700; color:#64748b; cursor:pointer; }
        .lf-btn.active { background:#1e293b; color:white; border-color:#1e293b; }

        .guest-cards { flex:1; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:6px; }
        .gc-card { display:flex; align-items:center; gap:12px; padding:13px; border-radius:12px; border:1.5px solid transparent; cursor:pointer; transition:0.2s; }
        .gc-card:hover { background:#f8fafc; }
        .gc-card.active { background:#eff6ff; border-color:#3b82f6; }
        .gc-avatar { width:40px; height:40px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius:12px; display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:16px; flex-shrink:0; }
        .gc-info { flex:1; min-width:0; }
        .gc-info strong { display:block; font-size:14px; color:#1e293b; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .gc-info span { font-size:11px; color:#94a3b8; }
        .loyalty-tag { padding:3px 10px; border-radius:20px; font-size:10px; font-weight:800; white-space:nowrap; }
        .loyalty-tag.sm { font-size:9px; padding:2px 8px; display:block; margin-bottom:4px; text-align:center; }
        .gc-stat { font-size:10px; color:#94a3b8; font-weight:700; text-align:right; }

        .crm-detail-panel { flex:1; overflow-y:auto; background:#f8fafc; }
        .no-selection { height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:#94a3b8; font-size:14px; font-weight:600; }

        .detail-panel { padding:30px; background:white; min-height:100%; display:flex; flex-direction:column; gap:20px; }
        .dp-head { display:flex; align-items:center; gap:16px; }
        .dp-avatar { width:56px; height:56px; background:linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius:16px; display:flex; align-items:center; justify-content:center; color:white; font-weight:900; font-size:24px; flex-shrink:0; }
        .dp-head h3 { font-size:22px; font-weight:800; color:#1e293b; }
        .dp-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }

        .dp-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .dps { background:#f8fafc; border-radius:14px; padding:16px; display:flex; align-items:center; gap:12px; }
        .dps svg { color:#3b82f6; flex-shrink:0; }
        .dps strong { display:block; font-size:18px; font-weight:900; color:#1e293b; }
        .dps span { font-size:11px; color:#94a3b8; font-weight:700; }

        .dp-contact { display:flex; flex-direction:column; gap:8px; padding:16px; background:#f8fafc; border-radius:14px; }
        .dc-row { display:flex; align-items:center; gap:10px; font-size:13px; color:#475569; }
        .dc-row svg { color:#94a3b8; flex-shrink:0; }

        .dp-section h4 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:12px; }
        .res-mini { display:flex; justify-content:space-between; align-items:center; padding:12px; background:#f8fafc; border-radius:10px; margin-bottom:8px; }
        .rm-left strong { display:block; font-size:13px; color:#1e293b; font-weight:700; }
        .rm-left span { font-size:11px; color:#94a3b8; }
        .rmtag { padding:4px 12px; border-radius:20px; font-size:11px; font-weight:800; }
        .rmtag.check-in { background:#f0fdf4; color:#10b981; }
        .rmtag.check-out { background:#f8fafc; color:#64748b; }
        .rmtag.gelecek { background:#eff6ff; color:#3b82f6; }
        .no-res { font-size:13px; color:#94a3b8; }

        .dp-edit-btn { padding:12px 20px; border-radius:12px; border:1.5px solid #e2e8f0; background:white; font-size:13px; font-weight:700; color:#475569; cursor:pointer; display:flex; align-items:center; gap:8px; align-self:flex-start; }
        .dp-edit-btn:hover { background:#f1f5f9; border-color:#3b82f6; color:#3b82f6; }

        /* form modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .gf-modal { background:white; border-radius:24px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.4); width:520px; max-height:90vh; overflow-y:auto; }
        .modal-head { padding:22px 28px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:white; z-index:10; }
        .modal-head h3 { font-size:18px; font-weight:800; color:#1e293b; }
        .modal-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .gf-body { padding:24px 28px; }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .fg-group { display:flex; flex-direction:column; gap:6px; }
        .fg-group.full { grid-column:1/-1; }
        .fg-group label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; }
        .fg-group input, .fg-group select { padding:11px 14px; border:1.5px solid #e2e8f0; border-radius:12px; font-size:13px; outline:none; }
        .fg-group input:focus, .fg-group select:focus { border-color:#3b82f6; }
        .modal-foot { padding:16px 28px; border-top:1px solid #f1f5f9; display:flex; justify-content:flex-end; gap:10px; position:sticky; bottom:0; background:white; }
        .btn-cancel { padding:12px 20px; border-radius:12px; border:1px solid #e2e8f0; background:white; font-weight:700; cursor:pointer; }
        .btn-save { padding:12px 24px; border-radius:12px; border:none; background:#3b82f6; color:white; font-weight:800; cursor:pointer; }
        .btn-save:disabled { opacity:.5; cursor:not-allowed; }
      `}</style>
    </div>
  );
};

export default GuestCRM;
