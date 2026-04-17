import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import { Wine } from 'lucide-react';

const MINIBAR_ITEMS = [
  { id:'M-01', name:{ tr:'Su (500ml)',     en:'Water (500ml)'  }, price:15,  emoji:'💧', category:'drink' },
  { id:'M-02', name:{ tr:'Kola (330ml)',   en:'Cola (330ml)'   }, price:25,  emoji:'🥤', category:'drink' },
  { id:'M-03', name:{ tr:'Bira (330ml)',   en:'Beer (330ml)'   }, price:55,  emoji:'🍺', category:'alcohol' },
  { id:'M-04', name:{ tr:'Şarap Küçük',   en:'Wine Miniature' }, price:120, emoji:'🍷', category:'alcohol' },
  { id:'M-05', name:{ tr:'Viski Teklisi', en:'Whisky Single'  }, price:180, emoji:'🥃', category:'alcohol' },
  { id:'M-06', name:{ tr:'Çikolata',      en:'Chocolate'      }, price:35,  emoji:'🍫', category:'snack' },
  { id:'M-07', name:{ tr:'Cips (Büyük)',  en:'Chips (Large)'  }, price:28,  emoji:'🥨', category:'snack' },
  { id:'M-08', name:{ tr:'Fıstık',        en:'Nuts'           }, price:22,  emoji:'🥜', category:'snack' },
  { id:'M-09', name:{ tr:'Kahve Hazır',   en:'Instant Coffee' }, price:18,  emoji:'☕', category:'hot' },
  { id:'M-10', name:{ tr:'Çay 5li',       en:'Tea x5'         }, price:12,  emoji:'🍵', category:'hot' },
];

