import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { Bell, User, LogOut, Search, X, CheckCircle, AlertCircle, Activity, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ user, activeModuleName, onLogout, onBack }) => {
  const { notifications, stats } = useHotel();
  const [showNotifs, setShowNotifs] = useState(false);
  const [search, setSearch] = useState('');

  const unread = notifications.filter(n => n.type === 'warn').length;

  return (
    <header className="hub-header">
      <div className="header-left">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            ← <span>Hub</span>
          </button>
        )}
        <div className="app-branding">
          <h2>{activeModuleName || 'Hotel ERP — Operasyon Merkezi'}</h2>
          {!activeModuleName && <span>Tüm modüller erişilebilir</span>}
        </div>
      </div>

      <div className="header-right">
        {/* Stats pills - only on hub */}
        {!activeModuleName && (
          <div className="quick-stats">
            <div className="qs-pill blue">%{stats.occupancyRate} Doluluk</div>
            <div className="qs-pill green">{stats.inHouse} İç Misafir</div>
            {stats.totalBalance > 0 && <div className="qs-pill red">₺{(stats.totalBalance/1000).toFixed(1)}K Bakiye</div>}
          </div>
        )}

        {/* Search */}
        <div className={`search-bar ${search ? 'focused' : ''}`}>
          <Search size={16} color="#94a3b8"/>
          <input
            type="text"
            placeholder="Modül veya misafir ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch('')}><X size={14}/></button>}
        </div>

        {/* Bell */}
        <div className="notif-wrapper">
          <button className="icon-btn" onClick={() => setShowNotifs(!showNotifs)}>
            <Bell size={20}/>
            {unread > 0 && <span className="badge">{unread}</span>}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                className="notif-panel"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
              >
                <div className="np-head">
                  <strong>Bildirimler</strong>
                  <button onClick={() => setShowNotifs(false)}><X size={16}/></button>
                </div>
                <div className="np-list">
                  {notifications.slice(0, 12).map(n => (
                    <div key={n.id} className={`np-item ${n.type}`}>
                      <div className="np-icon">
                        {n.type === 'success' && <CheckCircle size={14}/>}
                        {n.type === 'warn'    && <AlertCircle size={14}/>}
                        {n.type === 'info'   && <Activity size={14}/>}
                      </div>
                      <div className="np-body">
                        <span>{n.msg}</span>
                        <small>{n.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="user-profile">
          <div className="user-info">
            <strong>{user?.username || 'Admin'}</strong>
            <span>Süper Yönetici</span>
          </div>
          <div className="avatar">{(user?.username || 'A')[0].toUpperCase()}</div>
          <button className="logout-btn" onClick={onLogout} title="Çıkış Yap">
            <LogOut size={16}/>
          </button>
        </div>
      </div>

      <style>{`
        .hub-header {
          height: 66px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          gap: 16px;
        }

        .header-left { display: flex; align-items: center; gap: 16px; min-width: 0; }
        .back-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; white-space: nowrap; }
        .back-btn:hover { background: #f1f5f9; }
        .app-branding h2 { font-size: 17px; font-weight: 800; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .app-branding span { font-size: 11px; color: #94a3b8; font-weight: 600; }

        .header-right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

        .quick-stats { display: flex; gap: 8px; }
        .qs-pill { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; }
        .qs-pill.blue  { background: #eff6ff; color: #3b82f6; }
        .qs-pill.green { background: #f0fdf4; color: #10b981; }
        .qs-pill.red   { background: #fef2f2; color: #ef4444; }

        .search-bar { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1.5px solid #e2e8f0; padding: 9px 14px; border-radius: 12px; transition: 0.2s; }
        .search-bar.focused { border-color: #3b82f6; background: white; }
        .search-bar input { border: none; background: transparent; outline: none; font-size: 13px; color: #475569; width: 200px; }
        .search-bar button { background: transparent; border: none; color: #94a3b8; cursor: pointer; display: flex; }

        .notif-wrapper { position: relative; }
        .icon-btn { position: relative; background: #f8fafc; border: 1.5px solid #e2e8f0; color: #64748b; cursor: pointer; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .icon-btn:hover { background: #f1f5f9; }
        .badge { position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; font-size: 10px; font-weight: 900; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }

        .notif-panel { position: absolute; top: 50px; right: 0; width: 340px; background: white; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.15); z-index: 200; overflow: hidden; }
        .np-head { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
        .np-head strong { font-size: 15px; font-weight: 800; color: #1e293b; }
        .np-head button { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        .np-list { max-height: 360px; overflow-y: auto; padding: 8px; }
        .np-item { display: flex; align-items: flex-start; gap: 10px; padding: 11px 12px; border-radius: 12px; margin-bottom: 4px; }
        .np-item.success { background: #f0fdf4; }
        .np-item.warn    { background: #fffbeb; }
        .np-item.info    { background: #eff6ff; }
        .np-icon { margin-top: 2px; flex-shrink: 0; }
        .np-item.success .np-icon { color: #10b981; }
        .np-item.warn    .np-icon { color: #f59e0b; }
        .np-item.info    .np-icon { color: #3b82f6; }
        .np-body span { font-size: 12px; font-weight: 600; color: #1e293b; display: block; }
        .np-body small { font-size: 10px; color: #94a3b8; }

        .user-profile { display: flex; align-items: center; gap: 10px; }
        .user-info { text-align: right; }
        .user-info strong { display: block; font-size: 13px; font-weight: 700; color: #1e293b; }
        .user-info span { font-size: 11px; color: #94a3b8; }
        .avatar { width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 15px; }
        .logout-btn { background: #fef2f2; border: none; color: #ef4444; cursor: pointer; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .logout-btn:hover { background: #fee2e2; }
      `}</style>
    </header>
  );
};

export default Header;
