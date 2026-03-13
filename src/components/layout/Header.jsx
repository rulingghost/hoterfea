import React from 'react';
import { User, LogOut, Settings, Bell } from 'lucide-react';

const Header = ({ user, activeModuleName, onLogout, onBack }) => {
  return (
    <header className="hub-header">
      <div className="header-left">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <Settings size={18} style={{ transform: 'rotate(180deg)' }} /> 
            <span>Hub'a Dön</span>
          </button>
        )}
        <div className="app-branding">
          <h2>{activeModuleName || 'Main Hub'}</h2>
          {!activeModuleName && <span>Otel Operasyon Merkezi</span>}
        </div>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Modül veya veri ara..." />
        </div>
        <button className="icon-btn"><Bell size={20} /></button>
        <div className="user-profile">
          <div className="user-info">
            <strong>{user?.username || 'Gökhan E.'}</strong>
            <span>Genel Müdür</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-dropdown">
             <button onClick={onLogout} className="logout-btn">
                <LogOut size={16} /> Çıkış Yap
             </button>
          </div>
        </div>
      </div>

      <style>{`
        .hub-header {
          height: 70px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left { display: flex; align-items: center; gap: 20px; }
        .app-branding h2 { font-size: 20px; font-weight: 800; color: #1e293b; }
        .app-branding span { font-size: 12px; color: #94a3b8; font-weight: 600; }

        .header-right { display: flex; align-items: center; gap: 20px; }
        .search-bar input {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 10px 20px;
          border-radius: 10px;
          width: 300px;
          font-size: 13px;
          outline: none;
        }

        .icon-btn {
          background: transparent; border: none; color: #64748b; cursor: pointer;
        }

        .user-profile {
          display: flex; align-items: center; gap: 12px; padding: 5px 15px; border-radius: 12px; cursor: pointer; position: relative;
        }
        .user-profile:hover { background: #f8fafc; }
        .user-info { text-align: right; }
        .user-info strong { display: block; font-size: 13px; color: #1e293b; }
        .user-info span { font-size: 11px; color: #94a3b8; font-weight: 600; }
        .avatar { width: 36px; height: 36px; background: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; }

        .logout-btn {
          display: flex; align-items: center; gap: 8px; color: #ef4444; background: transparent; border: none; font-size: 13px; font-weight: 700; cursor: pointer; width: 100%; padding: 10px;
        }
      `}</style>
    </header>
  );
};

export default Header;
