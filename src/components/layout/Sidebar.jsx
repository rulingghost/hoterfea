import React from 'react';
import { Home, LayoutGrid, Settings, HelpCircle, ChevronRight, Calculator } from 'lucide-react';

const Sidebar = ({ activeModule, onSelectModule, modules }) => {
  const quickAccess = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={18}/> },
    { id: 'room-rack', name: 'Oda Planı', icon: <LayoutGrid size={18}/> },
    { id: 'res-list', name: 'Rezervasyonlar', icon: <Calculator size={18}/> },
  ];

  return (
    <aside className="hub-sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">H</div>
        <strong>HOTEL ERP</strong>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          <label>HIZLI ERİŞİM</label>
          {quickAccess.map(item => (
            <button 
              key={item.id} 
              className={`nav-item ${activeModule === item.id ? 'active' : ''}`}
              onClick={() => onSelectModule(item.id)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="nav-group mt-20">
          <label>TÜM MODÜLLER</label>
          <div className="scroll-area">
            {modules.map(module => (
              <button 
                key={module.id} 
                className={`nav-item mini ${activeModule === module.id ? 'active' : ''}`}
                onClick={() => onSelectModule(module.id)}
              >
                <div className="mini-icon" style={{ color: module.color }}>{React.cloneElement(module.icon, { size: 14 })}</div>
                <span>{module.name}</span>
                <ChevronRight size={10} className="arrow" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item"><HelpCircle size={18}/> <span>Destek</span></button>
        <button className="nav-item"><Settings size={18}/> <span>Ayarlar</span></button>
      </div>

      <style>{`
        .hub-sidebar {
          width: 260px;
          background: #1e293b;
          height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
          position: sticky;
          top: 0;
        }

        .sidebar-logo {
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .logo-box {
          width: 36px; height: 36px; background: #3b82f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900;
        }
        .sidebar-logo strong { font-size: 16px; letter-spacing: 2px; }

        .sidebar-nav { flex: 1; padding: 20px; overflow: hidden; display: flex; flex-direction: column; }
        .nav-group label { display: block; font-size: 10px; font-weight: 800; color: #64748b; margin-bottom: 15px; letter-spacing: 1px; }

        .nav-item {
          width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 15px; background: transparent; border: none; color: #94a3b8; border-radius: 10px; cursor: pointer; transition: 0.2s; font-size: 13px; font-weight: 600; margin-bottom: 5px;
        }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
        .nav-item.active { background: #3b82f6; color: white; }

        .nav-item.mini { padding: 8px 12px; font-size: 12px; }
        .mini-icon { width: 20px; display: flex; justify-content: center; }
        .nav-item.mini .arrow { margin-left: auto; opacity: 0.3; }

        .scroll-area { flex: 1; overflow-y: auto; padding-right: 5px; }
        .scroll-area::-webkit-scrollbar { width: 4px; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </aside>
  );
};

export default Sidebar;
