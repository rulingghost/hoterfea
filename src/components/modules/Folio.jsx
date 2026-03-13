import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Plus, Trash2, CreditCard, DollarSign,
  Printer, CheckCircle, AlertCircle, X, Search, ChevronDown
} from 'lucide-react';

const EXTRA_ITEMS = [
  { desc: 'Minibar', amount: 0, type: 'extra' },
  { desc: 'Restoran — Öğle Yemeği', amount: 450, type: 'extra' },
  { desc: 'Restoran — Akşam Yemeği', amount: 850, type: 'extra' },
  { desc: 'SPA — Masaj (60 dk)', amount: 600, type: 'extra' },
  { desc: 'Oda Servisi', amount: 0, type: 'extra' },
  { desc: 'Çamaşır Hizmeti', amount: 150, type: 'extra' },
  { desc: 'Havaalanı Transfer', amount: 500, type: 'extra' },
  { desc: 'Telefon Görüşmesi', amount: 0, type: 'extra' },
  { desc: 'Para Cezası (Sigara)', amount: 500, type: 'other' },
  { desc: 'Diğer / Manuel', amount: 0, type: 'extra' },
];

const PAYMENT_METHODS = ['Nakit','Kredi Kartı','EFT/Havale','Acente Faturası','Açık Hesap'];

