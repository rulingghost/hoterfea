import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import {
  Settings, Search, X, ChevronDown, ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeModule, onSelectModule, modules }) => {
  const { stats, reservations, tasks } = useHotel();
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState({});

  const pendingCI = reservations.filter(r=>r.status==='gelecek').length;
  const pendingCO = reservations.filter(r=>r.status==='check-in').length;
  const openTasks = tasks.filter(t=>t.status!=='bitti').length;
  const openBalance = reservations.filter(r=>r.status==='check-in'&&r.balance>0).length;

  const BADGES = {
    'front-office':   pendingCI > 0 ? pendingCI : null,
    'checkout':       pendingCO > 0 ? pendingCO : null,
    'housekeeping':   openTasks > 0 ? openTasks : null,
    'folio':          openBalance > 0 ? openBalance : null,
    'kbs':            2, // static demo
  };

  const filteredModules = search
    ? modules.filter(m => 
        m.name.toLowerCase().includes(search.toLowerCase()) || 
        (m.keywords && m.keywords.some(k => k.toLowerCase().includes(search.toLowerCase())))
      )
    : modules;

  const groupedModules = filteredModules.reduce((acc, mod) => {
    const cat = mod.category || 'Diğer';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(mod);
    return acc;
  }, {});

  const isExpanded = (cat) => {
    if (search) return true;
    if (groupedModules[cat]?.some(m => m.id === activeModule)) return true;
    return expandedCats[cat] || false;
  };

  const toggleCat = (cat) => {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className="hub-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-box">H</div>
        <div>
          <strong>HOTERFEA</strong>
        </div>
      </div>

      {/* Live Stats strip */}
      <div className="live-strip">
        <div className="ls-item">
          <span>Doluluk</span>
          <strong style={{color:'#3b82f6'}}>%{stats.occupancyRate}</strong>
        </div>
        <div className="ls-div"/>
        <div className="ls-item">
          <span>İçeride</span>
          <strong style={{color:'#10b981'}}>{stats.inHouse}</strong>
        </div>
        <div className="ls-div"/>
        <div className="ls-item">
          <span>Görev</span>
          <strong style={{color: openTasks > 0 ? '#f59e0b' : '#10b981'}}>{openTasks}</strong>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* All modules under headers */}
        <div className="nav-group mt-16">
          <div className="all-mod-head">
            <label>MODÜLLER</label>
            <button className="search-toggle" onClick={()=>{ setSearchOpen(!searchOpen); setSearch(''); }}>
              {searchOpen ? <X size={13}/> : <Search size={13}/>}
            </button>
          </div>
          {searchOpen && (
            <input
              className="mod-search"
              placeholder="Modül veya özellik ara..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
              autoFocus
            />
          )}

          <div className="scroll-area">
            {Object.keys(groupedModules).map(cat => (
              <div key={cat} className="accordion-group">
                <button className="accordion-header" onClick={() => toggleCat(cat)}>
                  <span className="cat-name">{cat}</span>
                  {isExpanded(cat) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isExpanded(cat) && (
                  <div className="accordion-content">
                    {groupedModules[cat].map(module => (
                      <button
                        key={module.id}
                        className={`nav-item mini ${activeModule === module.id ? 'active' : ''}`}
                        onClick={() => onSelectModule(module.id)}
                      >
                        <div className="mini-icon" style={{ color: activeModule === module.id ? 'white' : module.color }}>
                          {React.cloneElement(module.icon, { size: 14 })}
                        </div>
                        <span>{module.name}</span>
                        {BADGES[module.id] && (
                          <span className="nav-badge red">{BADGES[module.id]}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {filteredModules.length === 0 && (
              <div className="no-mod">Hiçbir sonuç bulunamadı.</div>
            )}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={()=>onSelectModule('system-admin')}><Settings size={16}/><span>Sistem Ayarları</span></button>
      </div>

      <style>{`
        .hub-sidebar {
          width: 260px;
          background: #0f172a;
          height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
          position: sticky;
          top: 0;
          flex-shrink: 0;
        }

        .sidebar-logo { padding: 20px 20px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .logo-box { width: 38px; height: 38px; background: linear-gradient(135deg,#3b82f6,#8b5cf6); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 18px; flex-shrink: 0; }
        .sidebar-logo strong { font-size: 14px; font-weight: 900; letter-spacing: 1.5px; display: block; }
        .logo-sub { font-size: 10px; color: #64748b; font-weight: 700; margin-top: 2px; }

        .live-strip { display: flex; align-items: center; justify-content: space-around; padding: 10px 16px; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ls-item { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .ls-item span { font-size: 9px; color: #64748b; font-weight: 700; text-transform: uppercase; }
        .ls-item strong { font-size: 16px; font-weight: 900; }
        .ls-div { width: 1px; height: 24px; background: rgba(255,255,255,0.08); }

        .sidebar-nav { flex: 1; padding: 14px 12px; overflow: hidden; display: flex; flex-direction: column; gap: 0; }
        .nav-group { display: flex; flex-direction: column; height: 100%; }
        .nav-group label { display: block; font-size: 9px; font-weight: 800; color: #475569; margin-bottom: 8px; letter-spacing: 1.5px; padding: 0 6px; }
        
        .all-mod-head { display: flex; justify-content: space-between; align-items: center; padding: 0 6px; margin-bottom: 8px; }
        .all-mod-head label { margin: 0; }
        .search-toggle { background: transparent; border: none; color: #64748b; cursor: pointer; padding: 4px; display: flex; }
        .search-toggle:hover { color: white; }
        .mod-search { width: 100%; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.07); border-radius: 8px; color: white; font-size: 12px; outline: none; margin-bottom: 8px; }
        .mod-search::placeholder { color: #64748b; }

        .accordion-group { margin-bottom: 6px; }
        .accordion-header {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 8px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.03);
          color: #94a3b8; font-size: 11px; font-weight: 700; cursor: pointer; border-radius: 8px; margin-bottom: 4px;
          transition: all 0.2s;
        }
        .accordion-header:hover { background: rgba(255,255,255,0.08); color: white; }
        .cat-name { text-transform: uppercase; letter-spacing: 0.5px; }
        .accordion-content { display: flex; flex-direction: column; gap: 2px; padding-left: 6px; }

        .nav-item {
          width: 100%; display: flex; align-items: center; gap: 10px; padding: 9px 10px;
          background: transparent; border: none; color: #94a3b8; border-radius: 8px;
          cursor: pointer; transition: 0.15s; font-size: 13px; font-weight: 600;
          text-align: left; position: relative;
        }
        .nav-item:hover { background: rgba(255,255,255,0.06); color: white; }
        .nav-item.active { background: #3b82f6; color: white; }

        .ni-icon { width: 20px; display: flex; justify-content: center; flex-shrink: 0; }
        .nav-item span { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .nav-badge { background: #ef4444; color: white; font-size: 10px; font-weight: 900; padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center; flex-shrink: 0; }
        .nav-badge:not(.red) { background: #3b82f6; }

        .nav-item.mini { padding: 7px 10px; font-size: 13px; margin-bottom: 1px; color: #cbd5e1; }
        .nav-item.mini.active { font-weight: 700; color: white; }
        .mini-icon { width: 18px; display: flex; justify-content: center; flex-shrink: 0; }

        .scroll-area { flex: 1; overflow-y: auto; padding-right: 4px; }
        .scroll-area::-webkit-scrollbar { width: 4px; }
        .scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .scroll-area::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

        .no-mod { text-align: center; padding: 20px 0; color: #475569; font-size: 12px; }

        .mt-16 { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        .sidebar-footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>
    </aside>
  );
};

export default Sidebar;

