import React, { useState } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { SmilePlus, MessageSquare, Star } from 'lucide-react';

const fakeReviews = [
  { id: 1, guest: 'Ahmet Y.', rating: 5, deptKey: 'Reception', textTr: 'Check-in çok hızlı ve güler yüzlüydü. Harika bir karşılama!', textEn: 'Check-in was very fast and friendly. What a warm welcome!', dateTr: '2 saat önce', dateEn: '2 hours ago', mood: '😊' },
  { id: 2, guest: 'Hans M.', rating: 4, deptKey: 'Housekeeping', textTr: 'Oda temiz ama minibar kontrolü geç yapıldı.', textEn: 'Room was clean but minibar check was done late.', dateTr: '5 saat önce', dateEn: '5 hours ago', mood: '😐' },
  { id: 3, guest: 'Olga P.', rating: 5, deptKey: 'SPA', textTr: 'Masaj hizmeti mükemmeldi, Elena çok profesyonel.', textEn: 'Massage service was excellent, Elena very professional.', dateTr: '1 gün önce', dateEn: '1 day ago', mood: '😍' },
  { id: 4, guest: 'John S.', rating: 3, deptKey: 'Restaurant', textTr: 'Yemekler iyi ama servis biraz yavaş kaldı.', textEn: 'Food was good but service was a bit slow.', dateTr: '1 gün önce', dateEn: '1 day ago', mood: '😐' },
  { id: 5, guest: 'Sheikh A.', rating: 5, deptKey: 'Reception', textTr: 'VVIP karşılama beklentilerin üzerindeydi. Tebrikler!', textEn: 'VVIP welcome exceeded expectations. Congratulations!', dateTr: '2 gün önce', dateEn: '2 days ago', mood: '😊' },
  { id: 6, guest: 'Pierre D.', rating: 4, deptKey: 'Housekeeping', textTr: 'Balayı süslememiz çok güzeldi, teşekkürler.', textEn: 'Our honeymoon decoration was beautiful, thank you.', dateTr: '2 gün önce', dateEn: '2 days ago', mood: '😊' },
  { id: 7, guest: 'Fatma D.', rating: 2, deptKey: 'Technical', textTr: 'Odada wifi çok yavaştı, sürekli koptu.', textEn: 'WiFi in the room was very slow and kept disconnecting.', dateTr: '3 gün önce', dateEn: '3 days ago', mood: '😡' },
  { id: 8, guest: 'Carlos R.', rating: 4, deptKey: 'Restaurant', textTr: 'Kahvaltı çeşitleri güzel ama kalabalık.', textEn: 'Good variety at breakfast but quite crowded.', dateTr: '3 gün önce', dateEn: '3 days ago', mood: '😐' },
];

const DEPT_TR = { Reception: 'Resepsiyon', Housekeeping: 'Kat Hizmetleri', Restaurant: 'Restoran', SPA: 'SPA', Technical: 'Teknik', Security: 'Güvenlik' };
const DEPT_EN = { Reception: 'Reception', Housekeeping: 'Housekeeping', Restaurant: 'Restaurant', SPA: 'SPA', Technical: 'Technical', Security: 'Security' };

