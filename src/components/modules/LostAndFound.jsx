import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, MapPin, Camera, CheckCircle, Clock, X, Search } from 'lucide-react';

const LostAndFound = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('lostFound.' + k);
  const _c = (k) => mt('common.' + k);
  const { addNotification } = useHotel();

  const isEn = language === 'en';
  const CAT_KEYS = ['Elektronik','Kıyafet','Takı','Çanta','Belge','Oyuncak','Diğer'];
  const CAT_EN   = ['Electronics','Clothing','Jewelry','Bag','Document','Toy','Other'];
  const catDisplay = (k) => { if (!isEn) return k; const i = CAT_KEYS.indexOf(k); return i >= 0 ? CAT_EN[i] : k; };

  const [items, setItems] = useState([
    { id:'LF-001', name:'Black Laptop Charger', cat:'Elektronik', location:'Room 205', desc:'Samsung brand', foundDate:'2026-03-13', status:'bekliyor', guest:'' },
    { id:'LF-002', name:'Gold Necklace',         cat:'Takı',       location:'Reception', desc:'Found in envelope', foundDate:'2026-03-14', status:'bekliyor', guest:'' },
    { id:'LF-003', name:'Child\'s Toy Car',      cat:'Oyuncak',    location:'Room 104', desc:'Small red car', foundDate:'2026-03-12', status:'teslim', guest:'Müller' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:'', cat:CAT_KEYS[0], location:'', desc:'', foundDate:'2026-03-14', guest:'' });
  const [deliverModal, setDeliverModal] = useState(null);
  const [deliverGuest, setDeliverGuest] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const [searchQ, setSearchQ] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const submit = (e) => {
    e.preventDefault();
    const id = `LF-${String(items.length + 1).padStart(3, '0')}`;
    setItems(p => [...p, { ...form, id, status: 'bekliyor' }]);
    addNotification({ type: 'info', msg: `${language === 'tr' ? 'Kayıp eşya kaydedildi' : 'Lost item registered'}: ${form.name}` });
    setForm({ name:'', cat:CAT_KEYS[0], location:'', desc:'', foundDate:'2026-03-14', guest:'' });
    setShowForm(false);
  };

  const deliver = () => {
    const item = items.find(i => i.id === deliverModal);
    setItems(p => p.map(i => i.id === deliverModal ? { ...i, status: 'teslim', guest: deliverGuest } : i));
    addNotification({ type: 'success', msg: `${language === 'tr' ? 'Eşya teslim edildi' : 'Item returned'}: ${item?.name}` });
    setDeliverModal(null);
    setDeliverGuest('');
  };

  const kpi = [
    { label: language === 'tr' ? 'Kayıtlı' : 'Registered',         val: items.length, color: '#3b82f6' },
    { label: _t('unclaimed'),                                         val: items.filter(i => i.status === 'bekliyor').length, color: '#f59e0b' },
    { label: _t('claimed'),                                           val: items.filter(i => i.status === 'teslim').length,   color: '#10b981' },
  ];

  const catIcon = (cat) => {
    if (cat === 'Elektronik' || cat === 'Electronics') return '💻';
    if (cat === 'Takı' || cat === 'Jewelry') return '💍';
    if (cat === 'Kıyafet' || cat === 'Clothing') return '👕';
    if (cat === 'Çanta' || cat === 'Bag') return '👜';
    if (cat === 'Oyuncak' || cat === 'Toy') return '🧸';
    return '📦';
  };

  const filteredItems = items.filter(i => {
    const matchSearch = !searchQ || i.name.toLowerCase().includes(searchQ.toLowerCase()) || i.location.toLowerCase().includes(searchQ.toLowerCase());
    const matchCat = catFilter === 'all' || i.cat === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="lf-page">
      <div className="lf-head">
        <div>
          <h2><Package size={20}/> {_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={15}/> {_t('newItem')}
        </button>
      </div>

      <div className="lf-kpi">
        {kpi.map((k, i) => (
          <div key={i} className="lk"><strong style={{ color: k.color }}>{k.val}</strong><span>{k.label}</span></div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <h3>{_t('newItem')}</h3>
            <div className="fg-grid">
              <div className="fg full"><label>{_t('itemName')} *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder={_t('itemName')} required/></div>
              <div className="fg"><label>{_c('category')}</label><select value={form.cat} onChange={e => set('cat', e.target.value)}>{CAT_KEYS.map(c => <option key={c} value={c}>{catDisplay(c)}</option>)}</select></div>
              <div className="fg"><label>{_t('foundLocation')}</label><input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Room 101, Restaurant..."/></div>
              <div className="fg"><label>{_t('foundDate')}</label><input type="date" value={form.foundDate} onChange={e => set('foundDate', e.target.value)}/></div>
              <div className="fg full"><label>{_c('description')}</label><input value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="..."/></div>
            </div>
            <div className="form-foot">
              <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>{_c('cancel')}</button>
              <button type="submit" className="btn-primary">{_c('save')}</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="lf-filters">
        <div className="lf-search"><Search size={14}/><input placeholder={_c('search')} value={searchQ} onChange={e => setSearchQ(e.target.value)}/></div>
        <div className="cat-pills">
          <button className={`cpill ${catFilter === 'all' ? 'active' : ''}`} onClick={() => setCatFilter('all')}>{_c('all')}</button>
          {CAT_KEYS.map(c => (
            <button key={c} className={`cpill ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>{catDisplay(c)}</button>
          ))}
        </div>
      </div>

      <div className="lf-cards">
        {filteredItems.map((item, i) => (
          <motion.div key={item.id} className={`lf-card ${item.status}`} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.05 }}>
            <div className="lfc-top">
              <div className="cat-icon">{catIcon(item.cat)}</div>
              <span className={`lf-status ${item.status}`}>
                {item.status === 'bekliyor' ? _t('unclaimed') : `✓ ${_t('claimed')}`}
              </span>
            </div>
            <h4>{item.name}</h4>
            <div className="lf-details">
              <div><MapPin size={12}/> {item.location}</div>
              <div><Clock size={12}/> {item.foundDate}</div>
              {item.desc && <div className="lf-desc">{item.desc}</div>}
              {item.guest && <div className="lf-owner"><CheckCircle size={12} color="#10b981"/> {language === 'tr' ? 'Teslim' : 'Returned'}: {item.guest}</div>}
            </div>
            <div className="lfc-foot">
              <span className="oid">{item.id}</span>
              {item.status === 'bekliyor' && (
                <button className="del-btn" onClick={() => setDeliverModal(item.id)}>{_t('returnItem')}</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deliver modal */}
      <AnimatePresence>
        {deliverModal && (
          <motion.div className="modal-overlay" onClick={() => setDeliverModal(null)} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="del-modal" onClick={e => e.stopPropagation()} initial={{ scale:.9 }} animate={{ scale:1 }}>
              <div className="modal-head">
                <h3>{_t('returnItem')}</h3>
                <button onClick={() => setDeliverModal(null)}><X size={18}/></button>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize:'13px', color:'#64748b', marginBottom:'14px' }}>
                  {language === 'tr' ? 'Eşyayı teslim alan kişinin adını girin:' : 'Enter the name of the person receiving the item:'}
                </p>
                <input
                  value={deliverGuest}
                  onChange={e => setDeliverGuest(e.target.value)}
                  placeholder={language === 'tr' ? 'Misafir adı veya kimlik bilgisi' : 'Guest name or ID'}
                  style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #e2e8f0', borderRadius:'12px', fontSize:'13px', outline:'none' }}
                />
                <div className="modal-foot" style={{ marginTop: '14px' }}>
                  <button className="btn-cancel" onClick={() => setDeliverModal(null)}>{_c('cancel')}</button>
                  <button className="btn-primary" onClick={deliver} disabled={!deliverGuest}>{_t('returnItem')}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .lf-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .lf-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .lf-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .lf-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .lf-kpi{display:flex;gap:14px;}
        .lk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px 28px;text-align:center;}
        .lk strong{display:block;font-size:26px;font-weight:900;margin-bottom:4px;}
        .lk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .lf-filters{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
        .lf-search{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #e2e8f0;padding:9px 14px;border-radius:10px;}
        .lf-search input{border:none;outline:none;font-size:13px;width:200px;}
        .cat-pills{display:flex;gap:6px;flex-wrap:wrap;}
        .cpill{padding:7px 14px;border-radius:20px;border:1.5px solid #e2e8f0;background:white;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;}
        .cpill.active{background:#1e293b;color:white;border-color:#1e293b;}
        .lf-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}
        .lf-card{background:white;border:1.5px solid #e2e8f0;border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:10px;}
        .lf-card.teslim{opacity:.8;background:#f8fafc;}
        .lfc-top{display:flex;justify-content:space-between;align-items:center;}
        .cat-icon{font-size:28px;}
        .lf-status{font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;}
        .lf-status.bekliyor{background:#fffbeb;color:#b45309;}
        .lf-status.teslim{background:#f0fdf4;color:#10b981;}
        .lf-card h4{font-size:15px;font-weight:800;color:#1e293b;}
        .lf-details{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#64748b;}
        .lf-details>div{display:flex;align-items:center;gap:5px;}
        .lf-desc{font-style:italic;color:#94a3b8;}
        .lf-owner{color:#10b981!important;font-weight:700;}
        .lfc-foot{display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f1f5f9;}
        .oid{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;font-weight:700;color:#64748b;}
        .del-btn{padding:7px 14px;border-radius:8px;border:none;background:#3b82f6;color:white;font-size:11px;font-weight:700;cursor:pointer;}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;}
        .del-modal{background:white;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.4);width:380px;}
        .modal-head{padding:18px 22px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;}
        .modal-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .modal-head button{background:transparent;border:none;color:#94a3b8;cursor:pointer;}
        .modal-foot{display:flex;justify-content:flex-end;gap:10px;}
      `}</style>
    </div>
  );
};

export default LostAndFound;