const PaymentModal = ({ res, onClose, onPay }) => {
  const [amount, setAmount]   = useState(res.balance);
  const [method, setMethod]   = useState('Kredi Kartı');
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    if (amount <= 0) return;
    onPay(res.id, Number(amount), method);
    setSuccess(true);
    setTimeout(onClose, 1400);
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="pay-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9,y:20}} animate={{scale:1,y:0}}>
        {success ? (
          <div className="pay-success">
            <CheckCircle size={56} color="#10b981"/>
            <h3>Ödeme Alındı!</h3>
            <p>₺{Number(amount).toLocaleString()} — {method}</p>
          </div>
        ) : (
          <>
            <div className="modal-head"><h3>Tahsilat Al — {res.guest}</h3><button onClick={onClose}><X size={20}/></button></div>
            <div className="pay-body">
              <div className="balance-badge">
                <AlertCircle size={20}/> Kalan Bakiye: <strong>₺{res.balance.toLocaleString()}</strong>
              </div>
              <label>Tutar (₺)</label>
              <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} min={1} max={res.total}/>
              <div className="quick-amounts">
                {[res.balance, Math.round(res.balance/2), 500, 1000].filter((v,i,a)=>v>0&&a.indexOf(v)===i).map(v=>(
                  <button key={v} onClick={()=>setAmount(v)}>₺{v.toLocaleString()}</button>
                ))}
              </div>
              <label>Ödeme Yöntemi</label>
              <div className="method-grid">
                {PAYMENT_METHODS.map(m=>(
                  <button key={m} className={`method-btn ${method===m?'active':''}`} onClick={()=>setMethod(m)}>{m}</button>
                ))}
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn-cancel" onClick={onClose}>İptal</button>
              <button className="btn-pay" onClick={handlePay} disabled={!amount||amount<=0}>
                <CreditCard size={16}/> ₺{Number(amount||0).toLocaleString()} Tahsil Et
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const AddExtraModal = ({ resId, onClose, onAdd }) => {
  const [selected, setSelected] = useState(EXTRA_ITEMS[0]);
  const [desc, setDesc]   = useState(EXTRA_ITEMS[0].desc);
  const [amount, setAmount] = useState(EXTRA_ITEMS[0].amount);

  const handleSelect = (item) => {
    setSelected(item);
    setDesc(item.desc);
    setAmount(item.amount);
  };

  const handleAdd = () => {
    if (!desc || !amount) return;
    onAdd(resId, { desc, amount: Number(amount), type: selected.type });
    onClose();
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="add-extra-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9,y:20}} animate={{scale:1,y:0}}>
        <div className="modal-head"><h3>Ekstra Tahakkuk Ekle</h3><button onClick={onClose}><X size={20}/></button></div>
        <div className="extra-body">
          <div className="preset-list">
            {EXTRA_ITEMS.map((item,i) => (
              <button key={i} className={`preset-item ${selected===item?'active':''}`} onClick={()=>handleSelect(item)}>
                {item.desc}
              </button>
            ))}
          </div>
          <div className="extra-form">
            <label>Açıklama</label>
            <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Açıklama..."/>
            <label>Tutar (₺)</label>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} min={1} placeholder="0"/>
            <button className="btn-add-confirm" onClick={handleAdd} disabled={!desc||!amount}>Tahakkuk Ekle</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Folio = () => {
  const { reservations, folioLines, addFolioLine, deleteFolioLine, makePayment } = useHotel();
  const [search, setSearch] = useState('');
  const [selectedRes, setSelectedRes] = useState(reservations.find(r=>r.status==='check-in')||null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showExtraModal, setShowExtraModal] = useState(false);

  const inHouse = reservations.filter(r => r.status === 'check-in');
  const filtered = inHouse.filter(r => r.guest.toLowerCase().includes(search.toLowerCase()) || r.room?.includes(search));
  const lines = selectedRes ? (folioLines[selectedRes.id] || []) : [];
  const total = lines.reduce((s,l) => s+l.amount, 0);

  return (
    <div className="folio-layout">
      {/* Left: Guest picker */}
      <aside className="folio-sidebar">
        <div className="fs-head">
          <h3>İç Misafirler</h3>
          <div className="search-mini"><Search size={14}/><input placeholder="Ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        </div>
        <div className="guest-list">
          {filtered.map(r => (
            <button key={r.id} className={`guest-item ${selectedRes?.id===r.id?'active':''}`} onClick={()=>setSelectedRes(r)}>
              <div className="gi-room">{r.room}</div>
              <div className="gi-info">
                <strong>{r.guest}</strong>
                <span>{r.checkIn} — {r.checkOut}</span>
              </div>
              {r.balance > 0 && <div className="gi-bal">₺{r.balance.toLocaleString()}</div>}
            </button>
          ))}
        </div>
      </aside>

      {/* Right: Folio detail */}
      <main className="folio-main">
        {selectedRes ? (
          <>
            <div className="folio-header">
              <div>
                <h2>Folio — {selectedRes.guest}</h2>
                <span>Oda {selectedRes.room} · {selectedRes.checkIn} / {selectedRes.checkOut} · {selectedRes.board}</span>
              </div>
              <div className="fh-actions">
                <button className="btn-outline" onClick={()=>window.print()}><Printer size={16}/> Yazdır</button>
                <button className="btn-extra" onClick={()=>setShowExtraModal(true)}><Plus size={16}/> Ekstra Tahakkuk</button>
                {selectedRes.balance > 0 && (
                  <button className="btn-pay" onClick={()=>setShowPayModal(true)}>
                    <CreditCard size={16}/> Tahsilat Al (₺{selectedRes.balance.toLocaleString()})
                  </button>
                )}
              </div>
            </div>

            {/* Folio table */}
            <div className="folio-table-wrap">
              <table className="folio-table">
                <thead>
                  <tr><th>Tarih</th><th>Açıklama</th><th>Tür</th><th className="right">Tutar</th><th/></tr>
                </thead>
                <tbody>
                  {lines.map(line => (
                    <tr key={line.id}>
                      <td>{line.date}</td>
                      <td>{line.desc}</td>
                      <td><span className={`type-tag ${line.type}`}>{line.type==='accommodation'?'Konaklama':'Ekstra'}</span></td>
                      <td className="right"><strong>₺{line.amount.toLocaleString()}</strong></td>
                      <td>
                        {line.type !== 'accommodation' && (
                          <button className="del-btn" onClick={()=>deleteFolioLine(selectedRes.id, line.id)}><Trash2 size={14}/></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="folio-summary">
              <div className="fs-row"><span>Toplam Tutar</span><strong>₺{total.toLocaleString()}</strong></div>
              <div className="fs-row"><span>Ödenen</span><strong className="green">₺{selectedRes.paid.toLocaleString()}</strong></div>
              <div className={`fs-row total ${selectedRes.balance>0?'due':''}`}>
                <span>{selectedRes.balance > 0 ? 'Kalan Borç' : 'Hesap Durumu'}</span>
                <strong>{selectedRes.balance > 0 ? `₺${selectedRes.balance.toLocaleString()}` : '✓ Kapandı'}</strong>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <FileText size={64} color="#e2e8f0"/>
            <p>Soldaki listeden misafir seçin</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showPayModal && selectedRes && (
          <PaymentModal res={selectedRes} onClose={()=>setShowPayModal(false)} onPay={makePayment}/>
        )}
        {showExtraModal && selectedRes && (
          <AddExtraModal resId={selectedRes.id} onClose={()=>setShowExtraModal(false)} onAdd={addFolioLine}/>
        )}
      </AnimatePresence>

      <style>{`
        .folio-layout { display:flex; height:calc(100vh - 70px); }

        .folio-sidebar { width:280px; background:white; border-right:1px solid #e2e8f0; display:flex; flex-direction:column; }
        .fs-head { padding:20px; border-bottom:1px solid #f1f5f9; }
        .fs-head h3 { font-size:15px; font-weight:800; color:#1e293b; margin-bottom:10px; }
        .search-mini { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; padding:8px 12px; border-radius:10px; }
        .search-mini input { border:none; background:transparent; outline:none; font-size:12px; width:100%; }
        .guest-list { flex:1; overflow-y:auto; padding:8px; }
        .guest-item { width:100%; display:flex; align-items:center; gap:10px; padding:12px; border-radius:12px; border:none; background:transparent; cursor:pointer; text-align:left; margin-bottom:4px; transition:0.2s; }
        .guest-item:hover { background:#f8fafc; }
        .guest-item.active { background:#eff6ff; border:1.5px solid #3b82f6; }
        .gi-room { width:40px; height:40px; background:#f1f5f9; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:900; color:#1e293b; font-size:13px; flex-shrink:0; }
        .gi-info { flex:1; }
        .gi-info strong { display:block; font-size:13px; color:#1e293b; font-weight:700; }
        .gi-info span { font-size:11px; color:#94a3b8; }
        .gi-bal { font-size:11px; font-weight:800; color:#ef4444; }

        .folio-main { flex:1; padding:30px; overflow-y:auto; display:flex; flex-direction:column; gap:20px; }
        .folio-header { display:flex; justify-content:space-between; align-items:flex-start; }
        .folio-header h2 { font-size:22px; font-weight:800; color:#1e293b; }
        .folio-header span { font-size:13px; color:#94a3b8; }
        .fh-actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .btn-outline { padding:10px 16px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; color:#475569; }
        .btn-extra  { padding:10px 16px; border-radius:10px; border:none; background:#10b981; color:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-pay    { padding:10px 20px; border-radius:10px; border:none; background:#3b82f6; color:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }

        .folio-table-wrap { background:white; border-radius:16px; border:1px solid #e2e8f0; overflow:hidden; }
        .folio-table { width:100%; border-collapse:collapse; }
        .folio-table thead { background:#f8fafc; }
        .folio-table th { text-align:left; padding:14px 18px; font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:800; }
        .folio-table th.right { text-align:right; }
        .folio-table td { padding:16px 18px; font-size:14px; color:#475569; border-bottom:1px solid #f8fafc; vertical-align:middle; }
        .folio-table td.right { text-align:right; }
        .type-tag { padding:3px 10px; border-radius:20px; font-size:10px; font-weight:800; }
        .type-tag.accommodation { background:#eff6ff; color:#3b82f6; }
        .type-tag.extra, .type-tag.other { background:#fff7ed; color:#f59e0b; }
        .del-btn { background:transparent; border:none; color:#cbd5e1; cursor:pointer; }
        .del-btn:hover { color:#ef4444; }

        .folio-summary { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:20px 24px; max-width:380px; margin-left:auto; }
        .fs-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f8fafc; font-size:14px; color:#64748b; }
        .fs-row strong { color:#1e293b; }
        .fs-row.total { border-bottom:none; padding-top:14px; font-size:16px; font-weight:800; }
        .fs-row.total.due strong { color:#ef4444; }
        .green { color:#10b981 !important; }

        .empty-state { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:#94a3b8; font-size:15px; font-weight:600; }

        /* Modals */
        .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .pay-modal, .add-extra-modal { background:white; border-radius:24px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.4); min-width:380px; }
        .modal-head { padding:22px 28px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }
        .modal-head h3 { font-size:18px; font-weight:800; color:#1e293b; }
        .modal-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .pay-body { padding:24px 28px; display:flex; flex-direction:column; gap:14px; }
        .balance-badge { display:flex; align-items:center; gap:8px; background:#fef2f2; color:#ef4444; padding:12px 16px; border-radius:12px; font-size:13px; font-weight:700; }
        .pay-body label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:-8px; }
        .pay-body input { padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:12px; font-size:16px; font-weight:700; outline:none; width:100%; }
        .quick-amounts { display:flex; gap:8px; flex-wrap:wrap; }
        .quick-amounts button { padding:6px 14px; border-radius:8px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; }
        .quick-amounts button:hover { background:#eff6ff; border-color:#3b82f6; color:#3b82f6; }
        .method-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .method-btn { padding:10px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; }
        .method-btn.active { background:#1e293b; color:white; border-color:#1e293b; }
        .modal-foot { padding:16px 28px; border-top:1px solid #f1f5f9; display:flex; justify-content:flex-end; gap:10px; }
        .btn-cancel { padding:12px 20px; border-radius:12px; border:1px solid #e2e8f0; background:white; font-weight:700; cursor:pointer; }
        .btn-pay { padding:12px 24px; border-radius:12px; border:none; background:#3b82f6; color:white; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-pay:disabled { opacity:.5; cursor:not-allowed; }
        .pay-success { padding:60px; text-align:center; }
        .pay-success h3 { font-size:22px; font-weight:900; color:#10b981; margin:14px 0 6px; }
        .pay-success p { color:#64748b; }

        .extra-body { display:flex; gap:0; }
        .preset-list { width:200px; border-right:1px solid #f1f5f9; padding:12px; display:flex; flex-direction:column; gap:4px; max-height:400px; overflow-y:auto; }
        .preset-item { width:100%; text-align:left; padding:10px 12px; border-radius:8px; border:none; background:transparent; font-size:12px; font-weight:600; color:#64748b; cursor:pointer; }
        .preset-item:hover, .preset-item.active { background:#eff6ff; color:#3b82f6; }
        .extra-form { flex:1; padding:20px; display:flex; flex-direction:column; gap:12px; }
        .extra-form label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; }
        .extra-form input { padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:12px; font-size:14px; outline:none; }
        .btn-add-confirm { padding:14px; border-radius:12px; border:none; background:#10b981; color:white; font-weight:800; font-size:14px; cursor:pointer; margin-top:8px; }
        .btn-add-confirm:disabled { opacity:.5; }
      `}</style>
    </div>
  );
};

export default Folio;
