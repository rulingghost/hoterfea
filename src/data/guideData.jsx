import { modulesConfig } from './moduleList';

// ============================================================
// EN İNCE AYRINTISINA KADAR AÇIKLAMALI MODÜL BİLGİ BANKASI
// Bir otel çalışanı buraya bakarak her işlemi yapabilmeli
// ============================================================

/** `landing.moduleNames.<camelCase>` anahtarı (örn. front-office → frontOffice) */
export function moduleIdToLandingNameKey(id) {
  return id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/** Rehber / hub’da gösterilecek modül adı (dile göre locales’ten) */
export function getTranslatedModuleName(t, module) {
  const path = `landing.moduleNames.${moduleIdToLandingNameKey(module.id)}`;
  const v = t(path);
  return v === path ? module.name : v;
}

/** Modül kategorisi — İngilizce rehber metinlerinde Türkçe menü grubu adı kalmasın */
const GUIDE_CATEGORY_EN = {
  'Dashboard & Analitik': 'Dashboard & Analytics',
  'Ön Büro & Rez.': 'Front Office & Res.',
  Operasyon: 'Operations',
  'Yiyecek & İçecek': 'Food & Beverage',
  'Satış & Pazarlama': 'Sales & Marketing',
  Finans: 'Finance',
  'Malzeme & İK': 'Supply & HR',
  Sistem: 'System',
};

export function guideCategoryLabel(category, lang) {
  if (lang !== 'en') return category;
  return GUIDE_CATEGORY_EN[category] || category;
}

export const getModuleKnowledge = (t, lang) => {
  const L = (tr, en) => (lang === 'en' ? en : tr);

  return {

  // ─── DASHBOARD & ANALİTİK ──────────────────────────────────

  'dashboard': {
    purpose: lang === 'en' ? 'The executive dashboard showing the real-time status of the hotel (occupancy, revenue, check-in/out numbers, department summaries) on a single screen. This is the first screen to look at in the morning.' : 'Otelin anlık durumunu (doluluk, gelir, check-in/out sayıları, departman özetleri) tek ekranda gösteren yönetici panosudur. Sabah gelince ilk bakılacak ekrandır.',
    steps: [
      { title: lang === 'en' ? 'Open the Menu' : 'Menüyü Açın', desc: lang === 'en' ? 'Click on "Dashboard & Analytics" from the vertical menu on the left. The submenu opens. Click on "Executive Panel".' : 'Ekranın sol kenarındaki lacivert/siyah dikey menüden "Dashboard & Analitik" başlığına tıklayın. Alt menü açılır. Oradan "Yönetici Paneli"ne tıklayın.' },
      { title: lang === 'en' ? 'Read the Top Counters' : 'Üst Sayaçları Okuyun', desc: lang === 'en' ? 'There are 4-5 large cards at the top of the screen. Left to right: Today\'s total occupancy percentage, expected revenue, expected check-ins, expected check-outs. These numbers update live.' : 'Ekranın en üstünde 4-5 adet büyük kart (kutu) görünür. Soldan sağa: Bugünkü toplam doluluk yüzdesi, beklenen gelir, bugün giriş yapacak misafir sayısı, bugün çıkış yapacak misafir sayısı. Bu sayılar canlı güncellenir.' },
      { title: lang === 'en' ? 'Examine Department Cards' : 'Departman Kartlarını İnceleyin', desc: lang === 'en' ? 'When you scroll down, smaller cards showing the daily performance of each department like Restaurant, Housekeeping, SPA appear. If you click on a card, you will go to that department\'s own screen.' : 'Aşağı kaydırdığınızda Restoran, Kat Hizmetleri, SPA gibi her departmanın günlük performansını gösteren daha küçük kartlar görünür. Bir karta tıklarsanız o departmanın kendi ekranına geçersiniz.' },
      { title: lang === 'en' ? 'Change Date' : 'Tarih Değiştirme', desc: lang === 'en' ? 'You can select yesterday, this week, or a custom date range by clicking the calendar icon on the top right. All numbers update to that date.' : 'Sağ üst köşedeki takvim simgesine ("Bugün" yazan kısım) tıklayarak dün, bu hafta veya özel bir tarih aralığı seçebilirsiniz. Seçtiğinizde tüm sayılar o tarihe güncellenir.' },
      { title: lang === 'en' ? 'Understand the Graphs' : 'Grafikleri Anlama', desc: lang === 'en' ? 'Line or bar charts are available at the bottom. Hover over them to see the exact figure balloon for that day.' : 'Alt kısımda çizgi veya çubuk grafikler yer alır. Üzerlerine fareyle (mouse ile) geldiğinizde o güne ait kesin rakam balonu çıkar. Grafik üstündeki renk kodlu legendlara (efsane) bakarak hangi çizginin neyi temsil ettiğini anlayabilirsiniz.' }
    ]
  },

  'global-vision': {
    purpose: L('Tüm oteldeki operasyonları (dolu odalar, bekleyen misafirler, açık servis talepleri) coğrafi ve görsel bir harita üzerinde anlık izlemek için kullanılır.', 'Used to monitor all hotel operations in real time (occupied rooms, awaiting guests, open service requests) on a geographic visual map.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Dashboard & Analitik" > "Global Vision" seçeneğine tıklayın.', 'From the left menu, click "Dashboard & Analytics" > "Global Vision".') },
      { title: L('Haritayı Okuyun', 'Read the map'), desc: L('Ekranın ortasında interaktif bir harita yer alır. Her renk bir durumu temsil eder: Yeşil noktalar sorunsuzu, sarı noktalar dikkat gerektirenleri, kırmızı noktalar acil durumları gösterir.', 'An interactive map appears in the centre. Colours indicate status: green for normal, yellow for attention needed, red for urgent issues.') },
      { title: L('Filtre Uygulama', 'Apply filters'), desc: L('Ekranın üst kısmındaki sekmeler (Tümü / Satış / Operasyon / Finans) ile sadece ilgilendiğiniz departmanın verilerini izole edebilirsiniz.', 'Use the top tabs (All / Sales / Operations / Finance) to show only the department you care about.') },
      { title: L('Detaya Girmek', 'Open details'), desc: L('Haritadaki herhangi bir noktaya veya sağ paneldeki kartlara tıklarsanız, o konuma ait detaylı bilgi (hangi oda, hangi servis, kim sorumlu) açılır.', 'Click any point on the map or a card in the right panel to open details (room, service, responsible person).') }
    ]
  },

  'ai-strategy': {
    purpose: lang === 'en' ? 'The module that lists and applies strategic suggestions generated by Artificial Intelligence (increase price, campaign on these dates, revpar increase opportunity).' : 'Yapay zeka tarafından üretilen stratejik önerileri (fiyatı yükselt, şu tarihlerde kampanya yap, revpar artırma fırsatı) listeleyen ve uygulatan modüldür.',
    steps: [
      { title: lang === 'en' ? 'Open the Menu' : 'Menüyü Açın', desc: lang === 'en' ? 'From the left menu, select "Dashboard & Analytics" > "AI Strategy Hub".' : 'Sol menüden "Dashboard & Analitik" > "AI Strategy Hub" seçeneğine tıklayın.' },
      { title: lang === 'en' ? 'Read Suggestions List' : 'Öneri Listesini Okuyun', desc: lang === 'en' ? 'On the left half of the screen, AI-analyzed suggestions are listed card by card. Priority level (High/Medium/Low) and a short description are written on each card.' : 'Ekranın sol yarısında yapay zekanın analiz ettiği öneriler kart kart listelenir. Her kartın üstünde öncelik seviyesi (Yüksek/Orta/Düşük) ve kısa açıklama yazar.' },
      { title: lang === 'en' ? 'Examine Details' : 'Detayı İnceleyin', desc: lang === 'en' ? 'When you click on a suggestion card, data and graphics explaining why that suggestion was made appear on the right panel.' : 'Bir öneri kartına tıkladığınızda sağ panelde o önerinin neden yapıldığına dair veri ve grafik görünür.' },
      { title: lang === 'en' ? 'Apply Suggestion' : 'Öneriyi Uygulayın', desc: lang === 'en' ? 'If you press the "Apply" button at the bottom of the right panel, the system automatically starts that action (sending price, campaign activation, etc.).' : 'Sağ panelin altındaki "Uygula" tuşuna basarsanız sistem otomatik o aksiyonu başlatır (fiyat gönderme, kampanya aktivasyonu vb.).' },
      { title: lang === 'en' ? 'Skip Suggestion' : 'Öneriyi Reddedin', desc: lang === 'en' ? 'If you press "Skip", that suggestion is removed from the list, and the system analyzes the next opportunity.' : '"Atla" tuşuna basarsanız o öneri listeden kalkar, sistem bir sonraki fırsatı analiz eder.' }
    ]
  },

  'forecast': {
    purpose: L('Önümüzdeki 7 gün, 30 gün veya belirli dönem için beklenen doluluk ve gelir tahminlerini grafik ve tablo olarak gösterir.', 'Shows expected occupancy and revenue forecasts for the next 7 days, 30 days, or a custom period in charts and tables.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Dashboard & Analitik" > "Gelecek Tahmini" seçeneğine tıklayın.', 'From the left menu, click "Dashboard & Analytics" > "Forecast".') },
      { title: L('Dönem Seçin', 'Select a period'), desc: L('Ekranın sağ üst köşesindeki dönem seçicisinden "7 Gün / 30 Gün / Özel Aralık" seçeneklerinden birini tıklayın.', 'Use the period selector at the top right to pick "7 Days / 30 Days / Custom range".') },
      { title: L('Grafikleri Yorumlayın', 'Read the charts'), desc: L('Üst çizgi grafik doluluk tahminini (%), alt bar grafik tahmini geliri (TL) gösterir. Çizginin üstüne fareyle gelince tam rakam balonu çıkar.', 'The top line chart shows occupancy forecast (%); the lower bar chart shows expected revenue. Hover for exact values.') },
      { title: L('Karşılaştırma', 'Compare'), desc: L('Sağ üst köşedeki "Geçen Yıl ile Karşılaştır" seçeneğini aktifleştirirseniz aynı grafikte iki yıl yan yana görünür.', 'Enable "Compare with last year" at the top right to see both years on the same chart.') }
    ]
  },

  'dashboard-builder': {
    purpose: L('Yöneticinin kendi özel pano tasarımını sürükle-bırak yöntemiyle oluşturduğu, hangi verilerin ve grafiklerin nerede görüneceğini belirlediği kişiselleştirme ekranıdır.', 'Lets managers build a custom dashboard with drag-and-drop and choose which metrics and charts appear where.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Dashboard & Analitik" > "Dashboard Oluşturucu" seçeneğine tıklayın.', 'From the left menu, click "Dashboard & Analytics" > "Dashboard Builder".') },
      { title: L('Widget Ekleyin', 'Add widgets'), desc: L('Sol panelde kullanabileceğiniz widget listesi yer alır (Gelir Grafiği, Doluluk Sayacı, Hava Durumu vb.). Birini fareyle tutup ana ekrana sürükleyip bırakın.', 'The left panel lists available widgets (revenue chart, occupancy counter, weather, etc.). Drag one onto the main canvas.') },
      { title: L('Boyutlandırın', 'Resize'), desc: L('Panelin sağ alt köşesindeki tutma noktasını çekerek widget\'ı büyütüp küçültebilirsiniz.', 'Drag the resize handle at the bottom-right of a widget to resize it.') },
      { title: L('Kaydedin', 'Save'), desc: L('Düzenlemeyi bitirince sağ üst köşedeki "Kaydet" butonuna basın. Bu pano artık sizin login ettiğinizde karşınıza çıkar.', 'When finished, click "Save" at the top right. This layout becomes your default after login.') }
    ]
  },

  'executive-vision': {
    purpose: L('CEO ve üst yönetim için otelin finansal ve operasyonel özetini sunan; RevPAR, ADR, doluluk gibi kritik KPI\'ların tek sayfada göründüğü rapor ekranıdır.', 'Executive summary of financial and operational performance for leadership: RevPAR, ADR, occupancy and other KPIs on one page.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Dashboard & Analitik" > "Yönetici Görüşü" seçeneğine tıklayın.', 'From the left menu, click "Dashboard & Analytics" > "Executive Vision".') },
      { title: L('KPI Kartlarını Okuyun', 'Read the KPI cards'), desc: L('Ekranın üst kısmındaki büyük kutularda RevPAR (Mevcut oda başına gelir), ADR (Ortalama oda fiyatı) ve Doluluk Oranı (%) yazar. Bunların yanındaki ok simgesi (↑ veya ↓) geçen dönemle kıyaslamayı gösterir.', 'Large cards at the top show RevPAR, ADR and occupancy (%). Arrows (↑/↓) indicate change vs the previous period.') },
      { title: L('Departman Gelir Dağılımı', 'Revenue by department'), desc: L('Ortadaki pasta grafik hangi departmanın toplam gelirin kaçını ürettiğini yüzdeyle gösterir.', 'The pie chart in the middle shows each department’s share of total revenue.') },
      { title: L('PDF Rapor Alın', 'Download PDF'), desc: L('Sağ üst köşedeki "PDF İndir" butonuna basarak o günün tüm raporunu otomatik biçimlendirilmiş PDF\'e dönüştürüp indirin. Patrona sunabilirsiniz.', 'Click "Download PDF" at the top right to export the day’s report as a formatted PDF for management.') }
    ]
  },

  // ─── ÖN BÜRO & REZERVASYON ──────────────────────────────────

  'front-office': {
    purpose: L('Resepsiyon masasının ana ekranıdır. Gelen misafirlerin check-in\'i, otelde konaklayan misafirlerin takibi, çıkış işlemleri ve oda değişiklikleri buradan yapılır.', 'Main reception desk screen: check-ins, in-house guest tracking, check-outs and room moves.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." başlığına tıklayın. Açılan alt listeden "Ön Büro" seçeneğine tıklayın.', 'From the left menu, open "Front Office & Reservations" > "Front Office".') },
      { title: L('3 Listeyi Tanıyın', 'Know the three lists'), desc: L('Ekran yan yana 3 büyük listeye bölünür: EN SOL "Bugün Gelecekler (Arrivals)" — bugün giriş yapması beklenenler. ORTA "Otelde Kalanlar (In-House)" — şu an odada olan misafirler. EN SAĞ "Bugün Çıkacaklar (Departures)" — bugün çıkış yapması gereken misafirler.', 'Three columns: left — today’s arrivals; centre — in-house guests; right — today’s departures.') },
      { title: L('Misafiri Arayın', 'Search for a guest'), desc: L('Herhangi bir listedeki arama kutusuna müşterinin adını, soyadını veya oda numarasını yazıp klavyede Enter\'a basın. Liste anında o kişiye göre süzülür.', 'Use the search box in any list: name, surname or room number, then Enter.') },
      { title: L('Check-in Yapın (Misafir Geldi)', 'Check in (guest arrived)'), desc: L('Gelecekler listesinde misafiri buldunuz. İsminin en sağındaki 3 dikey noktaya (⋮) fareyle tıklayın. Açılan küçük menüden "Check-in" seçeneğine tıklayın. Sistem önce odanın temiz olup olmadığını, ödemenin tamamlanıp tamamlanmadığını kontrol eder. Her şey tamam ise misafir otomatik In-House listesine taşınır.', 'In Arrivals, open the ⋮ menu on the row and choose Check-in. The system checks room status and payment; if OK, the guest moves to In-House.'), warn: L('Sistem "Ödeme Eksik" şeklinde kırmızı uyarı verirse misafiri odaya almadan önce Tahsilat işlemini yapın.', 'If you see a red "Payment missing" warning, collect payment before assigning the room.') },
      { title: L('Check-out Yapın (Misafir Gidecek)', 'Check out (guest leaving)'), desc: L('Departures listesinde misafiri bulun. 3 noktaya tıklayıp "Check-out" seçin. Sistem folyo (hesap) özetini açar. Bakiye 0 ise "Onayla" basın. Bakiye varsa önce tahsilatı alın.', 'In Departures, use ⋮ > Check-out. Review the folio; if balance is zero confirm, otherwise collect payment first.') },
      { title: L('Oda Değiştirin', 'Change room'), desc: L('In-House listesindeki misafirin 3 noktasına tıklayın, "Oda Değiştir" seçin. Açılan haritada yeşil (boş-temiz) bir odaya tıklayın. "Onayla" ile işlemi bitirin. Tüm harcamalar yeni odaya taşınır.', 'From In-House, ⋮ > Room change. Pick a vacant clean room on the map and confirm; charges move to the new room.') },
      { title: L('Misafir Notu Ekleyin', 'Add a guest note'), desc: L('Misafirin isminin üstüne (3 nokta değil, direkt isim) tıklayın. Sağdan detay paneli açılır. En aşağıda "Not Ekle" alanı vardır. Özel istekleri (alerjisi, tercih ettiği kat, VIP notu) buraya yazıp kaydedin.', 'Click the guest name (not ⋮) to open the detail panel. Use "Add note" at the bottom for allergies, floor preference, VIP, etc.') },
      { title: L('No-Show İşlemi (Misafir Gelmedi)', 'No-show (guest did not arrive)'), desc: L('Gün sonu Arrivals listesinde hâlâ bekleyen isimler varsa gelmemiş demektir. 3 noktadan "No-Show" seçeneğini tıklayın. Sistem rezervasyonu iptal eder, odayı serbest bırakır.', 'If names remain on Arrivals at end of day, mark No-show from ⋮. The reservation cancels and the room is released.') }
    ]
  },

  'reservations-tape': {
    purpose: L('Tüm rezervasyonları zaman çizelgesi (tape chart) üzerinde, oda bazında renk renk gösteren takvim görünümüdür. Kim ne zaman geliyor-gidiyor tek bakışta görülür.', 'Tape-chart calendar: reservations by room and date in colour blocks so you can see who is in and out at a glance.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Rezervasyon Takvimi" seçeneğine tıklayın.', 'From the left menu: "Front Office & Reservations" > "Reservation calendar" (tape chart).') },
      { title: L('Takvimi Okuyun', 'Read the chart'), desc: L('Ekranın en üstünde tarih sütunları, sol kenarında oda numaraları yer alır. Her rezervasyon renkli bir blok olarak görünür. Bloğun üstünde misafir adı yazar.', 'Dates across the top, room numbers down the left. Each booking is a coloured block with the guest name.') },
      { title: L('İleri-Geri Kaydırın', 'Navigate dates'), desc: L('Ekranın üstündeki sol-sağ ok butonlarıyla hafta hafta kaydırabilirsiniz. Ya da üstteki tarih kutusunu tıklayarak doğrudan bir tarihe atlayabilirsiniz.', 'Use the arrows to move week by week, or pick a date from the date control.') },
      { title: L('Rezervasyon Detayı', 'Reservation details'), desc: L('Bir rezervasyon bloğuna tıkladığınızda ekranın sağından bir detay paneli süzülür. Bu panelde misafir adı, giriş-çıkış tarihi, oda tipi, ödeme durumu ve notlar yer alır.', 'Click a block to open the side panel: guest, stay dates, room type, payment status and notes.') },
      { title: L('Yeni Rezervasyon Açın', 'Start a new reservation'), desc: L('Takvimde boş bir hücreye çift tıklarsanız o oda ve tarih için direkt Yeni Rezervasyon sihirbazı açılır.', 'Double-click an empty cell to open the new-reservation wizard for that room and date.') },
      { title: L('Renk Kodlarını Anlayın', 'Colour legend'), desc: L('Her renk bir ödeme/kaynak durumunu gösterebilir. Ekranın sol alt köşesindeki legend (renk açıklama kutusu) hangi rengin ne anlama geldiğini söyler.', 'Colours may mean payment or source status. Check the legend at the bottom left.') }
    ]
  },

  'new-reservation': {
    purpose: L('Telefon, kapı veya e-posta yoluyla gelen müşteriler için sıfırdan yeni oda rezervasyonu oluşturma sihirbazıdır.', 'Wizard to create a new room booking from phone, walk-in or email.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Yeni Rezervasyon" seçeneğine tıklayın.', 'Left menu: "Front Office & Reservations" > "New reservation".') },
      { title: L('Tarihleri Girin', 'Enter dates'), desc: L('Açılan sayfanın üst kısmında iki büyük tarih kutusu görünür. SOL kutu giriş (Check-in) tarihini, SAĞ kutu çıkış (Check-out) tarihini alır. Kutuya tıklayınca takvim açılır, günlere tıklayarak seçin.', 'Two large date fields at the top: left check-in, right check-out. Click to open the calendar.') },
      { title: L('Kişi Sayısı', 'Party size'), desc: L('Tarih kutularının hemen altında "Yetişkin" ve "Çocuk" sayısı seçicileri yer alır. + ve – butonlarıyla ayarlayın. Çocuk seçerseniz sistem yaş sorar — yaşa göre yemek ücreti hesaplanır.', 'Adjust adults and children with +/−. For children, enter ages if prompted for meal pricing.') },
      { title: L('Müsait Odaları Bulun', 'Find availability'), desc: L('Sağ alt köşedeki büyük mavi "Müsait Odaları Bul" butonuna tıklayın. Sistem 2-3 saniyede o tarihlerde boş olan tüm oda tiplerini resimleri ve fiyatlarıyla listeler.', 'Click the blue "Find available rooms" button. Room types, images and rates load for the selected dates.') },
      { title: L('Odayı Seçin', 'Select a room'), desc: L('İstediğiniz odanın kartının altındaki yeşil "Seç" butonuna tıklayın. Seçilen oda sarı çerçeveyle vurgulanır ve bir sonraki adıma geçilir.', 'Press "Select" on the room card. The selection is highlighted and you move to the next step.') },
      { title: L('Fiyatı Düzenleyin (Gerekirse)', 'Edit rate if needed'), desc: L('Seçilen odanın fiyat kutusunda rakam görünür. Müşteriye özel indirim verecekseniz o kutudaki sayıyı silip yeni rakamı yazın. Yetkiniz varsa sistem kabul eder; yoksa yönetici onayı ister.', 'Change the rate in the price field if you have authority; otherwise manager approval may be required.'), warn: L('Yetkinizin üstünde indirim yapmaya çalışırsanız sistem son adımda "Yönetici Şifresi Gerekli" uyarısı verir.', 'Discounts beyond your limit trigger a "Manager password required" prompt.') },
      { title: L('Müşteri Bilgilerini Girin', 'Guest details'), desc: L('Ad, soyad, telefon kutularını doldurun. Adı yazmaya başlarken sistem daha önce konaklamış biriyse "Bu isimde kayıtlı müşteri var" diye öneri çıkarır — üstüne tıklarsanız tüm bilgiler otomatik dolar.', 'Fill name and phone. If a returning guest is suggested, click to auto-fill profile fields.') },
      { title: L('Ödeme Yöntemini Seçin', 'Payment method'), desc: L('Alt kısımda "Ön Ödeme Al" veya "Çıkışta Öde" seçenekleri vardır. Ön ödeme alacaksanız tutarı ve ödeme tipini (Nakit/Kart) girin.', 'Choose deposit or pay on departure; for deposits enter amount and cash/card.') },
      { title: L('Rezervasyonu Tamamlayın', 'Complete booking'), desc: L('En alttaki büyük yeşil "Rezervasyonu Tamamla" (veya "Kaydet") butonuna tıklayın. Sistem onay numarası üretir ve müşterinin telefonuna/e-postasına otomatik bildirim gönderir.', 'Click "Complete reservation" or Save. A confirmation is generated and notifications can be sent.') }
    ]
  },

  'room-rack': {
    purpose: L('Otelin tüm odalarının anlık durumunu (boş, dolu, kirli, arızalı) görsel bir kat planında (haritada) gösterir. Kim hangi odada, hangi oda boş, tek ekranda görülür.', 'Visual floor plan of every room: vacant, occupied, dirty, out of order — who is where on one screen.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Room Rack" seçeneğine tıklayın.', 'Left menu: "Front Office & Reservations" > "Room rack".') },
      { title: L('Renk Kodlarını Anlayın', 'Colour codes'), desc: L('YEŞİL kutu: Boş ve temiz (misafir alınabilir). KIRMIZI kutu: Dolu, misafir içinde yatıyor. SARI kutu: Kirli, temizlenmeyi bekliyor. GRİ kutu: Bakımda veya arızalı, misafir alınamaz.', 'Green: vacant clean. Red: occupied. Yellow: dirty. Grey: maintenance / out of order.') },
      { title: L('Oda Detayını Görün', 'Room details'), desc: L('Herhangi bir oda kutusuna tıkladığınızda sağdan bir panel açılır. Bu panelde o odanın misafir adı, giriş-çıkış tarihi, oda tipi ve anlık durumu yazar.', 'Click a room tile to open the panel with guest, dates, room type and status.') },
      { title: L('Oda Durumunu Değiştirin', 'Change room status'), desc: L('Oda kutusuna sağ tıklayın veya kutunun üst köşesindeki küçük menü simgesini tıklayın. "Durum Değiştir" seçeneğiyle oda statüsünü güncellerin (örn: Kirli → Temiz).', 'Right-click or use the menu icon > Change status (e.g. dirty → clean).') },
      { title: L('Kat Filtresi', 'Floor filter'), desc: L('Ekranın solundaki kat numaralarına (1.Kat, 2.Kat vb.) tıklayarak sadece o katın odalarını görebilirsiniz.', 'Click floor numbers on the left to show only that floor.') }
    ]
  },

  'res-list': {
    purpose: L('Sistemdeki tüm rezervasyonları (geçmiş, bugün, gelecek, iptal) listeleyen, arama ve filtreleme yapılabilen ana rezervasyon listesidir.', 'Master list of all reservations (past, today, future, cancelled) with search and filters.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Rezervasyon Listesi" seçeneğine tıklayın.', 'Left menu: "Front Office & Reservations" > "Reservation list".') },
      { title: L('Arama Yapın', 'Search'), desc: L('Sayfanın üstündeki beyaz arama kutusuna müşteri adı, oda numarası veya rezervasyon kodu yazılıp Enter\'a basın. Sistem 5000 kayıt arasından anlık süzer.', 'Search by guest name, room or booking code in the top bar, then Enter.') },
      { title: L('Tarih Filtresi', 'Date filter'), desc: L('Sol taraftaki filtre panelinden "Giriş Tarihi" veya "Çıkış Tarihi" için tarih aralığı seçerek listeyi o döneme göre daraltın.', 'Use the left filter panel to narrow by arrival or departure date range.') },
      { title: L('Durum Filtresi', 'Status filter'), desc: L('Filtre panelinde "Durum" seçicisinden "Aktif / İptal / Tamamlandı / No-Show" seçeneğini işaretleyin.', 'Filter by status: active, cancelled, completed, no-show.') },
      { title: L('Rezervasyona Girin', 'Open a booking'), desc: L('Listedeki bir satıra tıklarsanız o rezervasyonun detay kartı açılır.', 'Click a row to open the reservation detail card.') },
      { title: L('Excel İndir', 'Export to Excel'), desc: L('Sağ üst köşedeki küçük Excel (tablo) ikonuna tıklayarak mevcut filtrelenmiş listeyi bilgisayarınıza Excel dosyası olarak indirin.', 'Use the Excel icon at the top right to download the filtered list.') }
    ]
  },

  'res-card': {
    purpose: L('Tek bir rezervasyona ait tüm bilgileri (misafir, oda, ödeme durumu, notlar, routing) gösteren ve düzenlenebilen rezervasyon detay kartıdır.', 'Editable reservation detail: guest, room, payment, notes and routing.'),
    steps: [
      { title: L('Açılış', 'Opening the card'), desc: L('Rezervasyon Listesi\'nden bir kayda tıklayarak veya sol menüden "Rezervasyon Kartı" girerek açın.', 'Open from the reservation list or left menu "Reservation card".') },
      { title: L('Misafir Bilgisi Bölümü', 'Guest section'), desc: L('Sayfanın üst kısmında misafirin adı, telefonu, e-postası, TC/Pasaport numarası yer alır. "Düzenle" (kalem) ikonuna tıklayarak bunları güncelleyebilirsiniz.', 'Top section shows name, phone, email, ID/passport. Use the pencil icon to edit.') },
      { title: L('Konaklama Detayı', 'Stay details'), desc: L('Ortada giriş-çıkış tarihleri, oda numarası, oda tipi, yetişkin/çocuk sayısı ve anlaşma tipi yazar. Tarih değişikliği yapmak istiyorsanız bu bölümden "Tarihleri Düzenle" seçin.', 'Centre: dates, room, type, pax and rate plan. Use "Edit dates" to change stay.') },
      { title: L('Notlar ve Özel İstekler', 'Notes and requests'), desc: L('Alt kısımdaki "Notlar" alanına misafire özel talepleri (alerjisi var, üst kat istemez, bebek karyolası lazım) yazın. Bu notlar Ön Büro ve Kat Hizmetleri ekranlarında da görünür.', 'Add special requests in Notes; visible to front office and housekeeping.') },
      { title: L('Belge Yazdırın', 'Print'), desc: L('Sağ üst köşedeki "Yazdır" butonuyla rezervasyon onay belgesi veya folyo özeti alabilirsiniz.', 'Use Print at the top right for confirmation or folio summary.') }
    ]
  },

  'group-res': {
    purpose: L('Kafile, düğün, konferans veya şirket grubu için tek seferde çok sayıda oda bloğu oluşturmaya ve yönetmeye yarayan grup rezervasyonu modülüdür.', 'Group bookings: weddings, conferences, tours — create and manage room blocks in one place.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Grup Rezervasyonları" seçeneğine tıklayın.', 'Left menu: "Front Office & Reservations" > "Group reservations".') },
      { title: L('Yeni Grup Oluşturun', 'Create a group'), desc: L('Sağ üst köşedeki "+ Yeni Grup" butonuna tıklayın. Açılan formda grup adını (örn: "ABC Şirketi Toplantı Grubu"), giriş tarihi, çıkış tarihi ve tahmini kişi sayısını girin.', 'Click "+ New group". Enter group name, stay dates and expected headcount.') },
      { title: L('Oda Bloğu Ayarlayın', 'Room block'), desc: L('Grup oluşturulduktan sonra "Oda Bloğu Ekle" butonuyla hangi oda tipinden kaç adet istediğinizi belirtin. Sistem o blokları rezerve eder.', 'After creation, use "Add room block" to set counts by room type.') },
      { title: L('Bireysel Kayıtlar', 'Assign guests'), desc: L('Her oda için isme özel check-in yapmak isterseniz grup listesinden ilgili odaya tıklayıp "Misafir Ata" seçeneğiyle kişinin bilgilerini girin.', 'Click a room in the group list and "Assign guest" for named check-ins.') },
      { title: L('Toplu Fatura', 'Master billing'), desc: L('Grubun tamamı için tek fatura kesilmesini istiyorsanız "Routing Ayarla" ile tüm harcamaların tek hesaba gitmesini ayarlayın.', 'Use routing so all group charges post to one master account if required.') }
    ]
  },

  'channel': {
    purpose: L('Booking.com, Expedia, HRS, Agoda gibi online satış kanallarına oda fiyatı ve müsaitlik göndermek; bu kanallardan gelen rezervasyonları görmek ve yönetmek için kullanılan Kanal Yönetimi ekranıdır.', 'Channel manager: push rates and availability to OTAs; view and manage inbound bookings.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Kanal Yönetimi" seçeneğine tıklayın.', 'Left menu: "Front Office & Reservations" > "Channel manager".') },
      { title: L('Bağlı Kanalları Görün', 'Connected channels'), desc: L('Ekranın SOL tarafında bağlı kanalların listesi yer alır: Booking.com, Expedia, HRS vb. Yanında yeşil nokta varsa bağlantı aktif demektir. Kırmızı nokta bağlantı hatası demektir.', 'Left: channel list. Green dot = connected; red = error.') },
      { title: L('Booking Rezervasyonlarını Kontrol Edin', 'Review OTA bookings'), desc: L('Sol listeden "Booking.com"a tıklayın. Sağ tarafta Booking\'ten gelen rezervasyonlar listelenir. Yeni bir rezervasyon geldiyse listede "Yeni" etiketi yazar.', 'Select a channel; new bookings may show a "New" label.') },
      { title: L('Fiyat Gönderin', 'Push rates'), desc: L('Üst menüden "Fiyat & Müsaitlik" sekmesine tıklayın. Tarih aralığı, oda tipi ve fiyatı giren alanları doldurun. En sağdaki "Tüm Kanallara Gönder" butonuna basın. Sistem aynı anda tüm platformları günceller.', 'Open Rates & Availability, set date range, room type and rate, then "Send to all channels".') },
      { title: L('Belirli Tarihi Kapatın', 'Close a date'), desc: L('Müsaitlik ekranında bir tarihe çift tıklayarak o tarih için tüm kanalları kapatabilirsiniz (örn: otelin dolduğu gün yeni rezervasyon almasını engellemek için).', 'Double-click a date on the availability grid to stop sales on all channels for that night.') },
      { title: L('Kanal Bağlantı Sorunu', 'Connection issues'), desc: '', warn: L('Sol listede kırmızı nokta gören bir kanal varsa IT departmanını veya Sistem Yöneticisini bilgilendirin. Bu sürede o kanaldan rezervasyon alınamaz.', 'If a channel shows red, notify IT or the system admin; bookings may not sync until fixed.') }
    ]
  },

  'crs': {
    purpose: L('Zincir oteller veya birden fazla mülk için merkezi rezervasyon yönetimi; tüm otellerdeki dolulukları ve rezervasyonları tek noktadan görme imkânı sağlar.', 'Central reservations for chains or multiple properties: one place to see occupancy and bookings.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Ön Büro & Rez." > "Merkezi Rezervasyon" seçeneğine tıklayın.', 'Left menu: "Front Office & Reservations" > "Central reservation" (CRS).') },
      { title: L('Otel Filtresi', 'Property filter'), desc: L('Sol üstte otel seçici vardır. "Tüm Oteller" seçiliyse tüm zincirin verisi belirir. Belirli bir oteli seç diyerek sadece o otelin rezervasyonlarını filtreleyin.', 'Use the property picker: all hotels or one property.') },
      { title: L('Rezervasyon Dağıtımı', 'Distribute bookings'), desc: L('Merkezi sistemden gelen talepleri ilgili otele atamak için satırın sağındaki "Onayla ve Aktar" butonuna tıklayın.', 'Use "Approve and transfer" to assign central requests to a hotel.') },
      { title: L('Karşılaştırma Raporu', 'Comparison report'), desc: L('"Rapor" sekmesinden oteller arası doluluk ve gelir karşılaştırmasını Excel olarak indirin.', 'Under Report, export cross-property occupancy and revenue to Excel.') }
    ]
  },

  // ─── OPERASYON ──────────────────────────────────────────────

  'housekeeping': {
    purpose: L('Kat görevlilerinin hangi odayı temizleyeceğini planlamak, oda durumlarını (kirli/temiz/arızalı) anlık takip etmek ve personel görevlendirmesi yapmak için kullanılan operasyon ekranıdır.', 'Housekeeping operations: assign rooms, track dirty/clean/out-of-order status and staff tasks in real time.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Kat Hizmetleri (HK)" seçeneğine tıklayın.', 'Left menu: "Operations" > "Housekeeping (HK)".') },
      { title: L('Haritadaki Renkleri Anlayın', 'Understand colours'), desc: L('Ekranda kare kutucuklar (her biri bir oda) görünür. KIRMIZI: Kirli — misafir çıkmış, temizlenmesi lazım. YEŞİL: Temiz — misafir girebilir. SARI: Uyarı — personel içerde/bildirim bekliyor. GRİ: Arızalı — teknik servis bekleniyor.', 'Red: dirty. Green: clean. Yellow: in progress / alert. Grey: maintenance.') },
      { title: L('Personel Atayın', 'Assign staff'), desc: L('Kırmızı (kirli) bir oda kutusuna tıklayın. Sağdan açılan panelde "Personel Ata" seçicisinden temizlik personelini (Ayşe Hanım gibi) seçin ve "Kaydet"e basın. Personelin telefonuna bildirim gider.', 'Click a dirty room, pick staff in "Assign staff" and Save; they get a notification.') },
      { title: L('Otomatik Dağıtım', 'Auto-assign'), desc: L('Sayfanın üstündeki "Otomatik Dağıt" butonuna basarsanız sistem, tüm kirli odaları o gün müsait personele dengeli olarak böler ve hepsine bildirim gönderir.', '"Auto distribute" splits dirty rooms evenly among available staff and notifies them.') },
      { title: L('Temizlik Tamamlandı', 'Mark clean'), desc: L('Personel temizliği bitirince kendi ekranından (veya siz onun adına) odanın durumunu KIRMIZI\'dan YEŞİL\'e çekin. "Durum Değiştir > Temiz" seçin.', 'When done, change status to Clean (red → green) from staff or supervisor screen.') },
      { title: L('Arıza Bildirimi', 'Report defect'), desc: L('Odada klima bozuksa, delik varsa vb.: Oda kutusuna tıklayın, "Arıza Bildir" butonuna basın. Arıza kategorisini (elektrik, su, mobilya vb.) seçip açıklama yazın. Sistem Teknik Servise otomatik iş emri açar.', 'Use "Report defect" with category and notes; an engineering work order is created.') },
      { title: L('Kayıp Eşya Uyarısı', 'Lost & found'), desc: '', warn: L('Odada müşteriye ait bir eşya buldunuzsa, odayı "Temiz" yapmadan önce "Kayıp & Bulunan" modülüne fotoğraflı kayıt atın. Sonra temizleme işlemini tamamlayın.', 'If you find guest belongings, log them with a photo in Lost & Found before marking the room clean.') }
    ]
  },

  'tech-service': {
    purpose: L('Otel genelinde bildirilen arızaların, bakım taleplerinin ve tamir işlerinin iş emri olarak kaydedildiği ve teknisyene atandığı teknik servis modülüdür.', 'Engineering: log faults and maintenance as work orders and assign technicians.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Teknik Servis" seçeneğine tıklayın.', 'Left menu: "Operations" > "Technical service".') },
      { title: L('Yeni İş Emri Açın', 'New work order'), desc: L('Sağ üst köşedeki "+ Yeni İş Emri" butonuna tıklayın. Açılan formda: Arıza Kategorisi (Elektrik/Su/Klima/Mobilya/Diğer), Oda Numarası veya Konum (Lobi, Havuz vb.), Kısa Açıklama ve Öncelik Seviyesi (Düşük/Orta/Yüksek/Kritik) alanlarını doldurun.', 'Click "+ New work order". Fill category, room or area, description and priority.') },
      { title: L('Fotoğraf Ekleyin', 'Add photos'), desc: L('Formun altındaki "Fotoğraf Ekle" alanından arızanın fotoğrafını yükleyin. Bu teknisyenin ne göreceğini anlamasını kolaylaştırır.', 'Attach photos so technicians see the issue clearly.') },
      { title: L('Teknisyene Atayın', 'Assign technician'), desc: L('"Teknisyen" seçicisinden o gün müsait olan teknisyeni seçin ve "Oluştur" butonuna basın. Teknisyen bildirim alır.', 'Pick an available technician and Create; they receive a notification.') },
      { title: L('İş Emrini Takip Edin', 'Track work orders'), desc: L('Ana listede iş emirleri "Bekliyor / Devam Ediyor / Tamamlandı" statüsünde görünür. Üzerlerine tıklayarak güncelleme notlarını okuyabilirsiniz.', 'List shows Pending / In progress / Completed; open a row for updates.') },
      { title: L('Tamamlama', 'Completion'), desc: L('Teknisyen işi bitirince "Tamamlandı" olarak işaretler. İş emrinin tipi "Oda Arızası" ise sistem otomatik olarak Kat Hizmetleri\'ne uyarı gönderir ki o oda kontrol edilsin.', 'When completed, room faults may notify housekeeping to re-inspect the room.') }
    ]
  },

  'spa': {
    purpose: L('SPA, masaj, hamam, sauna ve wellness hizmetlerinin randevu alınması, terapist planlaması ve tahsilatının yönetildiği departman ekranıdır.', 'Spa and wellness: appointments, therapist scheduling and billing.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "SPA & Wellness" seçeneğine tıklayın.', 'Left menu: "Operations" > "Spa & Wellness".') },
      { title: L('Takvimi Görün', 'View calendar'), desc: L('Ekran terapist bazlı randevu takvimi şeklinde açılır. Her terapistin sütununda o gün var randevuları renkli bloklar halinde görünür.', 'Therapist columns show today’s appointments as coloured blocks.') },
      { title: L('Randevu Oluşturun', 'Create appointment'), desc: L('Sağ üst "+ Randevu" butonuna tıklayın. Hizmet türü (Masaj/Hamam/Tedavi), tarih, saat, süre ve misafiri (oda numarasından veya isimden) seçin, "Kaydet"e basın.', 'Use "+ Appointment": service, date, time, duration, guest by room or name, Save.') },
      { title: L('Misafirin Hesabına Yazın', 'Post to room'), desc: L('Hizmet tamamlandıktan sonra randevu bloğuna tıklayın. Açılan panelden "Hesaba Yaz" butonuyla SPA ücreti misafirin otel faturasına (folyosuna) otomatik eklenir.', 'After service, open the block and "Post to account" to charge the guest folio.') },
      { title: L('Nakit Tahsilat', 'Collect payment'), desc: L('Misafir direkt ödemek istiyorsa "Hemen Tahsil Et" seçeneğiyle nakit veya kart ödemesi alın.', 'Use "Collect now" for immediate cash or card payment.') }
    ]
  },

  'banquet': {
    purpose: L('Düğün, toplantı, konferans, iftar yemeği, mezuniyet gibi organizasyonların salon rezervasyonu, menü planlaması, ekipman yönetimi ve faturalandırmasının yapıldığı etkinlik modülüdür.', 'Banquets and events: venue booking, menus, equipment and billing for weddings, meetings, conferences, etc.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Ziyafet & Etkinlik" seçeneğine tıklayın.', 'Left menu: "Operations" > "Banquet & Events".') },
      { title: L('Etkinlik Oluşturun', 'Create event'), desc: L('Sağ üst "+ Yeni Etkinlik" butonuna tıklayın. Etkinlik adı, tarih, saat, süre, katılımcı sayısı ve kullanılacak salon bilgilerini girin.', 'Click "+ New event" and enter name, date, time, duration, pax and function room.') },
      { title: L('Salon Durumu', 'Room availability'), desc: L('Hangi salonun o tarihte müsait olduğunu görmek için takvim görünümüne geçin. Dolu salonlar kırmızı, boş olanlar yeşil görünür.', 'Switch to calendar view: busy rooms red, available green.') },
      { title: L('Menü ve Ekipman', 'Menu and equipment'), desc: L('Oluşturduğunuz etkinliğe tıklayıp "Menü Seç" bölümünden yemek paketini belirleyin. "Ekipman" bölümünden projeksiyon, sahne vb. ihtiyaçları işaretleyin.', 'Open the event: set menu package and tick AV/stage needs under Equipment.') },
      { title: L('Fatura Oluşturun', 'Invoice'), desc: L('Etkinlik tamamlandıktan sonra "Fatura Oluştur" butonuyla detaylı döküm Finans modülüne otomatik aktarılır.', 'After the event, "Create invoice" sends the breakdown to Finance.') }
    ]
  },

  'smart-room': {
    purpose: L('Akıllı oda sistemleri (sıcaklık, aydınlatma, perde) ve otel geneli enerji tüketimini izlemek, uzaktan kontrol etmek için kullanılan IoT yönetim ekranıdır.', 'Smart room and energy: monitor and remotely control HVAC, lights, curtains and property-wide consumption.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Smart Room & Energy" seçeneğine tıklayın.', 'Left menu: "Operations" > "Smart Room & Energy".') },
      { title: L('Oda Seçin', 'Select a room'), desc: L('Sol paneldeki oda numaralarından birine tıklayın. Sağ tarafta o odanın anlık sıcaklığı, ışık seviyesi ve perde durumu gösterilir.', 'Click a room on the left; right panel shows temperature, lights and blinds.') },
      { title: L('Uzaktan Kontrol Edin', 'Remote control'), desc: L('Misafir yokken: Klima sıcaklığını sliderı kaydırarak değiştirin, ışık düğmesini tıklayarak açıp kapatın. "Kaydet"e basınca komut odaya iletilir.', 'When vacant, adjust sliders and toggles, then Save to send commands to the room.') },
      { title: L('Enerji Raporu', 'Energy report'), desc: L('Üst menüden "Tüketim Raporu" sekmesine geçin. Oda bazlı ve departman bazlı elektrik/su tüketimini grafiklerle görün. Aşırı tüketen odalar kırmızıyla vurgulanır.', 'Consumption report tab: charts by room and department; high usage highlighted in red.') }
    ]
  },

  'lost-found': {
    purpose: L('Otelde bulunan veya müşterilerin unuttuğu eşyaların kayıt altına alındığı, sahiplerine ulaştırıldığı ve zimmet takibinin yapıldığı modüldür.', 'Lost and found: register items, notify owners and track handover.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Kayıp & Bulunan" seçeneğine tıklayın.', 'Left menu: "Operations" > "Lost & Found".') },
      { title: L('Yeni Eşya Kaydedin', 'New record'), desc: L('Sağ üst "+ Yeni Kayıt" butonuna tıklayın. Eşyanın bulunduğu yer (Oda 105 / Lobi / Havuz başı), eşyanın tanımı (Mavi deri cüzdan), bulan personelin adı ve bulunma tarihi/saatini girin.', 'Click "+ New record": location, description, finder and time found.') },
      { title: L('Fotoğraf Ekleyin', 'Add photo'), desc: L('Form altındaki fotoğraf alanına eşyanın resmini yükleyin. Bu hem doğrulama hem de ileride yapılacak zimmet teslimi için gereklidir.', 'Upload a photo for verification and handover documentation.') },
      { title: L('Sahibini Bulun', 'Notify owner'), desc: L('Eğer yakın tarihte check-out yapan misafir listesinden sahibini tespit edebiliyorsanız, kayıt formundaki "Sahibine Bildir" butonuyla otomatik SMS/e-posta bildirimi gönderin.', 'If you can match a recent checkout, use "Notify owner" for SMS/email.') },
      { title: L('Teslim Edin', 'Hand over'), desc: L('Sahibi gelip teslim aldığında kaydın üzerindeki "Teslim Edildi" seçeneğini işaretleyin ve teslim alan kişinin imzasını/notunu girin.', 'Mark "Returned" and capture signature or note when collected.') }
    ]
  },

  'laundry': {
    purpose: L('Misafir çamaşırlarının yıkama/ütüleme/kuru temizleme siparişlerinin alındığı, takip edildiği ve misafirin hesabına yansıtıldığı çamaşırhane yönetim ekranıdır.', 'Laundry: take wash/press/dry-clean orders, track status and post to guest folio.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Çamaşırhane" seçeneğine tıklayın.', 'Left menu: "Operations" > "Laundry".') },
      { title: L('Yeni Sipariş Alın', 'New order'), desc: L('Sağ üst "+ Sipariş Ekle" butonuna tıklayın. Oda numarasını girin (sistem misafirin adını otomatik getirir). Hizmet tipini seçin: Normal (24 saat), Ekspres (6 saat), Kuru Temizleme.', 'Click "+ Add order", enter room (guest auto-fills), choose standard, express or dry-clean.') },
      { title: L('Kalemleri Girin', 'Line items'), desc: L('Kaç adet gömlek, pantolon, iç çamaşırı vb. olduğunu girin. Sistem birim fiyatlarla toplam tutarı hesaplar.', 'Enter piece counts; totals calculate from unit prices.') },
      { title: L('Durumu Takip Edin', 'Track status'), desc: L('Ana listede sipariş durumu "Teslim Alındı / Yıkanıyor / Hazır / Teslim Edildi" şeklinde güncellenir. "Hazır" gördüğünüzde misafiri arayabilirsiniz.', 'Statuses: received / washing / ready / delivered. Call the guest when ready.') },
      { title: L('Hesaba Yansıtın', 'Post charges'), desc: L('Teslimat sonrasında, siparişin yanındaki "Hesaba Yaz" butonuyla çamaşırhane ücretini misafirin folio\'suna ekleyin.', 'After delivery, use "Post to account" to charge the folio.') }
    ]
  },

  'entertainment': {
    purpose: L('Animasyon, canlı müzik, show ve eğlence etkinliklerinin planlandığı, ekiplere görev atandığı ve misafir katılım durumunun takip edildiği departman ekranıdır.', 'Entertainment: plan shows and activities, assign teams and log attendance.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Operasyon" > "Entertainment" seçeneğine tıklayın.', 'Left menu: "Operations" > "Entertainment".') },
      { title: L('Etkinlik Takvimini Görün', 'Event calendar'), desc: L('Ekranda haftalık takvim view açılır. Planlı etkinlikler renkli bloklar halinde gösterilir. Üstlerine tıklayarak detayları görebilirsiniz.', 'Weekly calendar with planned events as blocks; click for details.') },
      { title: L('Yeni Etkinlik Ekleyin', 'Add event'), desc: L('"+ Etkinlik Ekle" butonuyla etkinliğin adını, yerini (Amfi Tiyatro/Havuz Sahası/Lobi), saatini ve sorumlu animatörü belirtin.', 'Use "+ Add event": name, venue, time and lead host.') },
      { title: L('Katılım Takibi', 'Attendance'), desc: L('Etkinlik sonrasında kaç misafirin katıldığını girerek raporlama yapabilirsiniz.', 'After the event, enter guest count for reporting.') }
    ]
  },

  // ─── YİYECEK & İÇECEK ───────────────────────────────────────

  'pos': {
    purpose: L('Restoran, bar, havuz başı ve tüm yiyecek-içecek satış noktalarında sipariş almak, mutfağa iletmek, hesabı kapatmak ve tahsilat yapmak için kullanılan gişe (POS) sistemidir.', 'Restaurant POS: take orders, send to kitchen, settle checks and collect payment at F&B outlets.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Yiyecek & İçecek" > "Restoran POS" seçeneğine tıklayın.', 'Left menu: "Food & Beverage" > "Restaurant POS".') },
      { title: L('Masa Seçin', 'Select a table'), desc: L('Ekranda restoranın masa planı görünür. YEŞİL masa: Boş. KIRMIZI masa: Dolu, adisyon açık. Boş (yeşil) bir masaya tıklayarak yeni müşteri için adisyon açın.', 'Floor plan: green empty, red occupied. Tap a green table to open a new check.') },
      { title: L('Sipariş Alın', 'Take order'), desc: L('Sağ panelde kategoriler (Çorbalar / Ana Yemekler / İçecekler / Tatlılar) görünür. Müşterinin istediği ürünün üstüne tıklarsanız adisyona eklenir. Miktarı değiştirmek için + / – butonlarını kullanın.', 'Tap items in categories on the right; use +/− for quantity.') },
      { title: L('Özel Not Ekleyin', 'Add modifiers'), desc: L('Bir ürüne uzun basın (veya ürün üstünde "Not" ikonuna tıklayın) ve özel isteği yazın: "Az pişmiş", "Baharatsız", "Yanında limon olsun".', 'Long-press or use the note icon for special requests (cooking level, allergies, etc.).') },
      { title: L('Mutfağa Gönderin', 'Fire to kitchen'), desc: L('"Mutfağa Gönder" (yeşil) butonuna basın. Seçilen ürünler anında mutfak ekranına (KDS) düşer. Garson bu tuşa basmadan ürünler mutfağa ulaşmaz.', 'Press "Send to kitchen" so items appear on the KDS.') },
      { title: L('Odaya Yazın', 'Charge to room'), desc: L('Misafir "Hesabı odama yazın" diyorsa: Hesap kapatma ekranında "Oda Aktarımı" seçeneğini tıklayın, oda numarasını girin. Sistem misafirin adını doğrulayıp folyo\'suna ekler.', 'On settlement, choose room charge, enter room; the system validates the guest and posts to folio.') },
      { title: L('Ödeme Alın ve Masayı Kapatın', 'Pay and close'), desc: L('"Hesabı Kapat" butonuna basın. Nakit, Kart veya Oda Aktarımı seçeneklerinden birini seçin. Nakit için "Alınan Tutar"ı girin, sistem üstü hesaplar. "Onayla" ile masa tekrar yeşile döner.', 'Close check: cash, card or room. For cash enter amount tendered for change.'), warn: L('Yönetici yetkisi olmadan hesaba indirim veya ürün silme yapamazsınız. Bu işlemler için yönetici onay kodu gerekmektedir.', 'Discounts and voids require manager approval code.') }
    ]
  },

  'minibar': {
    purpose: L('Müşterilerin oda mini barından tükettikleri ürünlerin sisteme girildiği ve misafirin hesabına otomatik yansıtıldığı oda ikram yönetim ekranıdır.', 'Minibar: record consumption and post charges to the guest folio.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Yiyecek & İçecek" > "Mini Bar & İkram" seçeneğine tıklayın.', 'Left menu: "Food & Beverage" > "Minibar & amenities".') },
      { title: L('Oda Seçin', 'Select room'), desc: L('Üstteki arama kutusuna oda numarasını (örn: 204) yazıp Enter\'a basın. O odanın mini bar ürün listesi açılır.', 'Search room number (e.g. 204) and Enter to load the minibar list.') },
      { title: L('Tüketilenleri Girin', 'Enter counts'), desc: L('Her ürünün yanında miktar bulunur. Misafirin içtiği kola 2 adet ise o ürünün yanındaki sayıyı 2 yapın.', 'Set quantities consumed for each SKU.') },
      { title: L('Hesaba Aktarın', 'Post to folio'), desc: L('"Hesaba Yaz / Kaydet" butonuna basın. Seçilen ürün bedelleri misafirin folio\'suna otomatik işlenir. Sistem stok sayısını da otomatik düşer.', 'Save / Post to account updates folio and reduces stock.') },
      { title: L('Stok Uyarısı', 'Stock alert'), desc: '', warn: L('Bir ürün stokta "0" görünüyorsa Stok & Depo modülüne haber verin, depoya bildirim düşürün.', 'If stock shows 0, notify Inventory so replenishment can be ordered.') }
    ]
  },

  // ─── SATIŞ & PAZARLAMA ──────────────────────────────────────

  'revenue': {
    purpose: L('Oda fiyatlarını optimize etmek, RevPAR ve ADR gibi gelir metriklerini analiz etmek ve gelecek dönem doluluk tahminlerine göre fiyat stratejisi belirlemek için kullanılan gelir yönetimi ekranıdır.', 'Revenue management: optimise rates, analyse RevPAR/ADR and set strategy from forecasted occupancy.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Gelir Yönetimi" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Revenue management".') },
      { title: L('Günlük Fiyat Takvimini Görün', 'Daily rate grid'), desc: L('Ekranda tarih bazlı tablo yer alır. Her günün karşısında o günkü doluluk oranı (%), ortalama oda fiyatı (ADR) ve RevPAR değeri yazar.', 'Date grid shows occupancy %, ADR and RevPAR per day.') },
      { title: L('Fiyat Güncelleme', 'Update rates'), desc: L('Belirli bir tarihe veya tarih aralığına tıklayın. Sağ panelde "Fiyatı Güncelle" alanına yeni fiyatı girin. "Tüm Kanallara Gönder" butonuyla Booking/Expedia dahil her yere güncelleme gider.', 'Select dates, enter new rate, push to all channels.') },
      { title: L('Otomatik Fiyatlama', 'Dynamic rules'), desc: L('"Dinamik Fiyatlandırma" sekmesinden doluluk eşiklerine göre otomatik fiyat kuralları tanımlayabilirsiniz (örn: doluluk%80 geçerse fiyatı %20 artır).', 'Dynamic pricing tab: rules by occupancy thresholds (e.g. +20% when occupancy > 80%).') },
      { title: L('Rapor', 'Reports'), desc: L('"Gelir Raporu" sekmesinden dönem bazlı RevPAR, ADR ve doluluk karşılaştırma raporlarını alın.', 'Revenue report tab: period comparisons for RevPAR, ADR and occupancy.') }
    ]
  },

  'crm': {
    purpose: L('Misafir profilleri, konaklama geçmişi, harcama alışkanlıkları ve iletişim bilgilerinin tutulduğu, kampanya ve e-posta göndermenin yapıldığı müşteri ilişkileri yönetim ekranıdır.', 'CRM: guest profiles, stay history, spend patterns, campaigns and email.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Pazarlama (CRM)" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Marketing (CRM)".') },
      { title: L('Misafir Arayın', 'Find a guest'), desc: L('Üstteki arama çubuğuna müşterinin adını, telefon numarasını veya e-postasını yazıp Enter\'a basın.', 'Search by name, phone or email, Enter.') },
      { title: L('Profil Detayını İnceleyin', 'Profile details'), desc: L('Bulunan misafirin kartına tıklayın. İçinde: Kaç kez konakladığı, toplam harcama miktarı, oda tercihleri, şikayet geçmişi, özel günleri (doğum günü, yıl dönümü) görünür.', 'Open the card: stays, spend, preferences, complaints, special dates.') },
      { title: L('Segmantasyon ve Kampanya', 'Segments and campaigns'), desc: L('Ana listede sol taraftaki filtrelerden (İstanbul\'dan gelenler, 5+ konaklama yapanlar vb.) bir segment tanımlayın. Sağ üstten "E-posta Kampanyası Gönder" butonuyla toplu mesaj gönderin.', 'Build segments with filters, then "Send email campaign" for bulk messaging.') },
      { title: L('Profil Güncelleme', 'Update profile'), desc: L('Misafir kartında "Düzenle" tuşuyla güncel telefon numarası, e-posta veya özel not ekleyebilirsiniz.', 'Use Edit on the guest card to update contact details or notes.') }
    ]
  },

  'loyalty': {
    purpose: L('Sadakat programı üyelerinin puanlarının takip edildiği, üyelik seviyelerinin (Silver/Gold/Platinum) yönetildiği ve ödüllerin tanımlandığı modüldür.', 'Loyalty: points, tiers (Silver/Gold/Platinum) and rewards.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Sadakat & Mobil" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Loyalty & mobile".') },
      { title: L('Üye Arayın', 'Find member'), desc: L('Üstteki arama kutusuna üyenin adını veya üyelik kartı numarasını yazıp Enter\'a basın.', 'Search by name or membership card number.') },
      { title: L('Puan Ekleyin', 'Add points'), desc: L('Üye kartında "Puan İşlemi" butonuna tıklayın. İşlem tipini "Puan Ekle" seçin, tutarı ve nedeni girin (Konaklama / Restoran / SPA). Kaydedin.', 'Points transaction > Add points with reason (stay, restaurant, spa).') },
      { title: L('Puan Kullandırın', 'Redeem points'), desc: L('"Puan Düş" seçeneğiyle misafirin puanlarını ödül veya indirim karşılığı düşebilirsiniz.', 'Use Redeem points for rewards or discounts.') },
      { title: L('Seviye Güncelleme', 'Tier upgrade'), desc: L('Birikim yeterli olduğunda kart üstündeki "Seviye Güncelle" butonuyla Silver\'dan Gold\'a, Gold\'dan Platinum\'a terfi edebilirsiniz.', 'When eligible, use "Update tier" to promote between levels.') }
    ]
  },

  'sales-marketing': {
    purpose: L('B2B satış aktivitelerinin (lead takibi, teklif hazırlama, müşteri ziyareti) yönetildiği ve pazarlama bütçesinin planlandığı satış departmanı ekranıdır.', 'Sales & marketing: B2B pipeline, proposals, visits and budget planning.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Satış & Pazarlama" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Sales & Marketing".') },
      { title: L('Lead Listesi', 'Lead list'), desc: L('Sol panelde müşteri adayları (lead) listelenir. "Ön Görüşme / Teklif Gönderildi / Kapalı" aşamalarına göre renklendirilir.', 'Leads coloured by stage: intro / proposal sent / closed.') },
      { title: L('Yeni Teklif Hazırlayın', 'New proposal'), desc: L('"+ Yeni Teklif" butonuyla şirket adı, iletişim kişisi, talep edilen tarih ve oda sayısı bilgilerini girin. "PDF Oluştur" ile profesyonel teklif belgesi üretin.', '"+ New proposal": company, contact, dates, room count; generate PDF.') },
      { title: L('Aktivite Ekleyin', 'Log activity'), desc: L('Müşteriyle yapılan toplantıyı, aramayı veya ziyareti "Aktivite Ekle" ile kayıt altına alın. Böylece tüm satış geçmişi takip edilebilir.', 'Log calls, meetings and visits for full sales history.') }
    ]
  },

  'tours': {
    purpose: L('Tur operatörleri ve acentelerle yapılan gezi, transfer ve tur planlarının yönetildiği, misafirlere tur satışının yapıldığı modüldür.', 'Tours and transfers with operators/agencies; sell to in-house guests.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Tur & Acente" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Tours & agency".') },
      { title: L('Mevcut Turları Görün', 'Tour catalogue'), desc: L('Ekranda aktif tur listesi yer alır. Her turun kapasitesi, tarihi ve fiyatı görünür.', 'Active tours with capacity, date and price.') },
      { title: L('Misafir Kaydı', 'Register guest'), desc: L('Bir turun kartına tıklayıp "Misafir Ekle" butonuyla otelde konaklayan misafiri o tura kaydedebilirsiniz. Ücret misafirin folyo\'suna düşer.', 'Open a tour, "Add guest" for in-house guests; charge posts to folio.') },
      { title: L('Yeni Tur Ekleyin', 'New tour'), desc: L('"+ Yeni Tur" butonuyla tur adı, güzergah, tarih, fiyat ve kapasite bilgilerini girin.', '"+ New tour": name, route, date, price, capacity.') }
    ]
  },

  'contracts': {
    purpose: L('Acenteler veya kurumsal şirketlerle yapılan fiyat sözleşmelerinin (kontratların) sisteme tanımlandığı ve rezervasyonlarda otomatik uygulandığı modüldür.', 'Corporate/agency rate contracts stored in the system and applied to bookings.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Acente Kontratları" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Agency contracts".') },
      { title: L('Kontrat Görün', 'View contract'), desc: L('Listede tüm aktif ve geçmiş kontratlar yer alır. Birine tıklarsanız o kontrattaki oda tipleri, sezonluk fiyatlar ve geçerlilik tarihleri görünür.', 'List shows active and past contracts; open for room types, seasons and validity.') },
      { title: L('Yeni Kontrat Ekleyin', 'Add contract'), desc: L('"+ Kontrat Ekle" butonuyla acente adı, sözleşme tarihi, oda tipleri ve sezonlara göre fiyatları girin. Kaydedin.', '"+ Add contract": agency, dates, room types and seasonal rates.') },
      { title: L('Otomatik Uygulama', 'Auto-apply'), desc: L('Yeni rezervasyon yaparken misafirin kurum/acente bilgisini girerseniz sistem o kurumun kontrat fiyatını otomatik uygular.', 'Enter company/agency on new reservations to auto-apply contracted rates.') }
    ]
  },

  'agency-contracts': {
    purpose: L('Acentelere özel komisyon oranları, allotman kotaları ve sözleşme koşullarının ayrıntılı yönetildiği gelişmiş acente sözleşme modülüdür.', 'Advanced agency agreements: commission, allotment quotas and terms.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Satış & Pazarlama" > "Acente Sözleşmeleri" seçeneğine tıklayın.', 'Left menu: "Sales & Marketing" > "Agency agreements".') },
      { title: L('Acente Seçin', 'Select agency'), desc: L('Sol listeden bir acenteyi seçin. Sağda o acentenin tüm sözleşme detayları (kota, komisyon %, geçerli tarih, iletişim) açılır.', 'Pick an agency on the left; details open on the right.') },
      { title: L('Sözleşmeyi Güncelleyin', 'Edit agreement'), desc: L('"Düzenle" butonuyla komisyon oranını veya kotayı güncelleyin ve kaydedin.', 'Edit to change commission or quota, then save.') },
      { title: L('Kota Dolumu Takibi', 'Allotment usage'), desc: L('Sözleşme detayında allotman kotasının ne kadarının kullanıldığını gösteren bar görünür. Kota dolunca sistem otomatik uyarır.', 'Progress bar shows allotment used; alerts when full.') }
    ]
  },

  // ─── FİNANS ─────────────────────────────────────────────────

  'folio': {
    purpose: L('Misafirin otelde yaptığı tüm harcamaları (oda bedeli, restoran, SPA, minibar, laundry vb.) gösteren, tahsilat alınan ve resmi faturanın kesildiği hesap kartı ekranıdır.', 'Guest folio: all charges (room, F&B, spa, minibar, laundry), payments and e-invoicing.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Finans" > "Folio Yönetimi" seçeneğine tıklayın.', 'Left menu: "Finance" > "Folio management".') },
      { title: L('Müşteriyi Bulun', 'Find guest'), desc: L('Üstteki arama kutusuna oda numarasını (örn: 305) veya müşteri adını yazıp Enter\'a basın. O müşterinin hesap kartı açılır.', 'Search by room or name, Enter.') },
      { title: L('Tabloyu Okuyun', 'Read the ledger'), desc: L('SOL SÜTUN (kırmızı/borç): Misafirin birikmiş borçları (Oda kirası, Cola, Masaj ücreti vb.). SAĞ SÜTUN (yeşil/ödeme): Misafirin yaptığı ödemeler. EN ALTTA kalın "Kalan Bakiye" satırı yer alır. Bu mutlaka "0,00 TL" olmalıdır.', 'Left/debits: charges. Right/credits: payments. Bottom: balance should be zero at checkout.') },
      { title: L('Tahsilat Alın', 'Take payment'), desc: L('Bakiye 0 değilse sağ alt köşedeki "Tahsilat Ekle" (veya "Ödeme Al") butonuna tıklayın. Tutar otomatik dolu gelir. Ödeme tipini seçin: NAKİT veya KREDİ KARTI. Kaydedin.', 'If balance ≠ 0, use Add payment; choose cash or card.'), warn: L('Müşteri elinize NAKIT para verdiyse kesinlikle "Nakit" seçin. Kartı yoksa "Kredi Kartı" seçmeyin. Yanlış seçim gün sonu kasa açığına yol açar.', 'If the guest pays cash, select Cash — wrong tender type causes cash variances.') },
      { title: L('E-Fatura Kesin', 'E-invoice'), desc: L('Bakiye sıfırlandıktan sonra sağ üst köşedeki "E-Fatura Oluştur" butonuna tıklayın. Bireysel fatura için TC kimlik numarasını, kurumsal fatura için VKN numarasını girin. Sistem GİB\'den şirket adını otomatik getirir. "Gönder" ile fatura resmi sisteme iletilir.', 'After zero balance, create e-invoice with national ID or tax ID; send to the tax authority integration.') },
      { title: L('Hatalı Tutarı Düzeltin', 'Correct errors'), desc: L('Listede hatalı girilmiş bir kalem görürseniz (misafir o kolayı içmedi diyorsa), o kalemi tıklayıp "İndirim Ekle" seçeneğiyle tutarı 0\'a düşürün.', 'For wrong charges use "Add discount" to zero the line.'), warn: L('Hatalı kalemi "Sil" ile silmeyin — bu muhasebe kaydını bozar. Her zaman "İndirim Ekle" yolu tercih edilmelidir.', 'Avoid deleting lines — use discount/adjustment to keep accounting integrity.') },
      { title: L('Routing (Harcama Yönlendirme)', 'Routing'), desc: L('"Routing Ayarları" sekmesinde misafirin oda harcamasını şirket hesabına, ekstra masraflarını kendi hesabına yönlendirecek kurallar tanımlayabilirsiniz.', 'Routing tab: split room to company bill and incidentals to guest, etc.') }
    ]
  },

  'cash-desk': {
    purpose: L('Resepsiyonistin vardiya başında kasayı açtığı, gün boyu nakit ve kart tahsilatlarının takip edildiği, vardiya sonunda kasanın kapatılıp Z-raporu alındığı kasa yönetim ekranıdır.', 'Cash desk: open/close shifts, track cash and card, count and print Z-report.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Finans" > "Kasa İşlemleri" seçeneğine tıklayın.', 'Left menu: "Finance" > "Cash desk".') },
      { title: L('Vardiya Açın (İşe Başlarken)', 'Open shift'), desc: L('"Vardiyanı Aç" butonuna tıklayın. Başlangıç kasa bakiyesini girin (kasadaki fiziksel para miktarı). Onaylayın.', 'Open shift with physical opening float.') },
      { title: L('Günlük Hareketleri İzleyin', 'Monitor movements'), desc: L('Vardiya boyunca yapılan tüm nakit ve kart ödemeleri otomatik listeye eklenir. Listeyi her zaman takip edebilirsiniz.', 'Cash and card payments append to the shift log automatically.') },
      { title: L('Kasa Sayımı (Vardiya Kapatmadan Önce)', 'Count cash'), desc: L('Fiziksel olarak kasadaki parayı sayın: kaç adet 200 TL, 100 TL, 50 TL, 20 TL, 10 TL, bozuk paralar. "Kasa Sayımı" formuna bu miktarları girin.', 'Count physical cash by denomination and enter in the count form.') },
      { title: L('Vardiya Kapatın', 'Close shift'), desc: L('"Vardiyanı Kapat" butonuna basın. Sistem sayılan miktarla sistemdeki rakamı karşılaştırır. Eğer fark varsa (örn: 50 TL fazla veya eksik) kırmızı uyarı verir.', 'Close shift; system compares counted vs expected and flags variances.') },
      { title: L('Z-Raporu Alın', 'Z-report'), desc: L('Vardiya kapatıldıktan sonra "Z-Raporu Yazdır" butonuyla o vardiyaya ait nakit, kart ve toplam tahsilat dökümünü alın.', 'After close, print Z-report for cash, card and totals.') }
    ]
  },

  'finance': {
    purpose: lang === 'en' ? 'The official finance module where e-invoice and e-archive creation, sending, and tracking via integration are performed.' : 'GİB (Gelir İdaresi Başkanlığı) ile entegrasyon üzerinden e-fatura ve e-arşiv oluşturma, gönderme ve takip etme işlemlerinin yapıldığı resmi finans modülüdür.',
    steps: [
      { title: lang === 'en' ? 'Open the Menu' : 'Menüyü Açın', desc: lang === 'en' ? 'From the left menu, click on "Finance" > "E-Invoice / Finance".' : 'Sol menüden "Finans" > "E-Fatura / Finans" seçeneğine tıklayın.' },
      { title: lang === 'en' ? 'View Pending Invoices' : 'Bekleyen Faturaları Görün', desc: lang === 'en' ? 'Invoices with "Pending" status are listed in the main list. These are approved but not yet sent to the government.' : 'Ana listede "Bekliyor" statüsündeki faturalar listelenir. Bunlar onaylı ama henüz GİB\'e gönderilmemiş faturalardır.' },
      { title: lang === 'en' ? 'Send Invoice' : 'Fatura Gönderin', desc: lang === 'en' ? 'Select an invoice. Check details in the right panel. Click "Send". It will turn into "Approved" status in seconds.' : 'Bir faturayi seçin. Sağ panelde detayları kontrol edin. "GİB\'e Gönder" butonuna tıklayın. Birkaç saniye içinde "Onaylandı" statüsüne geçer.' },
      { title: lang === 'en' ? 'Error Status' : 'Hata Durumu', desc: lang === 'en' ? 'If the invoice enters "Error" status, the error code and description appear at the bottom of the right panel. Fix and resend.' : 'Fatura "Hata" statüsüne geçerse sağ panelin altında hata kodu ve açıklaması yazar. Genellikle VKN hatası veya format hatası olur. Düzelttikten sonra tekrar gönderin.' },
      { title: lang === 'en' ? 'Period Report' : 'Dönem Raporu', desc: lang === 'en' ? 'Use the "Period Report" button on the top right to download a summary of total invoices for the selected month or quarter as an Excel file.' : 'Sağ üst köşeden "Dönem Raporu" butonuyla seçtiğiniz ay veya çeyreğe ait toplam fatura özetini Excel olarak indirin.' }
    ]
  },

  'night-audit': {
    purpose: lang === 'en' ? 'The most critical finance module used to close the day. The nightly accommodation fee is processed for all open accounts, cash reconciliation is made, and the system moves to the next day. Irreversible.' : 'Günü kapatmak için kullanılan en kritik finans modülüdür. Tüm açık hesaplara gece konaklama bedeli işlenir, kasa mutabakatı yapılır ve sistem bir sonraki güne geçer. Geri alınamaz işlemler içerir.',
    steps: [
      { title: lang === 'en' ? 'Open the Menu' : 'Menüyü Açın', desc: lang === 'en' ? 'From the left menu, click on "Finance" > "Night Report". Usually done between 01:00 and 03:00.' : 'Sol menüden "Finans" > "Gece Raporu" seçeneğine tıklayın. Genellikle gece 01:00 ile 03:00 arası yapılır.' },
      { title: lang === 'en' ? 'Start the Day (Scanning)' : 'Günü Başlatın (Tarama)', desc: lang === 'en' ? 'Press the "Start Night / Scan System" (large blue button) at the top of the screen. The system scans the hotel: Open POS tables, No-Shows, incomplete check-outs, missing KBS declarations, etc.' : 'Ekranın üstündeki "Geceyi Başlat / Sistemi Tara" (mavi büyük buton) düğmesine basın. Sistem oteli tarar: Açık POS masaları, gelmemiş misafirler (No-Show), tamamlanmamış check-out\'lar, eksik KBS bildirimleri vb.' },
      { title: lang === 'en' ? 'Clear Red Alerts' : 'Kırmızı Uyarıları Temizleyin', desc: lang === 'en' ? 'Every red line that appears on the screen is a problem and you cannot proceed to the next step without clearing them. Click each warning - the system will take you to the screen to solve it. Fix and return.' : 'Ekranda beliren her kırmızı satır bir sorundur ve temizlenmeden bir sonraki adıma geçilemez. Her uyarıya tıklayın — sistem sizi o sorunu çözecek ekrana götürür. Gidip çözün ve geri dönün.' },
      { title: lang === 'en' ? 'POS Open Table Warning' : 'POS Açık Masa Uyarısı', desc: lang === 'en' ? 'Gives a warning if the restaurant is closed but a table remains open. Go to Restaurant POS and close that table or cancel it with manager approval.' : 'Restoran kapanmış ama bir masa açık kaldıysa uyarı verir. Restoran POS\'tan gidip o masayı kapatın ya da yönetici onayıyla iptal edin.' },
      { title: lang === 'en' ? 'No-Show Action' : 'No-Show İşlemi', desc: lang === 'en' ? 'Cancel the reservation with the "Mark as No-Show" button if an expected guest did not arrive. If there is a nightly penalty fee, it is added to the folio.' : 'Beklenen misafir gelmediyse uyarıda "No-Show Olarak İşaretle" butonuyla rezervasyonu iptal edin. Gecelik ceza ücreti varsa folyo\'ya eklenir.' },
      { title: lang === 'en' ? 'Post Room Rates' : 'Oda Bedellerini Basın', desc: lang === 'en' ? 'When all warnings are cleared, press the large "Process Room Accommodations (Room Rate Posting)" button. It automatically posts a one-night room charge to the account of every guest staying tonight.' : 'Tüm uyarılar temizlenince "Oda Konaklamalarını İşle (Room Rate Posting)" büyük butonuna basın. Sistem, o gece otelde yatan her misafirin hesabına bir gecelik oda ücretini otomatik işler.' },
      { title: lang === 'en' ? 'Close the Day' : 'Günü Kapatın', desc: lang === 'en' ? 'Click the big red "Close Day" button. Confirm the popup. The system closes: The calendar advances, the boss gets an email, accounting data updates.' : '"Günü Kapat" kırmızı büyük butonuna tıklayın. Onay penceresi çıkar, tekrar onaylayın. Sistem kapanır: Takvim ilerler, patron mailini alır, muhasebe verileri güncellenir.', warn: lang === 'en' ? '"Close Day" cannot be reversed. Do not press this without making sure all warnings are cleared and cash reconciliation is done.' : '"Günü Kapat" geri alınamaz. Tüm uyarıların temizlendiğinden ve kasa mutabakatının yapıldığından emin olmadan bu butona basmayın.' }
    ]
  },

  'accounting': {
    purpose: L('Otel genelindeki muhasebe kayıtlarının, hesap planının ve dönem mizanının takip edildiği genel muhasebe ekranıdır. Genellikle muhasebe departmanı kullanır.', 'General ledger: chart of accounts, journal activity and trial balance — typically used by finance.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Finans" > "Genel Muhasebe" seçeneğine tıklayın.', 'Left menu: "Finance" > "General ledger".') },
      { title: L('Hesap Planı', 'Chart of accounts'), desc: L('Sol panelde hiyerarşik hesap ağacı yer alır. Bir hesaba tıkladığınızda sağda o hesabın dönem hareketleri listelenir.', 'Account tree on the left; movements for the selected account on the right.') },
      { title: L('Mizan Raporu', 'Trial balance'), desc: L('Üst menüden "Mizan" sekmesine geçin. Dönem seçin ve "Oluştur" ile çift taraflı kayıtları gösteren mizan tablosunu alın.', 'Trial balance tab: pick period, Generate.') },
      { title: L('Excel Export', 'Excel export'), desc: L('Her raporun sağ üstünde Excel indirme ikonu bulunur. Muhasebecinize vermek için kullanabilirsiniz.', 'Use the Excel icon on reports for your accountant.') }
    ]
  },

  'cost-control': {
    purpose: L('Departman bazlı operasyonel giderlerin, malzeme alış maliyetlerinin ve bütçe aşımlarının analiz edildiği maliyet kontrol ekranıdır.', 'Cost control: departmental spend, purchase costs and budget overruns.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Finans" > "Maliyet Kontrol" seçeneğine tıklayın.', 'Left menu: "Finance" > "Cost control".') },
      { title: L('Departman Seçin', 'Select department'), desc: L('Sol filtreden departmanı (Mutfak, SPA, Kat Hizmetleri vb.) seçin. Sağda o departmanın aylık gider grafiği ve kalem dökümü görünür.', 'Filter by department; chart and line detail on the right.') },
      { title: L('Bütçe Karşılaştırması', 'Budget vs actual'), desc: L('"Bütçe vs Gerçek" sekmesinde planlanan gider ile gerçekleşen gider yan yana karşılaştırılır. Kırmızı satırlar bütçeyi aşmış kalemleri gösterir.', 'Budget vs actual tab; red rows are over budget.') },
      { title: L('Uyarı Eşiği Tanımlayın', 'Alert thresholds'), desc: L('"Eşik Ayarla" bölümünden belirli bir gider kategorisi için limit belirleyin. Harcama bu limiti aşarsa sistem otomatik mail ile uyarı gönderir.', 'Set limits per category; email alerts when exceeded.') }
    ]
  },

  'checkout': {
    purpose: L('Misafirin otelden hızlıca ayrılabilmesi için folyo özetinin gösterildiği, tahsilatın tamamlandığı ve odanın anında serbest bırakıldığı hızlı çıkış ekranıdır.', 'Express checkout: folio summary, payment and immediate room release.'),
    steps: [
      { title: L('Açılış Yolları', 'How to open'), desc: L('Ya sol menüden "Finans" > "Hızlı Check-out"a girin, ya da Ön Büro ekranındaki Departures listesinden misafirin 3 nokta menüsünden "Check-out"u seçin.', 'Finance > Express checkout, or Front Office Departures ⋮ > Check-out.') },
      { title: L('Özeti İnceleyin', 'Review summary'), desc: L('Ekranda misafirin toplam konaklama süresi, oda ücreti ve varsa restoran/minibar ekstraları listelenir. Yanlış kalem varsa bu aşamada "Folio\'ya Git" ile düzeltin.', 'Review stay length, room and extras; use Go to folio to fix lines.') },
      { title: L('Tahsilat Alın', 'Collect payment'), desc: L('"Ödeme Al" butonuyla kalan bakiyeyi nakit veya kart yoluyla tahsil edin. Bakiye sıfırlanınca "Check-out Tamamla" butonu aktif olur.', 'Take payment; Complete checkout enables when balance is zero.') },
      { title: L('Fatura Gönderin', 'Send invoice'), desc: L('"E-Fatura Gönder" seçeneğiyle faturayı misafirin e-posta adresiyle resmi sisteme iletin.', 'Send e-invoice to guest email through the integration.') },
      { title: L('Tamamlama', 'Finish'), desc: L('"Check-out Tamamla" butonuna basın. Oda otomatik Kat Hizmetleri ekranında "Kirli" olarak görünür ve temizlik süreci başlar.', 'Complete checkout sets the room dirty for housekeeping.') }
    ]
  },

  'budget': {
    purpose: L('Otel geneli veya departman bazlı yıllık/aylık bütçelerin planlandığı ve gerçekleşen harcamalarla karşılaştırıldığı finansal planlama ekranıdır.', 'Budget planning: property or department targets vs actual spend.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Finans" > "Bütçe Planlama" seçeneğine tıklayın.', 'Left menu: "Finance" > "Budget planning".') },
      { title: L('Dönem ve Departman Seçin', 'Select scope'), desc: L('Üst kısımda yıl/ay ve departman seçicileri yer alır. İlgili dönemi ve departmanı seçin.', 'Pick year/month and department at the top.') },
      { title: L('Hedefleri Girin', 'Enter targets'), desc: L('Her gider kategorisinin karşısındaki "Hedef" kutusuna planlanan rakamı yazın. Tüm kalemleri girdikten sonra "Kaydet" deyin.', 'Enter target per expense line, then Save.') },
      { title: L('Gerçekleşen vs Plan Grafiği', 'Charts'), desc: L('Sağ bölümde planlanan ve gerçekleşen değerlerin bar grafik karşılaştırması otomatik güncellenir.', 'Right side updates plan vs actual bar charts automatically.') }
    ]
  },

  // ─── MALZEME & İK ───────────────────────────────────────────

  'stock': {
    purpose: L('Otel ambarındaki tüm malzemelerin (gıda, temizlik ürünleri, tekstil, ofis malzemesi) stok miktarlarının, giriş-çıkışlarının ve minimum stok eşiklerinin takip edildiği envanter ekranıdır.', 'Inventory: quantities, movements and min-stock alerts for all storeroom items.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Malzeme & İK" > "Stok & Depo" seçeneğine tıklayın.', 'Left menu: "Materials & HR" > "Stock & warehouse".') },
      { title: L('Ürün Arayın', 'Search item'), desc: L('Üstteki arama kutusuna ürün adını yazıp Enter\'a basın. Mevcut stok miktarı, birim fiyatı ve hangi depoda olduğu görünür.', 'Search product name, Enter — see qty, unit cost and warehouse.') },
      { title: L('Stok Girişi (Mal Geldi)', 'Goods receipt'), desc: L('"+Stok Girişi" butonuna tıklayın. Ürünü seçin (arama ile), gelen miktarı girin, tedarikçiyi ve belge numarasını yazın. "Kaydet" ile stok artar.', '"+ Stock receipt": item, qty, supplier, document no., Save increases stock.') },
      { title: L('Stok Çıkışı (Departmana Verildi)', 'Issue to department'), desc: L('"Stok Çıkışı" butonuyla hangi departmanın kaç birim aldığını girin. Stok miktarı otomatik azalır.', 'Stock issue: department and qty; stock decreases.') },
      { title: L('Kritik Stok Uyarısı', 'Low stock'), desc: L('Stok miktarı minimum eşiğin altına düşen ürünler listede kırmızı zemin ile gösterilir. Bu ürünler için Satın Alma modülüne sipariş oluşturun.', 'Below-minimum items highlight in red — raise a purchase request.') },
      { title: L('Sayım', 'Stock count'), desc: L('"Stok Sayımı Başlat" seçeneğiyle fiziksel sayım formunu açıp sayılan miktarları girin. Sistem sistem kayıtlarıyla karşılaştırır ve farkları raporlar.', 'Start physical count, enter counted qty; system posts variances.') }
    ]
  },

  'purchasing': {
    purpose: L('Otelin mal ve hizmet alım sürecini (talep, onay, sipariş, teslimat) baştan sona yönettiği satın alma modülüdür.', 'Procurement: requisition, approval, PO and goods receipt end to end.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Malzeme & İK" > "Satın Alma" seçeneğine tıklayın.', 'Left menu: "Materials & HR" > "Purchasing".') },
      { title: L('Satın Alma Talebi Oluşturun', 'Create requisition'), desc: L('"+Yeni Talep" butonuna tıklayın. Talep eden departmanı seçin, ürünleri ve miktarları listeleyin. Açıklama alanına gerekçe yazın. "Talep Gönder" ile onaya iletin.', '"+ New request": department, lines, reason, submit for approval.') },
      { title: L('Onay Süreci', 'Approval'), desc: L('Talep "Onay Bekliyor" statüsünde görünür. Yönetici sistem üzerinden onaylarsa "Onaylandı" olur, reddederse "Reddedildi" olur ve not eklenir.', 'Pending / approved / rejected with notes.') },
      { title: L('Siparişe Dönüştürün', 'Create PO'), desc: L('Onaylanan talep açıldığında "Sipariş Oluştur" butonuyla tedarikçiyi seçip sipariş verin. Sipariş numarası otomatik üretilir.', 'From approved request, create PO and pick supplier.') },
      { title: L('Teslimat Kaydedin', 'Record delivery'), desc: L('Mallar gelince "Teslim Alındı" butonuyla gelen miktarları girin. Sistem Stok & Depo modülündeki miktarı otomatik artırır.', 'Goods received updates stock automatically.') },
      { title: L('Fatura Eşleştirme', 'Match invoice'), desc: L('Tedarikçi faturası geldiğinde "Fatura Eşleştir" ile sipariş ve teslimat bilgileriyle örtüştürün. Ardından ödeme için Finans modülüne iletilir.', 'Three-way match PO/delivery/invoice, then route to Finance.') }
    ]
  },

  'hr': {
    purpose: L('Otel personelinin özlük bilgilerini, vardiya planlamasını, izin yönetimini ve maaş hesaplamalarını tutan İnsan Kaynakları modülüdür.', 'HR: employee records, scheduling, leave and payroll inputs.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Malzeme & İK" > "Personel (HR)" seçeneğine tıklayın.', 'Left menu: "Materials & HR" > "Staff (HR)".') },
      { title: L('Personel Arayın', 'Find employee'), desc: L('Üstteki arama kutusuna personelin adını yazıp Enter\'a basın. Karta tıklayınca işe başlama tarihi, departmanı, pozisyonu ve aktif vardiyası görünür.', 'Search name, open card for hire date, dept, role and shift.') },
      { title: L('Yeni Personel Ekleyin', 'Add employee'), desc: L('"+Personel Ekle" butonuyla ad, soyad, TC kimlik, iletişim, departman ve pozisyon bilgilerini doldurup kaydedin.', '"+ Add employee": identity, contact, department, position.') },
      { title: L('Vardiya Planı', 'Scheduling'), desc: L('"Vardiya" sekmesine geçin. Haftalık takvim görünümünde her personelin çalışma günleri görünür. Bir hücreye tıklayarak vardiya saati atayabilirsiniz. Sürükle-bırakla da değiştirebilirsiniz.', 'Shifts tab: weekly grid, click cells or drag to assign hours.') },
      { title: L('İzin Talebi', 'Leave'), desc: L('Personel kartında "İzin Ekle" butonuyla izin türünü (Yıllık/Hastalık/Mazeret) ve tarih aralığını girin. Onaya gönderin.', 'Add leave type and dates from the employee card, submit for approval.') },
      { title: L('Maaş İşlemleri', 'Payroll'), desc: L('"Bordro" sekmesinden aylık çalışma saatleri, fazla mesai ve kesintileri görerek maaş bordrosunu oluşturun.', 'Payroll tab: hours, overtime and deductions for pay runs.') }
    ]
  },

  // ─── SİSTEM ─────────────────────────────────────────────────

  'it-infra': {
    purpose: L('Sistem sunucularının, veritabanlarının ve ağ altyapısının durumunu izlemek, bakımını planlamak ve log kayıtlarını incelemek için kullanılan BT altyapı yönetim ekranıdır.', 'IT infrastructure: servers, databases, network health and audit logs — admin only.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Sistem" > "IT & Veritabanı" seçeneğine tıklayın. Sadece IT/Sistem Yöneticisi yetkisiyle erişilebilir.', 'Left menu: "System" > "IT & database" (restricted role).') },
      { title: L('Sunucu Durumunu İnceleyin', 'Server status'), desc: L('Ekranda her sunucunun adı, IP adresi ve durum göstergesi (yeşil/sarı/kırmızı) yer alır. Kırmızı gören sunucu acil müdahale gerektirir.', 'Each server shows name, IP and green/yellow/red health.') },
      { title: L('Veritabanı Sağlığı', 'Database health'), desc: L('"Veritabanı" sekmesinde disk doluluk oranları, aktif bağlantı sayısı ve sorgu performansı grafikleri yer alır.', 'Database tab: disk usage, connections and query performance charts.') },
      { title: L('Sistem Logları', 'System logs'), desc: L('"Log Kayıtları" sekmesinden hangi kullanıcının ne zaman ne işlem yaptığını detaylı şekilde okuyabilirsiniz. Şüpheli işlemleri burada tespit edin.', 'Logs tab: user actions with timestamps for investigations.') }
    ]
  },

  'integrations': {
    purpose: L('Sistemin dışarıdaki uygulamalarla (ödeme POS\'u, kilit sistemi, kamera, müşteri uygulaması, doküman yönetimi) bağlantı durumunu izleme ve yönetme ekranıdır.', 'Integrations hub: payment terminals, locks, cameras, guest app, DMS — status and troubleshooting.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Sistem" > "Entegrasyonlar" seçeneğine tıklayın.', 'Left menu: "System" > "Integrations".') },
      { title: L('Bağlantı Durumlarını Görün', 'Connection status'), desc: L('Her entegrasyonun adı ve yanında yeşil (aktif) veya kırmızı (hata) durum noktası görünür.', 'Green active, red error next to each integration.') },
      { title: L('Hatalı Bağlantıyı Düzeltin', 'Fix errors'), desc: L('Kırmızı bağlantıya tıklayın. Hata mesajını okuyun. "Yeniden Bağlan" butonuyla bağlantıyı test edin. Sorun devam ederse sistem yöneticisini çağırın.', 'Open red items, read error, Reconnect; escalate if it persists.') },
      { title: L('Log Takibi', 'Integration logs'), desc: L('Her entegrasyonun sağındaki "Loglar" butonuyla son 100 iletişim kaydını görebilirsiniz.', 'Logs button shows the last 100 messages per integration.') }
    ]
  },

  'kbs': {
    purpose: L('Türk ve yabancı misafirlerin kimlik bilgilerinin Emniyet Genel Müdürlüğü sistemi AKBS\'ye (Yabancılar için KBS\'ye) bildirildiği yasal zorunluluk modülüdür. Eksik bildirim cezaya yol açar.', 'Legal police/KBS guest registration for Turkish nationals and foreigners — missing filings may incur penalties.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Sistem" > "Polis Listesi (KBS)" seçeneğine tıklayın.', 'Left menu: "System" > "Police list (KBS)".') },
      { title: L('Bekleyen Kayıtları Görün', 'Pending records'), desc: L('Ekranın ana listesinde henüz devlet sistemine iletilmemiş misafir kayıtları "Bekliyor" statüsünde sıralanır.', 'Main list shows guests not yet transmitted as Pending.') },
      { title: L('Eksik Bilgileri Tamamlayın', 'Complete missing data'), desc: L('Kırmızı uyarılı kayıtlara tıklayın. Eksik alanlar (TC No, doğum tarihi, uyruk vb.) vurgulanmış olur. Misafirin belgesinden kontrol edip girin.', 'Red rows highlight missing ID fields; complete from travel documents.') },
      { title: L('Toplu Gönderme', 'Bulk send'), desc: L('"Tümünü Gönder" butonuyla listedeki tüm tamamlanmış kayıtları devlet sistemiyle senkronize edin.', 'Send all completed rows in one batch.') },
      { title: L('Durum Takibi', 'Status'), desc: L('Gönderilen kayıtlar "İletildi / Onaylandı" statüsüne geçer. "Hata" dönen varsa hata kodunu okuyup bildirim formunu düzeltin ve tekrar gönderin.', 'Track Sent/Approved; fix errors and resubmit.') },
      { title: L('Yasal Önem', 'Compliance'), desc: '', warn: L('Check-in\'den sonra 24 saat içinde KBS bildirimi yapılmalıdır. Gün içinde biriken "Bekliyor" kayıtları her vardiyada kontrol edin.', 'File within legal deadlines after check-in; clear Pending each shift.') }
    ]
  },

  'surveys': {
    purpose: L('Misafir memnuniyetini ölçmek için anket oluşturma, check-out sonrası otomatik gönderme ve cevapları raporlayan anket yönetim sistemidir.', 'Guest satisfaction surveys: build, auto-send after checkout and report responses.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Sistem" > "Anket Yönetimi" seçeneğine tıklayın.', 'Left menu: "System" > "Survey management".') },
      { title: L('Mevcut Anket Sonuçları', 'Results overview'), desc: L('Ana ekranda gelen anket cevaplarının özeti (ortalama yıldız, departman bazlı puanlar) gösterilir.', 'Dashboard shows average scores and scores by department.') },
      { title: L('Yeni Anket Oluşturun', 'Create survey'), desc: L('"+Anket Oluştur" butonuyla soru tipini (5 yıldız, çoktan seçmeli, açık uçlu) ve soru metnini belirleyerek kendi anketinizi hazırlayın.', '"+ Create survey": question types (stars, MCQ, free text).') },
      { title: L('Otomatik Gönderimi Aktifleştirin', 'Automation'), desc: L('"Otomasyon" sekmesinde "Check-out Sonrası Otomatik Gönder" seçeneğini aktif yapın. Sistem check-out olan her misafirin e-postasına anket linkini otomatik iletir.', 'Automation tab: enable post-checkout email with survey link.') },
      { title: L('Cevapları İnceleyin', 'Review answers'), desc: L('Anket adına tıklayarak ayrıntılı cevapları, departman puanlarını ve açık yorum metinlerini okuyun.', 'Click a survey name for detail, department breakdown and comments.') }
    ]
  },

  'system-admin': {
    purpose: L('Kullanıcı hesapları, rol ve yetki yönetimi, sistem parametreleri ile genel yapılandırmanın yapıldığı en üst düzey sistem yönetim ekranıdır.', 'System administration: users, roles, permissions and global settings — admin only.'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Sistem" > "Sistem Yönetimi" seçeneğine tıklayın. Sadece Sistem Yöneticisi (Admin) rolü ile erişilebilir.', 'Left menu: "System" > "System administration" (admin role).') },
      { title: L('Yeni Kullanıcı Ekleyin', 'Add user'), desc: L('"Kullanıcılar" sekmesinden "+ Yeni Kullanıcı" butonuna tıklayın. Ad, soyadı, e-posta, telefon ve rolü (Resepsiyonist/Muhasebi/Yönetici vb.) girin. "Kaydet"e basın. Kullanıcıya otomatik şifre maili gider.', 'Users tab > "+ New user": name, email, phone, role, Save — welcome email with password may be sent.') },
      { title: L('Kullanıcı Pasif Yapın', 'Deactivate user'), desc: L('İşten ayrılan personelin hesabını silmek yerine "Pasif Yap" butonuyla deaktive edin. Böylece geçmiş loglar korunur.', 'Deactivate leavers instead of delete to preserve audit history.') },
      { title: L('Rol Yetkileri', 'Role permissions'), desc: L('"Roller" sekmesinde her rolün hangi modüllere erişeceğini, hangi işlemleri yapabileceğini onay kutuları ile belirleyin. Değiştikten sonra "Kaydet"e basın.', 'Roles tab: tick modules and actions per role, Save.') },
      { title: L('Sistem Parametreleri', 'Parameters'), desc: L('"Ayarlar" sekmesinde otel adı, döviz birimi, check-out saati, gece audit saati gibi genel sistem parametrelerini güncelleyebilirsiniz.', 'Settings tab: property name, currency, checkout time, night-audit window, etc.') }
    ]
  },

  'kvkk': {
    purpose: L('KVKK (Kişisel Verilerin Korunması Kanunu) kapsamındaki kişisel veri silme talepleri, gizlilik onayları ve veri maskeleme işlemlerinin yapıldığı güvenlik-uyum modülüdür.', 'GDPR-style privacy module: erasure requests, consents and masking (Turkey KVKK context).'),
    steps: [
      { title: L('Menüyü Açın', 'Open the menu'), desc: L('Sol menüden "Sistem" > "KVKK & Güvenlik" seçeneğine tıklayın.', 'Left menu: "System" > "KVKK & security".') },
      { title: L('Veri Silme Talebi İşleyin', 'Handle erasure'), desc: L('Bir misafir "Verilerimi silin" diye talep geldiğinde: Üstteki arama kutusuna adını yazın. Bulun ve "Veri Maskeleme" butonuna tıklayın. Onay penceresi çıkar, onaylayın. İsim ve iletişim bilgileri maskelenerek ******* haline getirilir, konaklama geçmişi muhasebeye yasal süre için saklanır.', 'Search guest, Data masking with confirmation — PII masked; accounting retention rules may apply.') },
      { title: L('Onay Listesi', 'Consents'), desc: L('"Onaylar" sekmesinde misafirlerin KVKK onay formlarını kabul edip etmediği listelenir. Onay vermemiş ama verileri işlenen birini gördüğünüzde hukuk departmanını bilgilendirin.', 'Consents tab: flag missing consent with legal review.') },
      { title: L('Veri İhlali Bildirimi', 'Breach report'), desc: L('Bir veri ihlali şüphesi oluştuysa "İhlal Bildir" butonuyla olay detaylarını girin. Sistem yasal süre içinde ilgili kurumlara bildirim şablonu oluşturur.', 'Report breach with details; system may draft regulator notifications.') }
    ]
  }
  };
};

