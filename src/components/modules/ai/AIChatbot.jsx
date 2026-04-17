import React, { useState, useRef, useEffect } from 'react';
import { useHotel } from '../../../context/HotelContext';
import { useLanguage } from '../../../context/LanguageContext';
import { modulesConfig } from '../../../data/moduleList';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';

const QUICK_QUESTIONS_TR = [
  '🧭 Uygulamayı nasıl kullanırım?',
  '📊 Bugün doluluk oranı kaç?',
  '💰 Bugünkü gelir ne kadar?',
  '🏨 Boş oda var mı?',
  '⚠️ Kritik stok durumu?',
  '👤 VIP misafirler kimler?',
  '📋 Bekleyen görevler?',
  '🧹 Oda 101 temizlenecek',
  '🔧 Oda 205 teknik arıza var',
  '💳 Açık bakiyeler?',
];

const QUICK_QUESTIONS_EN = [
  '🧭 How do I use the app?',
  '📊 What is today\'s occupancy?',
  '💰 What is today\'s revenue?',
  '🏨 Any vacant rooms?',
  '⚠️ Critical stock status?',
  '👤 Who are the VIP guests?',
  '📋 Pending tasks?',
  '🧹 Room 101 needs cleaning',
  '🔧 Room 205 has a technical issue',
  '💳 Open balances?',
];

