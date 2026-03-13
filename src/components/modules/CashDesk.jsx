import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, Plus,
  CreditCard, Banknote, Building2, X, CheckCircle,
  ArrowUpRight, ArrowDownRight, Printer, FileText
} from 'lucide-react';

const METHODS = ['Nakit','Kredi Kartı','EFT/Havale','Çek/Senet'];

const AddTxModal = ({ onClose, onAdd }) => {
  const [type, setType]     = useState('gelir');
  const [desc, setDesc]     = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Nakit');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    onAdd({ type, desc, amount: Number(amount), method });
    onClose();
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="tx-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9,y:20}} animate={{scale:1,y:0}}>
        <div className="modal-head"><h3>Yeni İşlem Ekle</h3><button onClick={onClose}><X size={20}/></button></div>
        <form className="tx-form" onSubmit={handleSubmit}>
          <div className="type-toggle">
            <button type="button" className={type==='gelir'?'active gelir':''} onClick={()=>setType('gelir')}>
              <ArrowUpRight size={16}/> Gelir / Tahsilat
            </button>
            <button type="button" className={type==='gider'?'active gider':''} onClick={()=>setType('gider')}>
              <ArrowDownRight size={16}/> Gider / Ödeme
            </button>
          </div>
          <label>Açıklama</label>
          <input placeholder="Açıklama giriniz..." value={desc} onChange={e=>setDesc(e.target.value)} required/>
          <label>Tutar (₺)</label>
          <input type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} min={1} required/>
          <label>Ödeme Yöntemi</label>
          <div className="method-pills">
            {METHODS.map(m=>(
              <button type="button" key={m} className={`mpill ${method===m?'active':''}`} onClick={()=>setMethod(m)}>{m}</button>
            ))}
          </div>
          <div className="modal-foot">
            <button type="button" className="btn-cancel" onClick={onClose}>İptal</button>
            <button type="submit" className="btn-save">İşlemi Kaydet</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const CashDesk = () => {
  const { cashTransactions, addCashTransaction, reservations, makePayment } = useHotel();
  const [showModal, setShowModal] = useState(false);
  const [dateFilter, setDateFilter] = useState('bugün');

  const today = '2026-03-14';
  const todayTx = cashTransactions.filter(t => t.date === today);
  const filtered = dateFilter === 'bugün' ? todayTx : cashTransactions;

  const totalGelir = filtered.filter(t=>t.type==='gelir').reduce((s,t)=>s+t.amount,0);
  const totalGider = filtered.filter(t=>t.type==='gider').reduce((s,t)=>s+t.amount,0);
  const kasaBakiye = totalGelir - totalGider;

  const pendingBalance = reservations.filter(r=>r.status==='check-in'&&r.balance>0);

  return (
    <div className="cash-container">
      {/* Header */}
      <div className="cash-header">
        <div>
          <h2>Kasa & Ödeme İşlemleri</h2>
          <span>Günlük tahsilat, gider ve kasa bakiyesi takibi</span>
        </div>
        <div className="header-actions">
          <button className="btn-outline"><Printer size={16}/> Günlük Rapor</button>
          <button className="btn-primary" onClick={()=>setShowModal(true)}><Plus size={16}/> Yeni İşlem</button>
        </div>
      </div>

      {/* KPI */}
      <div className="cash-kpi">
        <div className="kpi-card green">
          <div className="kpi-icon"><TrendingUp size={24}/></div>
          <div>
            <div className="kpi-label">Bugün Gelir</div>
            <div className="kpi-value">₺{totalGelir.toLocaleString()}</div>
          </div>
        </div>
        <div className="kpi-card red">
          <div className="kpi-icon"><TrendingDown size={24}/></div>
          <div>
            <div className="kpi-label">Bugün Gider</div>
            <div className="kpi-value">₺{totalGider.toLocaleString()}</div>
          </div>
        </div>
        <div className="kpi-card blue">
          <div className="kpi-icon"><DollarSign size={24}/></div>
          <div>
            <div className="kpi-label">Kasa Bakiyesi</div>
            <div className="kpi-value">₺{kasaBakiye.toLocaleString()}</div>
          </div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-icon"><FileText size={24}/></div>
          <div>
            <div className="kpi-label">Tahsil Bekleyen</div>
            <div className="kpi-value">₺{pendingBalance.reduce((s,r)=>s+r.balance,0).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="cash-body">
        {/* Transaction list */}
        <div className="tx-section">
          <div className="section-head">
            <h3>İşlem Geçmişi</h3>
            <div className="date-toggle">
              <button className={dateFilter==='bugün'?'active':''} onClick={()=>setDateFilter('bugün')}>Bugün</button>
              <button className={dateFilter==='tümü'?'active':''} onClick={()=>setDateFilter('tümü')}>Tümü</button>
            </div>
          </div>
          <div className="tx-list">
            {filtered.map((tx, i) => (
              <motion.div key={tx.id} className={`tx-item ${tx.type}`} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}>
                <div className="tx-icon">
                  {tx.type==='gelir' ? <ArrowUpRight size={20}/> : <ArrowDownRight size={20}/>}
                </div>
                <div className="tx-info">
                  <strong>{tx.desc}</strong>
                  <span>{tx.method} · {tx.time}</span>
                </div>
                <div className={`tx-amount ${tx.type}`}>
                  {tx.type==='gelir' ? '+' : '-'}₺{tx.amount.toLocaleString()}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="empty-tx">Bugün henüz işlem bulunmuyor.</div>
            )}
          </div>
        </div>

        {/* Pending payments */}
        <div className="pending-section">
          <h3>Tahsil Bekleyen Misafirler</h3>
          <div className="pending-list">
            {pendingBalance.map(r => (
              <div key={r.id} className="pending-card">
                <div className="pc-top">
                  <div className="pc-room">{r.room}</div>
                  <div className="pc-info">
                    <strong>{r.guest}</strong>
                    <span>Çıkış: {r.checkOut}</span>
                  </div>
                </div>
                <div className="pc-bottom">
                  <div className="pc-bal">
                    <span>Kalan Borç</span>
                    <strong>₺{r.balance.toLocaleString()}</strong>
                  </div>
                  <button className="quick-pay-btn" onClick={()=>makePayment(r.id, r.balance, 'Kredi Kartı')}>
                    <CreditCard size={14}/> Tahsil Et
                  </button>
                </div>
              </div>
            ))}
            {pendingBalance.length === 0 && (
              <div className="all-clear">
                <CheckCircle size={32} color="#10b981"/>
                <p>Tüm hesaplar kapalı!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && <AddTxModal onClose={()=>setShowModal(false)} onAdd={addCashTransaction}/>}
      </AnimatePresence>

      <style>{`
        .cash-container { padding:30px; display:flex; flex-direction:column; gap:24px; }
        .cash-header { display:flex; justify-content:space-between; align-items:flex-start; }
        .cash-header h2 { font-size:24px; font-weight:800; color:#1e293b; }
        .cash-header span { font-size:14px; color:#94a3b8; }
        .header-actions { display:flex; gap:12px; }
        .btn-outline { padding:10px 18px; border-radius:12px; border:1.5px solid #e2e8f0; background:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; color:#475569; }
        .btn-primary { padding:10px 18px; border-radius:12px; border:none; background:#3b82f6; color:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }

        .cash-kpi { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .kpi-card { background:white; border-radius:18px; border:1px solid #e2e8f0; padding:22px; display:flex; align-items:center; gap:16px; }
        .kpi-icon { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; }
        .kpi-card.green .kpi-icon { background:#f0fdf4; color:#10b981; }
        .kpi-card.red   .kpi-icon { background:#fef2f2; color:#ef4444; }
        .kpi-card.blue  .kpi-icon { background:#eff6ff; color:#3b82f6; }
        .kpi-card.orange .kpi-icon { background:#fff7ed; color:#f59e0b; }
        .kpi-label { font-size:12px; color:#94a3b8; font-weight:700; }
        .kpi-value { font-size:22px; font-weight:900; color:#1e293b; }

        .cash-body { display:grid; grid-template-columns:1fr 340px; gap:20px; }
        .tx-section, .pending-section { background:white; border-radius:20px; border:1px solid #e2e8f0; padding:24px; }

        .section-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
        .section-head h3, .pending-section h3 { font-size:16px; font-weight:800; color:#1e293b; margin-bottom:16px; }
        .date-toggle { display:flex; border:1.5px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .date-toggle button { padding:7px 14px; border:none; background:white; font-size:12px; font-weight:700; color:#64748b; cursor:pointer; }
        .date-toggle button.active { background:#1e293b; color:white; }

        .tx-list { display:flex; flex-direction:column; gap:10px; max-height:420px; overflow-y:auto; }
        .tx-item { display:flex; align-items:center; gap:14px; padding:14px; border-radius:12px; }
        .tx-item.gelir { background:#f0fdf4; }
        .tx-item.gider { background:#fef2f2; }
        .tx-icon { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
        .tx-item.gelir .tx-icon { background:#dcfce7; color:#10b981; }
        .tx-item.gider .tx-icon { background:#fee2e2; color:#ef4444; }
        .tx-info { flex:1; }
        .tx-info strong { display:block; font-size:14px; color:#1e293b; }
        .tx-info span { font-size:12px; color:#94a3b8; }
        .tx-amount { font-size:16px; font-weight:900; }
        .tx-amount.gelir { color:#10b981; }
        .tx-amount.gider { color:#ef4444; }
        .empty-tx { padding:30px; text-align:center; color:#94a3b8; font-size:13px; }

        .pending-list { display:flex; flex-direction:column; gap:12px; max-height:420px; overflow-y:auto; }
        .pending-card { background:#f8fafc; border-radius:14px; padding:16px; }
        .pc-top { display:flex; gap:10px; margin-bottom:12px; }
        .pc-room { width:38px; height:38px; background:#1e293b; color:white; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:13px; flex-shrink:0; }
        .pc-info strong { display:block; font-size:13px; color:#1e293b; }
        .pc-info span { font-size:11px; color:#94a3b8; }
        .pc-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid #e2e8f0; }
        .pc-bal span { font-size:11px; color:#94a3b8; }
        .pc-bal strong { display:block; font-size:16px; color:#ef4444; font-weight:900; }
        .quick-pay-btn { padding:8px 14px; border-radius:10px; border:none; background:#3b82f6; color:white; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .all-clear { padding:40px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:10px; }
        .all-clear p { color:#10b981; font-weight:700; }

        /* Modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .tx-modal { background:white; border-radius:24px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.4); width:440px; }
        .modal-head { padding:22px 28px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }
        .modal-head h3 { font-size:18px; font-weight:800; color:#1e293b; }
        .modal-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .tx-form { padding:24px 28px; display:flex; flex-direction:column; gap:14px; }
        .type-toggle { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .type-toggle button { padding:12px; border-radius:12px; border:1.5px solid #e2e8f0; background:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; color:#64748b; }
        .type-toggle .active.gelir { background:#ecfdf5; color:#10b981; border-color:#10b981; }
        .type-toggle .active.gider { background:#fef2f2; color:#ef4444; border-color:#ef4444; }
        .tx-form label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:-8px; }
        .tx-form input { padding:12px 16px; border:1.5px solid #e2e8f0; border-radius:12px; font-size:14px; outline:none; width:100%; }
        .method-pills { display:flex; flex-wrap:wrap; gap:8px; }
        .mpill { padding:8px 14px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; }
        .mpill.active { background:#1e293b; color:white; border-color:#1e293b; }
        .modal-foot { display:flex; justify-content:flex-end; gap:10px; padding-top:4px; }
        .btn-cancel { padding:12px 20px; border-radius:12px; border:1px solid #e2e8f0; background:white; font-weight:700; cursor:pointer; }
        .btn-save { padding:12px 24px; border-radius:12px; border:none; background:#3b82f6; color:white; font-weight:800; cursor:pointer; }
      `}</style>
    </div>
  );
};

export default CashDesk;
