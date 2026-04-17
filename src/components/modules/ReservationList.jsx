import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import {
  Search, Plus, Download,
  LogIn, LogOut, MoreVertical
} from 'lucide-react';

const CHANNEL_COLORS = {
  'Booking.com': '#003580',
  'Expedia':     '#ef4444',
  'Direkt':      '#10b981',
  'HotelRunner': '#f59e0b',
  'TUI':         '#8b5cf6',
};

const ReservationList = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('resList.' + k);
  const _c = (k) => mt('common.' + k);
  const { reservations, checkIn, checkOut } = useHotel();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey] = useState('checkIn');

  const STATUS_MAP = {
    'check-in':  { label: _t('statusIn'),        color: '#10b981', bg: '#f0fdf4' },
    'check-out': { label: _t('statusOut'),        color: '#64748b', bg: '#f8fafc' },
    'gelecek':   { label: _t('statusFuture'),     color: '#3b82f6', bg: '#eff6ff' },
    'iptal':     { label: _t('statusCancelled'),  color: '#ef4444', bg: '#fef2f2' },
  };

  const FILTERS = [
    { key: 'all',       label: _t('filterAll'),      count: reservations.length },
    { key: 'check-in',  label: _t('filterInHouse'),  count: reservations.filter(r => r.status === 'check-in').length },
    { key: 'gelecek',   label: _t('filterArrivals'), count: reservations.filter(r => r.status === 'gelecek').length },
    { key: 'check-out', label: _t('filterDeparture'),count: reservations.filter(r => r.status === 'check-out').length },
    { key: 'iptal',     label: _t('statusCancelled'),count: reservations.filter(r => r.status === 'iptal').length },
  ];

  const filtered = reservations
    .filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.guest.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || (r.room || '').includes(q);
      const matchStatus = filterStatus === 'all' || r.status === filterStatus;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => (a[sortKey] || '').localeCompare(b[sortKey] || ''));

  return (
    <div className="rl-container">
      {/* Header */}
      <div className="rl-header">
        <div>
          <h2>{_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
        <div className="rl-actions">
          <button className="btn-outline"><Download size={16}/> {_c('export')}</button>
          <button className="btn-primary"><Plus size={16}/> {_t('newRes')}</button>
        </div>
      </div>

      {/* Filters */}
      <div className="rl-filters">
        <div className="search-box">
          <Search size={16} color="#94a3b8"/>
          <input
            type="text"
            placeholder={_c('search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="status-filters">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`tab-btn ${filterStatus === f.key ? 'active' : ''}`}
              onClick={() => setFilterStatus(f.key)}
            >
              {f.label}
              <span className="tab-count">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rl-table-wrap">
        <table className="rl-table">
          <thead>
            <tr>
              <th onClick={() => setSortKey('id')}>{_t('colId')}</th>
              <th onClick={() => setSortKey('guest')}>{_t('colGuest')}</th>
              <th>{_t('colRoom')}</th>
              <th onClick={() => setSortKey('checkIn')}>{_c('checkIn')}</th>
              <th onClick={() => setSortKey('checkOut')}>{_c('checkOut')}</th>
              <th>{_t('colNights')}</th>
              <th>{_t('colChannel')}</th>
              <th>{_t('colTotal')}</th>
              <th>{_t('colBalance')}</th>
              <th>{_t('colStatus')}</th>
              <th>{_c('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const st = STATUS_MAP[r.status] || STATUS_MAP.gelecek;
              return (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <td><span className="res-id">{r.id}</span></td>
                  <td>
                    <div className="guest-cell">
                      <div className="guest-avatar">{r.guest[0]}</div>
                      <div>
                        <strong>{r.guest}</strong>
                        <span>{r.pax} {_c('persons')}</span>
                      </div>
                    </div>
                  </td>
                  <td>{r.room ? <span className="room-tag">{r.room}</span> : <span className="no-room">{_c('noData')}</span>}</td>
                  <td>{r.checkIn}</td>
                  <td>{r.checkOut}</td>
                  <td><strong>{r.nights}</strong></td>
                  <td>
                    <span className="channel-dot" style={{ background: CHANNEL_COLORS[r.channel] || '#94a3b8' }}/>
                    {r.channel}
                  </td>
                  <td><strong>₺{r.total.toLocaleString()}</strong></td>
                  <td>
                    {r.balance > 0
                      ? <span className="bal-due">₺{r.balance.toLocaleString()}</span>
                      : <span className="bal-ok">{_c('closed')}</span>}
                  </td>
                  <td>
                    <span className="status-pill" style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      {r.status === 'gelecek' && (
                        <button className="act-btn green" onClick={() => checkIn(r.id)}>
                          <LogIn size={14}/> {_c('checkIn')}
                        </button>
                      )}
                      {r.status === 'check-in' && (
                        <button className="act-btn red" onClick={() => checkOut(r.id)}>
                          <LogOut size={14}/> {_c('checkOut')}
                        </button>
                      )}
                      <button className="act-icon"><MoreVertical size={15}/></button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rl-footer">
        <span>{filtered.length} {language === 'tr' ? 'rezervasyon' : 'reservations'}</span>
        <span>1 / 1</span>
      </div>

      <style>{`
        .rl-container { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .rl-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .rl-header h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .rl-header span { font-size: 14px; color: #94a3b8; }
        .rl-actions { display: flex; gap: 12px; }
        .btn-outline { padding: 10px 18px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: white; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #475569; }
        .btn-primary { padding: 10px 18px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .rl-filters { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1.5px solid #e2e8f0; padding: 10px 16px; border-radius: 12px; min-width: 300px; }
        .search-box input { border: none; outline: none; font-size: 13px; color: #475569; background: transparent; width: 100%; }
        .status-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .tab-btn { padding: 9px 16px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: 0.2s; }
        .tab-btn.active { background: #1e293b; color: white; border-color: #1e293b; }
        .tab-count { background: #f1f5f9; color: #64748b; padding: 1px 6px; border-radius: 10px; font-size: 11px; }
        .tab-btn.active .tab-count { background: rgba(255,255,255,0.2); color: white; }
        .rl-table-wrap { background: white; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; }
        .rl-table { width: 100%; border-collapse: collapse; }
        .rl-table thead { background: #f8fafc; }
        .rl-table th { text-align: left; padding: 14px 16px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 800; cursor: pointer; white-space: nowrap; }
        .rl-table th:hover { color: #3b82f6; }
        .rl-table td { padding: 16px; font-size: 13px; color: #475569; border-bottom: 1px solid #f8fafc; vertical-align: middle; }
        .rl-table tr:last-child td { border-bottom: none; }
        .rl-table tr:hover td { background: #fafbfc; }
        .res-id { font-family: monospace; font-size: 12px; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 3px 8px; border-radius: 6px; }
        .guest-cell { display: flex; align-items: center; gap: 10px; }
        .guest-avatar { width: 34px; height: 34px; background: #eff6ff; color: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 14px; flex-shrink: 0; }
        .guest-cell strong { display: block; color: #1e293b; font-weight: 700; }
        .guest-cell span { font-size: 11px; color: #94a3b8; }
        .room-tag { background: #f1f5f9; color: #1e293b; font-weight: 800; padding: 4px 10px; border-radius: 8px; font-size: 13px; }
        .no-room { font-size: 11px; color: #cbd5e1; font-style: italic; }
        .channel-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
        .bal-due { color: #ef4444; font-weight: 700; }
        .bal-ok  { color: #10b981; font-weight: 700; }
        .status-pill { padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; white-space: nowrap; }
        .action-btns { display: flex; align-items: center; gap: 8px; }
        .act-btn { padding: 6px 12px; border-radius: 8px; border: none; font-size: 11px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .act-btn.green { background: #ecfdf5; color: #10b981; }
        .act-btn.red   { background: #fef2f2; color: #ef4444; }
        .act-icon { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        .rl-footer { display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; font-weight: 600; padding: 0 4px; }
      `}</style>
    </div>
  );
};

export default ReservationList;
