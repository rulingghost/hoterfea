import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const TODAY = '2026-03-14';

// ─── Initial demo data ────────────────────────────────────────────
const initialRooms = [
  { id: '101', type: 'Standard', floor: 1, status: 'dolu',    clean: 'temiz',   guest: 'Ahmet Yılmaz',  checkIn: '2026-03-13', checkOut: '2026-03-16', pax: 2, rate: 1500 },
  { id: '102', type: 'Standard', floor: 1, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 1500 },
  { id: '103', type: 'Deluxe',   floor: 1, status: 'dolu',    clean: 'kirli',   guest: 'Hans Müller',   checkIn: '2026-03-12', checkOut: '2026-03-15', pax: 1, rate: 2250 },
  { id: '104', type: 'Deluxe',   floor: 1, status: 'arızalı', clean: 'kirli',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 2250 },
  { id: '105', type: 'Standard', floor: 1, status: 'boş',     clean: 'kirli',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 1500 },
  { id: '201', type: 'Suite',    floor: 2, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 4000 },
  { id: '202', type: 'Standard', floor: 2, status: 'dolu',    clean: 'temiz',   guest: 'Fatma Demir',   checkIn: '2026-03-13', checkOut: '2026-03-17', pax: 2, rate: 1500 },
  { id: '203', type: 'Deluxe',   floor: 2, status: 'dolu',    clean: 'kirli',   guest: 'John Smith',    checkIn: '2026-03-11', checkOut: '2026-03-15', pax: 3, rate: 2250 },
  { id: '204', type: 'Suite',    floor: 2, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 4000 },
  { id: '205', type: 'Standard', floor: 2, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 1500 },
  { id: '301', type: 'Standard', floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Maria Lopez',   checkIn: '2026-03-13', checkOut: '2026-03-16', pax: 2, rate: 1500 },
  { id: '302', type: 'Penthouse',floor: 3, status: 'boş',     clean: 'temiz',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 7500 },
  { id: '303', type: 'Deluxe',   floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Kemal Arslan',  checkIn: '2026-03-14', checkOut: '2026-03-17', pax: 2, rate: 2250 },
  { id: '304', type: 'Suite',    floor: 3, status: 'boş',     clean: 'kirli',   guest: null,            checkIn: null,         checkOut: null,         pax: 0, rate: 4000 },
];

const initialReservations = [
  { id: 'RES-001', guest: 'Ahmet Yılmaz',  guestId:'G-001', room: '101', type: 'Standard', channel: 'Booking.com', checkIn: '2026-03-13', checkOut: '2026-03-16', nights: 3, pax: 2, status: 'check-in',  total: 4500,  paid: 4500,  balance: 0,    board:'HB', notes:'' },
  { id: 'RES-002', guest: 'Hans Müller',    guestId:'G-002', room: '103', type: 'Deluxe',   channel: 'Expedia',     checkIn: '2026-03-12', checkOut: '2026-03-15', nights: 3, pax: 1, status: 'check-in',  total: 6750,  paid: 3000,  balance: 3750, board:'BB', notes:'' },
  { id: 'RES-003', guest: 'Fatma Demir',   guestId:'G-003', room: '202', type: 'Standard', channel: 'Direkt',      checkIn: '2026-03-13', checkOut: '2026-03-17', nights: 4, pax: 2, status: 'check-in',  total: 6000,  paid: 6000,  balance: 0,    board:'AI', notes:'' },
  { id: 'RES-004', guest: 'John Smith',    guestId:'G-004', room: '203', type: 'Deluxe',   channel: 'Booking.com', checkIn: '2026-03-11', checkOut: '2026-03-14', nights: 3, pax: 3, status: 'check-in',  total: 9000,  paid: 6000,  balance: 3000, board:'HB', notes:'VIP - Extra havlu' },
  { id: 'RES-005', guest: 'Maria Lopez',   guestId:'G-005', room: '301', type: 'Standard', channel: 'HotelRunner', checkIn: '2026-03-13', checkOut: '2026-03-16', nights: 3, pax: 2, status: 'check-in',  total: 4500,  paid: 1500,  balance: 3000, board:'BB', notes:'' },
  { id: 'RES-006', guest: 'Selin Kaya',    guestId:null,    room: null,  type: 'Suite',    channel: 'Direkt',      checkIn: '2026-03-15', checkOut: '2026-03-18', nights: 3, pax: 2, status: 'gelecek',   total: 12000, paid: 3000,  balance: 9000, board:'AI', notes:'' },
  { id: 'RES-007', guest: 'David Wilson',  guestId:null,    room: null,  type: 'Deluxe',   channel: 'TUI',         checkIn: '2026-03-16', checkOut: '2026-03-20', nights: 4, pax: 2, status: 'gelecek',   total: 9000,  paid: 0,     balance: 9000, board:'HB', notes:'' },
  { id: 'RES-008', guest: 'Kemal Arslan',  guestId:null,    room: '303', type: 'Deluxe',   channel: 'Direkt',      checkIn: '2026-03-14', checkOut: '2026-03-17', nights: 3, pax: 2, status: 'check-in',  total: 6750,  paid: 6750,  balance: 0,    board:'HB', notes:'' },
];

const initialGuests = [
  { id: 'G-001', name: 'Ahmet Yılmaz',  nationality: 'TR', phone: '+90 532 111 22 33', email: 'ahmet@example.com',  loyalty: 'Gold',     visits: 12, totalSpent: 48000,  lastVisit: '2026-03-13', dob:'1980-05-14', tcNo:'12345678900', passport:'' },
  { id: 'G-002', name: 'Hans Müller',   nationality: 'DE', phone: '+49 151 234 5678',  email: 'hans@example.com',   loyalty: 'Platinum', visits: 25, totalSpent: 120000, lastVisit: '2026-03-12', dob:'1972-08-22', tcNo:'',           passport:'C4V8X2' },
  { id: 'G-003', name: 'Fatma Demir',  nationality: 'TR', phone: '+90 542 333 44 55', email: 'fatma@example.com',  loyalty: 'Silver',   visits: 5,  totalSpent: 18000,  lastVisit: '2026-03-13', dob:'1990-03-01', tcNo:'98765432100', passport:'' },
  { id: 'G-004', name: 'John Smith',   nationality: 'US', phone: '+1 555 678 9012',   email: 'john@example.com',   loyalty: 'None',     visits: 1,  totalSpent: 9000,   lastVisit: '2026-03-11', dob:'1985-11-30', tcNo:'',           passport:'US992010' },
  { id: 'G-005', name: 'Maria Lopez',  nationality: 'ES', phone: '+34 600 123 456',   email: 'maria@example.com',  loyalty: 'Silver',   visits: 3,  totalSpent: 12000,  lastVisit: '2026-03-13', dob:'1995-07-19', tcNo:'',           passport:'ES440122' },
];

const initialTasks = [
  { id: 'T-001', type: 'housekeeping', room: '103', desc: 'Oda temizliği (check-out hazırlığı)', priority: 'high',   status: 'bekliyor', assignee: 'Ayşe H.',  created: '09:00', note:'' },
  { id: 'T-002', type: 'housekeeping', room: '203', desc: 'Havlu değişimi ve minibar kontrolü',  priority: 'normal', status: 'devam',    assignee: 'Fatih H.', created: '09:15', note:'' },
  { id: 'T-003', type: 'technical',    room: '104', desc: 'Klima arızası — çalışmıyor',          priority: 'high',   status: 'bekliyor', assignee: 'Murat T.', created: '08:30', note:'' },
  { id: 'T-004', type: 'technical',    room: '201', desc: 'TV uzaktan kumanda değişimi',         priority: 'low',    status: 'bitti',    assignee: 'Murat T.', created: '07:45', note:'Yenisiyle değiştirildi' },
  { id: 'T-005', type: 'housekeeping', room: '105', desc: 'Check-out sonrası tam temizlik',      priority: 'normal', status: 'bekliyor', assignee: '',         created: '08:00', note:'' },
];

// Folio lines for each reservation
const initialFolioLines = {
  'RES-001': [
    { id:'F-001', desc:'Konaklama (3 gece × ₺1500)', amount: 4500, type:'accommodation', date:'2026-03-13' },
  ],
  'RES-002': [
    { id:'F-002', desc:'Konaklama (3 gece × ₺2250)', amount: 6750, type:'accommodation', date:'2026-03-12' },
    { id:'F-003', desc:'Minibar', amount: 180, type:'extra', date:'2026-03-13' },
    { id:'F-004', desc:'SPA Masaj', amount: 350, type:'extra', date:'2026-03-14' },
  ],
  'RES-003': [
    { id:'F-005', desc:'Konaklama (4 gece × ₺1500)', amount: 6000, type:'accommodation', date:'2026-03-13' },
  ],
  'RES-004': [
    { id:'F-006', desc:'Konaklama (3 gece × ₺2250)', amount: 6750, type:'accommodation', date:'2026-03-11' },
    { id:'F-007', desc:'Restoran — Akşam Yemeği', amount: 850, type:'extra', date:'2026-03-12' },
    { id:'F-008', desc:'Minibar', amount: 220, type:'extra', date:'2026-03-13' },
    { id:'F-009', desc:'Oda servisi', amount: 180, type:'extra', date:'2026-03-14' },
  ],
  'RES-005': [
    { id:'F-010', desc:'Konaklama (3 gece × ₺1500)', amount: 4500, type:'accommodation', date:'2026-03-13' },
  ],
  'RES-008': [
    { id:'F-011', desc:'Konaklama (3 gece × ₺2250)', amount: 6750, type:'accommodation', date:'2026-03-14' },
  ],
};

const initialCashTransactions = [
  { id:'C-001', type:'gelir',  desc:'RES-001 Konaklama Tahsilatı', amount:4500, method:'Kredi Kartı', time:'09:12', date: TODAY },
  { id:'C-002', type:'gelir',  desc:'RES-002 Ön Ödeme',             amount:3000, method:'Nakit',      time:'10:30', date: TODAY },
  { id:'C-003', type:'gider',  desc:'Ofis Malzemesi Alımı',          amount:250,  method:'Nakit',      time:'11:05', date: TODAY },
  { id:'C-004', type:'gelir',  desc:'RES-008 Tam Ödeme',             amount:6750, method:'EFT/Havale', time:'12:15', date: TODAY },
];

// ─── Context ──────────────────────────────────────────────────────
const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [rooms, setRooms]                   = useState(initialRooms);
  const [reservations, setReservations]     = useState(initialReservations);
  const [guests, setGuests]                 = useState(initialGuests);
  const [tasks, setTasks]                   = useState(initialTasks);
  const [folioLines, setFolioLines]         = useState(initialFolioLines);
  const [cashTransactions, setCashTransactions] = useState(initialCashTransactions);
  const [notifications, setNotifications]   = useState([
    { id: 'N-001', type: 'warn',    msg: 'KBS: 3 misafir bildirimi bekliyor', time: '09:05' },
    { id: 'N-002', type: 'info',    msg: 'Oda 104 arıza kaydı açıldı',         time: '08:31' },
    { id: 'N-003', type: 'success', msg: 'RES-001 check-in tamamlandı',         time: '08:00' },
  ]);

  const idCounter = useRef({ res: 8, guest: 5, task: 5, cash: 4, folio: 11, notif: 3 });
  const nextId = (key, prefix, n = 3) => {
    idCounter.current[key]++;
    return `${prefix}-${String(idCounter.current[key]).padStart(n, '0')}`;
  };

  // ── Notification helper (defined first so others can call it) ──
  const addNotification = useCallback((n) => {
    const note = {
      ...n,
      id: `N-${Date.now()}`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications(prev => [note, ...prev.slice(0, 29)]);
  }, []);

  // ── Room actions ──────────────────────────────────────────────
  const updateRoomStatus = useCallback((roomId, patch) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, ...patch } : r));
  }, []);

  // ── Reservation actions ───────────────────────────────────────
  const addReservation = useCallback((res) => {
    const id = nextId('res', 'RES');
    const newRes = { ...res, id, balance: res.total - (res.paid || 0) };
    setReservations(prev => [newRes, ...prev]);
    setFolioLines(prev => ({
      ...prev,
      [id]: [{ id: nextId('folio','F'), desc: `Konaklama (${res.nights} gece × ₺${res.rate || 0})`, amount: res.total, type: 'accommodation', date: res.checkIn }]
    }));
    addNotification({ type: 'success', msg: `Yeni rezervasyon oluşturuldu: ${res.guest}` });
  }, [addNotification]);

  const updateReservation = useCallback((id, patch) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }, []);

  const checkIn = useCallback((resId, roomId) => {
    setReservations(prev => prev.map(r =>
      r.id === resId ? { ...r, status: 'check-in', room: roomId || r.room } : r
    ));
    const res = reservations.find(r => r.id === resId);
    const targetRoom = roomId || res?.room;
    if (targetRoom) updateRoomStatus(targetRoom, { status: 'dolu', guest: res?.guest, checkIn: res?.checkIn, checkOut: res?.checkOut, pax: res?.pax });
    addNotification({ type: 'success', msg: `✓ Check-in: ${res?.guest} — Oda ${targetRoom}` });
  }, [reservations, updateRoomStatus, addNotification]);

  const checkOut = useCallback((resId) => {
    const res = reservations.find(r => r.id === resId);
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'check-out' } : r));
    if (res?.room) updateRoomStatus(res.room, { status: 'boş', clean: 'kirli', guest: null, checkIn: null, checkOut: null, pax: 0 });
    addTask({ type: 'housekeeping', room: res?.room, desc: `Check-out sonrası temizlik — ${res?.guest}`, priority: 'high', assignee: '', status: 'bekliyor', note: '' });
    addNotification({ type: 'info', msg: `Check-out: ${res?.guest} — Oda ${res?.room}` });
  }, [reservations, updateRoomStatus, addNotification]);

  // ── Folio actions ─────────────────────────────────────────────
  const addFolioLine = useCallback((resId, line) => {
    const newLine = { ...line, id: nextId('folio','F'), date: TODAY };
    setFolioLines(prev => ({
      ...prev,
      [resId]: [...(prev[resId] || []), newLine],
    }));
    // increase total & balance
    setReservations(prev => prev.map(r =>
      r.id === resId ? { ...r, total: r.total + line.amount, balance: r.balance + line.amount } : r
    ));
    addNotification({ type: 'info', msg: `Folio güncellendi: ${line.desc} — ₺${line.amount}` });
  }, [addNotification]);

  const deleteFolioLine = useCallback((resId, lineId) => {
    setFolioLines(prev => {
      const lines = prev[resId] || [];
      const line  = lines.find(l => l.id === lineId);
      const remaining = lines.filter(l => l.id !== lineId);
      if (line) {
        setReservations(r => r.map(res =>
          res.id === resId ? { ...res, total: res.total - line.amount, balance: res.balance - line.amount } : res
        ));
      }
      return { ...prev, [resId]: remaining };
    });
  }, []);

  // ── Payment action ────────────────────────────────────────────
  const makePayment = useCallback((resId, amount, method) => {
    setReservations(prev => prev.map(r =>
      r.id === resId ? { ...r, paid: r.paid + amount, balance: Math.max(0, r.balance - amount) } : r
    ));
    const res = reservations.find(r => r.id === resId);
    addCashTransaction({ type: 'gelir', desc: `${resId} Tahsilat — ${res?.guest}`, amount, method });
    addNotification({ type: 'success', msg: `₺${amount.toLocaleString()} tahsilat alındı — ${method}` });
  }, [reservations, addNotification]);

  // ── Cash actions ──────────────────────────────────────────────
  const addCashTransaction = useCallback((tx) => {
    const newTx = { ...tx, id: nextId('cash','C'), time: new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}), date: TODAY };
    setCashTransactions(prev => [newTx, ...prev]);
  }, []);

  // ── Guest actions ─────────────────────────────────────────────
  const addGuest = useCallback((g) => {
    const id = nextId('guest','G');
    setGuests(prev => [{ ...g, id, visits: 1, totalSpent: 0, lastVisit: TODAY }, ...prev]);
    addNotification({ type: 'success', msg: `Yeni misafir kaydı: ${g.name}` });
    return id;
  }, [addNotification]);

  // ── Task actions ──────────────────────────────────────────────
  const addTask = useCallback((task) => {
    const newTask = {
      ...task,
      id: nextId('task','T'),
      created: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
    if (patch.status === 'bitti') {
      addNotification({ type: 'success', msg: `Görev tamamlandı: ${tasks.find(t=>t.id===id)?.desc?.substring(0,40)}` });
    }
  }, [tasks, addNotification]);

  // ── Computed stats ────────────────────────────────────────────
  const stats = {
    totalRooms:      rooms.length,
    occupied:        rooms.filter(r => r.status === 'dolu').length,
    vacant:          rooms.filter(r => r.status === 'boş').length,
    outOfOrder:      rooms.filter(r => r.status === 'arızalı').length,
    dirty:           rooms.filter(r => r.clean === 'kirli').length,
    todayArrivals:   reservations.filter(r => r.checkIn === TODAY && r.status === 'gelecek').length,
    todayDepartures: reservations.filter(r => r.checkOut === TODAY && r.status === 'check-in').length,
    inHouse:         reservations.filter(r => r.status === 'check-in').length,
    pendingTasks:    tasks.filter(t => t.status !== 'bitti').length,
    occupancyRate:   Math.round((rooms.filter(r => r.status === 'dolu').length / rooms.length) * 100),
    todayRevenue:    cashTransactions.filter(t => t.type === 'gelir' && t.date === TODAY).reduce((s,t) => s+t.amount, 0),
    totalBalance:    reservations.filter(r => r.status === 'check-in').reduce((s,r) => s+r.balance, 0),
    notifCount:      notifications.filter(n => n.type === 'warn').length,
  };

  return (
    <HotelContext.Provider value={{
      rooms, reservations, guests, tasks, folioLines, cashTransactions, notifications, stats, TODAY,
      updateRoomStatus, addReservation, updateReservation, checkIn, checkOut,
      addFolioLine, deleteFolioLine, makePayment,
      addCashTransaction, addGuest,
      addTask, updateTask, addNotification,
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error('useHotel must be used within HotelProvider');
  return ctx;
};

export default HotelContext;