const MiniBar = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('minibar.' + k);
  const _c = (k) => mt('common.' + k);
  const { reservations, addFolioLine, addNotification } = useHotel();
  const inHouse = reservations.filter(r => r.status === 'check-in');

  const [selectedRoom, setSelectedRoom] = useState('');
  const [consumed, setConsumed] = useState({});

  const selRes = inHouse.find(r => r.room === selectedRoom);

  const setQty = (itemId, qty) => {
    setConsumed(p => ({
      ...p,
      [selectedRoom]: { ...(p[selectedRoom] || {}), [itemId]: Math.max(0, qty) }
    }));
  };

  const getQty = (itemId) => (consumed[selectedRoom] || {})[itemId] || 0;
  const roomTotal = () => MINIBAR_ITEMS.reduce((s, item) => s + getQty(item.id) * item.price, 0);

  const saveAndBill = () => {
    const total = roomTotal();
    if (!selRes || total === 0) return;
    const desc = MINIBAR_ITEMS.filter(i => getQty(i.id) > 0)
      .map(i => `${i.name[language === 'tr' ? 'tr' : 'en']} x${getQty(i.id)}`).join(', ');
    addFolioLine(selRes.id, { desc: `Minibar — ${desc}`, amount: total, type: 'extra' });
    addNotification({ type: 'success', msg: `${_t('title')}: ${language === 'tr' ? 'Oda' : 'Room'} ${selectedRoom} — ₺${total}` });
    setConsumed(p => ({ ...p, [selectedRoom]: {} }));
  };

  return (
    <div className="mb-page">
      <div className="mb-head">
        <div>
          <h2><Wine size={20}/> {_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
      </div>

      <div className="mb-layout">
        {/* Room list */}
        <div className="room-list">
          <h3>{language === 'tr' ? 'İçerideki Odalar' : 'In-House Rooms'} ({inHouse.length})</h3>
          {inHouse.map(r => {
            const hasItems = Object.values(consumed[r.room] || {}).some(q => q > 0);
            return (
              <button key={r.id} className={`room-btn ${selectedRoom === r.room ? 'active' : ''}`} onClick={() => setSelectedRoom(r.room)}>
                <div className="rb-num">{r.room}</div>
                <div className="rb-info"><strong>{r.guest}</strong><span>{r.board}</span></div>
                {hasItems && <span className="has-items">●</span>}
              </button>
            );
          })}
        </div>

        {/* Minibar entry */}
        <div className="mb-content">
          {selectedRoom ? (
            <>
              <div className="mb-room-head">
                <div>
                  <h3>{_c('room')} {selectedRoom} — {selRes?.guest}</h3>
                  <span>{_c('checkIn')}: {selRes?.checkIn} · {_c('checkOut')}: {selRes?.checkOut}</span>
                </div>
                {roomTotal() > 0 && (
                  <button className="bill-btn" onClick={saveAndBill}>
                    ₺{roomTotal().toLocaleString()} {_t('chargeToFolio')}
                  </button>
                )}
              </div>

              <div className="item-grid">
                {MINIBAR_ITEMS.map(item => {
                  const qty = getQty(item.id);
                  const name = item.name[language === 'tr' ? 'tr' : 'en'];
                  return (
                    <div key={item.id} className={`item-card ${qty > 0 ? 'active' : ''}`}>
                      <div className="ic-emoji">{item.emoji}</div>
                      <div className="ic-name">{name}</div>
                      <div className="ic-price">₺{item.price}</div>
                      <div className="qty-row">
                        <button onClick={() => setQty(item.id, qty - 1)}>−</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty(item.id, qty + 1)}>+</button>
                      </div>
                      {qty > 0 && <div className="ic-total">₺{item.price * qty}</div>}
                    </div>
                  );
                })}
              </div>

              {roomTotal() > 0 && (
                <div className="mb-summary">
                  {MINIBAR_ITEMS.filter(i => getQty(i.id) > 0).map(i => (
                    <div key={i.id} className="sum-row">
                      <span>{i.emoji} {i.name[language === 'tr' ? 'tr' : 'en']} x{getQty(i.id)}</span>
                      <strong>₺{i.price * getQty(i.id)}</strong>
                    </div>
                  ))}
                  <div className="sum-total"><span>{_c('total')}</span><strong>₺{roomTotal().toLocaleString()}</strong></div>
                </div>
              )}
            </>
          ) : (
            <div className="no-sel"><Wine size={48} color="#e2e8f0"/><p>{language === 'tr' ? 'Minibar girişi için bir oda seçin' : 'Select a room to enter minibar consumption'}</p></div>
          )}
        </div>
      </div>

      <style>{`
        .mb-page{padding:28px;display:flex;flex-direction:column;gap:20px;height:calc(100vh - 70px);}
        .mb-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .mb-head span{font-size:13px;color:#94a3b8;}
        .mb-layout{display:flex;gap:20px;flex:1;min-height:0;}
        .room-list{width:220px;flex-shrink:0;background:white;border-radius:18px;border:1px solid #e2e8f0;padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;}
        .room-list h3{font-size:13px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-bottom:8px;}
        .room-btn{width:100%;display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:none;background:transparent;cursor:pointer;text-align:left;}
        .room-btn:hover{background:#f8fafc;}
        .room-btn.active{background:#eff6ff;border:1.5px solid #3b82f6;}
        .rb-num{width:36px;height:36px;background:#f1f5f9;color:#1e293b;font-weight:900;font-size:14px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .rb-info{flex:1;}.rb-info strong{display:block;font-size:12px;color:#1e293b;font-weight:700;}.rb-info span{font-size:10px;color:#94a3b8;}
        .has-items{color:#3b82f6;font-size:18px;}
        .mb-content{flex:1;background:white;border-radius:18px;border:1px solid #e2e8f0;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:16px;}
        .mb-room-head{display:flex;justify-content:space-between;align-items:center;}
        .mb-room-head h3{font-size:16px;font-weight:800;color:#1e293b;}
        .mb-room-head span{font-size:13px;color:#94a3b8;}
        .bill-btn{padding:12px 20px;border-radius:12px;border:none;background:#3b82f6;color:white;font-weight:800;font-size:14px;cursor:pointer;}
        .item-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;}
        .item-card{background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:6px;transition:0.2s;}
        .item-card.active{background:#eff6ff;border-color:#3b82f6;}
        .ic-emoji{font-size:28px;}
        .ic-name{font-size:11px;font-weight:700;color:#1e293b;text-align:center;}
        .ic-price{font-size:12px;color:#94a3b8;}
        .qty-row{display:flex;align-items:center;gap:8px;}
        .qty-row button{width:26px;height:26px;border-radius:50%;border:1.5px solid #e2e8f0;background:white;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}
        .qty-row span{font-size:16px;font-weight:900;color:#1e293b;min-width:20px;text-align:center;}
        .ic-total{font-size:13px;font-weight:800;color:#3b82f6;}
        .mb-summary{background:#f8fafc;border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:0;}
        .sum-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:13px;}
        .sum-row:last-child{border-bottom:none;}
        .sum-row span{color:#64748b;}
        .sum-total{display:flex;justify-content:space-between;padding:12px 0 0;font-size:16px;font-weight:800;color:#1e293b;}
        .no-sel{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#94a3b8;font-size:14px;}
      `}</style>
    </div>
  );
};

export default MiniBar;
