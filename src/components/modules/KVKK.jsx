import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, FileText, CheckCircle, X, Plus,
  AlertTriangle, Search, Trash2, Clock,
  Eye, ShieldAlert
} from 'lucide-react';

const KVKK = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('kvkk.' + k);
  const _c = (k) => mt('common.' + k);
  const { addNotification } = useHotel();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState(null);

  const CONSENT_TYPES = language === 'tr'
    ? ['Açık Rıza','Pazarlama İzni','Veri Aktarımı','Çerez Onayı','Kamera Kaydı']
    : ['Explicit Consent','Marketing Consent','Data Transfer','Cookie Consent','Camera Recording'];

  const statusLabel = (s) =>
    s === 'onaylı' ? (language === 'tr' ? 'Onaylandı'  : 'Approved') :
    s === 'ret'    ? (language === 'tr' ? 'Reddedildi' : 'Rejected') :
                    (language === 'tr' ? 'Bekliyor'   : 'Pending');

  const [logs, setLogs] = useState([
    { id:'KV-001', guest:'Ahmet Yılmaz',   type:'Açık Rıza',       status:'onaylı',  date:'2026-03-14', user:'resepsiyon_1', note:'Check-in sırasında imzalandı' },
    { id:'KV-002', guest:'Sarah Johnson',  type:'Pazarlama İzni',  status:'ret',     date:'2026-03-13', user:'resepsiyon_2', note:'Rejected email marketing' },
    { id:'KV-003', guest:'Klaus Weber',    type:'Açık Rıza',       status:'bekliyor',date:'2026-03-15', user:'admin',        note:'Online check-in — form sent' },
    { id:'KV-004', guest:'Yuki Tanaka',    type:'Veri Aktarımı',   status:'onaylı',  date:'2026-03-14', user:'resepsiyon_1', note:'3rd party agency data sharing' },
    { id:'KV-005', guest:'Carlos Rivera',  type:'Çerez Onayı',     status:'onaylı',  date:'2026-03-12', user:'system',       note:'Website cookie consent' },
  ]);

  const [form, setForm] = useState({ guest:'', type: CONSENT_TYPES[0], note:'' });
  const idCounter = React.useRef(5);

  const submitConsent = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `KV-${String(idCounter.current).padStart(3,'0')}`;
    setLogs(p => [{ ...form, id, status:'bekliyor', date: new Date().toISOString().slice(0,10), user:'admin' }, ...p]);
    addNotification({ type:'info', msg:`${language === 'tr' ? 'KVKK formu oluşturuldu' : 'GDPR form created'}: ${form.guest}` });
    setForm({ guest:'', type: CONSENT_TYPES[0], note:'' });
    setShowForm(false);
  };

  const updateStatus = (id, status) => {
    setLogs(p => p.map(l => l.id === id ? { ...l, status } : l));
    addNotification({ type: status === 'onaylı' ? 'success' : 'warn', msg: `${language === 'tr' ? 'KVKK durumu güncellendi' : 'GDPR status updated'} → ${statusLabel(status)}` });
  };

  const deleteLog = (id) => {
    setLogs(p => p.filter(l => l.id !== id));
    addNotification({ type:'info', msg: language === 'tr' ? 'Kayıt silindi' : 'Record deleted' });
  };

  const filtered = logs.filter(l => !search || l.guest.toLowerCase().includes(search.toLowerCase()));
  const complianceRate = logs.length > 0 ? Math.round((logs.filter(l => l.status === 'onaylı').length / logs.length) * 100) : 0;

  return (
    <div className="kvkk-page">
      <div className="kvkk-head">
        <div>
          <h2><ShieldCheck size={20}/> {_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
        <div className="head-stats">
          <div className={`hs-i ${complianceRate >= 80 ? 'green' : 'amber'}`}>
            {language === 'tr' ? 'Uyumluluk' : 'Compliance'}: %{complianceRate}
          </div>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14}/> {_t('newForm')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form className="consent-form" onSubmit={submitConsent} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div className="cf-head">
              <h3>{_t('newForm')}</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={18}/></button>
            </div>
            <div className="cf-grid">
              <div className="cf"><label>{_c('guest')} *</label><input value={form.guest} onChange={e=>setForm(p=>({...p,guest:e.target.value}))} placeholder={_c('name')} required/></div>
              <div className="cf"><label>{_t('consentType')}</label><select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}>{CONSENT_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
              <div className="cf full"><label>{_c('note')}</label><input value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} placeholder="..."/></div>
            </div>
            <div className="cf-foot">
              <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>{_c('cancel')}</button>
              <button type="submit" className="btn-primary">{_t('createForm')}</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="kvkk-grid">
        <div className="kvkk-main">
          <div className="kvkk-card">
            <div className="kc-head">
              <h3>{_t('guestConsents')}</h3>
              <div className="search-bar">
                <Search size={14} color="#94a3b8"/>
                <input placeholder={_c('search')} value={search} onChange={e => setSearch(e.target.value)}/>
              </div>
            </div>

            <div className="log-list">
              <div className="ll-head">
                <span>{_c('guest')}</span>
                <span>{_t('consentType')}</span>
                <span>{_c('date')}</span>
                <span>{_t('status')}</span>
                <span>{_c('actions')}</span>
              </div>
              {filtered.map((l, i) => (
                <motion.div key={l.id} className="ll-row" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}}>
                  <div className="ll-guest"><strong>{l.guest}</strong><span>{language === 'tr' ? 'İşleyen' : 'By'}: {l.user}</span></div>
                  <div className="ll-type">{l.type}</div>
                  <div className="ll-date">{l.date}</div>
                  <div className={`ll-status ${l.status}`}>{statusLabel(l.status)}</div>
                  <div className="ll-actions">
                    {l.status === 'bekliyor' && <>
                      <button className="a-btn green" onClick={() => updateStatus(l.id,'onaylı')} title={language === 'tr' ? 'Onayla' : 'Approve'}><CheckCircle size={14}/></button>
                      <button className="a-btn red"   onClick={() => updateStatus(l.id,'ret')}    title={language === 'tr' ? 'Reddet' : 'Reject'}><X size={14}/></button>
                    </>}
                    <button className="a-btn"     onClick={() => setDetail(l)}   title={_c('details')}><Eye size={14}/></button>
                    <button className="a-btn del" onClick={() => deleteLog(l.id)} title={_c('delete')}><Trash2 size={14}/></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="kvkk-sidebar">
          <div className="policy-box">
            <h3>{_t('retentionPolicy')}</h3>
            <div className="p-list">
              <div className="p-i"><Clock size={16} color="#3b82f6"/><div><strong>{language === 'tr' ? 'Üye Verileri' : 'Member Data'}</strong><span>{language === 'tr' ? '5 Yıl' : '5 Years'}</span></div></div>
              <div className="p-i"><Clock size={16} color="#3b82f6"/><div><strong>{language === 'tr' ? 'Log Kayıtları' : 'Log Records'}</strong><span>{language === 'tr' ? '2 Yıl' : '2 Years'}</span></div></div>
              <div className="p-i warning"><Trash2 size={16} color="#ef4444"/><div><strong>{language === 'tr' ? 'Silinme Bekleyen' : 'Pending Deletion'}</strong><span className="red">{logs.filter(l=>l.status==='ret').length} {language === 'tr' ? 'Kayıt' : 'Records'}</span></div></div>
            </div>
            <button className="cleanup-btn" onClick={() => {
              setLogs(p => p.filter(l => l.status !== 'ret'));
              addNotification({ type:'success', msg: language === 'tr' ? 'Reddedilen kayıtlar temizlendi' : 'Rejected records purged' });
            }}>{_t('startPurge')}</button>
          </div>

          <div className="compliance-box">
            <div className="cb-head"><ShieldAlert size={20} color="#f59e0b"/><strong>{_t('securityAudit')}</strong></div>
            <p>
              {logs.filter(l => l.status === 'bekliyor').length}{' '}
              {language === 'tr'
                ? 'misafir için açık rıza formu beklemede. Resepsiyon uyarılmalı.'
                : 'guests have pending consent forms. Reception should be notified.'
              }
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detail && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setDetail(null)}>
            <motion.div className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e => e.stopPropagation()}>
              <div className="mb-head">
                <h3>{_t('record')} — {detail.guest}</h3>
                <button onClick={() => setDetail(null)}><X size={18}/></button>
              </div>
              <div className="detail-grid">
                <div className="dg"><span>ID</span><strong>{detail.id}</strong></div>
                <div className="dg"><span>{_t('consentType')}</span><strong>{detail.type}</strong></div>
                <div className="dg"><span>{_c('date')}</span><strong>{detail.date}</strong></div>
                <div className="dg"><span>{language === 'tr' ? 'İşleyen' : 'Processed by'}</span><strong>{detail.user}</strong></div>
                <div className="dg"><span>{_t('status')}</span><strong style={{color: detail.status==='onaylı'?'#10b981':detail.status==='ret'?'#ef4444':'#f59e0b'}}>{statusLabel(detail.status)}</strong></div>
              </div>
              {detail.note && <div className="detail-note">{detail.note}</div>}
              <div className="mb-foot"><button className="btn-cancel" onClick={() => setDetail(null)}>{_c('close')}</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .kvkk-page { padding: 28px; display: flex; flex-direction: column; gap: 24px; }
        .kvkk-head { display: flex; justify-content: space-between; align-items: flex-start; }
        .kvkk-head h2 { font-size: 22px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 10px; }
        .kvkk-head span { font-size: 13px; color: #94a3b8; }
        .head-stats { display: flex; align-items: center; gap: 16px; }
        .hs-i { padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; border: 1px solid #e2e8f0; }
        .hs-i.green { background: #f0fdf4; color: #10b981; border-color: #dcfce7; }
        .hs-i.amber { background: #fffbeb; color: #f59e0b; border-color: #fde68a; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #1e293b; color: white; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .btn-cancel { padding: 10px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; font-size: 13px; }
        .consent-form { background: white; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 22px; }
        .cf-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .cf-head h3 { font-size: 15px; font-weight: 800; color: #1e293b; }
        .cf-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cf { display: flex; flex-direction: column; gap: 6px; }
        .cf.full { grid-column: 1 / -1; }
        .cf label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .cf input, .cf select { padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .cf-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }
        .kvkk-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
        .kvkk-card { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .kc-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .kc-head h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
        .search-bar { background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 10px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; width: 220px; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 12px; width: 100%; }
        .ll-head { display: grid; grid-template-columns: 1.5fr 1fr 100px 100px 120px; padding: 12px; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; border-bottom: 2px solid #f8fafc; }
        .ll-row { display: grid; grid-template-columns: 1.5fr 1fr 100px 100px 120px; padding: 14px 12px; align-items: center; border-bottom: 1px solid #f8fafc; transition: 0.2s; }
        .ll-row:hover { background: #f8fafc; }
        .ll-guest strong { display: block; font-size: 14px; color: #1e293b; }
        .ll-guest span { font-size: 10px; color: #94a3b8; }
        .ll-type { font-size: 12px; font-weight: 600; color: #475569; }
        .ll-date { font-size: 12px; color: #64748b; }
        .ll-status { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-align: center; }
        .ll-status.onaylı { background: #f0fdf4; color: #10b981; }
        .ll-status.ret { background: #fef2f2; color: #ef4444; }
        .ll-status.bekliyor { background: #fff7ed; color: #f59e0b; }
        .ll-actions { display: flex; gap: 6px; }
        .a-btn { background: transparent; border: 1px solid #e2e8f0; border-radius: 6px; color: #94a3b8; cursor: pointer; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .a-btn:hover { border-color: #3b82f6; color: #3b82f6; }
        .a-btn.green { color: #10b981; border-color: #bbf7d0; }
        .a-btn.red { color: #ef4444; border-color: #fecaca; }
        .a-btn.del:hover { color: #ef4444; border-color: #fecaca; }
        .kvkk-sidebar { display: flex; flex-direction: column; gap: 20px; }
        .policy-box { background: white; border-radius: 24px; border: 1px solid #e2e8f0; padding: 24px; }
        .policy-box h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 20px; }
        .p-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
        .p-i { display: flex; gap: 12px; align-items: center; }
        .p-i strong { display: block; font-size: 13px; color: #1e293b; }
        .p-i span { font-size: 11px; color: #94a3b8; }
        .p-i .red { color: #ef4444; font-weight: 700; }
        .cleanup-btn { width: 100%; padding: 10px; background: #1e293b; color: white; border: none; border-radius: 12px; font-size: 12px; font-weight: 700; cursor: pointer; }
        .compliance-box { background: #fffbeb; border: 1px solid #fde68a; border-radius: 20px; padding: 20px; }
        .cb-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .cb-head strong { font-size: 14px; color: #92400e; }
        .compliance-box p { font-size: 12px; color: #b45309; line-height: 1.5; margin: 0; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-box { background: white; border-radius: 20px; width: 460px; padding: 24px; }
        .mb-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .mb-head h3 { font-size: 17px; font-weight: 800; color: #1e293b; }
        .mb-head button { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .dg { padding: 10px; background: #f8fafc; border-radius: 10px; }
        .dg span { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 3px; }
        .dg strong { font-size: 13px; color: #1e293b; }
        .detail-note { padding: 10px; background: #fffbeb; border-radius: 10px; font-size: 12px; color: #92400e; margin-top: 10px; }
        .mb-foot { display: flex; justify-content: flex-end; margin-top: 14px; }
      `}</style>
    </div>
  );
};

export default KVKK;
