import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const TODAY = new Date().toISOString().slice(0, 10);

// ─── Initial demo data ────────────────────────────────────────────
const initialRooms = [
  // Kat 1
  { id: '101', type: 'Standard', floor: 1, status: 'dolu',    clean: 'temiz',   guest: 'Ahmet Yılmaz',     checkIn: '2026-03-13', checkOut: '2026-03-16', pax: 2, rate: 1500 },
  { id: '102', type: 'Standard', floor: 1, status: 'dolu',    clean: 'temiz',   guest: 'Elif Çelik',       checkIn: '2026-03-19', checkOut: '2026-03-23', pax: 1, rate: 1500 },
  { id: '103', type: 'Deluxe',   floor: 1, status: 'dolu',    clean: 'kirli',   guest: 'Hans Müller',      checkIn: '2026-03-12', checkOut: '2026-03-15', pax: 1, rate: 2250 },
  { id: '104', type: 'Deluxe',   floor: 1, status: 'arızalı', clean: 'kirli',   guest: null,               checkIn: null,         checkOut: null,         pax: 0, rate: 2250 },
  { id: '105', type: 'Standard', floor: 1, status: 'dolu',    clean: 'temiz',   guest: 'Pierre Dupont',    checkIn: '2026-03-20', checkOut: '2026-03-25', pax: 2, rate: 1500 },
  { id: '106', type: 'Standard', floor: 1, status: 'boş',     clean: 'kirli',   guest: null,               checkIn: null,         checkOut: null,         pax: 0, rate: 1500 },
  // Kat 2
  { id: '201', type: 'Suite',    floor: 2, status: 'dolu',    clean: 'temiz',   guest: 'Olga Petrova',     checkIn: '2026-03-18', checkOut: '2026-03-22', pax: 2, rate: 4000 },
  { id: '202', type: 'Standard', floor: 2, status: 'dolu',    clean: 'temiz',   guest: 'Fatma Demir',      checkIn: '2026-03-13', checkOut: '2026-03-17', pax: 2, rate: 1500 },
  { id: '203', type: 'Deluxe',   floor: 2, status: 'dolu',    clean: 'kirli',   guest: 'John Smith',       checkIn: '2026-03-11', checkOut: '2026-03-15', pax: 3, rate: 2250 },
  { id: '204', type: 'Suite',    floor: 2, status: 'dolu',    clean: 'temiz',   guest: 'Yuki Tanaka',      checkIn: '2026-03-20', checkOut: '2026-03-26', pax: 2, rate: 4000 },
  { id: '205', type: 'Standard', floor: 2, status: 'boş',     clean: 'temiz',   guest: null,               checkIn: null,         checkOut: null,         pax: 0, rate: 1500 },
  { id: '206', type: 'Deluxe',   floor: 2, status: 'dolu',    clean: 'temiz',   guest: 'Carlos Rivera',    checkIn: '2026-03-19', checkOut: '2026-03-22', pax: 1, rate: 2250 },
  // Kat 3
  { id: '301', type: 'Standard', floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Maria Lopez',      checkIn: '2026-03-13', checkOut: '2026-03-16', pax: 2, rate: 1500 },
  { id: '302', type: 'Penthouse',floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Sheikh Al-Rashid',  checkIn: '2026-03-19', checkOut: '2026-03-28', pax: 4, rate: 7500 },
  { id: '303', type: 'Deluxe',   floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Kemal Arslan',     checkIn: '2026-03-14', checkOut: '2026-03-17', pax: 2, rate: 2250 },
  { id: '304', type: 'Suite',    floor: 3, status: 'boş',     clean: 'kirli',   guest: null,               checkIn: null,         checkOut: null,         pax: 0, rate: 4000 },
  { id: '305', type: 'Standard', floor: 3, status: 'dolu',    clean: 'temiz',   guest: 'Anna Kowalski',    checkIn: '2026-03-20', checkOut: '2026-03-24', pax: 2, rate: 1500 },
  // Kat 4
  { id: '401', type: 'Deluxe',   floor: 4, status: 'dolu',    clean: 'temiz',   guest: 'Marco Rossi',      checkIn: '2026-03-18', checkOut: '2026-03-21', pax: 2, rate: 2500 },
  { id: '402', type: 'Suite',    floor: 4, status: 'dolu',    clean: 'temiz',   guest: 'Sophie Bernard',   checkIn: '2026-03-17', checkOut: '2026-03-23', pax: 2, rate: 4500 },
  { id: '403', type: 'Standard', floor: 4, status: 'boş',     clean: 'temiz',   guest: null,               checkIn: null,         checkOut: null,         pax: 0, rate: 1500 },
  { id: '404', type: 'Deluxe',   floor: 4, status: 'dolu',    clean: 'temiz',   guest: 'Chen Wei',         checkIn: '2026-03-21', checkOut: '2026-03-25', pax: 1, rate: 2500 },
  { id: '405', type: 'Standard', floor: 4, status: 'dolu',    clean: 'kirli',   guest: 'Mustafa Öztürk',   checkIn: '2026-03-19', checkOut: '2026-03-22', pax: 3, rate: 1500 },
  // Kat 5 (Üst kat - Premium)
  { id: '501', type: 'Suite',    floor: 5, status: 'dolu',    clean: 'temiz',   guest: 'James Brown',      checkIn: '2026-03-16', checkOut: '2026-03-21', pax: 2, rate: 5000 },
  { id: '502', type: 'Penthouse',floor: 5, status: 'boş',     clean: 'temiz',   guest: null,               checkIn: null,         checkOut: null,         pax: 0, rate: 9000 },
  { id: '503', type: 'Suite',    floor: 5, status: 'dolu',    clean: 'temiz',   guest: 'Lina Johansson',   checkIn: '2026-03-20', checkOut: '2026-03-27', pax: 2, rate: 5000 },
  { id: '504', type: 'Penthouse',floor: 5, status: 'dolu',    clean: 'temiz',   guest: 'Ali Rıza Bey',     checkIn: '2026-03-15', checkOut: '2026-03-19', pax: 4, rate: 9000 },
];

const initialReservations = [
  // Mevcut check-in'ler
  { id: 'RES-001', guest: 'Ahmet Yılmaz',    guestId:'G-001', room: '101', type: 'Standard', channel: 'Booking.com', checkIn: '2026-03-13', checkOut: '2026-03-16', nights: 3, pax: 2, status: 'check-in',  total: 4500,  paid: 4500,  balance: 0,    board:'HB', notes:'' },
  { id: 'RES-002', guest: 'Hans Müller',      guestId:'G-002', room: '103', type: 'Deluxe',   channel: 'Expedia',     checkIn: '2026-03-12', checkOut: '2026-03-15', nights: 3, pax: 1, status: 'check-in',  total: 6750,  paid: 3000,  balance: 3750, board:'BB', notes:'' },
  { id: 'RES-003', guest: 'Fatma Demir',      guestId:'G-003', room: '202', type: 'Standard', channel: 'Direkt',      checkIn: '2026-03-13', checkOut: '2026-03-17', nights: 4, pax: 2, status: 'check-in',  total: 6000,  paid: 6000,  balance: 0,    board:'AI', notes:'' },
  { id: 'RES-004', guest: 'John Smith',       guestId:'G-004', room: '203', type: 'Deluxe',   channel: 'Booking.com', checkIn: '2026-03-11', checkOut: '2026-03-15', nights: 4, pax: 3, status: 'check-in',  total: 9000,  paid: 6000,  balance: 3000, board:'HB', notes:'VIP - Extra havlu' },
  { id: 'RES-005', guest: 'Maria Lopez',      guestId:'G-005', room: '301', type: 'Standard', channel: 'HotelRunner', checkIn: '2026-03-13', checkOut: '2026-03-16', nights: 3, pax: 2, status: 'check-in',  total: 4500,  paid: 1500,  balance: 3000, board:'BB', notes:'' },
  { id: 'RES-008', guest: 'Kemal Arslan',     guestId:'G-008', room: '303', type: 'Deluxe',   channel: 'Direkt',      checkIn: '2026-03-14', checkOut: '2026-03-17', nights: 3, pax: 2, status: 'check-in',  total: 6750,  paid: 6750,  balance: 0,    board:'HB', notes:'' },
  // Gelecek (onaylı) rezervasyonlar
  { id: 'RES-006', guest: 'Selin Kaya',       guestId:null,    room: '304', type: 'Suite',    channel: 'Direkt',      checkIn: '2026-03-22', checkOut: '2026-03-25', nights: 3, pax: 2, status: 'gelecek',   total: 12000, paid: 3000,  balance: 9000, board:'AI', notes:'' },
  { id: 'RES-007', guest: 'David Wilson',     guestId:null,    room: '205', type: 'Standard', channel: 'TUI',         checkIn: '2026-03-23', checkOut: '2026-03-27', nights: 4, pax: 2, status: 'gelecek',   total: 6000,  paid: 0,     balance: 6000, board:'HB', notes:'' },
  { id: 'RES-009', guest: 'Elif Çelik',       guestId:'G-006', room: '102', type: 'Standard', channel: 'Booking.com', checkIn: '2026-03-19', checkOut: '2026-03-23', nights: 4, pax: 1, status: 'check-in',  total: 6000,  paid: 6000,  balance: 0,    board:'BB', notes:'' },
  { id: 'RES-010', guest: 'Pierre Dupont',    guestId:'G-007', room: '105', type: 'Standard', channel: 'Expedia',     checkIn: '2026-03-20', checkOut: '2026-03-25', nights: 5, pax: 2, status: 'check-in',  total: 7500,  paid: 3000,  balance: 4500, board:'HB', notes:'Balayı çifti' },
  { id: 'RES-011', guest: 'Olga Petrova',     guestId:'G-008', room: '201', type: 'Suite',    channel: 'Booking.com', checkIn: '2026-03-18', checkOut: '2026-03-22', nights: 4, pax: 2, status: 'check-in',  total: 16000, paid: 16000, balance: 0,    board:'AI', notes:'VIP misafir' },
  { id: 'RES-012', guest: 'Yuki Tanaka',      guestId:'G-009', room: '204', type: 'Suite',    channel: 'Direkt',      checkIn: '2026-03-20', checkOut: '2026-03-26', nights: 6, pax: 2, status: 'gelecek',   total: 24000, paid: 8000,  balance: 16000,board:'AI', notes:'Japon grup lideri' },
  { id: 'RES-013', guest: 'Carlos Rivera',    guestId:'G-010', room: '206', type: 'Deluxe',   channel: 'HotelRunner', checkIn: '2026-03-19', checkOut: '2026-03-22', nights: 3, pax: 1, status: 'check-in',  total: 6750,  paid: 6750,  balance: 0,    board:'BB', notes:'' },
  { id: 'RES-014', guest: 'Sheikh Al-Rashid', guestId:'G-011', room: '302', type: 'Penthouse',channel: 'Direkt',      checkIn: '2026-03-19', checkOut: '2026-03-28', nights: 9, pax: 4, status: 'check-in',  total: 67500, paid: 67500, balance: 0,    board:'AI', notes:'VVIP — Özel karşılama' },
  { id: 'RES-015', guest: 'Anna Kowalski',    guestId:null,    room: '305', type: 'Standard', channel: 'Booking.com', checkIn: '2026-03-20', checkOut: '2026-03-24', nights: 4, pax: 2, status: 'gelecek',   total: 6000,  paid: 2000,  balance: 4000, board:'HB', notes:'' },
  { id: 'RES-016', guest: 'Marco Rossi',      guestId:null,    room: '401', type: 'Deluxe',   channel: 'Expedia',     checkIn: '2026-03-18', checkOut: '2026-03-21', nights: 3, pax: 2, status: 'check-in',  total: 7500,  paid: 7500,  balance: 0,    board:'HB', notes:'' },
  { id: 'RES-017', guest: 'Sophie Bernard',   guestId:null,    room: '402', type: 'Suite',    channel: 'Booking.com', checkIn: '2026-03-17', checkOut: '2026-03-23', nights: 6, pax: 2, status: 'check-in',  total: 27000, paid: 15000, balance: 12000,board:'AI', notes:'Uzun konaklama' },
  { id: 'RES-018', guest: 'Chen Wei',         guestId:null,    room: '404', type: 'Deluxe',   channel: 'TUI',         checkIn: '2026-03-21', checkOut: '2026-03-25', nights: 4, pax: 1, status: 'gelecek',   total: 10000, paid: 0,     balance: 10000,board:'BB', notes:'Grup çin turist' },
  { id: 'RES-019', guest: 'Mustafa Öztürk',   guestId:null,    room: '405', type: 'Standard', channel: 'Direkt',      checkIn: '2026-03-19', checkOut: '2026-03-22', nights: 3, pax: 3, status: 'check-in',  total: 4500,  paid: 4500,  balance: 0,    board:'HB', notes:'Aile — çocuklu' },
  { id: 'RES-020', guest: 'James Brown',      guestId:null,    room: '501', type: 'Suite',    channel: 'Booking.com', checkIn: '2026-03-16', checkOut: '2026-03-21', nights: 5, pax: 2, status: 'check-in',  total: 25000, paid: 25000, balance: 0,    board:'AI', notes:'CEO — iş seyahati' },
  { id: 'RES-021', guest: 'Lina Johansson',   guestId:null,    room: '503', type: 'Suite',    channel: 'Expedia',     checkIn: '2026-03-20', checkOut: '2026-03-27', nights: 7, pax: 2, status: 'gelecek',   total: 35000, paid: 10000, balance: 25000,board:'AI', notes:'İsveçli çift' },
  { id: 'RES-022', guest: 'Ali Rıza Bey',     guestId:'G-012', room: '504', type: 'Penthouse',channel: 'Direkt',      checkIn: '2026-03-15', checkOut: '2026-03-19', nights: 4, pax: 4, status: 'check-in',  total: 36000, paid: 36000, balance: 0,    board:'AI', notes:'Sadık müşteri — 15. ziyaret' },
  // Geçmiş tamamlanmış
  { id: 'RES-023', guest: 'Emre Kılıç',       guestId:null,    room: '106', type: 'Standard', channel: 'Direkt',      checkIn: '2026-03-10', checkOut: '2026-03-13', nights: 3, pax: 1, status: 'check-out', total: 4500,  paid: 4500,  balance: 0,    board:'BB', notes:'' },
  { id: 'RES-024', guest: 'Lara Novak',       guestId:null,    room: '403', type: 'Standard', channel: 'Booking.com', checkIn: '2026-03-11', checkOut: '2026-03-14', nights: 3, pax: 2, status: 'check-out', total: 4500,  paid: 4500,  balance: 0,    board:'HB', notes:'' },
];

const initialGuests = [
  { id: 'G-001', name: 'Ahmet Yılmaz',    nationality: 'TR', phone: '+90 532 111 22 33', email: 'ahmet@example.com',    loyalty: 'Gold',     visits: 12, totalSpent: 48000,  lastVisit: '2026-03-13', dob:'1980-05-14', tcNo:'12345678900', passport:'' },
  { id: 'G-002', name: 'Hans Müller',     nationality: 'DE', phone: '+49 151 234 5678',  email: 'hans@example.com',     loyalty: 'Platinum', visits: 25, totalSpent: 120000, lastVisit: '2026-03-12', dob:'1972-08-22', tcNo:'',           passport:'C4V8X2' },
  { id: 'G-003', name: 'Fatma Demir',     nationality: 'TR', phone: '+90 542 333 44 55', email: 'fatma@example.com',    loyalty: 'Silver',   visits: 5,  totalSpent: 18000,  lastVisit: '2026-03-13', dob:'1990-03-01', tcNo:'98765432100', passport:'' },
  { id: 'G-004', name: 'John Smith',      nationality: 'US', phone: '+1 555 678 9012',   email: 'john@example.com',     loyalty: 'None',     visits: 1,  totalSpent: 9000,   lastVisit: '2026-03-11', dob:'1985-11-30', tcNo:'',           passport:'US992010' },
  { id: 'G-005', name: 'Maria Lopez',     nationality: 'ES', phone: '+34 600 123 456',   email: 'maria@example.com',    loyalty: 'Silver',   visits: 3,  totalSpent: 12000,  lastVisit: '2026-03-13', dob:'1995-07-19', tcNo:'',           passport:'ES440122' },
  { id: 'G-006', name: 'Elif Çelik',      nationality: 'TR', phone: '+90 553 444 55 66', email: 'elif@example.com',     loyalty: 'Gold',     visits: 8,  totalSpent: 32000,  lastVisit: '2026-03-19', dob:'1988-12-05', tcNo:'55667788900', passport:'' },
  { id: 'G-007', name: 'Pierre Dupont',   nationality: 'FR', phone: '+33 6 12 34 56 78', email: 'pierre@example.com',   loyalty: 'None',     visits: 1,  totalSpent: 7500,   lastVisit: '2026-03-20', dob:'1993-06-28', tcNo:'',           passport:'FR228811' },
  { id: 'G-008', name: 'Kemal Arslan',    nationality: 'TR', phone: '+90 544 777 88 99', email: 'kemal@example.com',    loyalty: 'Silver',   visits: 4,  totalSpent: 22000,  lastVisit: '2026-03-14', dob:'1978-09-10', tcNo:'33445566700', passport:'' },
  { id: 'G-009', name: 'Yuki Tanaka',     nationality: 'JP', phone: '+81 90 1234 5678',  email: 'yuki@example.com',     loyalty: 'Gold',     visits: 6,  totalSpent: 78000,  lastVisit: '2026-03-20', dob:'1987-02-15', tcNo:'',           passport:'JP8821004' },
  { id: 'G-010', name: 'Carlos Rivera',   nationality: 'MX', phone: '+52 55 1234 5678',  email: 'carlos@example.com',   loyalty: 'None',     visits: 2,  totalSpent: 13500,  lastVisit: '2026-03-19', dob:'1991-11-03', tcNo:'',           passport:'MX552233' },
  { id: 'G-011', name: 'Sheikh Al-Rashid',nationality: 'AE', phone: '+971 50 123 4567',  email: 'sheikh@example.com',   loyalty: 'Platinum', visits: 18, totalSpent: 540000, lastVisit: '2026-03-19', dob:'1965-04-20', tcNo:'',           passport:'AE998877' },
  { id: 'G-012', name: 'Ali Rıza Bey',    nationality: 'TR', phone: '+90 533 888 99 00', email: 'aliriza@example.com',  loyalty: 'Platinum', visits: 15, totalSpent: 185000, lastVisit: '2026-03-15', dob:'1970-01-08', tcNo:'11223344500', passport:'' },
];

const initialTasks = [
  { id: 'T-001', type: 'housekeeping', room: '103', desc: 'Oda temizliği (check-out hazırlığı)', priority: 'high',   status: 'bekliyor', assignee: 'Ayşe H.',  created: '09:00', note:'' },
  { id: 'T-002', type: 'housekeeping', room: '203', desc: 'Havlu değişimi ve minibar kontrolü',  priority: 'normal', status: 'devam',    assignee: 'Fatih H.', created: '09:15', note:'' },
  { id: 'T-003', type: 'technical',    room: '104', desc: 'Klima arızası — çalışmıyor',          priority: 'high',   status: 'bekliyor', assignee: 'Murat T.', created: '08:30', note:'' },
  { id: 'T-004', type: 'technical',    room: '201', desc: 'TV uzaktan kumanda değişimi',         priority: 'low',    status: 'bitti',    assignee: 'Murat T.', created: '07:45', note:'Yenisiyle değiştirildi' },
  { id: 'T-005', type: 'housekeeping', room: '105', desc: 'Check-out sonrası tam temizlik',      priority: 'normal', status: 'bekliyor', assignee: '',         created: '08:00', note:'' },
  { id: 'T-006', type: 'housekeeping', room: '405', desc: 'Minibar dolum — çocuk atıştırmalık',  priority: 'normal', status: 'bekliyor', assignee: 'Ayşe H.',  created: '10:30', note:'' },
  { id: 'T-007', type: 'technical',    room: '302', desc: 'Jakuzi su sıcaklık ayarı',            priority: 'high',   status: 'devam',    assignee: 'Murat T.', created: '11:00', note:'VVIP oda — acil' },
  { id: 'T-008', type: 'housekeeping', room: '501', desc: 'VIP oda — ekstra yastık talebi',      priority: 'high',   status: 'bekliyor', assignee: 'Fatih H.', created: '09:45', note:'' },
  { id: 'T-009', type: 'housekeeping', room: '106', desc: 'Check-out sonrası derin temizlik',    priority: 'normal', status: 'bitti',    assignee: 'Ayşe H.',  created: '07:30', note:'Tamamlandı' },
  { id: 'T-010', type: 'technical',    room: '404', desc: 'WiFi sinyal güçlendirici kontrolü',   priority: 'low',    status: 'bekliyor', assignee: '',         created: '12:00', note:'' },
];

const initialFolioLines = {
  'RES-001': [{ id:'F-001', desc:'Konaklama (3 gece × ₺1500)', amount: 4500, type:'accommodation', date:'2026-03-13' }],
  'RES-002': [
    { id:'F-002', desc:'Konaklama (3 gece × ₺2250)', amount: 6750, type:'accommodation', date:'2026-03-12' },
    { id:'F-003', desc:'Minibar', amount: 180, type:'extra', date:'2026-03-13' },
    { id:'F-004', desc:'SPA Masaj', amount: 350, type:'extra', date:'2026-03-14' },
  ],
  'RES-003': [{ id:'F-005', desc:'Konaklama (4 gece × ₺1500)', amount: 6000, type:'accommodation', date:'2026-03-13' }],
  'RES-004': [
    { id:'F-006', desc:'Konaklama (4 gece × ₺2250)', amount: 9000, type:'accommodation', date:'2026-03-11' },
    { id:'F-007', desc:'Restoran — Akşam Yemeği', amount: 850, type:'extra', date:'2026-03-12' },
    { id:'F-008', desc:'Minibar', amount: 220, type:'extra', date:'2026-03-13' },
    { id:'F-009', desc:'Oda servisi', amount: 180, type:'extra', date:'2026-03-14' },
  ],
  'RES-005': [{ id:'F-010', desc:'Konaklama (3 gece × ₺1500)', amount: 4500, type:'accommodation', date:'2026-03-13' }],
  'RES-008': [{ id:'F-011', desc:'Konaklama (3 gece × ₺2250)', amount: 6750, type:'accommodation', date:'2026-03-14' }],
  'RES-009': [{ id:'F-012', desc:'Konaklama (4 gece × ₺1500)', amount: 6000, type:'accommodation', date:'2026-03-19' }],
  'RES-010': [
    { id:'F-013', desc:'Konaklama (5 gece × ₺1500)', amount: 7500, type:'accommodation', date:'2026-03-20' },
    { id:'F-014', desc:'Oda Servisi — Şampanya', amount: 450, type:'extra', date:'2026-03-20' },
  ],
  'RES-011': [
    { id:'F-015', desc:'Konaklama (4 gece × ₺4000)', amount: 16000, type:'accommodation', date:'2026-03-18' },
    { id:'F-016', desc:'SPA — İsveç Masajı', amount: 600, type:'extra', date:'2026-03-19' },
    { id:'F-017', desc:'Restoran — Gala Yemeği', amount: 1200, type:'extra', date:'2026-03-20' },
  ],
  'RES-013': [{ id:'F-018', desc:'Konaklama (3 gece × ₺2250)', amount: 6750, type:'accommodation', date:'2026-03-19' }],
  'RES-014': [
    { id:'F-019', desc:'Konaklama (9 gece × ₺7500)', amount: 67500, type:'accommodation', date:'2026-03-19' },
    { id:'F-020', desc:'VIP Transfer — Havaalanı', amount: 2500, type:'extra', date:'2026-03-19' },
    { id:'F-021', desc:'SPA — Özel Paket', amount: 3500, type:'extra', date:'2026-03-20' },
    { id:'F-022', desc:'Restoran — Özel Menü', amount: 4800, type:'extra', date:'2026-03-21' },
  ],
  'RES-016': [{ id:'F-023', desc:'Konaklama (3 gece × ₺2500)', amount: 7500, type:'accommodation', date:'2026-03-18' }],
  'RES-017': [
    { id:'F-024', desc:'Konaklama (6 gece × ₺4500)', amount: 27000, type:'accommodation', date:'2026-03-17' },
    { id:'F-025', desc:'Çamaşırhane', amount: 380, type:'extra', date:'2026-03-19' },
  ],
  'RES-019': [{ id:'F-026', desc:'Konaklama (3 gece × ₺1500)', amount: 4500, type:'accommodation', date:'2026-03-19' }],
  'RES-020': [
    { id:'F-027', desc:'Konaklama (5 gece × ₺5000)', amount: 25000, type:'accommodation', date:'2026-03-16' },
    { id:'F-028', desc:'Minibar — Premium', amount: 680, type:'extra', date:'2026-03-17' },
    { id:'F-029', desc:'Oda Servisi — Kahvaltı', amount: 390, type:'extra', date:'2026-03-18' },
  ],
  'RES-022': [
    { id:'F-030', desc:'Konaklama (4 gece × ₺9000)', amount: 36000, type:'accommodation', date:'2026-03-15' },
    { id:'F-031', desc:'Restoran — Özel Masa', amount: 2200, type:'extra', date:'2026-03-16' },
    { id:'F-032', desc:'SPA — Türk Hamamı', amount: 400, type:'extra', date:'2026-03-17' },
  ],
};

const initialCashTransactions = [
  { id:'C-001', type:'gelir',  desc:'RES-001 Konaklama Tahsilatı',    amount:4500,  method:'Kredi Kartı', time:'09:12', date: TODAY },
  { id:'C-002', type:'gelir',  desc:'RES-002 Ön Ödeme',               amount:3000,  method:'Nakit',      time:'10:30', date: TODAY },
  { id:'C-003', type:'gider',  desc:'Ofis Malzemesi Alımı',            amount:250,   method:'Nakit',      time:'11:05', date: TODAY },
  { id:'C-004', type:'gelir',  desc:'RES-008 Tam Ödeme',               amount:6750,  method:'EFT/Havale', time:'12:15', date: TODAY },
  { id:'C-005', type:'gelir',  desc:'RES-011 VIP Tam Ödeme',           amount:16000, method:'Kredi Kartı',time:'08:45', date: TODAY },
  { id:'C-006', type:'gelir',  desc:'RES-014 Penthouse Ödeme',         amount:67500, method:'EFT/Havale', time:'09:00', date: TODAY },
  { id:'C-007', type:'gider',  desc:'Mutfak Malzeme Tedarik',          amount:8500,  method:'EFT/Havale', time:'10:00', date: TODAY },
  { id:'C-008', type:'gelir',  desc:'RES-020 Suite Konaklama',         amount:25000, method:'Kredi Kartı',time:'14:30', date: TODAY },
  { id:'C-009', type:'gelir',  desc:'Restoran — Dış Müşteri',          amount:1850,  method:'Nakit',      time:'13:15', date: TODAY },
  { id:'C-010', type:'gider',  desc:'Çamaşırhane Kimyasal Malzeme',    amount:1200,  method:'Nakit',      time:'15:00', date: TODAY },
];

// ─── Restaurant State ─────────────────────────────────────────────
const initialRestaurantOrders = [
  { id:'ORD-001', table: 'Masa 3',  room: null,  items:[{name:'Izgara Tavuk',qty:2,price:180},{name:'Salata',qty:1,price:75}], total:435,  status:'hazır',       time:'12:30', date: TODAY },
  { id:'ORD-002', table: null,      room: '203', items:[{name:'Club Sandwich',qty:1,price:220},{name:'Kola',qty:2,price:60}], total:340,  status:'hazırlanıyor',time:'13:05', date: TODAY },
  { id:'ORD-003', table: 'Masa 7',  room: null,  items:[{name:'Et Kavurma',qty:1,price:260},{name:'Çorba',qty:2,price:85},{name:'Su',qty:2,price:30}], total:490, status:'tamamlandı', time:'12:00', date: TODAY },
  { id:'ORD-004', table: null,      room: '501', items:[{name:'Kahvaltı Tabağı',qty:2,price:195},{name:'Meyve Suyu',qty:2,price:75}], total:540, status:'hazır', time:'08:30', date: TODAY },
  { id:'ORD-005', table: 'Masa 1',  room: null,  items:[{name:'Izgara Balık',qty:1,price:240},{name:'Künefe',qty:1,price:120},{name:'Kola / Soda',qty:1,price:60}], total:420, status:'hazırlanıyor', time:'13:20', date: TODAY },
  { id:'ORD-006', table: null,      room: '302', items:[{name:'Gece Atıştırması',qty:1,price:165},{name:'Su',qty:3,price:30}], total:255, status:'hazır', time:'23:15', date: TODAY },
];

const MENU_ITEMS = [
  { id:'M-01', category:'Başlangıç',  name:'Çorba',             price: 85 },
  { id:'M-02', category:'Başlangıç',  name:'Salata',            price: 75 },
  { id:'M-03', category:'Ana Yemek',  name:'Izgara Tavuk',      price: 180 },
  { id:'M-04', category:'Ana Yemek',  name:'Izgara Balık',      price: 240 },
  { id:'M-05', category:'Ana Yemek',  name:'Et Kavurma',        price: 260 },
  { id:'M-06', category:'Ana Yemek',  name:'Vejetaryen Tabak',  price: 155 },
  { id:'M-07', category:'Sandviç',    name:'Club Sandwich',     price: 220 },
  { id:'M-08', category:'Sandviç',    name:'Izgara Tost',       price: 140 },
  { id:'M-09', category:'Tatlı',      name:'Sütlaç',            price: 95 },
  { id:'M-10', category:'Tatlı',      name:'Künefe',            price: 120 },
  { id:'M-11', category:'İçecek',     name:'Kola / Soda',       price: 60 },
  { id:'M-12', category:'İçecek',     name:'Meyve Suyu',        price: 75 },
  { id:'M-13', category:'İçecek',     name:'Su',                price: 30 },
  { id:'M-14', category:'Oda Servisi',name:'Kahvaltı Tabağı',   price: 195 },
  { id:'M-15', category:'Oda Servisi',name:'Gece Atıştırması',  price: 165 },
];

// ─── SPA State ────────────────────────────────────────────────────
const initialSpaAppointments = [
  { id:'SPA-001', guest:'Hans Müller', room:'103', service:'İsveç Masajı (60 dk)', therapist:'Elena K.', time:'14:00', date:TODAY, status:'bekliyor', price:600 },
  { id:'SPA-002', guest:'Fatma Demir', room:'202', service:'Aromaterapi',           therapist:'Zeynep A.', time:'16:00', date:TODAY, status:'tamamlandı', price:550 },
];

const SPA_SERVICES = [
  { name:'İsveç Masajı (60 dk)',  therapist:'Elena K.',  price: 600 },
  { name:'İsveç Masajı (90 dk)',  therapist:'Elena K.',  price: 850 },
  { name:'Aromaterapi',           therapist:'Zeynep A.', price: 550 },
  { name:'Taş Terapisi',          therapist:'Zeynep A.', price: 720 },
  { name:'Türk Hamamı',           therapist:'Mert B.',   price: 400 },
  { name:'Yüz Bakımı',            therapist:'Elena K.',  price: 480 },
  { name:'Manikür / Pedikür',     therapist:'Selin D.',  price: 320 },
];

// ─── MiniBar State ────────────────────────────────────────────────
const MINIBAR_ITEMS = [
  { id:'MB-01', name:'Su (0.5L)',       price: 30,  category:'İçecek' },
  { id:'MB-02', name:'Kola (Kutu)',     price: 60,  category:'İçecek' },
  { id:'MB-03', name:'Meyve Suyu',      price: 75,  category:'İçecek' },
  { id:'MB-04', name:'Bira',            price: 120, category:'Alkol' },
  { id:'MB-05', name:'Şarap (Şişe)',    price: 280, category:'Alkol' },
  { id:'MB-06', name:'Viski (Nip)',     price: 150, category:'Alkol' },
  { id:'MB-07', name:'Cips',            price: 55,  category:'Atıştırmalık' },
  { id:'MB-08', name:'Çikolata',        price: 70,  category:'Atıştırmalık' },
  { id:'MB-09', name:'Kuruyemiş',       price: 90,  category:'Atıştırmalık' },
  { id:'MB-10', name:'Kahve (Kapsül)',  price: 45,  category:'Sıcak' },
  { id:'MB-11', name:'Çay (Demet)',     price: 40,  category:'Sıcak' },
];

const initialMinibarCharges = [
  { id:'MB-C-001', room:'103', resId:'RES-002', items:[{name:'Bira',qty:2,price:120},{name:'Cips',qty:1,price:55}], total:295, date:TODAY, billed:true },
  { id:'MB-C-002', room:'203', resId:'RES-004', items:[{name:'Şarap (Şişe)',qty:1,price:280}], total:280, date:TODAY, billed:false },
];

// ─── Laundry State ────────────────────────────────────────────────
const initialLaundryOrders = [
  { id:'LAU-001', room:'101', guest:'Ahmet Yılmaz', resId:'RES-001', items:[{name:'Gömlek',qty:3,price:80},{name:'Pantolon',qty:2,price:100}], total:440, status:'hazır',  date:TODAY, ordered:'08:30' },
  { id:'LAU-002', room:'202', guest:'Fatma Demir',  resId:'RES-003', items:[{name:'Elbise',qty:1,price:150}], total:150, status:'yıkanıyor', date:TODAY, ordered:'10:00' },
  { id:'LAU-003', room:'303', guest:'Kemal Arslan', resId:'RES-008', items:[{name:'Takım Elbise',qty:1,price:250},{name:'Kravat',qty:2,price:60}], total:370, status:'bekliyor', date:TODAY, ordered:'11:15' },
];

const LAUNDRY_ITEMS = [
  { name:'Gömlek',       price: 80  },
  { name:'Pantolon',     price: 100 },
  { name:'Etek',         price: 100 },
  { name:'Elbise',       price: 150 },
  { name:'Takım Elbise', price: 250 },
  { name:'Ceket',        price: 130 },
  { name:'Kravat',       price: 60  },
  { name:'Çorap (çift)', price: 40  },
  { name:'İç Çamaşır',   price: 50  },
  { name:'Kazak',        price: 110 },
];

// ─── HR/Staff State ───────────────────────────────────────────────
const initialStaff = [
  { id:'HR-001', name:'Ayşe Hanım',    dept:'Kat Hizmetleri', role:'Kat Görevlisi',  shift:'08:00-16:00', status:'aktif',   phone:'+90 532 111 0001', startDate:'2022-03-01', wage: 18500 },
  { id:'HR-002', name:'Fatih Bey',     dept:'Kat Hizmetleri', role:'Kat Görevlisi',  shift:'08:00-16:00', status:'aktif',   phone:'+90 532 111 0002', startDate:'2021-07-15', wage: 18500 },
  { id:'HR-003', name:'Murat Teknik',  dept:'Teknik Servis',  role:'Teknisyen',      shift:'07:00-15:00', status:'aktif',   phone:'+90 532 111 0003', startDate:'2020-01-10', wage: 22000 },
  { id:'HR-004', name:'Elena Kraski',  dept:'SPA',            role:'Terapist',       shift:'10:00-18:00', status:'aktif',   phone:'+90 532 111 0004', startDate:'2023-05-01', wage: 24000 },
  { id:'HR-005', name:'Zeynep Aktaş',  dept:'SPA',            role:'Terapist',       shift:'10:00-18:00', status:'aktif',   phone:'+90 532 111 0005', startDate:'2022-09-01', wage: 24000 },
  { id:'HR-006', name:'Mehmet Şef',    dept:'Restoran',       role:'Aşçı Başı',      shift:'06:00-14:00', status:'aktif',   phone:'+90 532 111 0006', startDate:'2019-04-15', wage: 35000 },
  { id:'HR-007', name:'Selin Demirci', dept:'Resepsiyon',     role:'Resepsiyon Gör.',shift:'08:00-16:00', status:'aktif',   phone:'+90 532 111 0007', startDate:'2024-01-01', wage: 20000 },
  { id:'HR-008', name:'Tarık Yılmaz',  dept:'Resepsiyon',     role:'Gece Resepsiyon',shift:'22:00-06:00', status:'aktif',   phone:'+90 532 111 0008', startDate:'2023-10-01', wage: 22000 },
  { id:'HR-009', name:'Burak Aslan',   dept:'Güvenlik',       role:'Güvenlik Görevlisi',shift:'16:00-00:00',status:'izinli', phone:'+90 532 111 0009', startDate:'2021-03-01', wage: 19000 },
  { id:'HR-010', name:'Leyla Koç',     dept:'Muhasebe',       role:'Muhasebe Uzm.',  shift:'09:00-17:00', status:'aktif',   phone:'+90 532 111 0010', startDate:'2020-06-01', wage: 30000 },
];

// ─── Inventory State ──────────────────────────────────────────────
const initialInventory = [
  { id:'INV-001', name:'Şampuan (Adet)',     category:'Banyo',   stock: 240, minStock: 50,  unit:'Adet',  cost: 12 },
  { id:'INV-002', name:'Sabun (Bar)',         category:'Banyo',   stock: 180, minStock: 50,  unit:'Adet',  cost: 8  },
  { id:'INV-003', name:'Diş Fırçası',        category:'Banyo',   stock: 120, minStock: 30,  unit:'Adet',  cost: 15 },
  { id:'INV-004', name:'Havlu (Büyük)',       category:'Tekstil', stock: 85,  minStock: 60,  unit:'Adet',  cost: 45 },
  { id:'INV-005', name:'Havlu (Küçük)',       category:'Tekstil', stock: 92,  minStock: 60,  unit:'Adet',  cost: 30 },
  { id:'INV-006', name:'Yastık Kılıfı',      category:'Tekstil', stock: 140, minStock: 60,  unit:'Adet',  cost: 25 },
  { id:'INV-007', name:'Çarşaf (Çift)',       category:'Tekstil', stock: 65,  minStock: 50,  unit:'Adet',  cost: 80 },
  { id:'INV-008', name:'Tuvalet Kağıdı (6lı)',category:'Temizlik',stock: 18,  minStock: 20,  unit:'Paket', cost: 35 },
  { id:'INV-009', name:'Deterjan (Lt)',       category:'Temizlik',stock: 42,  minStock: 10,  unit:'Litre', cost: 55 },
  { id:'INV-010', name:'Nevresim Takımı',     category:'Tekstil', stock: 48,  minStock: 30,  unit:'Adet',  cost: 180},
  { id:'INV-011', name:'Kahve (100gr)',        category:'Mutfak',  stock: 55,  minStock: 20,  unit:'Paket', cost: 65 },
  { id:'INV-012', name:'Çay (Kutu)',          category:'Mutfak',  stock: 80,  minStock: 20,  unit:'Kutu',  cost: 40 },
  { id:'INV-013', name:'Şeker (Kutu)',        category:'Mutfak',  stock: 120, minStock: 30,  unit:'Kutu',  cost: 18 },
  { id:'INV-014', name:'Meyve Suyu (Lt)',     category:'Mutfak',  stock: 36,  minStock: 15,  unit:'Litre', cost: 28 },
];

// ─── KBS State ────────────────────────────────────────────────────
const initialKbsSent = [
  { resId:'RES-001', guest:'Ahmet Yılmaz', room:'101', sentAt:'08:05', tcNo:'12345678900', nationality:'TR' },
  { resId:'RES-003', guest:'Fatma Demir',  room:'202', sentAt:'08:10', tcNo:'98765432100', nationality:'TR' },
];

// ─── Context ──────────────────────────────────────────────────────
const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [rooms, setRooms]                       = useState(initialRooms);
  const [reservations, setReservations]         = useState(initialReservations);
  const [guests, setGuests]                     = useState(initialGuests);
  const [tasks, setTasks]                       = useState(initialTasks);
  const [folioLines, setFolioLines]             = useState(initialFolioLines);
  const [cashTransactions, setCashTransactions] = useState(initialCashTransactions);
  const [notifications, setNotifications]       = useState([
    { id: 'N-001', type: 'warn',    msg: 'KBS: 3 misafir bildirimi bekliyor', time: '09:05' },
    { id: 'N-002', type: 'info',    msg: 'Oda 104 arıza kaydı açıldı',         time: '08:31' },
    { id: 'N-003', type: 'success', msg: 'RES-001 check-in tamamlandı',         time: '08:00' },
  ]);

  // ── New State Slices ──────────────────────────────────────────
  const [restaurantOrders, setRestaurantOrders] = useState(initialRestaurantOrders);
  const [spaAppointments, setSpaAppointments]   = useState(initialSpaAppointments);
  const [minibarCharges, setMinibarCharges]     = useState(initialMinibarCharges);
  const [laundryOrders, setLaundryOrders]       = useState(initialLaundryOrders);
  const [staff, setStaff]                       = useState(initialStaff);
  const [inventory, setInventory]               = useState(initialInventory);
  const [kbsSent, setKbsSent]                   = useState(initialKbsSent);

  const idCounter = useRef({ res: 24, guest: 12, task: 10, cash: 10, folio: 32, notif: 3, ord: 6, spa: 2, mb: 2, lau: 3, hr: 10 });
  const nextId = (key, prefix, n = 3) => {
    idCounter.current[key]++;
    return `${prefix}-${String(idCounter.current[key]).padStart(n, '0')}`;
  };

  // ── Notification helper ───────────────────────────────────────
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
      addNotification({ type: 'success', msg: `Görev tamamlandı` });
    }
  }, [addNotification]);

  // ── Restaurant actions ────────────────────────────────────────
  const addRestaurantOrder = useCallback((order) => {
    const id = nextId('ord', 'ORD');
    const newOrder = { ...order, id, date: TODAY, time: new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}), status: 'hazırlanıyor' };
    setRestaurantOrders(prev => [newOrder, ...prev]);
    // If room order, add to folio
    if (order.room && order.resId) {
      addFolioLine(order.resId, { desc: `Restoran — Oda Servisi (${order.items.map(i=>i.name).join(', ')})`, amount: order.total, type: 'extra' });
    } else {
      addCashTransaction({ type: 'gelir', desc: `Restoran — ${order.table || 'Oda Servisi'}`, amount: order.total, method: 'Nakit' });
    }
    addNotification({ type: 'info', msg: `Yeni sipariş: ${order.table || `Oda ${order.room}`} — ₺${order.total}` });
    return id;
  }, [addFolioLine, addCashTransaction, addNotification]);

  const updateRestaurantOrder = useCallback((id, patch) => {
    setRestaurantOrders(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));
    if (patch.status === 'tamamlandı') addNotification({ type: 'success', msg: `Sipariş teslim edildi` });
  }, [addNotification]);

  // ── SPA actions ───────────────────────────────────────────────
  const addSpaAppointment = useCallback((appt) => {
    const id = nextId('spa', 'SPA');
    const newAppt = { ...appt, id, date: TODAY, status: 'bekliyor' };
    setSpaAppointments(prev => [newAppt, ...prev]);
    addNotification({ type: 'success', msg: `SPA randevusu oluşturuldu: ${appt.guest} — ${appt.service}` });
    return id;
  }, [addNotification]);

  const updateSpaAppointment = useCallback((id, patch) => {
    setSpaAppointments(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a));
    if (patch.status === 'tamamlandı') {
      const appt = spaAppointments.find(a => a.id === id);
      if (appt?.resId) addFolioLine(appt.resId, { desc: `SPA — ${appt.service}`, amount: appt.price, type: 'extra' });
      addNotification({ type: 'success', msg: `SPA hizmeti tamamlandı — ₺${spaAppointments.find(a=>a.id===id)?.price}` });
    }
  }, [spaAppointments, addFolioLine, addNotification]);

  // ── MiniBar actions ───────────────────────────────────────────
  const addMinibarCharge = useCallback((charge) => {
    const id = nextId('mb', 'MB-C');
    const newCharge = { ...charge, id, date: TODAY, billed: false };
    setMinibarCharges(prev => [newCharge, ...prev]);
    if (charge.resId) {
      addFolioLine(charge.resId, { desc: `Minibar — Oda ${charge.room}`, amount: charge.total, type: 'extra' });
    }
    addNotification({ type: 'info', msg: `Minibar eklendi: Oda ${charge.room} — ₺${charge.total}` });
  }, [addFolioLine, addNotification]);

  // ── Laundry actions ───────────────────────────────────────────
  const addLaundryOrder = useCallback((order) => {
    const id = nextId('lau', 'LAU');
    const newOrder = { ...order, id, date: TODAY, status: 'bekliyor', ordered: new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}) };
    setLaundryOrders(prev => [newOrder, ...prev]);
    addNotification({ type: 'info', msg: `Çamaşır siparişi alındı: Oda ${order.room} — ₺${order.total}` });
    return id;
  }, [addNotification]);

  const updateLaundryOrder = useCallback((id, patch) => {
    setLaundryOrders(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));
    const order = laundryOrders.find(o => o.id === id);
    if (patch.status === 'teslim') {
      if (order?.resId) addFolioLine(order.resId, { desc: `Çamaşırhane — Oda ${order.room}`, amount: order.total, type: 'extra' });
      addNotification({ type: 'success', msg: `Çamaşır teslim edildi: Oda ${order?.room}` });
    } else if (patch.status === 'hazır') {
      addNotification({ type: 'info', msg: `Çamaşır hazır: Oda ${order?.room}` });
    }
  }, [laundryOrders, addFolioLine, addNotification]);

  // ── Inventory actions ─────────────────────────────────────────
  const updateInventoryItem = useCallback((id, patch) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i));
  }, []);

  const adjustInventoryStock = useCallback((id, delta, reason) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i));
    const item = inventory.find(i => i.id === id);
    addNotification({ type: delta > 0 ? 'success' : 'info', msg: `Stok ${delta > 0 ? 'eklendi' : 'azaltıldı'}: ${item?.name} (${delta > 0 ? '+' : ''}${delta})${reason ? ` — ${reason}` : ''}` });
  }, [inventory, addNotification]);

  // ── HR/Staff actions ──────────────────────────────────────────
  const updateStaff = useCallback((id, patch) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
    addNotification({ type: 'info', msg: `Personel güncellendi` });
  }, [addNotification]);

  const addStaff = useCallback((member) => {
    const id = nextId('hr', 'HR');
    setStaff(prev => [{ ...member, id }, ...prev]);
    addNotification({ type: 'success', msg: `Yeni personel eklendi: ${member.name}` });
  }, [addNotification]);

  // ── KBS actions ───────────────────────────────────────────────
  const sendKBS = useCallback((resId) => {
    const res = reservations.find(r => r.id === resId);
    const guest = guests.find(g => g.id === res?.guestId || g.name === res?.guest);
    if (!res) return;
    const record = {
      resId,
      guest: res.guest,
      room: res.room,
      sentAt: new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'}),
      tcNo: guest?.tcNo || '',
      passport: guest?.passport || '',
      nationality: guest?.nationality || 'TR',
    };
    setKbsSent(prev => {
      if (prev.find(k => k.resId === resId)) return prev;
      return [record, ...prev];
    });
    addNotification({ type: 'success', msg: `KBS bildirimi gönderildi: ${res.guest}` });
  }, [reservations, guests, addNotification]);

  // ── Computed stats ────────────────────────────────────────────
  const stats = {
    totalRooms:       rooms.length,
    occupied:         rooms.filter(r => r.status === 'dolu').length,
    vacant:           rooms.filter(r => r.status === 'boş').length,
    outOfOrder:       rooms.filter(r => r.status === 'arızalı').length,
    dirty:            rooms.filter(r => r.clean === 'kirli').length,
    todayArrivals:    reservations.filter(r => r.checkIn === TODAY && r.status === 'gelecek').length,
    todayDepartures:  reservations.filter(r => r.checkOut === TODAY && r.status === 'check-in').length,
    inHouse:          reservations.filter(r => r.status === 'check-in').length,
    pendingTasks:     tasks.filter(t => t.status !== 'bitti').length,
    occupancyRate:    Math.round((rooms.filter(r => r.status === 'dolu').length / rooms.length) * 100),
    todayRevenue:     cashTransactions.filter(t => t.type === 'gelir' && t.date === TODAY).reduce((s,t) => s+t.amount, 0),
    totalBalance:     reservations.filter(r => r.status === 'check-in').reduce((s,r) => s+r.balance, 0),
    notifCount:       notifications.filter(n => n.type === 'warn').length,
    pendingOrders:    restaurantOrders.filter(o => o.status === 'hazırlanıyor').length,
    spaToday:         spaAppointments.filter(a => a.date === TODAY).length,
    kbsPending:       reservations.filter(r => r.status === 'check-in').filter(r => !kbsSent.find(k => k.resId === r.id)).length,
    lowStock:         inventory.filter(i => i.stock < i.minStock).length,
    activeStaff:      staff.filter(s => s.status === 'aktif').length,
    laundryPending:   laundryOrders.filter(o => o.status !== 'teslim').length,
  };

  return (
    <HotelContext.Provider value={{
      // State
      rooms, reservations, guests, tasks, folioLines, cashTransactions, notifications, stats, TODAY,
      restaurantOrders, spaAppointments, minibarCharges, laundryOrders, staff, inventory, kbsSent,
      // Static data
      MENU_ITEMS, SPA_SERVICES, MINIBAR_ITEMS, LAUNDRY_ITEMS,
      // Core Actions
      updateRoomStatus, addReservation, updateReservation, checkIn, checkOut,
      addFolioLine, deleteFolioLine, makePayment,
      addCashTransaction, addGuest,
      addTask, updateTask, addNotification,
      // New Actions
      addRestaurantOrder, updateRestaurantOrder,
      addSpaAppointment, updateSpaAppointment,
      addMinibarCharge,
      addLaundryOrder, updateLaundryOrder,
      updateInventoryItem, adjustInventoryStock,
      updateStaff, addStaff,
      sendKBS,
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
