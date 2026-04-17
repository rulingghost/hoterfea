import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bus, Compass, X, Plus, Calendar, Clock, 
  MapPin, CheckCircle, Plane,
  Car, User, ArrowUpRight, Trash2, Check
} from 'lucide-react';

const TourManagement = () => {
  const { mt, isEn } = useModuleTranslation();
  const _c = (k) => mt('common.' + k);
  const { addNotification, addCashTransaction } = useHotel();

  const TOUR_TYPES_TR = ['Kültür Turu','Doğa Turu','Tekne Turu','Balon Turu','Safari','Dalış','Macera'];
  const TOUR_TYPES_EN = ['Cultural Tour','Nature Tour','Boat Tour','Balloon Tour','Safari','Diving','Adventure'];
  const TOUR_TYPES = isEn ? TOUR_TYPES_EN : TOUR_TYPES_TR;

  const VEHICLES = ['Vito VIP','Mercedes S','BMW 7','Minibus (16)','Coach (45)','Sedan'];

  const STATUS_LABEL = {
    onaylı:     isEn ? 'Confirmed'   : 'Onaylandı',
    bekliyor:   isEn ? 'Pending'     : 'Bekliyor',
    tamamlandı: isEn ? 'Completed'   : 'Tamamlandı',
    iptal:      isEn ? 'Cancelled'   : 'İptal',
  };

  const [activeTab, setActiveTab] = useState('tours');
  const [showTourForm, setShowTourForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);

  const [tours, setTours] = useState([
    { id:'TR-101', nameTr:'Kapadokya Balon Turu',     nameEn:'Cappadocia Balloon Tour',    typeTr:'Balon Turu',   typeEn:'Balloon Tour',  guest:'Sarah Johnson',    date:'2026-03-15', pax:2, status:'onaylı',     price:4200 },
    { id:'TR-102', nameTr:'Alanya Tekne Turu',        nameEn:'Alanya Boat Tour',           typeTr:'Tekne Turu',   typeEn:'Boat Tour',     guest:'Müller Family',    date:'2026-03-16', pax:4, status:'bekliyor',   price:2800 },
    { id:'TR-103', nameTr:'Efes Antik Kent Gezisi',   nameEn:'Ephesus Ancient City Tour',  typeTr:'Kültür Turu',  typeEn:'Cultural Tour', guest:'Carlos Rivera',    date:'2026-03-17', pax:1, status:'tamamlandı', price:1500 },
    { id:'TR-104', nameTr:'Pamukkale Turu',           nameEn:'Pamukkale Tour',             typeTr:'Doğa Turu',    typeEn:'Nature Tour',   guest:'Sheikh Al-Rashid', date:'2026-03-20', pax:4, status:'onaylı',     price:8500 },
  ]);

  const [transfers, setTransfers] = useState([
    { id:'TF-201', typeTr:'Geliş', typeEn:'Arrival',   guest:'Ahmet Yılmaz', loc:'Antalya Airport', flight:'TK2410', time:'14:30', date:'2026-03-15', vehicle:'Vito VIP',   status:'bekliyor'   },
    { id:'TF-202', typeTr:'Gidiş', typeEn:'Departure',  guest:'Klaus Weber',   loc:'Dalaman Airport', flight:'LH1120', time:'10:00', date:'2026-03-16', vehicle:'Mercedes S', status:'tamamlandı' },
    { id:'TF-203', typeTr:'Geliş', typeEn:'Arrival',   guest:'Yuki Tanaka',  loc:'Antalya Airport', flight:'NH6120', time:'16:45', date:'2026-03-20', vehicle:'Vito VIP',   status:'bekliyor'   },
  ]);

  const [tourForm, setTourForm] = useState({ name:'', type:TOUR_TYPES[0], guest:'', date:'', pax:'', price:'' });
  const [transferForm, setTransferForm] = useState({ type: isEn?'Arrival':'Geliş', guest:'', loc:'', flight:'', time:'', date:'', vehicle:VEHICLES[0] });
  const idCounters = React.useRef({ tour:104, transfer:203 });

  const submitTour = (e) => {
    e.preventDefault();
    idCounters.current.tour++;
    setTours(p => [{ nameTr:tourForm.name, nameEn:tourForm.name, typeTr:tourForm.type, typeEn:tourForm.type, ...tourForm, id:`TR-${idCounters.current.tour}`, status:'bekliyor', pax:Number(tourForm.pax), price:Number(tourForm.price) }, ...p]);
    addNotification({ type:'info', msg: isEn ? `New tour: ${tourForm.name} — ${tourForm.guest}` : `Yeni tur kaydı: ${tourForm.name} — ${tourForm.guest}` });
    setTourForm({ name:'', type:TOUR_TYPES[0], guest:'', date:'', pax:'', price:'' });
    setShowTourForm(false);
  };

  const submitTransfer = (e) => {
    e.preventDefault();
    idCounters.current.transfer++;
    setTransfers(p => [{ ...transferForm, typeTr:transferForm.type, typeEn:transferForm.type, id:`TF-${idCounters.current.transfer}`, status:'bekliyor' }, ...p]);
    addNotification({ type:'info', msg: isEn ? `New transfer: ${transferForm.guest} — ${transferForm.loc}` : `Yeni transfer: ${transferForm.guest} — ${transferForm.loc}` });
    setTransferForm({ type:isEn?'Arrival':'Geliş', guest:'', loc:'', flight:'', time:'', date:'', vehicle:VEHICLES[0] });
    setShowTransferForm(false);
  };

  const updateTourStatus = (id, status) => {
    setTours(p => p.map(t => t.id===id ? {...t, status} : t));
    const tour = tours.find(t => t.id===id);
    if (status==='tamamlandı' && tour) {
      addCashTransaction({ type:'gelir', desc:`Tour Revenue — ${isEn?tour.nameEn:tour.nameTr}`, amount:tour.price, method:isEn?'Credit Card':'Kredi Kartı' });
      addNotification({ type:'success', msg: isEn ? `Tour completed & revenue recorded: ${tour.nameEn} — ₺${tour.price.toLocaleString()}` : `Tur tamamlandı: ${tour.nameTr} — ₺${tour.price.toLocaleString()}` });
    } else if (status==='onaylı') {
      addNotification({ type:'success', msg: isEn ? `Tour confirmed: ${tour?.nameEn}` : `Tur onaylandı: ${tour?.nameTr}` });
    } else if (status==='iptal') {
      addNotification({ type:'warn', msg: isEn ? `Tour cancelled: ${tour?.nameEn}` : `Tur iptal edildi: ${tour?.nameTr}` });
    }
  };

  const updateTransferStatus = (id, status) => {
    setTransfers(p => p.map(t => t.id===id ? {...t, status} : t));
    addNotification({ type:'success', msg: isEn ? `Transfer ${status==='tamamlandı'?'completed':'updated'}` : `Transfer ${status==='tamamlandı'?'tamamlandı':'güncellendi'}` });
  };

  const deleteTour = (id) => { setTours(p => p.filter(t => t.id!==id)); };
  const deleteTransfer = (id) => { setTransfers(p => p.filter(t => t.id!==id)); };
  const totalTourRev = tours.filter(t=>t.status!=='iptal').reduce((s,t)=>s+t.price,0);

  const DESTINATIONS = isEn
    ? ['Cappadocia','Pamukkale','Ephesus Ruins','Düden Waterfalls','Olympos','Perge Ruins']
    : ['Kapadokya','Pamukkale','Efes Antik Kent','Düden Şelalesi','Olimpos','Perge Antik'];

  return (
    <div className="tm-page">
      <div className="tm-head">
        <div>
          <h2><Bus size={20}/> {isEn ? 'Tour & Transfer Management' : 'Tur & Transfer Yönetimi'}</h2>
          <span>{isEn ? 'Excursions, VIP transfers and fleet management' : 'Dış geziler, VIP transferler ve araç filosu yönetimi'}</span>
        </div>
        <div className="tab-switcher">
          <button className={activeTab==='tours'?'active':''} onClick={()=>setActiveTab('tours')}>{isEn?'Tours & Excursions':'Turlar & Geziler'}</button>
          <button className={activeTab==='transfers'?'active':''} onClick={()=>setActiveTab('transfers')}>{isEn?'Transfers':'Transferler'}</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'tours' ? (
          <motion.div key="tours" className="tm-content" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
            <div className="kpi-row">
              <div className="kpi-box"><span>{isEn?'Total Tours':'Toplam Tur'}</span><strong style={{color:'#3b82f6'}}>{tours.length}</strong></div>
              <div className="kpi-box"><span>{isEn?'Confirmed':'Onaylı'}</span><strong style={{color:'#10b981'}}>{tours.filter(t=>t.status==='onaylı').length}</strong></div>
              <div className="kpi-box"><span>{isEn?'Pending':'Bekleyen'}</span><strong style={{color:'#f59e0b'}}>{tours.filter(t=>t.status==='bekliyor').length}</strong></div>
              <div className="kpi-box"><span>{isEn?'Total Revenue':'Toplam Gelir'}</span><strong style={{color:'#8b5cf6'}}>₺{totalTourRev.toLocaleString()}</strong></div>
            </div>

            <div className="tm-grid">
              <div className="tm-main">
                <div className="tm-list-head">
                  <h3>{isEn?'Active Tour Bookings':'Aktif Tur Rezervasyonları'}</h3>
                  <button className="btn-primary sm" onClick={()=>setShowTourForm(true)}><Plus size={14}/> {isEn?'New Tour':'Yeni Tur Kaydı'}</button>
                </div>

                <AnimatePresence>
                  {showTourForm && (
                    <motion.form className="inline-form" onSubmit={submitTour} initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>
                      <div className="if-head"><h4>{isEn?'New Tour Record':'Yeni Tur Kaydı'}</h4><button type="button" onClick={()=>setShowTourForm(false)}><X size={16}/></button></div>
                      <div className="if-grid">
                        <input value={tourForm.name} onChange={e=>setTourForm(p=>({...p,name:e.target.value}))} placeholder={isEn?'Tour name *':'Tur adı *'} required/>
                        <select value={tourForm.type} onChange={e=>setTourForm(p=>({...p,type:e.target.value}))}>{TOUR_TYPES.map(t=><option key={t}>{t}</option>)}</select>
                        <input value={tourForm.guest} onChange={e=>setTourForm(p=>({...p,guest:e.target.value}))} placeholder={isEn?'Guest name *':'Misafir adı *'} required/>
                        <input type="date" value={tourForm.date} onChange={e=>setTourForm(p=>({...p,date:e.target.value}))} required/>
                        <input type="number" value={tourForm.pax} onChange={e=>setTourForm(p=>({...p,pax:e.target.value}))} placeholder={isEn?'Persons':'Kişi sayısı'} required/>
                        <input type="number" value={tourForm.price} onChange={e=>setTourForm(p=>({...p,price:e.target.value}))} placeholder={isEn?'Amount ₺':'Tutar ₺'} required/>
                      </div>
                      <div className="if-foot"><button type="submit" className="btn-primary sm">{isEn?'Create Tour':'Tur Oluştur'}</button></div>
                    </motion.form>
                  )}
                </AnimatePresence>

                <div className="tm-list">
                  {tours.map((t,i)=>(
                    <motion.div key={t.id} className="tm-card" initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}>
                      <div className="tm-c-left">
                        <div className="tm-icon"><Compass size={20}/></div>
                        <div className="tm-info">
                          <strong>{isEn ? t.nameEn : t.nameTr}</strong>
                          <span><User size={10}/> {t.guest} · {t.pax} {isEn?'Pax':'Kişi'}</span>
                        </div>
                      </div>
                      <div className="tm-c-mid">
                        <div className="tm-date"><Calendar size={12}/> {t.date}</div>
                        <div className={`tm-status ${t.status}`}>{STATUS_LABEL[t.status]}</div>
                      </div>
                      <div className="tm-price">₺{t.price.toLocaleString()}</div>
                      <div className="tm-actions">
                        {t.status==='bekliyor'   && <button className="act green"  onClick={()=>updateTourStatus(t.id,'onaylı')}><Check size={14}/></button>}
                        {t.status==='onaylı'     && <button className="act purple" onClick={()=>updateTourStatus(t.id,'tamamlandı')}><CheckCircle size={14}/></button>}
                        {t.status!=='tamamlandı' && t.status!=='iptal' && <button className="act red"   onClick={()=>updateTourStatus(t.id,'iptal')}><X size={14}/></button>}
                        <button className="act gray" onClick={()=>deleteTour(t.id)}><Trash2 size={14}/></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="tm-sidebar">
                <div className="dest-card">
                  <h3>{isEn?'Popular Destinations':'Popüler Destinasyonlar'}</h3>
                  <div className="dest-list">
                    {DESTINATIONS.map(d=>(
                      <div key={d} className="dest-i">
                        <span>{d}</span>
                        <ArrowUpRight size={14} color="#3b82f6"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="transfers" className="tm-content" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
            <div className="transfer-list">
              <div className="tm-list-head">
                <h3>{isEn?'VIP Transfer Schedule':'VIP Transfer Takvimi'}</h3>
                <button className="btn-primary sm" onClick={()=>setShowTransferForm(true)}><Plus size={14}/> {isEn?'New Transfer':'Yeni Transfer'}</button>
              </div>

              <AnimatePresence>
                {showTransferForm && (
                  <motion.form className="inline-form" onSubmit={submitTransfer} initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>
                    <div className="if-head"><h4>{isEn?'New Transfer Record':'Yeni Transfer Kaydı'}</h4><button type="button" onClick={()=>setShowTransferForm(false)}><X size={16}/></button></div>
                    <div className="if-grid">
                      <select value={transferForm.type} onChange={e=>setTransferForm(p=>({...p,type:e.target.value}))}>
                        <option>{isEn?'Arrival':'Geliş'}</option>
                        <option>{isEn?'Departure':'Gidiş'}</option>
                      </select>
                      <input value={transferForm.guest} onChange={e=>setTransferForm(p=>({...p,guest:e.target.value}))} placeholder={isEn?'Guest name *':'Misafir adı *'} required/>
                      <input value={transferForm.loc} onChange={e=>setTransferForm(p=>({...p,loc:e.target.value}))} placeholder={isEn?'Location (Airport)':'Lokasyon (Havalimanı)'} required/>
                      <input value={transferForm.flight} onChange={e=>setTransferForm(p=>({...p,flight:e.target.value}))} placeholder={isEn?'Flight No':'Uçuş No'}/>
                      <input type="time" value={transferForm.time} onChange={e=>setTransferForm(p=>({...p,time:e.target.value}))} required/>
                      <input type="date" value={transferForm.date} onChange={e=>setTransferForm(p=>({...p,date:e.target.value}))} required/>
                      <select value={transferForm.vehicle} onChange={e=>setTransferForm(p=>({...p,vehicle:e.target.value}))}>{VEHICLES.map(v=><option key={v}>{v}</option>)}</select>
                    </div>
                    <div className="if-foot"><button type="submit" className="btn-primary sm">{isEn?'Add Transfer':'Transfer Ekle'}</button></div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="t-cards">
                {transfers.map((t,i)=>(
                  <motion.div key={t.id} className="t-card" initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} transition={{delay:i*0.05}}>
                    <div className="t-top">
                      <div className={`t-type ${t.typeTr?.toLowerCase()}`}>{isEn ? t.typeEn : t.typeTr}</div>
                      <div className="t-time"><Clock size={14}/> {t.time}</div>
                    </div>
                    <div className="t-main">
                      <strong>{t.guest}</strong>
                      <div className="t-loc"><MapPin size={12}/> {t.loc}</div>
                      <div className="t-flight"><Plane size={12}/> {t.flight||'—'} · <Calendar size={12}/> {t.date}</div>
                    </div>
                    <div className="t-foot">
                      <div className="t-vehicle"><Car size={14}/> {t.vehicle}</div>
                      <div style={{display:'flex',gap:6}}>
                        {t.status==='bekliyor'   && <button className="t-nav-btn" onClick={()=>updateTransferStatus(t.id,'tamamlandı')}><CheckCircle size={14}/> {isEn?'Complete':'Tamamla'}</button>}
                        {t.status==='tamamlandı' && <span className="done-tag">✓ {isEn?'Done':'Tamamlandı'}</span>}
                        <button className="del-sm" onClick={()=>deleteTransfer(t.id)}><Trash2 size={14}/></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .tm-page{padding:28px;display:flex;flex-direction:column;gap:24px;}
        .tm-head{display:flex;justify-content:space-between;align-items:center;}
        .tm-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .tm-head span{font-size:13px;color:#94a3b8;}
        .tab-switcher{background:#f1f5f9;padding:4px;border-radius:12px;display:flex;gap:4px;}
        .tab-switcher button{padding:8px 16px;border-radius:8px;border:none;font-size:12px;font-weight:700;color:#64748b;cursor:pointer;transition:0.2s;background:transparent;}
        .tab-switcher button.active{background:white;color:#1e293b;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);}
        .kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .kpi-box{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:16px;text-align:center;}
        .kpi-box span{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;margin-bottom:4px;}
        .kpi-box strong{font-size:22px;font-weight:900;}
        .tm-grid{display:grid;grid-template-columns:1fr 300px;gap:24px;}
        .tm-main{display:flex;flex-direction:column;gap:16px;}
        .tm-list-head{display:flex;justify-content:space-between;align-items:center;}
        .tm-list-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-weight:700;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .btn-primary.sm{padding:8px 14px;border-radius:10px;font-size:12px;}
        .inline-form{background:white;border:1.5px solid #e2e8f0;border-radius:16px;padding:18px;overflow:hidden;}
        .if-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
        .if-head h4{font-size:14px;font-weight:800;color:#1e293b;}
        .if-head button{background:none;border:none;color:#94a3b8;cursor:pointer;}
        .if-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
        .if-grid input,.if-grid select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .if-foot{display:flex;justify-content:flex-end;margin-top:12px;}
        .tm-list{display:flex;flex-direction:column;gap:12px;}
        .tm-card{background:white;border:1.5px solid #e2e8f0;border-radius:18px;padding:16px;display:grid;grid-template-columns:1fr 160px 100px auto;align-items:center;gap:16px;transition:0.2s;}
        .tm-card:hover{border-color:#3b82f6;box-shadow:0 4px 12px rgba(0,0,0,0.05);}
        .tm-c-left{display:flex;align-items:center;gap:12px;}
        .tm-icon{width:40px;height:40px;background:#eff6ff;color:#3b82f6;border-radius:10px;display:flex;align-items:center;justify-content:center;}
        .tm-info strong{display:block;font-size:14px;color:#1e293b;}
        .tm-info span{font-size:11px;color:#94a3b8;display:flex;align-items:center;gap:4px;}
        .tm-date{font-size:12px;font-weight:700;color:#475569;display:flex;align-items:center;gap:6px;}
        .tm-status{font-size:10px;font-weight:800;padding:4px 10px;border-radius:20px;text-align:center;width:fit-content;margin-top:4px;}
        .tm-status.onaylı{background:#f0fdf4;color:#10b981;}
        .tm-status.bekliyor{background:#fff7ed;color:#f59e0b;}
        .tm-status.tamamlandı{background:#f1f5f9;color:#64748b;}
        .tm-status.iptal{background:#fef2f2;color:#ef4444;}
        .tm-price{font-size:15px;font-weight:900;color:#1e293b;text-align:right;}
        .tm-actions{display:flex;gap:6px;}
        .act{width:30px;height:30px;border-radius:8px;border:1.5px solid #e2e8f0;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:0.2s;}
        .act.green{color:#10b981;border-color:#bbf7d0;}
        .act.purple{color:#8b5cf6;border-color:#ddd6fe;}
        .act.red{color:#ef4444;border-color:#fecaca;}
        .act.gray{color:#94a3b8;}
        .act:hover{transform:scale(1.1);}
        .dest-card{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:20px;}
        .dest-card h3{font-size:14px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .dest-list{display:flex;flex-direction:column;gap:10px;}
        .dest-i{display:flex;justify-content:space-between;align-items:center;padding:10px;background:#f8fafc;border-radius:10px;font-size:13px;font-weight:700;color:#475569;cursor:pointer;transition:0.2s;}
        .dest-i:hover{background:#eff6ff;}
        .t-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;}
        .t-card{background:white;border:1.5px solid #e2e8f0;border-radius:20px;padding:20px;display:flex;flex-direction:column;gap:16px;}
        .t-top{display:flex;justify-content:space-between;align-items:center;}
        .t-type{font-size:10px;font-weight:800;padding:4px 10px;border-radius:20px;background:#f0fdf4;color:#10b981;}
        .t-time{font-size:13px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:6px;}
        .t-main strong{font-size:16px;font-weight:900;color:#1e293b;display:block;margin-bottom:8px;}
        .t-loc,.t-flight{font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px;margin-bottom:4px;}
        .t-foot{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid #f1f5f9;}
        .t-vehicle{font-size:12px;font-weight:700;color:#3b82f6;display:flex;align-items:center;gap:6px;}
        .t-nav-btn{background:#1e293b;color:white;border:none;padding:6px 12px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:6px;}
        .done-tag{font-size:11px;color:#10b981;font-weight:700;padding:4px 10px;background:#f0fdf4;border-radius:8px;}
        .del-sm{background:none;border:none;color:#ef4444;cursor:pointer;opacity:0.5;padding:4px;}
        .del-sm:hover{opacity:1;}
      `}</style>
    </div>
  );
};

export default TourManagement;
