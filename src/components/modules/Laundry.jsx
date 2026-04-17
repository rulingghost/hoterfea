import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Plus, Truck } from 'lucide-react';

const Laundry = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('laundry.' + k);
  const _c = (k) => mt('common.' + k);
  const { reservations, laundryOrders, addLaundryOrder, updateLaundryOrder } = useHotel();
  const inHouse = reservations.filter(r => r.status === 'check-in');

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ room: '', guest: '', resId: '', items: '', urgent: false, total: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const STATUS_MAP = {
    bekliyor:  { label: _t('pending'),    color: '#f59e0b', bg: '#fffbeb' },
    yıkanıyor: { label: _t('inProgress'), color: '#3b82f6', bg: '#eff6ff' },
    hazır:     { label: _t('ready'),      color: '#10b981', bg: '#f0fdf4' },
    teslim:    { label: _t('delivered'),  color: '#64748b', bg: '#f1f5f9' },
  };

  const submit = (e) => {
    e.preventDefault();
    const res = inHouse.find(r => r.room === form.room);
    addLaundryOrder({
      room: form.room,
      guest: form.guest,
      resId: res?.id || null,
      items: form.items.split(',').map(s => ({
        name: s.trim(),
        qty: 1,
        price: Math.round(Number(form.total) / form.items.split(',').length)
      })),
      total: Number(form.total),
      urgent: form.urgent,
    });
    setForm({ room: '', guest: '', resId: '', items: '', urgent: false, total: '' });
    setShowForm(false);
  };

  const kpi = [
    { label: _t('pending'),    val: laundryOrders.filter(o => o.status === 'bekliyor').length,   color: '#f59e0b' },
    { label: _t('inProgress'), val: laundryOrders.filter(o => o.status === 'yıkanıyor').length,  color: '#3b82f6' },
    { label: _t('ready'),      val: laundryOrders.filter(o => o.status === 'hazır').length,       color: '#10b981' },
    { label: language === 'tr' ? 'Bugün Gelir' : 'Today Revenue',
      val: `₺${laundryOrders.filter(o => o.status === 'teslim').reduce((s, o) => s + o.total, 0).toLocaleString()}`,
      color: '#8b5cf6' },
  ];

  return (
    <div className="lnd-page">
      <div className="lnd-head">
        <div>
          <h2><Shirt size={20}/> {_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={15}/> {_t('newRequest')}
        </button>
      </div>

      <div className="lnd-kpi">
        {kpi.map((k, i) => (
          <div key={i} className="lk">
            <strong style={{ color: k.color }}>{k.val}</strong>
            <span>{k.label}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form className="form-card" onSubmit={submit} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h3>{_t('newRequest')}</h3>
            <div className="fg-grid">
              <div className="fg">
                <label>{_t('roomNo')} *</label>
                <select value={form.room} onChange={e => {
                  const r = inHouse.find(r => r.room === e.target.value);
                  set('room', e.target.value);
                  if (r) set('guest', r.guest);
                }}>
                  <option value="">{_c('room')}</option>
                  {inHouse.map(r => <option key={r.id} value={r.room}>{r.room} — {r.guest}</option>)}
                </select>
              </div>
              <div className="fg">
                <label>{_t('charge')} (₺)</label>
                <input type="number" value={form.total} onChange={e => set('total', e.target.value)} placeholder="0" required/>
              </div>
              <div className="fg full">
                <label>{_t('items')}</label>
                <input value={form.items} onChange={e => set('items', e.target.value)} placeholder={language === 'tr' ? '3 Gömlek, 2 Pantolon...' : '3 Shirts, 2 Trousers...'} required/>
              </div>
              <div className="fg">
                <label>{_t('express')}</label>
                <button type="button" className={`toggle-btn ${form.urgent ? 'on' : ''}`} onClick={() => set('urgent', !form.urgent)}>
                  {form.urgent ? `⚡ ${_t('express')}` : language === 'tr' ? 'Normal Sipariş' : 'Normal Order'}
                </button>
              </div>
            </div>
            <div className="form-foot">
              <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>{_c('cancel')}</button>
              <button type="submit" className="btn-primary">{_c('save')}</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="lnd-table-wrap">
        <table className="lnd-table">
          <thead>
            <tr>
              <th>{language === 'tr' ? 'Sipariş' : 'Order'}</th>
              <th>{_t('roomNo')} / {_t('guestName')}</th>
              <th>{_t('items')}</th>
              <th>{_t('charge')}</th>
              <th>{_t('status')}</th>
              <th>{_c('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {laundryOrders.map((o, i) => {
              const stKey = o.status in STATUS_MAP ? o.status : 'bekliyor';
              const st = STATUS_MAP[stKey];
              const itemLabel = Array.isArray(o.items) ? o.items.map(i => `${i.qty}× ${i.name}`).join(', ') : o.items;
              return (
                <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <td>
                    <div>
                      <span className="oid">{o.id}</span>
                      {o.urgent && <span className="urgent-tag">⚡ {_t('express')}</span>}
                    </div>
                  </td>
                  <td><div><strong>{o.room}</strong><span>{o.guest}</span></div></td>
                  <td>{itemLabel}</td>
                  <td><strong>₺{o.total.toLocaleString()}</strong></td>
                  <td><span className="status-tag" style={{ background: st.bg, color: st.color }}>{st.label}</span></td>
                  <td>
                    <div className="act-btns">
                      {o.status === 'bekliyor'  && <button className="mb blue"   onClick={() => updateLaundryOrder(o.id, { status: 'yıkanıyor' })}>{_t('pickup')}</button>}
                      {o.status === 'yıkanıyor' && <button className="mb green"  onClick={() => updateLaundryOrder(o.id, { status: 'hazır' })}>{_t('ready')}</button>}
                      {o.status === 'hazır'     && <button className="mb purple" onClick={() => updateLaundryOrder(o.id, { status: 'teslim' })}><Truck size={12}/> {_t('delivery')}</button>}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .lnd-page{padding:28px;display:flex;flex-direction:column;gap:18px;}
        .lnd-head{display:flex;justify-content:space-between;align-items:flex-start;}
        .lnd-head h2{font-size:22px;font-weight:800;color:#1e293b;display:flex;align-items:center;gap:10px;}
        .lnd-head span{font-size:13px;color:#94a3b8;}
        .btn-primary{padding:10px 18px;border-radius:12px;border:none;background:#3b82f6;color:white;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;}
        .lnd-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .lk{background:white;border-radius:14px;border:1px solid #e2e8f0;padding:18px;text-align:center;}
        .lk strong{display:block;font-size:26px;font-weight:900;margin-bottom:4px;}
        .lk span{font-size:12px;color:#94a3b8;font-weight:700;}
        .form-card{background:white;border-radius:16px;border:1px solid #e2e8f0;padding:22px;}
        .form-card h3{font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px;}
        .fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .fg{display:flex;flex-direction:column;gap:6px;}
        .fg.full{grid-column:1/-1;}
        .fg label{font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;}
        .fg input,.fg select{padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;}
        .toggle-btn{padding:10px 14px;border-radius:10px;border:1.5px solid #e2e8f0;background:white;font-size:13px;font-weight:700;cursor:pointer;text-align:left;}
        .toggle-btn.on{background:#fffbeb;border-color:#f59e0b;color:#b45309;}
        .form-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:14px;}
        .btn-cancel{padding:10px 18px;border-radius:10px;border:1px solid #e2e8f0;background:white;font-weight:700;cursor:pointer;}
        .lnd-table-wrap{background:white;border-radius:18px;border:1px solid #e2e8f0;overflow:hidden;}
        .lnd-table{width:100%;border-collapse:collapse;}
        .lnd-table thead{background:#f8fafc;}
        .lnd-table th{text-align:left;padding:12px 16px;font-size:11px;color:#94a3b8;text-transform:uppercase;font-weight:800;}
        .lnd-table td{padding:14px 16px;font-size:13px;color:#475569;border-bottom:1px solid #f8fafc;vertical-align:middle;}
        .lnd-table td strong{display:block;color:#1e293b;font-weight:700;}
        .lnd-table td span{font-size:11px;color:#94a3b8;}
        .lnd-table tr:last-child td{border-bottom:none;}
        .oid{font-family:monospace;font-size:11px;background:#f1f5f9;padding:3px 8px;border-radius:6px;font-weight:700;color:#64748b;margin-right:8px;}
        .urgent-tag{font-size:10px;font-weight:800;color:#b45309;background:#fffbeb;padding:2px 8px;border-radius:20px;}
        .status-tag{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;}
        .act-btns{display:flex;gap:6px;}
        .mb{padding:6px 12px;border-radius:8px;border:none;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;}
        .mb.blue{background:#eff6ff;color:#3b82f6;}
        .mb.green{background:#ecfdf5;color:#10b981;}
        .mb.purple{background:#f5f3ff;color:#8b5cf6;}
      `}</style>
    </div>
  );
};

export default Laundry;
