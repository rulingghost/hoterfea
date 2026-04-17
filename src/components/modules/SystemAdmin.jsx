import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Search, Plus, X,
  Lock, Key, ShieldCheck,
  Activity, RefreshCw,
  Settings, Trash2, AlertTriangle
} from 'lucide-react';

const SystemAdmin = () => {
  const { mt, isEn } = useModuleTranslation();
  const { addNotification } = useHotel();
  const [showUserForm, setShowUserForm] = useState(false);
  const [logSearch, setLogSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const ROLES = isEn
    ? ['Receptionist', 'Accountant', 'Spa Manager', 'Technical Manager', 'Super Admin']
    : ['Resepsiyonist', 'Muhasebe', 'Spa Müdürü', 'Teknik Müdür', 'Süper Admin'];

  const [users, setUsers] = useState([
    { id:'U-001', name:'Admin Genel',           roleTr:'Süper Admin',    roleEn:'Super Admin',           permissions:['Panel','Reservations','POS','Channels','Building','HR'], active:true },
    { id:'U-002', name:'Resepsiyonist Ahmet',    roleTr:'Resepsiyonist',  roleEn:'Receptionist',          permissions:['Panel','Reservations'], active:true },
    { id:'U-003', name:'Muhasebe Yasin',         roleTr:'Muhasebe',       roleEn:'Accountant',            permissions:['Panel','POS','Finance'], active:true },
    { id:'U-004', name:'Spa Sedef',              roleTr:'Spa Müdürü',     roleEn:'Spa Manager',           permissions:['Panel','Spa'], active:true },
    { id:'U-005', name:'Teknik Kerim',           roleTr:'Teknik Müdür',   roleEn:'Technical Manager',     permissions:['Panel','Building','Energy'], active:false },
  ]);

  const [logs] = useState([
    { id:1, time:'09:41', date:'2026-03-29', user:'Manager_Elif',       module:'Rooms',             logTr:'Deluxe oda fiyatı $220 olarak güncellendi',          logEn:'Deluxe room rate updated to $220',         type:'update' },
    { id:2, time:'09:38', date:'2026-03-29', user:'Receptionist_Ahmet',  module:'Reservations',      logTr:'302 nolu oda rezervasyonu silindi',                   logEn:'Room 302 reservation deleted',             type:'delete' },
    { id:3, time:'09:01', date:'2026-03-29', user:'Accountant_Yasin',    module:'POS & Sales',       logTr:'$940 tutarında fatura kesildi #430',                  logEn:'Invoice #430 issued for $940',             type:'create' },
    { id:4, time:'08:57', date:'2026-03-29', user:'Technical_Kerim',     module:'Energy Management', logTr:'Havuz ısıtması 33°C → 29°C değiştirildi',            logEn:'Pool heating changed from 33°C → 29°C',   type:'update' },
    { id:5, time:'08:32', date:'2026-03-29', user:'Spa_Sedef',           module:'Spa & Wellness',    logTr:'Yeni üyelik oluşturuldu',                            logEn:'New membership created',                   type:'create' },
    { id:6, time:'07:50', date:'2026-03-29', user:'HR_Manager',          module:'Human Resources',   logTr:'Yeni personel kartı açıldı',                         logEn:'New employee record created',              type:'create' },
  ]);

  const [userForm, setUserForm] = useState({ name:'', role: isEn ? 'Receptionist' : 'Resepsiyonist' });
  const idCounter = React.useRef(5);

  const addUser = (e) => {
    e.preventDefault();
    idCounter.current++;
    const id = `U-${String(idCounter.current).padStart(3,'0')}`;
    setUsers(p => [...p, { ...userForm, roleTr: userForm.role, roleEn: userForm.role, id, permissions:['Panel'], active:true }]);
    addNotification({ type:'success', msg: isEn ? `New user created: ${userForm.name}` : `Yeni kullanıcı tanımlandı: ${userForm.name}` });
    setUserForm({ name:'', role: isEn ? 'Receptionist' : 'Resepsiyonist' });
    setShowUserForm(false);
  };

  const toggleUser = (id) => {
    const user = users.find(u => u.id === id);
    setUsers(p => p.map(u => u.id === id ? { ...u, active: !u.active } : u));
    addNotification({ type:'info', msg: isEn
      ? `User ${user?.active ? 'deactivated' : 'activated'}: ${user?.name}`
      : `Kullanıcı ${user?.active ? 'deaktif' : 'aktif'} edildi: ${user?.name}`
    });
  };

  const deleteUser = (id) => {
    const user = users.find(u => u.id === id);
    if(!window.confirm(isEn ? `Delete user "${user?.name}"?` : `"${user?.name}" kullanıcısını silmek istediğinize emin misiniz?`)) return;
    setUsers(p => p.filter(u => u.id !== id));
    addNotification({ type:'info', msg: isEn ? 'User deleted' : 'Kullanıcı silindi' });
  };

  const resetPassword = (name) => {
    addNotification({ type:'success', msg: isEn ? `Password reset: ${name}` : `Şifre sıfırlandı: ${name}` });
  };

  const [displayedLogs, setDisplayedLogs] = useState(logs);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      const newLog = {
        id: displayedLogs.length+1,
        time: new Date().toLocaleTimeString(isEn?'en-GB':'tr-TR', {hour:'2-digit',minute:'2-digit'}),
        date: new Date().toISOString().slice(0,10),
        user: 'System',
        module: 'Audit',
        logTr: 'Loglar yenilendi',
        logEn: 'Logs refreshed',
        type:'info'
      };
      setDisplayedLogs(p => [newLog, ...p]);
    }, 1000);
  };

  const filteredLogs = displayedLogs.filter(l => {
    if (!logSearch) return true;
    const q = logSearch.toLowerCase();
    return l.user.toLowerCase().includes(q)
      || l.module.toLowerCase().includes(q)
      || (isEn ? l.logEn : l.logTr).toLowerCase().includes(q);
  });

  const healthData = [
    { name: 'Server Load',      val: 72, status: isEn ? 'Normal'  : 'Normal'  },
    { name: 'Database Health',  val: 96, status: isEn ? 'Optimal' : 'Optimal' },
    { name: 'Disk Usage',       val: 54, status: isEn ? 'Normal'  : 'Normal'  },
  ];

  return (
    <div className="admin-container">
      <header className="header">
        <div className="title-section">
          <Shield size={32} className="icon-blue"/>
          <div>
            <h2>{isEn ? 'System Administration & Audit Logs' : 'Sistem Yönetimi & İşlem Günlüğü'}</h2>
            <span>{isEn ? 'User authorization, activity logs and security monitoring' : 'Sistem yetkilendirme, işlem günlükleri ve siber güvenlik izleme'}</span>
          </div>
        </div>
        <div className="actions">
          <button className="btn outline" onClick={()=>setShowUserForm(true)}><Plus size={18}/> {isEn ? 'NEW USER' : 'YENİ KULLANICI'}</button>
          <button className="btn primary red" onClick={handleRefresh}>
            <RefreshCw size={16} className={refreshing ? 'spin' : ''}/>
            {refreshing ? (isEn?'REFRESHING...':'YENİLENİYOR...') : (isEn?'REFRESH LOGS':'LOG YENİLE')}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {showUserForm && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setShowUserForm(false)}>
            <motion.form className="modal-box" initial={{scale:0.9}} animate={{scale:1}} onClick={e=>e.stopPropagation()} onSubmit={addUser}>
              <div className="mb-head">
                <h3>{isEn ? 'Create New User' : 'Yeni Kullanıcı Tanımla'}</h3>
                <button type="button" onClick={()=>setShowUserForm(false)}><X size={18}/></button>
              </div>
              <div className="uf-grid">
                <div className="uf">
                  <label>{isEn ? 'Full Name *' : 'Ad Soyad *'}</label>
                  <input value={userForm.name} onChange={e=>setUserForm(p=>({...p,name:e.target.value}))} placeholder={isEn ? 'Username' : 'Kullanıcı adı'} required/>
                </div>
                <div className="uf">
                  <label>{isEn ? 'Role' : 'Rol'}</label>
                  <select value={userForm.role} onChange={e=>setUserForm(p=>({...p,role:e.target.value}))}>
                    {ROLES.map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="uf-foot">
                <button type="button" className="btn outline" onClick={()=>setShowUserForm(false)}>{isEn?'Cancel':'İptal'}</button>
                <button type="submit" className="btn primary green">{isEn?'Create User':'Kullanıcı Oluştur'}</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="admin-grid">
        <aside className="left-panel">
          <section className="card matrix-card">
            <h3>{isEn ? 'USERS' : 'KULLANICILAR'} ({users.length})</h3>
            <div className="p-list">
              {users.map(u => (
                <div key={u.id} className={`p-item ${u.active ? 'active' : 'inactive'}`}>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:u.active?'#1e293b':'#94a3b8'}}>{u.name}</div>
                    <div style={{fontSize:10,color:'#94a3b8'}}>{isEn ? u.roleEn : u.roleTr}</div>
                  </div>
                  <div style={{display:'flex',gap:4}}>
                    <button className="icon-btn tiny" onClick={()=>toggleUser(u.id)} title={isEn?(u.active?'Deactivate':'Activate'):(u.active?'Deaktif Et':'Aktif Et')}>
                      {u.active ? <ShieldCheck size={12} className="green"/> : <Lock size={12}/>}
                    </button>
                    <button className="icon-btn tiny" onClick={()=>resetPassword(u.name)} title={isEn?'Reset Password':'Şifre Sıfırla'}><Key size={12}/></button>
                    <button className="icon-btn tiny del" onClick={()=>deleteUser(u.id)} title={isEn?'Delete':'Sil'}><Trash2 size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="main-content">
          <div className="card logs-card">
            <div className="l-head">
              <h3>{isEn ? 'SYSTEM ACTIVITY LOG' : 'SİSTEM İŞLEM GÜNLÜĞÜ'}</h3>
              <div className="l-actions">
                <div className="log-search">
                  <Search size={14} color="#94a3b8"/>
                  <input placeholder={isEn?'Search logs...':'Log ara...'} value={logSearch} onChange={e=>setLogSearch(e.target.value)}/>
                </div>
                <button className={`icon-btn ${refreshing?'spin':''}`} onClick={handleRefresh}><RefreshCw size={14}/></button>
              </div>
            </div>
            <table className="logs-table">
              <thead>
                <tr>
                  <th>{isEn?'Time':'Zaman'}</th>
                  <th>{isEn?'User':'Kullanıcı'}</th>
                  <th>{isEn?'Module':'Modül'}</th>
                  <th>{isEn?'Action':'İşlem'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(l => (
                  <tr key={l.id} className={l.type==='delete'?'warning-row':''}>
                    <td><span style={{fontSize:11,color:'#94a3b8'}}>{l.date}</span> {l.time}</td>
                    <td><strong>{l.user}</strong></td>
                    <td><span className="mod-badge">{l.module}</span></td>
                    <td>{isEn ? l.logEn : l.logTr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="admin-footer mt-20">
            <span>{isEn?'Active Users':'Aktif Kullanıcı'}: <strong>{users.filter(u=>u.active).length}</strong></span>
            <span>{isEn?'Total Logs':'Toplam Log'}: <strong>{displayedLogs.length}</strong></span>
            <span>Uptime: <strong>99.9%</strong></span>
          </div>
        </section>

        <aside className="right-panel">
          <section className="card health-card">
            <h3>{isEn?'SECURITY STATUS':'GÜVENLİK DURUMU'}</h3>
            <div className="gauge-list">
              {healthData.map((h, i) => (
                <div key={i} className="gauge-item">
                  <div className="g-head"><Activity size={14}/><span>{h.name}</span></div>
                  <div className="g-val">
                    <strong>{h.val}%</strong>
                    <span className={h.val > 85 ? 'optimal' : 'normal'}>{h.status}</span>
                  </div>
                  <div className="g-bar"><div className="g-fill" style={{width:`${h.val}%`, background: h.val>85?'#10b981':'#3b82f6'}}/></div>
                </div>
              ))}
            </div>
            <div className="backup-status mt-20">
              <div className="b-head"><ShieldCheck size={14} className="green"/><span>{isEn ? 'Backup Status: Success' : 'Yedekleme Durumu: Başarılı'}</span></div>
              <div className="progress-bar">
                {Array.from({length:15}).map((_,i)=>(<div key={i} className="bar active"/>))}
              </div>
            </div>
          </section>
        </aside>
      </div>

      <style>{`
        .admin-container { padding:30px; background:#f1f5f9; min-height:calc(100vh - 70px); display:flex; flex-direction:column; gap:30px; }
        .header { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .title-section { display:flex; align-items:center; gap:20px; }
        .icon-blue { color:#3b82f6; }
        .title-section h2 { font-size:22px; font-weight:800; color:#1e293b; }
        .title-section span { font-size:13px; color:#64748b; }
        .actions { display:flex; gap:10px; }
        .btn { padding:12px 20px; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; border:none; display:flex; align-items:center; gap:8px; }
        .btn.outline { background:white; border:1px solid #e2e8f0; color:#1e293b; }
        .btn.primary.red { background:#ef4444; color:white; }
        .btn.primary.green { background:#10b981; color:white; }
        .admin-grid { display:grid; grid-template-columns:260px 1fr 280px; gap:30px; }
        .card { background:white; border-radius:16px; border:1px solid #e2e8f0; padding:25px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); }
        .card h3 { font-size:11px; font-weight:900; color:#1e293b; margin-bottom:20px; letter-spacing:0.5px; }
        .p-list { display:flex; flex-direction:column; gap:4px; }
        .p-item { display:flex; justify-content:space-between; align-items:center; padding:10px; font-size:13px; border-bottom:1px solid #f8fafc; border-radius:8px; transition:0.2s; }
        .p-item:hover { background:#f8fafc; }
        .p-item.inactive { opacity:0.5; }
        .icon-btn { width:28px; height:28px; border-radius:6px; border:1px solid #e2e8f0; background:white; cursor:pointer; color:#94a3b8; display:flex; align-items:center; justify-content:center; transition:0.2s; }
        .icon-btn:hover { border-color:#3b82f6; color:#3b82f6; }
        .icon-btn.tiny { width:24px; height:24px; }
        .icon-btn.del { color:#ef4444; border-color:#fecaca; }
        .icon-btn.del:hover { background:#fef2f2; }
        .l-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
        .l-actions { display:flex; gap:8px; align-items:center; }
        .log-search { display:flex; align-items:center; gap:6px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:4px 10px; }
        .log-search input { border:none; background:transparent; outline:none; font-size:12px; width:140px; }
        .logs-table { width:100%; border-collapse:collapse; }
        .logs-table th { text-align:left; padding:12px; font-size:11px; color:#94a3b8; border-bottom:1px solid #f1f5f9; text-transform:uppercase; }
        .logs-table td { padding:12px; font-size:12px; border-bottom:1px solid #f8fafc; color:#475569; }
        .mod-badge { font-size:10px; font-weight:900; background:#eff6ff; color:#3b82f6; padding:2px 8px; border-radius:4px; }
        .warning-row { background:#fffbeb; }
        .admin-footer { display:flex; gap:24px; font-size:12px; color:#94a3b8; }
        .admin-footer strong { color:#1e293b; }
        .gauge-item { margin-bottom:20px; }
        .g-head { display:flex; align-items:center; gap:8px; font-size:10px; font-weight:800; color:#94a3b8; margin-bottom:8px; }
        .g-val { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:6px; }
        .g-val strong { font-size:22px; color:#1e293b; }
        .g-val .optimal { font-size:11px; color:#10b981; font-weight:900; }
        .g-val .normal { font-size:11px; color:#3b82f6; font-weight:900; }
        .g-bar { height:4px; background:#f1f5f9; border-radius:10px; overflow:hidden; }
        .g-fill { height:100%; border-radius:10px; }
        .backup-status .b-head { display:flex; align-items:center; gap:8px; font-size:11px; font-weight:800; margin-bottom:15px; }
        .progress-bar { display:flex; gap:4px; }
        .bar { flex:1; height:12px; background:#f1f5f9; border-radius:2px; }
        .bar.active { background:#10b981; }
        .green { color:#10b981; }
        .mt-20 { margin-top:20px; }
        .spin { animation:spin 1s linear infinite; }
        @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .modal-box { background:white; border-radius:20px; width:420px; padding:24px; }
        .mb-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .mb-head h3 { font-size:17px; font-weight:800; color:#1e293b; }
        .mb-head button { background:none; border:none; color:#94a3b8; cursor:pointer; }
        .uf-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .uf { display:flex; flex-direction:column; gap:6px; }
        .uf label { font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; }
        .uf input,.uf select { padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13px; outline:none; }
        .uf-foot { display:flex; justify-content:flex-end; gap:10px; margin-top:16px; }
      `}</style>
    </div>
  );
};

export default SystemAdmin;