const AISentiment = () => {
  const { guests } = useHotel();
  const { isEn } = useLanguage();
  const [filter, setFilter] = useState('all');

  const deptLabel = (key) => isEn ? DEPT_EN[key] : DEPT_TR[key];

  const departments = [
    { key: 'Reception',    score: 92, reviews: 48, icon: '🏨' },
    { key: 'Housekeeping', score: 85, reviews: 65, icon: '🛏️' },
    { key: 'Restaurant',   score: 78, reviews: 112, icon: '🍽️' },
    { key: 'SPA',          score: 95, reviews: 28, icon: '💆' },
    { key: 'Technical',    score: 72, reviews: 15, icon: '🔧' },
    { key: 'Security',     score: 88, reviews: 8, icon: '🛡️' },
  ];

  const radarData = departments.map(d => ({ subject: deptLabel(d.key), score: d.score, fullMark: 100 }));
  const overallScore = Math.round(departments.reduce((s, d) => s + d.score, 0) / departments.length);

  const moodData = [
    { mood: isEn ? '😊 Satisfied' : '😊 Memnun', value: 58, color: '#10b981' },
    { mood: isEn ? '😐 Neutral' : '😐 Nötr', value: 27, color: '#f59e0b' },
    { mood: isEn ? '😡 Unsatisfied' : '😡 Memnuniyetsiz', value: 15, color: '#ef4444' },
  ];

  const filtered = filter === 'all' ? fakeReviews : fakeReviews.filter(r => r.deptKey === filter);

  const getRatingColor = (r) => r >= 4 ? '#10b981' : r >= 3 ? '#f59e0b' : '#ef4444';

  const scoreLabel = overallScore >= 85
    ? (isEn ? '🌟 Excellent' : '🌟 Mükemmel')
    : overallScore >= 70
      ? (isEn ? '👍 Good' : '👍 İyi')
      : (isEn ? '⚠️ Needs Improvement' : '⚠️ Geliştirilmeli');

  return (
    <div className="ai-sentiment">
      <div className="sent-top">
        <motion.div className="overall-score" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="score-ring" style={{ background: `conic-gradient(#10b981 ${overallScore * 3.6}deg, #f1f5f9 0deg)` }}>
            <div className="score-inner">
              <strong>{overallScore}</strong>
              <span>/100</span>
            </div>
          </div>
          <h3>{isEn ? 'Overall Satisfaction' : 'Genel Memnuniyet'}</h3>
          <p>{scoreLabel}</p>
        </motion.div>

        <div className="mood-breakdown">
          <h3><SmilePlus size={16}/> {isEn ? 'Sentiment Distribution' : 'Duygu Dağılımı'}</h3>
          {moodData.map(m => (
            <div key={m.mood} className="mood-bar-row">
              <span className="mood-label">{m.mood}</span>
              <div className="mood-bar-bg">
                <motion.div className="mood-bar-fill" style={{ background: m.color }} initial={{ width: 0 }} animate={{ width: `${m.value}%` }}/>
              </div>
              <strong>%{m.value}</strong>
            </div>
          ))}
        </div>

        <div className="radar-card">
          <h3>{isEn ? 'Department Performance' : 'Departman Performansı'}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0"/>
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }}/>
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false}/>
              <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dept-cards">
        {departments.map((d, i) => (
          <motion.div key={d.key} className="dept-card" onClick={() => setFilter(d.key === filter ? 'all' : d.key)} style={{ borderColor: d.key === filter ? '#3b82f6' : '#e2e8f0' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <span className="dept-icon">{d.icon}</span>
            <strong>{deptLabel(d.key)}</strong>
            <div className="dept-score" style={{ color: getRatingColor(d.score / 20) }}>{d.score}</div>
            <span className="dept-reviews">{d.reviews} {isEn ? 'reviews' : 'yorum'}</span>
          </motion.div>
        ))}
      </div>

      <div className="reviews-section">
        <div className="rev-head">
          <h3>
            <MessageSquare size={16}/> {isEn ? 'Recent Reviews' : 'Son Yorumlar'}{' '}
            {filter !== 'all' && (
              <span className="filter-tag">{deptLabel(filter)} <button onClick={() => setFilter('all')}>✕</button></span>
            )}
          </h3>
        </div>
        <div className="reviews-list">
          {filtered.map((r, i) => (
            <motion.div key={r.id} className="review-card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="rev-avatar">{r.mood}</div>
              <div className="rev-body">
                <div className="rev-meta">
                  <strong>{r.guest}</strong>
                  <span className="rev-dept">{deptLabel(r.deptKey)}</span>
                  <span className="rev-date">{isEn ? r.dateEn : r.dateTr}</span>
                </div>
                <p>{isEn ? r.textEn : r.textTr}</p>
                <div className="rev-stars">
                  {Array.from({ length: 5 }, (_, j) => <Star key={j} size={12} fill={j < r.rating ? '#f59e0b' : '#e2e8f0'} color={j < r.rating ? '#f59e0b' : '#e2e8f0'}/>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISentiment;