// Extra keyword haritası — kullanıcının farklı şekillerde sorduğu tüm ifadeleri yakıt
const extraKeywordMap = {
  'front-office':       ['çekin', 'check in', 'checkin', 'giriş yap', 'karşıla', 'arrivals', 'departures', 'misafir al', 'misafir kabul', 'oda değiştir', 'room move', 'no-show', 'kapıdan geldi', 'misafir nerede'],
  'new-reservation':    ['oda ayır', 'yeni müşteri', 'rezerve et', 'oda aç', 'walk in', 'telefon rezervasyon', 'kapıdan müşteri', 'rezervasyon yap', 'oda oluştur'],
  'reservations-tape':  ['takvim', 'tape chart', 'kim geliyor', 'bu ay kim var', 'zaman çizelgesi'],
  'room-rack':          ['oda haritası', 'odalara bak', 'hangi oda boş', 'boş oda', 'oda planı', 'dolu odalar'],
  'res-list':           ['tüm rezervasyonlar', 'rezervasyon ara', 'geçmiş rezervasyon', 'aktif rezervasyon'],
  'res-card':           ['rezervasyon detay', 'rezervasyona bak', 'rezervasyon düzenle'],
  'group-res':          ['kafile', 'toplu konaklama', 'grup', 'kongre', 'şirket grubu', 'düğün grubu'],
  'channel':            ['booking', 'expedia', 'booking.com', 'online kanal', 'fiyat gönder', 'kanal kapat', 'ota', 'booking fiyatı', 'booking rezervasyon'],
  'crs':                ['merkez', 'çoklu otel', 'zincir otel'],
  'housekeeping':       ['temizlik', 'oda temizle', 'hk', 'kat hizmetleri', 'kirli oda', 'personel ata', 'temizlikçi', 'meydan', 'oda hazırla'],
  'tech-service':       ['arıza', 'klima bozuk', 'su akmıyor', 'tamir', 'bakım', 'teknik', 'cihaz bozuldu', 'oda sorunu'],
  'spa':                ['masaj', 'hamam', 'sauna', 'wellness', 'spa randevu', 'terapi'],
  'banquet':            ['düğün', 'toplantı', 'konferans', 'etkinlik', 'ziyafet', 'salon rezervasyonu', 'organizasyon', 'iftar'],
  'smart-room':         ['akıllı oda', 'klima', 'ışık kontrol', 'perde', 'enerji', 'uzaktan kontrol'],
  'lost-found':         ['kayıp eşya', 'unutulan eşya', 'bulunan eşya', 'misafir unuttu', 'cüzdan bulundu'],
  'laundry':            ['çamaşır', 'yıkama', 'ütüleme', 'kuru temizleme', 'çamaşırhane'],
  'entertainment':      ['animasyon', 'eğlence', 'show', 'müzik', 'konser', 'aktivite'],
  'pos':                ['sipariş', 'garson', 'masa aç', 'yemek', 'içecek', 'adisyon', 'bar', 'restoran sipariş', 'hesabı odaya yaz', 'restoran öde'],
  'minibar':            ['minibar', 'mini bar', 'oda içeceği', 'dolap ürünü'],
  'revenue':            ['revpar', 'adr', 'gelir yönetimi', 'fiyat stratejisi', 'doluluk analizi', 'fiyat güncelle'],
  'crm':                ['müşteri profil', 'misafir geçmişi', 'kampanya', 'e-posta gönder', 'misafir arama', 'vip müşteri'],
  'loyalty':            ['sadakat', 'puan', 'üyelik', 'vip kart', 'gold platinum'],
  'sales-marketing':    ['satış', 'pazarlama', 'teklif', 'b2b', 'kurumsal'],
  'tours':              ['tur', 'transfer', 'gezi', 'acente', 'sedna'],
  'contracts':          ['kontrat', 'sözleşme', 'acente fiyatı', 'toplu fiyat'],
  'agency-contracts':   ['acente sözleşme', 'komisyon', 'allotman', 'kota'],
  'folio':              ['hesap', 'fatura', 'borç', 'tahsilat', 'ödeme al', 'folyo', 'ekstra', 'para al', 'hesap kapat', 'e-fatura', 'misafir borcu'],
  'cash-desk':          ['kasa', 'vardiya aç', 'vardiya kapat', 'nakit', 'kasa sayımı', 'z raporu', 'z-raporu'],
  'finance':            ['e-fatura gönder', 'gib', 'resmi fatura', 'vergi', 'e-arşiv'],
  'night-audit':        ['gece kapat', 'günü kapat', 'gece audit', 'gece raporu', 'room posting', 'kapanış', 'sistem günü ilerleme'],
  'accounting':         ['muhasebe', 'hesap planı', 'mizan', 'mali kayıt', 'defter'],
  'cost-control':       ['maliyet', 'gider analiz', 'bütçe aşımı', 'masraf kontrol'],
  'checkout':           ['hızlı çıkış', 'misafir gidiyor', 'hesap kapat', 'oda boşalt', 'checkout'],
  'budget':             ['bütçe planı', 'hedef', 'yıllık plan', 'aylık plan'],
  'stock':              ['stok', 'envanter', 'ambar', 'malzeme sayımı', 'depo', 'malzeme miktarı', 'stok girişi'],
  'purchasing':         ['satın alma', 'sipariş ver', 'tedarik', 'mal al', 'fatura geldi', 'teslimat'],
  'hr':                 ['personel', 'çalışan', 'ik', 'hr', 'maaş', 'vardiya planı', 'izin', 'işçi ekle'],
  'it-infra':           ['sunucu', 'veritabanı', 'ağ', 'sistem logları', 'altyapı', 'it'],
  'integrations':       ['entegrasyon', 'api', 'bağlantı hatası', 'pos bağlantı', 'kilit sistemi'],
  'kbs':                ['kbs', 'polis listesi', 'jandarma', 'akbs', 'kimlik bildir', 'misafir bildir', 'yasal bildirim'],
  'surveys':            ['anket', 'memnuniyet', 'yorum', 'değerlendirme', 'form'],
  'system-admin':       ['kullanıcı ekle', 'rol', 'yetki', 'admin', 'sistem ayarları', 'parola'],
  'kvkk':               ['kvkk', 'gizlilik', 'veri sil', 'veri koruma', 'kişisel veri'],
};

