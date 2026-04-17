import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, CheckCircle, AlertCircle } from 'lucide-react';

const RoomRack = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('roomRack.' + k);
  const _c = (k) => mt('common.' + k);
  const { rooms, updateRoomStatus, stats } = useHotel();
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const STATUS_COLORS = {
    dolu:    { bg: '#3b82f6', text: 'white', label: _t('occupied') },
    boş:     { bg: '#10b981', text: 'white', label: _t('vacant')   },
    arızalı: { bg: '#ef4444', text: 'white', label: _t('ooo')      },
    kirli:   { bg: '#f59e0b', text: 'white', label: _t('dirty')    },
  };

  const FILTERS = [
    { key: 'all',     label: _c('all') },
    { key: 'dolu',    label: _t('occupied') },
    { key: 'boş',     label: _t('vacant') },
    { key: 'arızalı', label: _t('ooo') },
    { key: 'kirli',   label: _t('dirty') },
  ];

  const floors = [...new Set(rooms.map(r => r.floor))].sort();
  const filtered = filterStatus === 'all' ? rooms : rooms.filter(r => r.status === filterStatus || r.clean === filterStatus);

  const RoomCard = ({ room, onClick }) => {
    const s = STATUS_COLORS[room.status] || STATUS_COLORS.boş;
    const cleanColor = room.clean === 'temiz' ? '#10b981' : '#f59e0b';
    return (
      <motion.div
        className="room-card"
        style={{ borderColor: s.bg, borderTopColor: s.bg }}
        onClick={() => onClick(room)}
        whileHover={{ scale: 1.04, y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="room-number">{room.id}</div>
        <div className="room-type">{room.type}</div>
        <div className="room-status-dot" style={{ background: s.bg }}>{s.label}</div>
        {room.guest && <div className="room-guest">{room.guest.split(' ')[0]}</div>}
        <div className="room-clean-dot" style={{ background: cleanColor }} title={room.clean}/>
      </motion.div>
    );
  };

  const RoomDetailModal = ({ room, onClose, onUpdateStatus }) => {
    const [newStatus, setNewStatus] = useState(room.status);
    const [newClean, setNewClean] = useState(room.clean);
    const save = () => { onUpdateStatus(room.id, { status: newStatus, clean: newClean }); onClose(); };

    return (
      <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="room-modal" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
          <div className="modal-header">
            <h3>{_c('room')} {room.id} — {room.type}</h3>
            <button onClick={onClose}><X size={20}/></button>
          </div>
          <div className="modal-body">
            {room.guest && (
              <div className="guest-info">
                <User size={16} color="#3b82f6"/>
                <div>
                  <strong>{room.guest}</strong>
                  <span>{room.checkIn} → {room.checkOut} · {room.pax} {_c('persons')}</span>
                </div>
              </div>
            )}
            <div className="form-group">
              <label>{_t('changeStatus')}</label>
              <div className="btn-group">
                {['dolu', 'boş', 'arızalı'].map(s => (
                  <button key={s} className={`status-btn ${newStatus === s ? 'active-' + s : ''}`} onClick={() => setNewStatus(s)}>
                    {STATUS_COLORS[s]?.label || s}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>{language === 'tr' ? 'Temizlik Durumu' : 'Cleaning Status'}</label>
              <div className="btn-group">
                <button className={`clean-btn ${newClean === 'temiz' ? 'active' : ''}`} onClick={() => setNewClean('temiz')}>
                  <CheckCircle size={14}/> {_t('clean')}
                </button>
                <button className={`clean-btn ${newClean === 'kirli' ? 'active' : ''}`} onClick={() => setNewClean('kirli')}>
                  <AlertCircle size={14}/> {_t('dirty')}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={onClose}>{_c('cancel')}</button>
            <button className="btn-save" onClick={save}>{_c('save')}</button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="rack-container">
      {/* Header */}
      <div className="rack-header">
        <div>
          <h2>{_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
        <div className="rack-stats">
          {[
            { label: _t('occupied'),   count: stats.occupied,   color: '#3b82f6' },
            { label: _t('vacant'),     count: stats.vacant,     color: '#10b981' },
            { label: _t('dirty'),      count: stats.dirty,      color: '#f59e0b' },
            { label: _t('ooo'),        count: stats.outOfOrder, color: '#ef4444' },
          ].map((s, i) => (
            <div key={i} className="rack-stat">
              <div className="rs-num" style={{ color: s.color }}>{s.count}</div>
              <div className="rs-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button key={f.key} className={`filter-btn ${filterStatus === f.key ? 'active' : ''}`} onClick={() => setFilterStatus(f.key)}>
            {f.label}
          </button>
        ))}
        <div className="occ-pill">%{stats.occupancyRate} {_c('status')}</div>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="leg-item"><div className="leg-dot" style={{ background: '#3b82f6' }}/> {_t('occupied')}</div>
        <div className="leg-item"><div className="leg-dot" style={{ background: '#10b981' }}/> {_t('vacant')} ({_t('clean')})</div>
        <div className="leg-item"><div className="leg-dot" style={{ background: '#f59e0b' }}/> {_t('vacant')} ({_t('dirty')})</div>
        <div className="leg-item"><div className="leg-dot" style={{ background: '#ef4444' }}/> {_t('ooo')}</div>
      </div>

      {/* Grid per floor */}
      {floors.map(floor => (
        <div key={floor} className="floor-section">
          <div className="floor-label">{floor}. {language === 'tr' ? 'Kat' : 'Floor'}</div>
          <div className="rooms-grid">
            {filtered.filter(r => r.floor === floor).map(room => (
              <RoomCard key={room.id} room={room} onClick={setSelected}/>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <RoomDetailModal room={selected} onClose={() => setSelected(null)} onUpdateStatus={updateRoomStatus}/>
        )}
      </AnimatePresence>

      <style>{`
        .rack-container { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .rack-header { display: flex; justify-content: space-between; align-items: center; }
        .rack-header h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .rack-header span { font-size: 14px; color: #94a3b8; }
        .rack-stats { display: flex; gap: 30px; }
        .rack-stat { text-align: center; }
        .rs-num { font-size: 28px; font-weight: 900; }
        .rs-lbl { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .filter-bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .filter-btn { padding: 8px 18px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: 0.2s; }
        .filter-btn.active, .filter-btn:hover { background: #1e293b; color: white; border-color: #1e293b; }
        .occ-pill { margin-left: auto; background: #eff6ff; color: #3b82f6; padding: 8px 20px; border-radius: 20px; font-weight: 800; font-size: 14px; }
        .legend { display: flex; gap: 20px; padding: 14px 18px; background: white; border-radius: 14px; border: 1px solid #e2e8f0; flex-wrap: wrap; }
        .leg-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; font-weight: 600; }
        .leg-dot { width: 12px; height: 12px; border-radius: 4px; }
        .floor-section { background: white; border-radius: 18px; border: 1px solid #e2e8f0; padding: 20px 25px; }
        .floor-label { font-size: 12px; font-weight: 900; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 15px; }
        .rooms-grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .room-card { width: 100px; min-height: 90px; background: white; border-radius: 12px; border: 2px solid #e2e8f0; border-top-width: 4px; padding: 10px 8px; cursor: pointer; position: relative; display: flex; flex-direction: column; gap: 4px; align-items: center; }
        .room-number { font-size: 18px; font-weight: 900; color: #1e293b; }
        .room-type { font-size: 9px; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
        .room-status-dot { font-size: 9px; font-weight: 800; color: white; padding: 2px 8px; border-radius: 20px; margin-top: 2px; }
        .room-guest { font-size: 10px; color: #64748b; font-weight: 700; }
        .room-clean-dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .room-modal { background: white; width: 420px; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.4); }
        .modal-header { padding: 24px 28px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .modal-header h3 { font-size: 20px; font-weight: 800; color: #1e293b; }
        .modal-header button { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        .modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; }
        .guest-info { display: flex; align-items: flex-start; gap: 12px; background: #eff6ff; padding: 16px; border-radius: 14px; }
        .guest-info strong { display: block; font-size: 15px; color: #1e293b; }
        .guest-info span { font-size: 12px; color: #64748b; }
        .form-group label { display: block; font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 10px; }
        .btn-group { display: flex; gap: 8px; }
        .status-btn, .clean-btn { padding: 10px 16px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 6px; }
        .active-dolu    { background: #3b82f6; color: white; border-color: #3b82f6; }
        .active-boş     { background: #10b981; color: white; border-color: #10b981; }
        .active-arızalı { background: #ef4444; color: white; border-color: #ef4444; }
        .clean-btn.active { background: #1e293b; color: white; border-color: #1e293b; }
        .modal-footer { padding: 16px 28px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 12px; }
        .btn-cancel { padding: 12px 24px; border-radius: 12px; border: 1px solid #e2e8f0; background: white; font-weight: 700; cursor: pointer; }
        .btn-save   { padding: 12px 28px; border-radius: 12px; border: none; background: #3b82f6; color: white; font-weight: 700; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default RoomRack;
