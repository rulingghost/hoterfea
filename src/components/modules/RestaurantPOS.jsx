import React, { useState } from 'react';
import { useModuleTranslation } from '../../context/LanguageContext';
import { useHotel } from '../../context/HotelContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Minus, ShoppingCart, CheckCircle,
  CreditCard, Search, Printer
} from 'lucide-react';

const RestaurantPOS = () => {
  const { mt, language } = useModuleTranslation();
  const _t = (k) => mt('pos.' + k);
  const _c = (k) => mt('common.' + k);
  const { reservations, addFolioLine, addCashTransaction, addNotification } = useHotel();

  const MENU = language === 'tr' ? [
    { cat:'Kahvaltı', items:[
      { id:'FD-01', name:'Açık Büfe Kahvaltı', price:280, emoji:'🥞' },
      { id:'FD-02', name:'Fransız Toast',       price:120, emoji:'🍞' },
      { id:'FD-03', name:'Yumurta Benedict',    price:150, emoji:'🍳' },
      { id:'FD-04', name:'Granola & Yoğurt',    price:95,  emoji:'🥣' },
    ]},
    { cat:'Ana Yemek', items:[
      { id:'FD-05', name:'Izgara Somon',         price:380, emoji:'🐟' },
      { id:'FD-06', name:'Dana Biftek',          price:560, emoji:'🥩' },
      { id:'FD-07', name:'Tavuk Şiş',            price:220, emoji:'🍢' },
      { id:'FD-08', name:'Sebze Risotto',        price:180, emoji:'🍚' },
      { id:'FD-09', name:'Kuzu Tandır',          price:480, emoji:'🍖' },
    ]},
    { cat:'İçecekler', items:[
      { id:'FD-10', name:'Türk Çayı',            price:25,  emoji:'🍵' },
      { id:'FD-11', name:'Taze Sıkılmış Portakal',price:65, emoji:'🍊' },
      { id:'FD-12', name:'Kahve (Espresso)',      price:55,  emoji:'☕' },
      { id:'FD-13', name:'Su (500ml)',            price:15,  emoji:'💧' },
      { id:'FD-14', name:'Şarap (Bardak)',        price:180, emoji:'🍷' },
    ]},
    { cat:'Tatlılar', items:[
      { id:'FD-15', name:'Baklava Tabağı',       price:120, emoji:'🍯' },
      { id:'FD-16', name:'Cheesecake',           price:95,  emoji:'🍰' },
      { id:'FD-17', name:'Dondurma (2 Top)',     price:75,  emoji:'🍨' },
    ]},
  ] : [
    { cat:'Breakfast', items:[
      { id:'FD-01', name:'Open Buffet Breakfast', price:280, emoji:'🥞' },
      { id:'FD-02', name:'French Toast',          price:120, emoji:'🍞' },
      { id:'FD-03', name:'Eggs Benedict',         price:150, emoji:'🍳' },
      { id:'FD-04', name:'Granola & Yogurt',      price:95,  emoji:'🥣' },
    ]},
    { cat:'Main Course', items:[
      { id:'FD-05', name:'Grilled Salmon',        price:380, emoji:'🐟' },
      { id:'FD-06', name:'Beef Steak',            price:560, emoji:'🥩' },
      { id:'FD-07', name:'Chicken Skewer',        price:220, emoji:'🍢' },
      { id:'FD-08', name:'Vegetable Risotto',     price:180, emoji:'🍚' },
      { id:'FD-09', name:'Lamb Tandoor',          price:480, emoji:'🍖' },
    ]},
    { cat:'Beverages', items:[
      { id:'FD-10', name:'Turkish Tea',           price:25,  emoji:'🍵' },
      { id:'FD-11', name:'Fresh Orange Juice',    price:65,  emoji:'🍊' },
      { id:'FD-12', name:'Coffee (Espresso)',      price:55,  emoji:'☕' },
      { id:'FD-13', name:'Water (500ml)',          price:15,  emoji:'💧' },
      { id:'FD-14', name:'Wine (Glass)',           price:180, emoji:'🍷' },
    ]},
    { cat:'Desserts', items:[
      { id:'FD-15', name:'Baklava Plate',         price:120, emoji:'🍯' },
      { id:'FD-16', name:'Cheesecake',            price:95,  emoji:'🍰' },
      { id:'FD-17', name:'Ice Cream (2 Scoops)', price:75,  emoji:'🍨' },
    ]},
  ];

  const [activeCat, setActiveCat] = useState(MENU[0].cat);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [orderMode, setOrderMode] = useState('masa');
  const [tableNo, setTableNo] = useState('');
  const [selectedRes, setSelectedRes] = useState('');
  const [payMethod, setPayMethod] = useState(language === 'tr' ? 'Nakit' : 'Cash');
  const [success, setSuccess] = useState(false);

  const PAY_METHODS = language === 'tr' ? ['Nakit','Kredi Kartı'] : ['Cash','Credit Card'];

  const inHouse = reservations.filter(r => r.status === 'check-in');
  const catItems = MENU.find(c => c.cat === activeCat)?.items || [];
  const filteredItems = search
    ? MENU.flatMap(c => c.items).filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : catItems;

  const addToCart = (item) => setCart(prev => {
    const ex = prev.find(c => c.id === item.id);
    if (ex) return prev.map(c => c.id === item.id ? {...c, qty: c.qty + 1} : c);
    return [...prev, {...item, qty: 1}];
  });

  const changeQty = (id, delta) => setCart(prev =>
    prev.map(c => c.id === id ? {...c, qty: c.qty + delta} : c).filter(c => c.qty > 0)
  );

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  const handleOrder = () => {
    if (cart.length === 0) return;
    if (orderMode === 'oda' && selectedRes) {
      addFolioLine(selectedRes, {
        desc: `${language === 'tr' ? 'Restoran Siparişi' : 'Restaurant Order'} (${cart.map(c => `${c.name} x${c.qty}`).join(', ')})`,
        amount: total, type: 'extra'
      });
    } else {
      addCashTransaction({
        type: 'gelir',
        desc: `${language === 'tr' ? 'Restoran' : 'Restaurant'} — ${language === 'tr' ? 'Masa' : 'Table'} ${tableNo || '?'}`,
        amount: total, method: payMethod
      });
    }
    addNotification({ type: 'success', msg: `${language === 'tr' ? 'Sipariş tamamlandı' : 'Order completed'} — ₺${total.toLocaleString()}` });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setCart([]); setTableNo(''); }, 1800);
  };

  return (
    <div className="pos-layout">
      {/* Left: Menu */}
      <div className="pos-menu">
        <div className="pos-search">
          <Search size={15}/><input placeholder={_c('search')} value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        {!search && (
          <div className="cat-tabs">
            {MENU.map(c => (
              <button key={c.cat} className={`cat-btn ${activeCat === c.cat ? 'active' : ''}`} onClick={() => setActiveCat(c.cat)}>
                {c.cat}
              </button>
            ))}
          </div>
        )}
        <div className="menu-items">
          {filteredItems.map(item => (
            <motion.button key={item.id} className="menu-item" onClick={() => addToCart(item)} whileHover={{scale:1.03}}>
              <div className="mi-emoji">{item.emoji}</div>
              <div className="mi-info"><strong>{item.name}</strong></div>
              <div className="mi-price">₺{item.price}</div>
              {cart.find(c => c.id === item.id) && (
                <div className="mi-badge">{cart.find(c => c.id === item.id)?.qty}</div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right: Cart */}
      <div className="pos-cart">
        <div className="cart-head">
          <h3><ShoppingCart size={18}/> {language === 'tr' ? 'Sipariş' : 'Order'}</h3>
          {cart.length > 0 && <button className="clear-btn" onClick={() => setCart([])}>{_c('clear')}</button>}
        </div>

        <div className="order-mode">
          <button className={orderMode === 'masa' ? 'active' : ''} onClick={() => setOrderMode('masa')}>
            {language === 'tr' ? 'Masa' : 'Table'}
          </button>
          <button className={orderMode === 'oda' ? 'active' : ''} onClick={() => setOrderMode('oda')}>
            {language === 'tr' ? 'Odaya Yaz' : 'Room Charge'}
          </button>
        </div>

        {orderMode === 'masa' && (
          <input className="table-input" placeholder={language === 'tr' ? 'Masa numarası...' : 'Table number...'} value={tableNo} onChange={e => setTableNo(e.target.value)}/>
        )}
        {orderMode === 'oda' && (
          <select className="table-input" value={selectedRes} onChange={e => setSelectedRes(e.target.value)}>
            <option value="">{_c('room')}</option>
            {inHouse.map(r => <option key={r.id} value={r.id}>{language === 'tr' ? 'Oda' : 'Room'} {r.room} — {r.guest}</option>)}
          </select>
        )}

        <div className="cart-items">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div key={item.id} className="cart-item" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}>
                <span className="ci-emoji">{item.emoji}</span>
                <div className="ci-info">
                  <strong>{item.name}</strong>
                  <span>₺{(item.price * item.qty).toLocaleString()}</span>
                </div>
                <div className="qty-ctrl">
                  <button onClick={() => changeQty(item.id, -1)}><Minus size={12}/></button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, +1)}><Plus size={12}/></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && <div className="empty-cart">{language === 'tr' ? 'Henüz ürün eklenmedi' : 'No items added yet'}</div>}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>{itemCount} {language === 'tr' ? 'ürün' : 'items'}</span>
              <strong>₺{total.toLocaleString()}</strong>
            </div>
            {orderMode === 'masa' && (
              <div className="pay-methods">
                {PAY_METHODS.map(m => (
                  <button key={m} className={payMethod === m ? 'active' : ''} onClick={() => setPayMethod(m)}>{m}</button>
                ))}
              </div>
            )}
            {success ? (
              <div className="order-success">
                <CheckCircle size={20} color="#10b981"/> {language === 'tr' ? 'Sipariş Tamamlandı!' : 'Order Completed!'}
              </div>
            ) : (
              <button className="order-btn" onClick={handleOrder} disabled={orderMode === 'oda' && !selectedRes}>
                {orderMode === 'oda'
                  ? (language === 'tr' ? 'Odaya Faturala' : 'Charge to Room')
                  : `${language === 'tr' ? 'Ödeme Al' : 'Collect'} — ₺${total.toLocaleString()}`}
              </button>
            )}
            <button className="print-btn"><Printer size={14}/> {language === 'tr' ? 'Fiş Yazdır' : 'Print Receipt'}</button>
          </div>
        )}
      </div>

      <style>{`
        .pos-layout { display:flex; height:calc(100vh - 70px); }
        .pos-menu { flex:1; display:flex; flex-direction:column; padding:18px; gap:12px; overflow:hidden; }
        .pos-search { display:flex; align-items:center; gap:8px; background:white; border:1.5px solid #e2e8f0; padding:10px 14px; border-radius:12px; }
        .pos-search input { border:none; background:transparent; outline:none; font-size:13px; width:100%; }
        .cat-tabs { display:flex; gap:8px; flex-wrap:wrap; }
        .cat-btn { padding:8px 16px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:13px; font-weight:700; color:#64748b; cursor:pointer; }
        .cat-btn.active { background:#1e293b; color:white; border-color:#1e293b; }
        .menu-items { flex:1; display:grid; grid-template-columns:repeat(auto-fill, minmax(160px, 1fr)); gap:10px; overflow-y:auto; align-content:start; }
        .menu-item { position:relative; background:white; border:1.5px solid #e2e8f0; border-radius:16px; padding:16px 10px; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:6px; transition:0.15s; }
        .menu-item:hover { border-color:#3b82f6; background:#f8fbff; }
        .mi-emoji { font-size:28px; }
        .mi-info strong { font-size:12px; color:#1e293b; font-weight:700; text-align:center; }
        .mi-price { font-size:14px; font-weight:900; color:#3b82f6; }
        .mi-badge { position:absolute; top:-6px; right:-6px; background:#ef4444; color:white; width:20px; height:20px; border-radius:50%; font-size:10px; font-weight:900; display:flex; align-items:center; justify-content:center; }
        .pos-cart { width:320px; background:white; border-left:1px solid #e2e8f0; display:flex; flex-direction:column; padding:16px; gap:12px; flex-shrink:0; }
        .cart-head { display:flex; justify-content:space-between; align-items:center; }
        .cart-head h3 { font-size:15px; font-weight:800; color:#1e293b; display:flex; align-items:center; gap:8px; }
        .clear-btn { font-size:11px; color:#ef4444; background:transparent; border:none; cursor:pointer; font-weight:700; }
        .order-mode { display:flex; border:1.5px solid #e2e8f0; border-radius:10px; overflow:hidden; }
        .order-mode button { flex:1; padding:9px; border:none; background:white; font-size:12px; font-weight:700; color:#64748b; cursor:pointer; }
        .order-mode button.active { background:#1e293b; color:white; }
        .table-input { padding:10px 14px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:13px; outline:none; width:100%; }
        .cart-items { flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; }
        .cart-item { display:flex; align-items:center; gap:10px; padding:12px; background:#f8fafc; border-radius:12px; }
        .ci-emoji { font-size:22px; flex-shrink:0; }
        .ci-info { flex:1; }
        .ci-info strong { display:block; font-size:12px; color:#1e293b; font-weight:700; }
        .ci-info span { font-size:12px; color:#3b82f6; font-weight:700; }
        .qty-ctrl { display:flex; align-items:center; gap:6px; }
        .qty-ctrl button { width:24px; height:24px; border-radius:50%; border:1.5px solid #e2e8f0; background:white; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .qty-ctrl span { font-size:14px; font-weight:900; color:#1e293b; width:20px; text-align:center; }
        .empty-cart { text-align:center; color:#94a3b8; font-size:13px; padding:30px 0; }
        .cart-footer { display:flex; flex-direction:column; gap:10px; border-top:1px solid #f1f5f9; padding-top:12px; }
        .cart-total { display:flex; justify-content:space-between; font-size:14px; font-weight:700; }
        .cart-total strong { font-size:20px; font-weight:900; color:#1e293b; }
        .pay-methods { display:flex; gap:8px; }
        .pay-methods button { flex:1; padding:8px; border:1.5px solid #e2e8f0; background:white; border-radius:10px; font-size:12px; font-weight:700; cursor:pointer; }
        .pay-methods button.active { background:#1e293b; color:white; border-color:#1e293b; }
        .order-btn { padding:14px; border-radius:12px; border:none; background:#3b82f6; color:white; font-size:13px; font-weight:800; cursor:pointer; }
        .order-btn:disabled { opacity:.5; cursor:not-allowed; }
        .order-success { display:flex; align-items:center; justify-content:center; gap:8px; color:#10b981; font-weight:800; padding:12px; background:#f0fdf4; border-radius:10px; }
        .print-btn { padding:10px; border-radius:10px; border:1.5px solid #e2e8f0; background:white; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; color:#64748b; }
      `}</style>
    </div>
  );
};

export default RestaurantPOS;