export const getGuideData = (t, lang) => modulesConfig.map(module => {
  const knowledge = getModuleKnowledge(t, lang);
  const data = knowledge[module.id];
  const displayName = getTranslatedModuleName(t, module);
  const catEn = guideCategoryLabel(module.category, lang);

  const extraKeys = extraKeywordMap[module.id] || [];

  return {
    id: module.id,
    title: displayName,
    icon: module.icon,
    category: module.category,
    keywords: [...new Set([
      ...module.keywords,
      ...extraKeys,
      module.name.toLowerCase(),
      displayName.toLowerCase(),
    ])],
    purpose: data?.purpose || (lang === 'en'
      ? `${displayName} screen is used to manage operations belonging to the ${catEn} area.`
      : `${module.name} ekranı, ${module.category} departmanına ait işlemleri yönetmek için kullanılır.`),
    steps: data?.steps || (lang === 'en' ? [
      { title: 'Open Menu', desc: `Open "${catEn}" in the left menu, then go to "${displayName}".` },
      { title: 'Search', desc: 'Type the name or code you are looking for in the search bar at the top of the page and hit Enter.' },
      { title: 'Perform Action', desc: 'Click the 3 dots (⋮) menu on the far right of the row you found in the list and use Edit, Cancel or View Details.' },
      { title: 'Save', desc: 'After completing the operations, press the "Save" or "Confirm" button on the screen.' }
    ] : [
      { title: 'Menüyü Açın', desc: `Sol menüden "${module.category}" başlığına tıklayın, ardından "${module.name}" seçeneğine girin.` },
      { title: 'Arama Yapın', desc: 'Sayfanın üstündeki arama çubuğuna aradığınız ismi veya kodu yazıp Enter\'a basın.' },
      { title: 'İşlem Yapın', desc: 'Listede bulduğunuz satırın en sağındaki 3 nokta (⋮) menüsüne tıklayarak Düzenle, İptal Et veya Detay Gör seçeneklerini kullanın.' },
      { title: 'Kaydedin', desc: 'İşlemler tamamlandıktan sonra ekrana çıkan "Kaydet" veya "Onayla" butonuna basın.' }
    ])
  };
});

