import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import { Plus, CheckCircle, AlertCircle, Clock, Wrench, Bed } from 'lucide-react';

const Housekeeping = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('housekeeping.' + k);
  const _c = (k) => mt('common.' + k);
  const { tasks, updateTask, addTask, rooms, stats } = useHotel();
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ room: '', desc: '', priority: 'normal', type: 'housekeeping', assignee: '', status: 'bekliyor' });

  const PRIORITY_MAP = {
    high:   { label: _t('high'),   color: '#ef4444', bg: '#fef2f2' },
    normal: { label: _t('medium'), color: '#f59e0b', bg: '#fffbeb' },
    low:    { label: _t('low'),    color: '#64748b', bg: '#f8fafc' },
  };

  const STATUS_MAP = {
    bekliyor: { label: _t('pending'),    color: '#f59e0b', icon: <Clock size={14}/> },
    devam:    { label: _t('inProgress'), color: '#3b82f6', icon: <AlertCircle size={14}/> },
    bitti:    { label: _t('completed'),  color: '#10b981', icon: <CheckCircle size={14}/> },
  };

  const FILTERS = [
    { key: 'all',          label: _c('all') },
    { key: 'housekeeping', label: language === 'tr' ? 'Kat Hizm.' : 'Housekp.' },
    { key: 'technical',    label: language === 'tr' ? 'Teknik' : 'Technical' },
    { key: 'bekliyor',     label: _t('pending') },
    { key: 'devam',        label: _t('inProgress') },
    { key: 'bitti',        label: _t('completed') },
  ];

  const displayed = tasks.filter(t =>
    filter === 'all'          ? true :
    filter === 'housekeeping' ? t.type === 'housekeeping' :
    filter === 'technical'    ? t.type === 'technical' :
    t.status === filter
  );

  const submit = (e) => {
    e.preventDefault();
    addTask(form);
    setForm({ room: '', desc: '', priority: 'normal', type: 'housekeeping', assignee: '', status: 'bekliyor' });
    setShowForm(false);
  };

  return (
    <div className="hk-container">
      {/* Header */}
      <div className="hk-header">
        <div>
          <h2>{_t('title')}</h2>
          <span>{_t('subtitle')}</span>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={16}/> {_t('assignTask')}
        </button>
      </div>

      {/* KPI row */}
      <div className="hk-kpi-row">
        {[
          { label: _t('pending'),    count: tasks.filter(t => t.status === 'bekliyor').length, color: '#f59e0b' },
          { label: _t('inProgress'), count: tasks.filter(t => t.status === 'devam').length,    color: '#3b82f6' },
          { label: _t('completed'),  count: tasks.filter(t => t.status === 'bitti').length,    color: '#10b981' },
          { label: _t('statusDirty'), count: stats.dirty,                                       color: '#8b5cf6' },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-num" style={{ color: k.color }}>{k.count}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {/* New Task Form */}
      {showForm && (
        <motion.form
          className="task-form card"
          onSubmit={submit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>{_t('assignTask')}</h3>
          <div className="form-row">
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="housekeeping">{_t('title')}</option>
              <option value="technical">{language === 'tr' ? 'Teknik Servis' : 'Technical Service'}</option>
            </select>
            <select value={form.room} onChange={e => setForm({...form, room: e.target.value})} required>
              <option value="">{_t('roomNumber')}</option>
              {rooms.map(r => <option key={r.id} value={r.id}>{r.id} — {r.type}</option>)}
            </select>
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              <option value="high">{_t('high')}</option>
              <option value="normal">{_t('medium')}</option>
              <option value="low">{_t('low')}</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text" placeholder={_c('description') + '...'}
              value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required
            />
            <input
              type="text" placeholder={_t('assignedTo')}
              value={form.assignee} onChange={e => setForm({...form, assignee: e.target.value})}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>{_c('cancel')}</button>
            <button type="submit" className="btn-primary">{_c('save')}</button>
          </div>
        </motion.form>
      )}

      {/* Filters */}
      <div className="filter-bar">
        {FILTERS.map(f => (
          <button key={f.key} className={`filter-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="task-grid">
        {displayed.map((task, i) => {
          const pr = PRIORITY_MAP[task.priority] || PRIORITY_MAP.normal;
          const st = STATUS_MAP[task.status] || STATUS_MAP.bekliyor;
          return (
            <motion.div
              key={task.id}
              className="task-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="tc-top">
                <div className="tc-type-icon">
                  {task.type === 'housekeeping' ? <Bed size={18} color="#9b59b6"/> : <Wrench size={18} color="#e67e22"/>}
                </div>
                <span className="priority-pill" style={{ background: pr.bg, color: pr.color }}>{pr.label}</span>
              </div>
              <div className="tc-room">{_c('room')} {task.room}</div>
              <p className="tc-desc">{task.desc}</p>
              <div className="tc-meta">
                <span>{task.assignee || _t('assignedTo')}</span>
                <span>{task.created}</span>
              </div>
              <div className="tc-status-bar">
                <div className="st-indicator" style={{ color: st.color }}>
                  {st.icon} {st.label}
                </div>
                <div className="tc-actions">
                  {task.status === 'bekliyor' && (
                    <button className="micro-btn blue" onClick={() => updateTask(task.id, { status: 'devam' })}>
                      {language === 'tr' ? 'Başlat' : 'Start'}
                    </button>
                  )}
                  {task.status === 'devam' && (
                    <button className="micro-btn green" onClick={() => updateTask(task.id, { status: 'bitti' })}>
                      {_t('completed')}
                    </button>
                  )}
                  {task.status === 'bitti' && (
                    <span className="done-badge">✓ {_t('completed')}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .hk-container { padding: 30px; display: flex; flex-direction: column; gap: 20px; }
        .hk-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .hk-header h2 { font-size: 24px; font-weight: 800; color: #1e293b; }
        .hk-header span { font-size: 14px; color: #94a3b8; }
        .btn-primary { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .hk-kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .kpi-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; text-align: center; }
        .kpi-num { font-size: 36px; font-weight: 900; }
        .kpi-label { font-size: 13px; color: #94a3b8; font-weight: 700; margin-top: 4px; }

        .card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; }
        .task-form h3 { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }
        .form-row { display: flex; gap: 12px; margin-bottom: 12px; }
        .form-row select, .form-row input { flex: 1; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; outline: none; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .btn-cancel { padding: 10px 20px; border: 1px solid #e2e8f0; background: white; border-radius: 10px; font-weight: 700; cursor: pointer; }

        .filter-bar { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-btn { padding: 8px 16px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; font-size: 12px; font-weight: 700; color: #64748b; cursor: pointer; }
        .filter-btn.active { background: #1e293b; color: white; border-color: #1e293b; }

        .task-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
        .task-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .tc-top { display: flex; justify-content: space-between; align-items: center; }
        .tc-type-icon { width: 36px; height: 36px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .priority-pill { font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 20px; }
        .tc-room { font-size: 18px; font-weight: 900; color: #1e293b; }
        .tc-desc { font-size: 13px; color: #64748b; line-height: 1.4; flex: 1; }
        .tc-meta { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; font-weight: 600; }
        .tc-status-bar { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #f1f5f9; }
        .st-indicator { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; }
        .tc-actions {}
        .micro-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 800; cursor: pointer; }
        .micro-btn.blue { background: #eff6ff; color: #3b82f6; }
        .micro-btn.green { background: #ecfdf5; color: #10b981; }
        .done-badge { font-size: 11px; color: #10b981; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default Housekeeping;
