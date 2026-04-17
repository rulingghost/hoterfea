import React, { useState } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, ShieldAlert, TrendingDown, Package, Zap, CheckCircle, Eye } from 'lucide-react';

const AIAnomaly = () => {
  const { rooms, reservations, cashTransactions, inventory, tasks, staff, TODAY } = useHotel();
  const { isEn } = useLanguage();
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  const todayTx = cashTransactions.filter(t => t.date === TODAY);
  const totalRev = todayTx.filter(t => t.type === 'gelir').reduce((s, t) => s + t.amount, 0);
  const totalExp = todayTx.filter(t => t.type === 'gider').reduce((s, t) => s + t.amount, 0);
  const lowStock = inventory.filter(i => i.stock < i.minStock);
  const outOfOrder = rooms.filter(r => r.status === 'arızalı');
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'bitti');
  const absentStaff = staff.filter(s => s.status === 'izinli');
  const unpaidRes = reservations.filter(r => r.status === 'check-in' && r.balance > 10000);
  const largeTx = todayTx.filter(t => t.amount > 20000);

  const CAT = {
    Stock:     isEn ? 'Stock'     : 'Stok',
    Room:      isEn ? 'Room'      : 'Oda',
    Operation: isEn ? 'Operation' : 'Operasyon',
    Staff:     isEn ? 'Staff'     : 'Personel',
    Finance:   isEn ? 'Finance'   : 'Finans',
  };

  const SEV = {
    high:   isEn ? 'High'   : 'Yüksek',
    medium: isEn ? 'Medium' : 'Orta',
    low:    isEn ? 'Low'    : 'Düşük',
  };

  const anomalies = [];

  if (lowStock.length > 0) anomalies.push({
    id: 'stock', severity: 'high', category: CAT.Stock,
    title: isEn ? `${lowStock.length} items at critical stock level` : `${lowStock.length} ürün kritik stok seviyesinde`,
    desc: lowStock.map(i => `${i.name}: ${i.stock}/${i.minStock}`).join(', '),
    icon: <Package size={18}/>, color: '#ef4444',
    action: isEn ? 'Create urgent order' : 'Acil sipariş oluştur'
  });

  if (outOfOrder.length > 0) anomalies.push({
    id: 'oor', severity: 'high', category: CAT.Room,
    title: isEn ? `${outOfOrder.length} room(s) out of order` : `${outOfOrder.length} oda arızalı durumda`,
    desc: outOfOrder.map(r => `${isEn ? 'Room' : 'Oda'} ${r.id} (${r.type})`).join(', '),
    icon: <Zap size={18}/>, color: '#f59e0b',
    action: isEn ? 'Assign technical service' : 'Teknik servis ata'
  });

  if (highPriorityTasks.length > 2) anomalies.push({
    id: 'tasks', severity: 'medium', category: CAT.Operation,
    title: isEn ? `${highPriorityTasks.length} high-priority tasks pending` : `${highPriorityTasks.length} yüksek öncelikli görev bekliyor`,
    desc: highPriorityTasks.map(t => `${isEn ? 'Room' : 'Oda'} ${t.room}: ${t.desc}`).join('; '),
    icon: <AlertTriangle size={18}/>, color: '#f59e0b',
    action: isEn ? 'Review task assignments' : 'Görev atamalarını kontrol et'
  });

  if (absentStaff.length > 1) anomalies.push({
    id: 'staff', severity: 'medium', category: CAT.Staff,
    title: isEn ? `${absentStaff.length} staff absent/on leave` : `${absentStaff.length} personel izinli/devamsız`,
    desc: absentStaff.map(s => `${s.name} (${s.dept})`).join(', '),
    icon: <ShieldAlert size={18}/>, color: '#8b5cf6',
    action: isEn ? 'Plan backup staff' : 'Yedek personel planla'
  });

  if (unpaidRes.length > 0) anomalies.push({
    id: 'unpaid', severity: 'medium', category: CAT.Finance,
    title: isEn ? `${unpaidRes.length} reservation(s) with high balance` : `${unpaidRes.length} yüksek bakiyeli rezervasyon`,
    desc: unpaidRes.map(r => `${r.guest}: ₺${r.balance.toLocaleString()}`).join(', '),
    icon: <TrendingDown size={18}/>, color: '#ef4444',
    action: isEn ? 'Start collection tracking' : 'Tahsilat takibi başlat'
  });

  if (largeTx.length > 0) anomalies.push({
    id: 'largetx', severity: 'low', category: CAT.Finance,
    title: isEn ? `${largeTx.length} large transaction(s) detected` : `${largeTx.length} büyük tutarlı işlem tespit edildi`,
    desc: largeTx.map(t => `${t.desc}: ₺${t.amount.toLocaleString()}`).join(', '),
    icon: <Eye size={18}/>, color: '#3b82f6',
    action: isEn ? 'Verify transactions' : 'İşlemleri doğrula'
  });

  const totalScore = Math.max(0, 100 - (anomalies.filter(a => a.severity === 'high').length * 20) - (anomalies.filter(a => a.severity === 'medium').length * 10) - (anomalies.filter(a => a.severity === 'low').length * 3));
  const scoreColor = totalScore >= 80 ? '#10b981' : totalScore >= 50 ? '#f59e0b' : '#ef4444';
  const scoreLabel = totalScore >= 80
    ? (isEn ? 'Low Risk' : 'Düşük Risk')
    : totalScore >= 50
      ? (isEn ? 'Medium Risk' : 'Orta Risk')
      : (isEn ? 'High Risk' : 'Yüksek Risk');

  const severityData = [
    { name: SEV.high,   count: anomalies.filter(a => a.severity === 'high').length,   color: '#ef4444' },
    { name: SEV.medium, count: anomalies.filter(a => a.severity === 'medium').length, color: '#f59e0b' },
    { name: SEV.low,    count: anomalies.filter(a => a.severity === 'low').length,    color: '#3b82f6' },
  ];

  const categoryData = [...new Set(anomalies.map(a => a.category))].map(cat => ({
    name: cat, count: anomalies.filter(a => a.category === cat).length
  }));

  return (
    <div className="ai-anomaly">
      <div className="anomaly-top">
        <motion.div className="risk-score-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="risk-ring" style={{ background: `conic-gradient(${scoreColor} ${totalScore * 3.6}deg, #f1f5f9 0deg)` }}>
            <div className="risk-inner"><strong>{totalScore}</strong><span>/100</span></div>
          </div>
          <h3 style={{ color: scoreColor }}>{scoreLabel}</h3>
          <p>{anomalies.length} {isEn ? 'anomalies detected' : 'anomali tespit edildi'}</p>
        </motion.div>

        <div className="anomaly-stats">
          {severityData.map(s => (
            <div key={s.name} className="as-item">
              <div className="as-dot" style={{ background: s.color }}/>
              <span>{s.name}</span>
              <strong>{s.count}</strong>
            </div>
          ))}
        </div>

        <div className="anomaly-chart">
          <h4>{isEn ? 'Category Distribution' : 'Kategori Dağılımı'}</h4>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={categoryData} layout="vertical" barSize={16}>
              <XAxis type="number" hide/>
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={80}/>
              <Tooltip/>
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="anomaly-list">
        <h3><AlertTriangle size={16}/> {isEn ? 'Detected Anomalies' : 'Tespit Edilen Anomaliler'}</h3>
        {anomalies.length === 0 ? (
          <div className="no-anomaly">
            <CheckCircle size={40} color="#10b981"/>
            <p>{isEn ? 'Congratulations! No active anomalies.' : 'Tebrikler! Aktif anomali bulunmuyor.'}</p>
          </div>
        ) : (
          anomalies.map((a, i) => (
            <motion.div key={a.id} className={`anomaly-card ${a.severity}`} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} onClick={() => setSelectedAnomaly(selectedAnomaly === a.id ? null : a.id)}>
              <div className="ac-left">
                <div className="ac-icon" style={{ color: a.color, background: `${a.color}15` }}>{a.icon}</div>
                <div className="ac-body">
                  <div className="ac-meta">
                    <span className={`sev-badge ${a.severity}`}>{SEV[a.severity]}</span>
                    <span className="ac-cat">{a.category}</span>
                  </div>
                  <strong>{a.title}</strong>
                  <AnimatePresence>
                    {selectedAnomaly === a.id && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a.desc}</motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <button className="ac-action" onClick={e => { e.stopPropagation(); }}>{a.action}</button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIAnomaly;
