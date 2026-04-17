import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, BarChart3, MessageCircle, Star, 
  ThumbsUp, Send, Download, MoreHorizontal,
  CheckCircle
} from 'lucide-react';

const Surveys = () => {
  const { mt, isEn } = useModuleTranslation();
  const { addNotification } = useHotel();
  const [filter, setFilter] = useState('all');

  const stats = [
    { labelTr: 'Genel Memnuniyet', labelEn: 'Overall Satisfaction', value: '%92', trend: '+2.1%', icon: <Star size={20} color="#f59e0b"/> },
    { labelTr: 'Personel Davranışı', labelEn: 'Staff Behavior',       value: '4.8/5', trend: '+0.5%', icon: <ThumbsUp size={20} color="#10b981"/> },
    { labelTr: 'Oda Temizliği',     labelEn: 'Room Cleanliness',      value: '4.7/5', trend: '+1.2%', icon: <ClipboardCheck size={20} color="#3b82f6"/> },
    { labelTr: 'Yemek Kalitesi',    labelEn: 'Food Quality',          value: '4.5/5', trend: '-0.3%', icon: <BarChart3 size={20} color="#8b5cf6"/> },
  ];

  const feedbackList = [
    { id:1, guest:'Ahmet Yılmaz', room:'101', score:5,
      commentTr:'Her şey mükemmeldi, personel çok güler yüzlü.',
      commentEn:'Everything was perfect, the staff were very friendly.',
      dateTr:'2 saat önce', dateEn:'2 hours ago', catTr:'Genel', catEn:'General' },
    { id:2, guest:'Sarah Johnson', room:'205', score:4,
      commentTr:'Kahvaltı çeşitleri artırılabilir ama oda çok temizdi.',
      commentEn:'Breakfast variety could be improved but the room was very clean.',
      dateTr:'5 saat önce', dateEn:'5 hours ago', catTr:'Yemek', catEn:'Food' },
    { id:3, guest:'Klaus Weber', room:'304', score:2,
      commentTr:'Sıcak su gelmesi biraz vakit alıyor, teknik servis bakabilir.',
      commentEn:'Hot water takes a while to come through — maintenance should check.',
      dateTr:'1 gün önce', dateEn:'1 day ago', catTr:'Teknik', catEn:'Technical' },
    { id:4, guest:'Ayşe Demir', room:'108', score:5,
      commentTr:'SPA hizmetlerinden çok memnun kaldım.',
      commentEn:'Very satisfied with the SPA services.',
      dateTr:'2 gün önce', dateEn:'2 days ago', catTr:'SPA', catEn:'SPA' },
  ];

  const FILTERS = [
    { val:'all',      labelTr:'Tümü',    labelEn:'All'      },
    { val:'positive', labelTr:'Olumlu',  labelEn:'Positive' },
    { val:'negative', labelTr:'Olumsuz', labelEn:'Negative' },
  ];

  const catChart = [
    { labelTr:'Hizmet Kalitesi',   labelEn:'Service Quality',  value:85, color:'#3b82f6' },
    { labelTr:'Temizlik',          labelEn:'Cleanliness',       value:92, color:'#10b981' },
    { labelTr:'Fiyat/Performans',  labelEn:'Value for Money',   value:78, color:'#f59e0b' },
    { labelTr:'Konum',             labelEn:'Location',          value:98, color:'#8b5cf6' },
  ];

  return (
    <div className="sur-page">
      <div className="sur-head">
        <div>
          <h2><ClipboardCheck size={20}/> {isEn ? 'Survey & Feedback Management' : 'Anket & Geri Bildirim Yönetimi'}</h2>
          <span>{isEn ? 'Guest experience analysis and improvement tracking' : 'Misafir deneyimi analizi ve iyileştirme takibi'}</span>
        </div>
        <div className="head-actions">
          <button className="btn-secondary"><Download size={14}/> {isEn ? 'Download Report' : 'Rapor İndir'}</button>
          <button className="btn-primary" onClick={() => addNotification({ type:'info', msg: isEn ? 'Opening new survey form...' : 'Yeni anket formu oluşturma ekranı açılıyor...' })}>
            {isEn ? 'New Survey Form' : 'Yeni Anket Formu'}
          </button>
        </div>
      </div>

      <div className="sur-stats">
        {stats.map((s, i) => (
          <motion.div key={i} className="stat-card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}>
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-info">
              <span className="sc-label">{isEn ? s.labelEn : s.labelTr}</span>
              <div className="sc-row">
                <span className="sc-value">{s.value}</span>
                <span className={`sc-trend ${s.trend.startsWith('+') ? 'up' : 'down'}`}>{s.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="sur-content">
        <div className="feedback-section">
          <div className="fs-head">
            <h3>{isEn ? 'Recent Feedback' : 'Son Geri Bildirimler'}</h3>
            <div className="fs-filters">
              {FILTERS.map(f => (
                <button key={f.val} className={`f-tab ${filter===f.val?'active':''}`} onClick={()=>setFilter(f.val)}>
                  {isEn ? f.labelEn : f.labelTr}
                </button>
              ))}
            </div>
          </div>

          <div className="f-list">
            {feedbackList.map((f, i) => (
              <motion.div key={f.id} className="f-card" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}>
                <div className="f-top">
                  <div className="f-guest">
                    <strong>{f.guest}</strong>
                    <span>{isEn ? 'Room' : 'Oda'} {f.room} · {isEn ? f.dateEn : f.dateTr}</span>
                  </div>
                  <div className="f-score">
                    {[...Array(5)].map((_,j)=>(
                      <Star key={j} size={12} fill={j<f.score?'#f59e0b':'none'} color={j<f.score?'#f59e0b':'#cbd5e1'}/>
                    ))}
                  </div>
                </div>
                <p className="f-comment">{isEn ? f.commentEn : f.commentTr}</p>
                <div className="f-meta">
                  <span className="f-cat">#{isEn ? f.catEn : f.catTr}</span>
                  <div className="f-actions">
                    <button className="f-btn"><MessageCircle size={14}/> {isEn ? 'Reply' : 'Yanıtla'}</button>
                    <button className="f-btn"><CheckCircle size={14}/> {isEn ? 'Assign Task' : 'Görev Ata'}</button>
                    <button className="f-btn more"><MoreHorizontal size={14}/></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="analysis-section">
          <h3>{isEn ? 'Category Distribution' : 'Kategori Bazlı Dağılım'}</h3>
          <div className="cat-chart">
            {catChart.map(c => (
              <div key={c.labelEn} className="cat-row">
                <div className="cat-info">
                  <span>{isEn ? c.labelEn : c.labelTr}</span>
                  <strong>%{c.value}</strong>
                </div>
                <div className="cat-bar-bg">
                  <motion.div className="cat-bar" initial={{width:0}} animate={{width:`${c.value}%`}} style={{background:c.color}}/>
                </div>
              </div>
            ))}
          </div>

          <div className="survey-invite">
            <div className="invite-icon"><Send size={24} color="#3b82f6"/></div>
            <h4>{isEn ? 'Send Survey' : 'Anket Gönder'}</h4>
            <p>{isEn ? 'Automatic survey delivery to guests after check-out is active.' : 'Check-out yapan misafirlere otomatik anket gönderimi aktif.'}</p>
            <button className="invite-btn">{isEn ? 'Edit Settings' : 'Ayarları Düzenle'}</button>
          </div>
        </div>
      </div>

      <style>{`
        .sur-page { padding:28px; display:flex; flex-direction:column; gap:24px; }
        .sur-head { display:flex; justify-content:space-between; align-items:flex-start; }
        .sur-head h2 { font-size:22px; font-weight:800; color:#1e293b; display:flex; align-items:center; gap:10px; }
        .sur-head span { font-size:13px; color:#94a3b8; }
        .head-actions { display:flex; gap:10px; }
        .btn-secondary { padding:10px 18px; border-radius:12px; border:1.5px solid #e2e8f0; background:white; color:#475569; font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; gap:8px; }
        .btn-primary { padding:10px 18px; border-radius:12px; border:none; background:#1e293b; color:white; font-weight:700; font-size:13px; cursor:pointer; }
        .sur-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .stat-card { background:white; border-radius:20px; border:1px solid #e2e8f0; padding:20px; display:flex; align-items:center; gap:16px; }
        .sc-icon { width:44px; height:44px; border-radius:14px; background:#f8fafc; display:flex; align-items:center; justify-content:center; }
        .sc-label { font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; }
        .sc-row { display:flex; align-items:baseline; gap:8px; margin-top:4px; }
        .sc-value { font-size:20px; font-weight:900; color:#1e293b; }
        .sc-trend { font-size:11px; font-weight:800; padding:2px 6px; border-radius:6px; }
        .sc-trend.up { background:#f0fdf4; color:#10b981; }
        .sc-trend.down { background:#fef2f2; color:#ef4444; }
        .sur-content { display:grid; grid-template-columns:1fr 350px; gap:24px; }
        .feedback-section { background:white; border-radius:24px; border:1px solid #e2e8f0; padding:24px; }
        .fs-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
        .fs-head h3 { font-size:16px; font-weight:800; color:#1e293b; }
        .fs-filters { display:flex; background:#f1f5f9; padding:4px; border-radius:10px; gap:4px; }
        .f-tab { padding:6px 12px; border-radius:8px; border:none; font-size:11px; font-weight:700; color:#64748b; cursor:pointer; background:transparent; }
        .f-tab.active { background:white; color:#1e293b; box-shadow:0 2px 4px rgba(0,0,0,0.05); }
        .f-list { display:flex; flex-direction:column; gap:16px; }
        .f-card { border:1.5px solid #f1f5f9; border-radius:18px; padding:20px; transition:0.2s; }
        .f-card:hover { border-color:#3b82f6; background:#f8fafc; }
        .f-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
        .f-guest strong { display:block; font-size:14px; color:#1e293b; }
        .f-guest span { font-size:11px; color:#94a3b8; }
        .f-score { display:flex; gap:2px; }
        .f-comment { font-size:13px; color:#475569; line-height:1.6; margin-bottom:16px; }
        .f-meta { display:flex; justify-content:space-between; align-items:center; }
        .f-cat { font-size:11px; font-weight:800; color:#3b82f6; }
        .f-actions { display:flex; gap:8px; }
        .f-btn { background:white; border:1px solid #e2e8f0; padding:6px 12px; border-radius:8px; font-size:11px; font-weight:700; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:6px; }
        .f-btn:hover { border-color:#3b82f6; color:#3b82f6; }
        .f-btn.more { padding:6px 8px; }
        .analysis-section { background:white; border-radius:24px; border:1px solid #e2e8f0; padding:24px; display:flex; flex-direction:column; gap:20px; }
        .analysis-section h3 { font-size:15px; font-weight:800; color:#1e293b; }
        .cat-chart { display:flex; flex-direction:column; gap:16px; }
        .cat-row { display:flex; flex-direction:column; gap:8px; }
        .cat-info { display:flex; justify-content:space-between; font-size:12px; font-weight:700; }
        .cat-info span { color:#64748b; }
        .cat-bar-bg { background:#f1f5f9; height:8px; border-radius:10px; overflow:hidden; }
        .cat-bar { height:100%; border-radius:10px; }
        .survey-invite { margin-top:10px; background:#eff6ff; border-radius:20px; padding:24px; text-align:center; }
        .invite-icon { width:48px; height:48px; background:white; border-radius:16px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
        .survey-invite h4 { font-size:14px; font-weight:800; color:#1e293b; margin-bottom:8px; }
        .survey-invite p { font-size:11px; color:#64748b; line-height:1.5; margin-bottom:16px; }
        .invite-btn { width:100%; padding:12px; border:none; background:#3b82f6; color:white; border-radius:12px; font-weight:800; font-size:12px; cursor:pointer; }
      `}</style>
    </div>
  );
};

export default Surveys;