const AIChatbot = () => {
  const { rooms, reservations, guests, tasks, inventory, cashTransactions, staff, TODAY, addTask, addNotification } = useHotel();
  const { isEn } = useLanguage();

  const QUICK_QUESTIONS = isEn ? QUICK_QUESTIONS_EN : QUICK_QUESTIONS_TR;

  const [messages, setMessages] = useState([
    { role: 'ai', text: isEn
      ? 'Hello! 🏨 I\'m your hotel AI assistant. I can provide information on operations and assign tasks for you. What would you like to ask or what action would you like me to take?'
      : 'Merhaba! 🏨 Ben otel yapay zeka asistanınızım. Size operasyonel konularda bilgi verebilir, sizin için görev ataması yapabilirim. Ne sormak istersiniz veya hangi işlemi yapmamı istersiniz?'
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const processResponseAndActions = (q) => {
    const query = q.toLowerCase();

    // ACTION DETECTION — room number from both TR and EN patterns
    const roomMatchTr = query.match(/oda (\d{3})/i);
    const roomMatchEn = query.match(/room (\d{3})/i);
    const roomNo = (roomMatchTr || roomMatchEn)?.[1] || null;

    const isCleanRequest = query.includes('temizle') || query.includes('temizlik') || query.includes('kirli') || query.includes('clean') || query.includes('housekeeping');
    const isTechRequest = query.includes('arıza') || query.includes('teknik') || query.includes('bozuk') || query.includes('technical') || query.includes('broken') || query.includes('issue') || query.includes('repair');

    if (roomNo && isCleanRequest) {
      addTask({ type: 'housekeeping', room: roomNo, desc: isEn ? `AI Request: Immediate Cleaning (${roomNo})` : `AI Talebi: Anlık Temizlik (${roomNo})`, priority: 'high', assignee: '', status: 'bekliyor' });
      addNotification({ type: 'success', msg: isEn ? `Housekeeping Task Created: Room ${roomNo}` : `Housekeeping Görevi Oluşturuldu: Oda ${roomNo}` });
      return isEn
        ? `✅ **Task Created!** Priority cleaning request for Room ${roomNo} added to the Housekeeping list. Anything else?`
        : `✅ **Görev Oluşturuldu!** Oda ${roomNo} için öncelikli temizlik talebi Housekeeping listesine eklendi. Başka bir işlem var mı?`;
    }

    if (roomNo && isTechRequest) {
      addTask({ type: 'technical', room: roomNo, desc: isEn ? `AI Request: Technical Fault Check (${roomNo})` : `AI Talebi: Teknik Arıza Kontrolü (${roomNo})`, priority: 'high', assignee: '', status: 'bekliyor' });
      addNotification({ type: 'warn', msg: isEn ? `Technical Task Created: Room ${roomNo}` : `Teknik Görev Oluşturuldu: Oda ${roomNo}` });
      return isEn
        ? `✅ **Technical Service Dispatched!** A technical intervention request has been created for Room ${roomNo} with high priority.`
        : `✅ **Teknik Servis Çağrıldı!** Oda ${roomNo} için teknik müdahale talebi oluşturuldu ve öncelik atandı.`;
    }

    // INFORMATION RETRIEVAL
    const occupied = rooms.filter(r => r.status === 'dolu').length;
    const vacant = rooms.filter(r => r.status === 'boş').length;
    const occRate = Math.round((occupied / rooms.length) * 100);
    const todayRev = cashTransactions.filter(t => t.type === 'gelir' && t.date === TODAY).reduce((s, t) => s + t.amount, 0);
    const todayExp = cashTransactions.filter(t => t.type === 'gider' && t.date === TODAY).reduce((s, t) => s + t.amount, 0);
    const lowStock = inventory.filter(i => i.stock < i.minStock);
    const vips = guests.filter(g => g.loyalty === 'Platinum' || g.loyalty === 'Gold');
    const pending = tasks.filter(t => t.status !== 'bitti');
    const techTasks = tasks.filter(t => t.type === 'technical' && t.status !== 'bitti');
    const openBal = reservations.filter(r => r.status === 'check-in' && r.balance > 0);

    const isOccQuery = query.includes('doluluk') || query.includes('occupancy') || query.includes('occ');
    const isRevQuery = query.includes('gelir') || query.includes('ciro') || query.includes('revenue') || query.includes('income');
    const isVacantQuery = query.includes('boş') || query.includes('müsait') || query.includes('vacant') || query.includes('available') || query.includes('empty room');
    const isStockQuery = query.includes('stok') || query.includes('kritik') || query.includes('stock') || query.includes('critical') || query.includes('inventory');
    const isStockOrderQuery = (query.includes('sipariş') || query.includes('order')) && (query.includes('stok') || query.includes('stock'));
    const isVipQuery = query.includes('vip') || query.includes('misafir') || query.includes('guest');
    const isTaskQuery = query.includes('görev') || query.includes('bekleyen') || query.includes('task') || query.includes('pending');
    const isTechQuery = query.includes('arıza') || query.includes('teknik') || query.includes('technical') || query.includes('fault');
    const isBalQuery = query.includes('bakiye') || query.includes('ödenmemiş') || query.includes('balance') || query.includes('unpaid') || query.includes('debt');
    const isStaffQuery = query.includes('personel') || query.includes('staff') || query.includes('employee');
    const isGuideQuery = query.includes('nasıl kullanırım') || query.includes('rehber') || query.includes('how do i use') || query.includes('guide');

    if (isOccQuery) return isEn
      ? `📊 **Live Occupancy:** %${occRate}\n\n- Occupied: ${occupied} rooms\n- Vacant: ${vacant} rooms\n- Out of Order: ${rooms.filter(r => r.status === 'arızalı').length} rooms\n\n${occRate > 80 ? '✅ Occupancy is high! Rate optimization can be applied.' : '⚠️ Occupancy is low, a campaign is recommended.'}`
      : `📊 **Anlık Doluluk:** %${occRate}\n\n- Dolu: ${occupied} oda\n- Boş: ${vacant} oda\n- Arızalı: ${rooms.filter(r => r.status === 'arızalı').length} oda\n\n${occRate > 80 ? '✅ Doluluk yüksek! Fiyat optimizasyonu yapılabilir.' : '⚠️ Doluluk düşük, kampanya önerilir.'}`;

    if (isRevQuery) return isEn
      ? `💰 **Today's Financial Summary:**\n\n- Total Revenue: ₺${todayRev.toLocaleString()}\n- Total Expenses: ₺${todayExp.toLocaleString()}\n- Net Profit: ₺${(todayRev - todayExp).toLocaleString()}\n- Transactions: ${cashTransactions.filter(t => t.date === TODAY).length}\n\n📈 Profit margin: %${Math.round(((todayRev - todayExp) / (todayRev || 1)) * 100)}`
      : `💰 **Bugünkü Finansal Özet:**\n\n- Toplam Gelir: ₺${todayRev.toLocaleString()}\n- Toplam Gider: ₺${todayExp.toLocaleString()}\n- Net Kar: ₺${(todayRev - todayExp).toLocaleString()}\n- İşlem Sayısı: ${cashTransactions.filter(t => t.date === TODAY).length}\n\n📈 Kar marjı: %${Math.round(((todayRev - todayExp) / (todayRev || 1)) * 100)}`;

    if (isVacantQuery) {
      const vacantRooms = rooms.filter(r => r.status === 'boş');
      return isEn
        ? `🏨 **Vacant Rooms (${vacantRooms.length}):**\n\n${vacantRooms.map(r => `- Room ${r.id} (${r.type}) — ₺${r.rate.toLocaleString()}/night ${r.clean === 'kirli' ? '⚠️ Needs cleaning' : '✅ Ready'}`).join('\n')}\n\n${vacantRooms.filter(r => r.clean === 'temiz').length} rooms ready for sale.`
        : `🏨 **Müsait Odalar (${vacantRooms.length}):**\n\n${vacantRooms.map(r => `- Oda ${r.id} (${r.type}) — ₺${r.rate.toLocaleString()}/gece ${r.clean === 'kirli' ? '⚠️ Temizlik gerekli' : '✅ Hazır'}`).join('\n')}\n\n${vacantRooms.filter(r => r.clean === 'temiz').length} oda hemen satışa hazır.`;
    }

    if (isStockQuery && !isStockOrderQuery) return lowStock.length > 0
      ? (isEn
        ? `⚠️ **Critical Stock (${lowStock.length} items):**\n\n${lowStock.map(i => `- **${i.name}**: ${i.stock} units (min: ${i.minStock})`).join('\n')}\n\n🔔 Would you like me to create an order? (e.g. type "order stock")`
        : `⚠️ **Kritik Stok (${lowStock.length} ürün):**\n\n${lowStock.map(i => `- **${i.name}**: ${i.stock} adet (min: ${i.minStock})`).join('\n')}\n\n🔔 Sipariş oluşturmamı ister misiniz? (Örn: "Stok sipariş ver" yazın)`)
      : (isEn ? '✅ All stock levels are within normal range.' : '✅ Tüm stok seviyeleri normal aralıkta.');

    if (isStockOrderQuery) {
      addNotification({ type: 'success', msg: isEn ? `Auto purchase order created for ${lowStock.length} critical stock items!` : `Kritik stok kalemleri için otomatik otel siparişi oluşturuldu!` });
      return isEn
        ? `✅ **Order List Processed!** An automatic purchase request for ${lowStock.length} critically low items has been sent to the procurement department.`
        : `✅ **Sipariş Listesi İşlendi!** Kritik seviyede olan ${lowStock.length} ürün için satınalma departmanına otomatik talep listesi gönderilmiştir.`;
    }

    if (isVipQuery) return isEn
      ? `👤 **VIP Guests (${vips.length}):**\n\n${vips.map(g => `- **${g.name}** (${g.loyalty}) — ${g.visits} visits, ₺${g.totalSpent.toLocaleString()} total spent`).join('\n')}`
      : `👤 **VIP Misafirler (${vips.length}):**\n\n${vips.map(g => `- **${g.name}** (${g.loyalty}) — ${g.visits} ziyaret, ₺${g.totalSpent.toLocaleString()} toplam harcama`).join('\n')}`;

    if (isTaskQuery) return isEn
      ? `📋 **Pending Tasks (${pending.length}):**\n\n${pending.slice(0, 6).map(t => `- [${t.priority === 'high' ? '🔴' : t.priority === 'normal' ? '🟡' : '🟢'}] Room ${t.room || '-'}: ${t.desc} — ${t.assignee || 'Unassigned'}`).join('\n')}\n\n🔴 High priority: ${pending.filter(t => t.priority === 'high').length}`
      : `📋 **Bekleyen Görevler (${pending.length}):**\n\n${pending.slice(0, 6).map(t => `- [${t.priority === 'high' ? '🔴' : t.priority === 'normal' ? '🟡' : '🟢'}] Oda ${t.room || '-'}: ${t.desc} — ${t.assignee || 'Atanmamış'}`).join('\n')}\n\n🔴 Yüksek öncelikli: ${pending.filter(t => t.priority === 'high').length}`;

    if (isTechQuery) return techTasks.length > 0
      ? (isEn
        ? `🔧 **Active Technical Faults (${techTasks.length}):**\n\n${techTasks.map(t => `- Room ${t.room}: ${t.desc} — ${t.status === 'devam' ? '🟡 In Progress' : '🔴 Pending'}`).join('\n')}`
        : `🔧 **Aktif Teknik Arızalar (${techTasks.length}):**\n\n${techTasks.map(t => `- Oda ${t.room}: ${t.desc} — ${t.status === 'devam' ? '🟡 Devam Ediyor' : '🔴 Bekliyor'}`).join('\n')}`)
      : (isEn ? '✅ No active technical faults.' : '✅ Aktif teknik arıza bulunmuyor.');

    if (isBalQuery) return isEn
      ? `💳 **Open Balances (${openBal.length} reservations):**\n\n${openBal.map(r => `- **${r.guest}** (Room ${r.room}): ₺${r.balance.toLocaleString()}`).join('\n')}\n\nTotal: ₺${openBal.reduce((s, r) => s + r.balance, 0).toLocaleString()}`
      : `💳 **Açık Bakiyeler (${openBal.length} res.):**\n\n${openBal.map(r => `- **${r.guest}** (Oda ${r.room}): ₺${r.balance.toLocaleString()}`).join('\n')}\n\nToplam: ₺${openBal.reduce((s, r) => s + r.balance, 0).toLocaleString()}`;

    if (isStaffQuery) return isEn
      ? `👥 **Staff Status:**\n\n- Active: ${staff.filter(s => s.status === 'aktif').length}\n- On Leave: ${staff.filter(s => s.status === 'izinli').length}\n\n**By Department:**\n${[...new Set(staff.map(s => s.dept))].map(d => `- ${d}: ${staff.filter(s => s.dept === d).length} person(s)`).join('\n')}`
      : `👥 **Personel Durumu:**\n\n- Aktif: ${staff.filter(s => s.status === 'aktif').length}\n- İzinli: ${staff.filter(s => s.status === 'izinli').length}\n\n**Departman Dağılımı:**\n${[...new Set(staff.map(s => s.dept))].map(d => `- ${d}: ${staff.filter(s => s.dept === d).length} kişi`).join('\n')}`;

    if (isGuideQuery) return isEn
      ? `🧭 **Welcome to the Hoterfea AI Guide!**\n\nI know every corner of the system. You can ask me directly about any operation. Examples:\n\n- "How do I create an invoice?"\n- "Where do I find agency contracts?"\n- "Which menu has the housekeeping list?"\n\nI'll guide you to use the system with its 49 different modules as efficiently as possible. What would you like to do?`
      : `🧭 **Hoterfea Yapay Zeka Rehberine Hoş Geldiniz!**\n\nBen sistemin her köşesini bilen asistanınızım. Aklınıza gelen işlemi direkt bana sorabilirsiniz. Örnek:\n\n- "Fatura nasıl kesilir?"\n- "Acente sözleşmesini nerede bulurum?"\n- "Oda temizlik listesi hangi menüde?"\n\nSistemi 49 farklı modül üzerinden en verimli şekilde kullanmanız için size yol göstereceğim. Ne yapmak istersiniz?`;

    const findingKeywordsTr = ['nerede', 'nerden', 'nereden', 'hangi menü', 'bulurum', 'bulabilirim', 'nasıl yap', 'girebilirim', 'eklerim'];
    const findingKeywordsEn = ['where', 'how to', 'how do', 'which menu', 'find', 'locate', 'navigate'];
    const isSeekingGuide = [...findingKeywordsTr, ...findingKeywordsEn].some(fk => query.includes(fk));

    if (isSeekingGuide || query.length > 5) {
      const matchedModule = modulesConfig.find(m => {
        const matchesName = m.name.toLowerCase().includes(query.replace(/nerede|nasıl|yapılır|where|how/gi, '').trim());
        const matchesKeyword = m.keywords.some(k => query.includes(k.toLowerCase()));
        return matchesName || matchesKeyword;
      });

      if (matchedModule) {
        return isEn
          ? `🧭 **In-App Guide**\n\nTo perform this operation, use the following module from the left menu:\n\n- Category: **${matchedModule.category}**\n- Module: **${matchedModule.name}**\n\n(Click on this menu item to reach the relevant department's control screen.)`
          : `🧭 **Uygulama İçi Rehber**\n\nBu işlemi yapmak için sol menüden veya ana sayfaki listeden şu modülü kullanabilirsiniz:\n\n- Kategori: **${matchedModule.category}**\n- İlgili Modül: **${matchedModule.name}**\n\n(Bu menüye tıklayarak ilgili departmanın veya işlemin kontrol ekranına ulaşabilirsiniz.)`;
      } else if (isSeekingGuide) {
        return isEn
          ? `🤔 I couldn't exactly match your request to one of the 49 modules. Could you rephrase it? For example "Add reservation", "Stock status", etc.`
          : `🤔 Yapmak istediğiniz işlemi sistemdeki 49 modülden biriyle tam olarak eşleştiremedim. Biraz daha farklı kelimelerle, örneğin "Rezervasyon ekleme", "Stok durumu" gibi tarif edebilir misiniz?`;
      }
    }

    return isEn
      ? `🤔 I didn't fully understand your question. Here's what I can do:\n\n- App guidance ("Where is the invoice menu?")\n- Provide info (occupancy, revenue, vacant rooms, stock)\n- Create tasks ("Room 102 needs cleaning" or "Room 205 AC broken")\n- Automate orders ("Order critical stock")`
      : `🤔 Sorunuzu tam anlayamadım. Şunları yapabilirim:\n\n- Uygulama rehberliği ("Fatura menüsü nerede?")\n- Bilgi veririm (Doluluk, gelir, boş odalar, stok)\n- Görev oluştururum ("Oda 102 temizlenecek" veya "Oda 205 klima bozuk")\n- Sipariş otomatize edebilirim ("Kritik stok sipariş ver")`;
  };

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: processResponseAndActions(msg) }]);
      setTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <div className="ai-chat">
      <div className="chat-quick">
        <Sparkles size={14} color="#8b5cf6"/>
        <span>{isEn ? 'Smart Commands:' : 'Akıllı Komutlar:'}</span>
        <div className="quick-pills">
          {QUICK_QUESTIONS.map(q => (
            <button key={q} className="quick-pill" onClick={() => sendMessage(q)}>{q}</button>
          ))}
        </div>
      </div>

      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div key={i} className={`chat-msg ${m.role}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="msg-avatar">{m.role === 'ai' ? <Bot size={16}/> : <User size={16}/>}</div>
              <div className="msg-bubble">
                {m.text.split('\n').map((line, j) => <p key={j}>{line.replace(/\*\*(.*?)\*\*/g, (_, t) => t)}</p>)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div className="chat-msg ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="msg-avatar"><Bot size={16}/></div>
            <div className="msg-bubble typing"><span/><span/><span/></div>
          </motion.div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div className="chat-input-bar">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder={isEn ? 'Get info or give a command (e.g. Room 102 needs cleaning)...' : 'Bilgi alın veya komut verin (Örn: Oda 102 temizlensin)...'}
        />
        <button className="chat-send" onClick={() => sendMessage()} disabled={!input.trim() || typing}><Send size={16}/></button>
        <button className="chat-reset" title={isEn ? 'Reset Chat' : 'Sohbeti Sıfırla'} onClick={() => setMessages([{ role: 'ai', text: isEn ? 'Chat reset. How can I help you?' : 'Sohbet sıfırlandı. Size nasıl yardımcı olabilirim?' }])}><RotateCcw size={14}/></button>
      </div>
    </div>
  );
};

export default AIChatbot;
