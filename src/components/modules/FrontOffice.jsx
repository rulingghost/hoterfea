import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { useModuleTranslation } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, LogOut, Search, Scan, UserPlus, Shield,
  CheckCircle, AlertCircle, Phone, X, ArrowRight,
  User, CreditCard, MessageSquare, DoorOpen, Fingerprint, Clock
} from 'lucide-react';

const CheckInModal = ({ reservation, rooms, onConfirm, onClose }) => {
  const { mt } = useModuleTranslation();
  const fo = (k) => mt(`frontOffice.${k}`);
  const [step, setStep] = useState(0);
  const [roomId, setRoomId] = useState(reservation.room || '');
  const freeRooms = rooms.filter(r => r.status === 'boş' && r.clean === 'temiz');
  const perNight = fo('perNight');

  const finish = () => { onConfirm(reservation.id, roomId); onClose(); };

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="ci-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9,y:20}} animate={{scale:1,y:0}}>
        <div className="modal-head">
          <div className="mh-title"><Scan size={20} color="#3b82f6"/><h3>{fo('ciTitle')}: {reservation.guest}</h3></div>
          <button onClick={onClose}><X size={20}/></button>
        </div>

        <div className="ci-steps">
          {[fo('ciStep1'), fo('ciStep2'), fo('ciStep3')].map((s,i) => (
            <div key={i} className={`step ${step >= i ? 'done' : ''} ${step === i ? 'active' : ''}`}>
              <div className="step-dot">{step > i ? <CheckCircle size={14}/> : i+1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="ci-body">
          {step === 0 && (
            <div className="ci-room-select">
              <div className="res-info-box">
                <div><label>{fo('ciResInfo')}</label><strong>{reservation.id}</strong></div>
                <div><label>{fo('ciCheckinOut')}</label><strong>{reservation.checkIn} / {reservation.checkOut}</strong></div>
                <div><label>{fo('ciRoomType')}</label><strong>{reservation.type}</strong></div>
                <div><label>{fo('ciPax')}</label><strong>{reservation.pax}</strong></div>
              </div>
              <label className="input-label">{fo('ciSelectRoom')}</label>
              {reservation.room ? (
                <div className="assigned-room">
                  <span>{mt('common.room')} {reservation.room} — {fo('ciPreAssigned')}</span>
                </div>
              ) : (
                <div className="room-picker">
                  {freeRooms.map(r => (
                    <button key={r.id} className={`rpick ${roomId===r.id?'active':''}`} onClick={()=>setRoomId(r.id)}>
                      <strong>{r.id}</strong><span>{r.type}</span><span className="rate">₺{r.rate}{perNight}</span>
                    </button>
                  ))}
                </div>
              )}
              <button className="btn-next" onClick={() => setStep(1)} disabled={!roomId && !reservation.room}>
                {fo('ciScanBtn')} <ArrowRight size={16}/>
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="ci-scan">
              <div className="scan-card">
                <div className="scan-line"/>
                <div className="scan-icon"><Fingerprint size={40} color="#3b82f6"/></div>
              </div>
              <p><strong>{fo('ciScanning')}</strong></p>
              <small>{fo('ciScanWait')}</small>
              {setTimeout(() => step === 1 && setStep(2), 2200) && null}
            </div>
          )}

          {step === 2 && (
            <div className="ci-done">
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring'}}>
                <CheckCircle size={64} color="#10b981"/>
              </motion.div>
              <h3>{fo('ciVerified')}</h3>
              <div className="data-grid">
                <div><label>{fo('ciName')}</label><strong>{reservation.guest}</strong></div>
                <div><label>{fo('ciRoom')}</label><strong>{roomId || reservation.room}</strong></div>
                <div><label>{fo('ciIn')}</label><strong>{reservation.checkIn}</strong></div>
                <div><label>{fo('ciOut')}</label><strong>{reservation.checkOut}</strong></div>
              </div>
              <button className="btn-finish" onClick={finish}>
                <CheckCircle size={16}/> {fo('ciFinish')}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const WalkInModal = ({ rooms, onClose, onAdd }) => {
  const { mt } = useModuleTranslation();
  const fo = (k) => mt(`frontOffice.${k}`);
  const freeRooms = rooms.filter(r => r.status === 'boş' && r.clean === 'temiz');
  const [form, setForm] = useState({ guest:'', room:'', pax:1, checkOut:'', board:'HB', channel:'Walk-in', paid:0, method: mt('frontOffice.payMethods')[0] });
  const sel = (k,v) => setForm(p=>({...p,[k]:v}));
  const selRoom = rooms.find(r=>r.id===form.room);
  const nights = form.checkOut ? Math.max(1, Math.round((new Date(form.checkOut)-new Date('2026-03-14'))/(86400000))) : 1;
  const total = selRoom ? selRoom.rate * nights : 0;
  const perNight = fo('perNight');

  const submit = () => {
    if (!form.guest || !form.room || !form.checkOut) return;
    onAdd({ ...form, checkIn:'2026-03-14', nights, total, balance: total - Number(form.paid), status:'check-in', type: selRoom?.type, pax: Number(form.pax) });
    onClose();
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <motion.div className="wi-modal" onClick={e=>e.stopPropagation()} initial={{scale:.9}} animate={{scale:1}}>
        <div className="modal-head"><h3>{fo('wiTitle')}</h3><button onClick={onClose}><X size={20}/></button></div>
        <div className="wi-body">
          <div className="wi-grid">
            <div className="wg"><label>{fo('wiGuestName')}</label><input value={form.guest} onChange={e=>sel('guest',e.target.value)} placeholder={mt('common.name')}/></div>
            <div className="wg"><label>{fo('wiPax')}</label><input type="number" value={form.pax} onChange={e=>sel('pax',e.target.value)} min={1} max={6}/></div>
            <div className="wg"><label>{fo('wiCheckout')}</label><input type="date" value={form.checkOut} onChange={e=>sel('checkOut',e.target.value)} min="2026-03-15"/></div>
            <div className="wg"><label>{fo('wiBoard')}</label>
              <select value={form.board} onChange={e=>sel('board',e.target.value)}>
                {['BB','HB','FB','AI'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <label>{fo('wiSelectRoom')}</label>
          <div className="room-picker">
            {freeRooms.map(r => (
              <button key={r.id} className={`rpick ${form.room===r.id?'active':''}`} onClick={()=>sel('room',r.id)}>
                <strong>{r.id}</strong><span>{r.type}</span><span className="rate">₺{r.rate}{perNight}</span>
              </button>
            ))}
          </div>
          {form.room && form.checkOut && (
            <div className="calc-box">
              <div><span>{nights} {mt('common.nights')} × ₺{selRoom?.rate}</span><strong>₺{total.toLocaleString()}</strong></div>
              <div>
                <label>{fo('wiDeposit')}</label>
                <input type="number" value={form.paid} onChange={e=>sel('paid',e.target.value)} min={0} max={total}/>
              </div>
              <div>
                <label>{fo('wiPayMethod')}</label>
                <select value={form.method} onChange={e=>sel('method',e.target.value)}>
                  {mt('frontOffice.payMethods').map(m=><option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="calc-total">{fo('wiRemaining')} <strong style={{color:'#ef4444'}}>₺{Math.max(0,total-Number(form.paid)).toLocaleString()}</strong></div>
            </div>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn-cancel" onClick={onClose}>{mt('common.cancel')}</button>
          <button className="btn-primary" onClick={submit} disabled={!form.guest||!form.room||!form.checkOut}>
            <LogIn size={14}/> {fo('wiCreate')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FrontOffice = () => {
  const { reservations, rooms, checkIn, checkOut, addReservation, addNotification } = useHotel();
  const { mt } = useModuleTranslation();
  const fo = (k) => mt(`frontOffice.${k}`);
  const c  = (k) => mt(`common.${k}`);

  const [tab, setTab]         = useState('arrivals');
  const [search, setSearch]   = useState('');
  const [ciModal, setCiModal] = useState(null);
  const [walkIn, setWalkIn]   = useState(false);

  const arrivals   = reservations.filter(r => r.status === 'gelecek');
  const inHouse    = reservations.filter(r => r.status === 'check-in');
  const departures = reservations.filter(r => r.status === 'check-in' && r.checkOut === '2026-03-14');
  const checkouts  = reservations.filter(r => r.status === 'check-out');

  const tabData = { arrivals, inhouse: inHouse, departures, checkouts };
  const tabLabels = {
    arrivals:   `${fo('arrivals')} (${arrivals.length})`,
    inhouse:    `${fo('inHouse')} (${inHouse.length})`,
    departures: `${fo('departuresToday')} (${departures.length})`,
    checkouts:  fo('completed'),
  };

  const data = (tabData[tab] || []).filter(r =>
    !search || r.guest.toLowerCase().includes(search.toLowerCase()) || (r.room||'').includes(search) || r.id.includes(search)
  );

  const stats = [
    { label: fo('awaitingArrival'), value: arrivals.length,   color:'#3b82f6', icon:<LogIn size={18}/> },
    { label: fo('inHouseCount'),    value: inHouse.length,    color:'#10b981', icon:<User size={18}/> },
    { label: fo('todayDeparture'),  value: departures.length, color:'#f59e0b', icon:<LogOut size={18}/> },
    { label: fo('brokenRoom'),      value: rooms.filter(r=>r.status==='arızalı').length, color:'#ef4444', icon:<AlertCircle size={18}/> },
  ];

  const handleCheckOut = (resId) => {
    checkOut(resId);
    addNotification({ type:'info', msg:`Check-out ${fo('completedTag').toLowerCase()}` });
  };

  return (
    <div className="fo-page">
      <div className="fo-head">
        <div>
          <h2>{fo('title')}</h2>
          <span>{fo('subtitle')}</span>
        </div>
        <div className="fo-actions">
          <div className="kbs-tag"><Shield size={14} color="#10b981"/> {fo('kbsActive')}</div>
          <button className="btn-primary" onClick={()=>setWalkIn(true)}>
            <UserPlus size={15}/> {fo('walkIn')}
          </button>
        </div>
      </div>

      <div className="fo-stats">
        {stats.map((s,i) => (
          <motion.div key={i} className="fos-card" whileHover={{y:-3}}>
            <div className="fos-icon" style={{background:`${s.color}18`,color:s.color}}>{s.icon}</div>
            <div><div className="fos-val">{s.value}</div><div className="fos-lbl">{s.label}</div></div>
          </motion.div>
        ))}
      </div>

      <div className="fo-table-card">
        <div className="ft-head">
          <div className="tabs">
            {Object.entries(tabLabels).map(([k,v])=>(
              <button key={k} className={`tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>{v}</button>
            ))}
          </div>
          <div className="search-box">
            <Search size={15}/><input placeholder={fo('searchPlaceholder')} value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
        </div>

        <table className="fo-table">
          <thead><tr>
            <th>{fo('colId')}</th><th>{fo('colGuest')}</th><th>{fo('colRoom')}</th>
            <th>{fo('colDates')}</th><th>{fo('colChannel')}</th>
            <th>{fo('colAmount')}</th><th>{fo('colActions')}</th>
          </tr></thead>
          <tbody>
            {data.map((r,i) => (
              <motion.tr key={r.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.03}}>
                <td><span className="res-id">{r.id}</span></td>
                <td>
                  <div className="g-cell">
                    <div className="g-av">{r.guest[0]}</div>
                    <div><strong>{r.guest}</strong><span>{r.pax} {c('persons')} · {r.board}</span></div>
                  </div>
                </td>
                <td>{r.room ? <span className="room-badge">{r.room}</span> : <span className="no-room">{fo('unassigned')}</span>}</td>
                <td><div><strong>{r.checkIn}</strong><small>→ {r.checkOut}</small></div></td>
                <td><span className="channel">{r.channel}</span></td>
                <td>
                  <div><strong>₺{r.total?.toLocaleString()}</strong>
                    {r.balance>0 && <span className="bal-warn">₺{r.balance.toLocaleString()} {c('debt')}</span>}
                    {r.balance===0 && <span className="bal-ok">{c('closed')}</span>}
                  </div>
                </td>
                <td>
                  <div className="act-row">
                    {r.status === 'gelecek' && (
                      <button className="act-btn blue" onClick={()=>setCiModal(r)}>
                        <Scan size={13}/> {fo('checkInBtn')}
                      </button>
                    )}
                    {r.status === 'check-in' && (
                      <button className="act-btn red" onClick={()=>handleCheckOut(r.id)}>
                        <LogOut size={13}/> {fo('checkOutBtn')}
                      </button>
                    )}
                    {r.status === 'check-out' && (
                      <span className="done-tag"><CheckCircle size={13}/> {fo('completedTag')}</span>
                    )}
                    <button className="act-icon" title={c('notes')}><MessageSquare size={15}/></button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={7} style={{textAlign:'center',padding:'40px',color:'#94a3b8',fontWeight:700}}>{fo('noRecord')}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {ciModal && <CheckInModal reservation={ciModal} rooms={rooms} onConfirm={checkIn} onClose={()=>setCiModal(null)}/>}
        {walkIn  && <WalkInModal rooms={rooms} onClose={()=>setWalkIn(false)} onAdd={addReservation}/>}
      </AnimatePresence>

      <style>{`
        .fo-page { padding:28px; display:flex; flex-direction:column; gap:20px; }
        .fo-head { display:flex; justify-content:space-between; align-items:flex-start; }
        .fo-head h2 { font-size:24px; font-weight:800; color:#1e293b; }
        .fo-head span { font-size:13px; color:#94a3b8; }
        .fo-actions { display:flex; align-items:center; gap:14px; }
        .kbs-tag { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:#64748b; background:white; padding:9px 14px; border-radius:10px; border:1px solid #e2e8f0; }
        .kbs-tag strong { color:#10b981; }
        .btn-primary { padding:10px 18px; border-radius:12px; border:none; background:#3b82f6; color:white; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .fo-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .fos-card { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:18px; display:flex; align-items:center; gap:14px; cursor:default; }
        .fos-icon { width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
        .fos-val { font-size:26px; font-weight:900; color:#1e293b; line-height:1; }
        .fos-lbl { font-size:12px; color:#94a3b8; font-weight:700; }
        .fo-table-card { background:white; border-radius:20px; border:1px solid #e2e8f0; overflow:hidden; }
        .ft-head { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid #f1f5f9; gap:16px; flex-wrap:wrap; }
        .tabs { display:flex; gap:8px; }
        .tab { padding:8px 16px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; color:#64748b; cursor:pointer; }
        .tab.active { background:#1e293b; color:white; border-color:#1e293b; }
        .search-box { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; padding:9px 14px; border-radius:10px; }
        .search-box input { border:none; background:transparent; outline:none; font-size:13px; width:220px; }
        .fo-table { width:100%; border-collapse:collapse; }
        .fo-table thead { background:#f8fafc; }
        .fo-table th { text-align:left; padding:12px 16px; font-size:11px; color:#94a3b8; text-transform:uppercase; font-weight:800; }
        .fo-table td { padding:14px 16px; font-size:13px; color:#475569; border-bottom:1px solid #f8fafc; }
        .fo-table tr:last-child td { border-bottom:none; }
        .fo-table tr:hover td { background:#fafbfc; }
        .res-id { font-family:monospace; font-size:11px; background:#f1f5f9; padding:2px 7px; border-radius:5px; color:#64748b; font-weight:700; }
        .g-cell { display:flex; align-items:center; gap:10px; }
        .g-av { width:32px; height:32px; background:#eff6ff; color:#3b82f6; border-radius:9px; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:13px; flex-shrink:0; }
        .g-cell strong { display:block; color:#1e293b; font-size:13px; font-weight:700; }
        .g-cell span { font-size:11px; color:#94a3b8; }
        .room-badge { background:#f1f5f9; color:#1e293b; font-weight:800; padding:4px 10px; border-radius:8px; font-size:12px; }
        .no-room { font-size:11px; color:#cbd5e1; font-style:italic; }
        .channel { font-size:11px; font-weight:700; color:#64748b; }
        .bal-warn { display:block; font-size:11px; font-weight:700; color:#ef4444; }
        .bal-ok { display:block; font-size:11px; font-weight:700; color:#10b981; }
        .act-row { display:flex; align-items:center; gap:8px; }
        .act-btn { padding:6px 14px; border-radius:8px; border:none; font-size:11px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:5px; }
        .act-btn.blue { background:#eff6ff; color:#3b82f6; }
        .act-btn.red  { background:#fef2f2; color:#ef4444; }
        .act-icon { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .done-tag { display:flex; align-items:center; gap:4px; font-size:11px; font-weight:700; color:#10b981; }
        .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.8); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .ci-modal,.wi-modal { background:white; border-radius:24px; overflow:hidden; box-shadow:0 25px 60px rgba(0,0,0,0.4); width:520px; max-height:90vh; overflow-y:auto; }
        .modal-head { padding:20px 26px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:white; z-index:10; }
        .mh-title { display:flex; align-items:center; gap:10px; }
        .modal-head h3 { font-size:17px; font-weight:800; color:#1e293b; }
        .modal-head button { background:transparent; border:none; color:#94a3b8; cursor:pointer; }
        .ci-steps { display:flex; align-items:center; justify-content:center; gap:0; padding:16px 26px; border-bottom:1px solid #f1f5f9; background:#f8fafc; }
        .step { display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; color:#94a3b8; }
        .step.active { color:#3b82f6; }
        .step.done { color:#10b981; }
        .step-dot { width:26px; height:26px; border-radius:50%; background:#e2e8f0; color:#94a3b8; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:900; }
        .step.active .step-dot { background:#3b82f6; color:white; }
        .step.done .step-dot { background:#10b981; color:white; }
        .step:not(:last-child)::after { content:''; width:40px; height:2px; background:#e2e8f0; margin:0 8px; }
        .step.done:not(:last-child)::after { background:#10b981; }
        .ci-body { padding:24px 26px; }
        .res-info-box { display:grid; grid-template-columns:1fr 1fr; gap:12px; background:#f8fafc; padding:16px; border-radius:14px; margin-bottom:20px; }
        .res-info-box label { font-size:10px; font-weight:800; color:#94a3b8; text-transform:uppercase; display:block; margin-bottom:2px; }
        .res-info-box strong { font-size:14px; color:#1e293b; font-weight:700; }
        .input-label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; display:block; margin-bottom:10px; }
        .assigned-room { background:#f0fdf4; color:#10b981; padding:12px 16px; border-radius:10px; font-weight:700; margin-bottom:16px; }
        .room-picker { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:20px; }
        .rpick { border:1.5px solid #e2e8f0; background:white; border-radius:14px; padding:14px 10px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:3px; transition:0.2s; }
        .rpick:hover { border-color:#3b82f6; background:#eff6ff; }
        .rpick.active { border-color:#3b82f6; background:#eff6ff; }
        .rpick strong { font-size:18px; color:#1e293b; }
        .rpick span { font-size:11px; color:#94a3b8; }
        .rpick .rate { font-size:12px; color:#3b82f6; font-weight:700; }
        .btn-next { width:100%; padding:14px; border-radius:12px; border:none; background:#3b82f6; color:white; font-size:14px; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; }
        .btn-next:disabled { opacity:.4; cursor:not-allowed; }
        .ci-scan { padding:20px 0; text-align:center; display:flex; flex-direction:column; align-items:center; gap:16px; }
        .scan-card { width:260px; height:160px; background:#f1f5f9; border-radius:20px; border:2px dashed #3b82f6; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .scan-line { position:absolute; width:100%; height:3px; background:linear-gradient(90deg,transparent,#3b82f6,transparent); animation:scan 1.5s infinite ease-in-out; }
        @keyframes scan { 0%{top:0} 100%{top:100%} }
        .ci-scan p { font-weight:800; color:#1e293b; margin:0; }
        .ci-scan small { color:#94a3b8; }
        .ci-done { text-align:center; display:flex; flex-direction:column; align-items:center; gap:16px; }
        .ci-done h3 { font-size:20px; font-weight:800; color:#10b981; }
        .data-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; width:100%; background:#f8fafc; padding:16px; border-radius:14px; }
        .data-grid label { font-size:10px; font-weight:800; color:#94a3b8; text-transform:uppercase; display:block; margin-bottom:2px; }
        .data-grid strong { font-size:14px; color:#1e293b; font-weight:700; }
        .btn-finish { width:100%; padding:15px; border-radius:12px; border:none; background:#10b981; color:white; font-size:14px; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; }
        .wi-modal { width:560px; }
        .wi-body { padding:22px 26px; display:flex; flex-direction:column; gap:16px; }
        .wi-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .wg { display:flex; flex-direction:column; gap:6px; }
        .wg label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; }
        .wg input, .wg select { padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13px; outline:none; }
        .calc-box { background:#f8fafc; border-radius:14px; padding:16px; display:flex; flex-direction:column; gap:10px; }
        .calc-box > div { display:flex; justify-content:space-between; align-items:center; }
        .calc-box label { font-size:11px; font-weight:700; color:#64748b; }
        .calc-box input, .calc-box select { padding:8px 12px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13px; width:160px; outline:none; }
        .calc-total { font-weight:700; color:#64748b; }
        .modal-foot { padding:16px 26px; border-top:1px solid #f1f5f9; display:flex; justify-content:flex-end; gap:10px; }
        .btn-cancel { padding:11px 20px; border-radius:10px; border:1px solid #e2e8f0; background:white; font-weight:700; cursor:pointer; }
      `}</style>
    </div>
  );
};

export default FrontOffice;
