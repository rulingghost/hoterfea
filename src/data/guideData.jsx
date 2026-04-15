import { modulesConfig } from './moduleList';

// ============================================================
// EN İNCE AYRINTISINA KADAR AÇIKLAMALI MODÜL BİLGİ BANKASI
// Bir otel çalışanı buraya bakarak her işlemi yapabilmeli
// ============================================================

const moduleKnowledge = {

  // ─── DASHBOARD & ANALİTİK ──────────────────────────────────

  'dashboard': {
    purpose: 'Otelin anlık durumunu (doluluk, gelir, check-in/out sayıları, departman özetleri) tek ekranda gösteren yönetici panosudur. Sabah gelince ilk bakılacak ekrandır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Ekranın sol kenarındaki lacivert/siyah dikey menüden "Dashboard & Analitik" başlığına tıklayın. Alt menü açılır. Oradan "Yönetici Paneli"ne tıklayın.' },
      { title: 'Üst Sayaçları Okuyun', desc: 'Ekranın en üstünde 4-5 adet büyük kart (kutu) görünür. Soldan sağa: Bugünkü toplam doluluk yüzdesi, beklenen gelir, bugün giriş yapacak misafir sayısı, bugün çıkış yapacak misafir sayısı. Bu sayılar canlı güncellenir.' },
      { title: 'Departman Kartlarını İnceleyin', desc: 'Aşağı kaydırdığınızda Restoran, Kat Hizmetleri, SPA gibi her departmanın günlük performansını gösteren daha küçük kartlar görünür. Bir karta tıklarsanız o departmanın kendi ekranına geçersiniz.' },
      { title: 'Tarih Değiştirme', desc: 'Sağ üst köşedeki takvim simgesine ("Bugün" yazan kısım) tıklayarak dün, bu hafta veya özel bir tarih aralığı seçebilirsiniz. Seçtiğinizde tüm sayılar o tarihe güncellenir.' },
      { title: 'Grafikleri Anlama', desc: 'Alt kısımda çizgi veya çubuk grafikler yer alır. Üzerlerine fareyle (mouse ile) geldiğinizde o güne ait kesin rakam balonu çıkar. Grafik üstündeki renk kodlu legendlara (efsane) bakarak hangi çizginin neyi temsil ettiğini anlayabilirsiniz.' }
    ]
  },

  'global-vision': {
    purpose: 'Tüm oteldeki operasyonları (dolu odalar, bekleyen misafirler, açık servis talepleri) coğrafi ve görsel bir harita üzerinde anlık izlemek için kullanılır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Dashboard & Analitik" > "Global Vision" seçeneğine tıklayın.' },
      { title: 'Haritayı Okuyun', desc: 'Ekranın ortasında interaktif bir harita yer alır. Her renk bir durumu temsil eder: Yeşil noktalar sorunsuzu, sarı noktalar dikkat gerektirenleri, kırmızı noktalar acil durumları gösterir.' },
      { title: 'Filtre Uygulama', desc: 'Ekranın üst kısmındaki sekmeler (Tümü / Satış / Operasyon / Finans) ile sadece ilgilendiğiniz departmanın verilerini izole edebilirsiniz.' },
      { title: 'Detaya Girmek', desc: 'Haritadaki herhangi bir noktaya veya sağ paneldeki kartlara tıklarsanız, o konuma ait detaylı bilgi (hangi oda, hangi servis, kim sorumlu) açılır.' }
    ]
  },

  'ai-strategy': {
    purpose: 'Yapay zeka tarafından üretilen stratejik önerileri (fiyatı yükselt, şu tarihlerde kampanya yap, revpar artırma fırsatı) listeleyen ve uygulatan modüldür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Dashboard & Analitik" > "AI Strategy Hub" seçeneğine tıklayın.' },
      { title: 'Öneri Listesini Okuyun', desc: 'Ekranın sol yarısında yapay zekanın analiz ettiği öneriler kart kart listelenir. Her kartın üstünde öncelik seviyesi (Yüksek/Orta/Düşük) ve kısa açıklama yazar.' },
      { title: 'Detayı İnceleyin', desc: 'Bir öneri kartına tıkladığınızda sağ panelde o önerinin neden yapıldığına dair veri ve grafik görünür.' },
      { title: 'Öneriyi Uygulayın', desc: 'Sağ panelin altındaki "Uygula" tuşuna basarsanız sistem otomatik o aksiyonu başlatır (fiyat gönderme, kampanya aktivasyonu vb.).' },
      { title: 'Öneriyi Reddedin', desc: '"Atla" tuşuna basarsanız o öneri listeden kalkar, sistem bir sonraki fırsatı analiz eder.' }
    ]
  },

  'forecast': {
    purpose: 'Önümüzdeki 7 gün, 30 gün veya belirli dönem için beklenen doluluk ve gelir tahminlerini grafik ve tablo olarak gösterir.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Dashboard & Analitik" > "Gelecek Tahmini" seçeneğine tıklayın.' },
      { title: 'Dönem Seçin', desc: 'Ekranın sağ üst köşesindeki dönem seçicisinden "7 Gün / 30 Gün / Özel Aralık" seçeneklerinden birini tıklayın.' },
      { title: 'Grafikleri Yorumlayın', desc: 'Üst çizgi grafik doluluk tahminini (%), alt bar grafik tahmini geliri (TL) gösterir. Çizginin üstüne fareyle gelince tam rakam balonu çıkar.' },
      { title: 'Karşılaştırma', desc: 'Sağ üst köşedeki "Geçen Yıl ile Karşılaştır" seçeneğini aktifleştirirseniz aynı grafikte iki yıl yan yana görünür.' }
    ]
  },

  'dashboard-builder': {
    purpose: 'Yöneticinin kendi özel pano tasarımını sürükle-bırak yöntemiyle oluşturduğu, hangi verilerin ve grafiklerin nerede görüneceğini belirlediği kişiselleştirme ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Dashboard & Analitik" > "Dashboard Oluşturucu" seçeneğine tıklayın.' },
      { title: 'Widget Ekleyin', desc: 'Sol panelde kullanabileceğiniz widget listesi yer alır (Gelir Grafiği, Doluluk Sayacı, Hava Durumu vb.). Birini fareyle tutup ana ekrana sürükleyip bırakın.' },
      { title: 'Boyutlandırın', desc: 'Panelin sağ alt köşesindeki tutma noktasını çekerek widget\'ı büyütüp küçültebilirsiniz.' },
      { title: 'Kaydedin', desc: 'Düzenlemeyi bitirince sağ üst köşedeki "Kaydet" butonuna basın. Bu pano artık sizin login ettiğinizde karşınıza çıkar.' }
    ]
  },

  'executive-vision': {
    purpose: 'CEO ve üst yönetim için otelin finansal ve operasyonel özetini sunan; RevPAR, ADR, doluluk gibi kritik KPI\'ların tek sayfada göründüğü rapor ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Dashboard & Analitik" > "Yönetici Görüşü" seçeneğine tıklayın.' },
      { title: 'KPI Kartlarını Okuyun', desc: 'Ekranın üst kısmındaki büyük kutularda RevPAR (Mevcut oda başına gelir), ADR (Ortalama oda fiyatı) ve Doluluk Oranı (%) yazar. Bunların yanındaki ok simgesi (↑ veya ↓) geçen dönemle kıyaslamayı gösterir.' },
      { title: 'Departman Gelir Dağılımı', desc: 'Ortadaki pasta grafik hangi departmanın toplam gelirin kaçını ürettiğini yüzdeyle gösterir.' },
      { title: 'PDF Rapor Alın', desc: 'Sağ üst köşedeki "PDF İndir" butonuna basarak o günün tüm raporunu otomatik biçimlendirilmiş PDF\'e dönüştürüp indirin. Patrona sunabilirsiniz.' }
    ]
  },

  // ─── ÖN BÜRO & REZERVASYON ──────────────────────────────────

  'front-office': {
    purpose: 'Resepsiyon masasının ana ekranıdır. Gelen misafirlerin check-in\'i, otelde konaklayan misafirlerin takibi, çıkış işlemleri ve oda değişiklikleri buradan yapılır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." başlığına tıklayın. Açılan alt listeden "Ön Büro" seçeneğine tıklayın.' },
      { title: '3 Listeyi Tanıyın', desc: 'Ekran yan yana 3 büyük listeye bölünür: EN SOL "Bugün Gelecekler (Arrivals)" — bugün giriş yapması beklenenler. ORTA "Otelde Kalanlar (In-House)" — şu an odada olan misafirler. EN SAĞ "Bugün Çıkacaklar (Departures)" — bugün çıkış yapması gereken misafirler.' },
      { title: 'Misafiri Arayın', desc: 'Herhangi bir listedeki arama kutusuna müşterinin adını, soyadını veya oda numarasını yazıp klavyede Enter\'a basın. Liste anında o kişiye göre süzülür.' },
      { title: 'Check-in Yapın (Misafir Geldi)', desc: 'Gelecekler listesinde misafiri buldunuz. İsminin en sağındaki 3 dikey noktaya (⋮) fareyle tıklayın. Açılan küçük menüden "Check-in" seçeneğine tıklayın. Sistem önce odanın temiz olup olmadığını, ödemenin tamamlanıp tamamlanmadığını kontrol eder. Her şey tamam ise misafir otomatik In-House listesine taşınır.', warn: 'Sistem "Ödeme Eksik" şeklinde kırmızı uyarı verirse misafiri odaya almadan önce Tahsilat işlemini yapın.' },
      { title: 'Check-out Yapın (Misafir Gidecek)', desc: 'Departures listesinde misafiri bulun. 3 noktaya tıklayıp "Check-out" seçin. Sistem folyo (hesap) özetini açar. Bakiye 0 ise "Onayla" basın. Bakiye varsa önce tahsilatı alın.' },
      { title: 'Oda Değiştirin', desc: 'In-House listesindeki misafirin 3 noktasına tıklayın, "Oda Değiştir" seçin. Açılan haritada yeşil (boş-temiz) bir odaya tıklayın. "Onayla" ile işlemi bitirin. Tüm harcamalar yeni odaya taşınır.' },
      { title: 'Misafir Notu Ekleyin', desc: 'Misafirin isminin üstüne (3 nokta değil, direkt isim) tıklayın. Sağdan detay paneli açılır. En aşağıda "Not Ekle" alanı vardır. Özel istekleri (alerjisi, tercih ettiği kat, VIP notu) buraya yazıp kaydedin.' },
      { title: 'No-Show İşlemi (Misafir Gelmedi)', desc: 'Gün sonu Arrivals listesinde hâlâ bekleyen isimler varsa gelmemiş demektir. 3 noktadan "No-Show" seçeneğini tıklayın. Sistem rezervasyonu iptal eder, odayı serbest bırakır.' }
    ]
  },

  'reservations-tape': {
    purpose: 'Tüm rezervasyonları zaman çizelgesi (tape chart) üzerinde, oda bazında renk renk gösteren takvim görünümüdür. Kim ne zaman geliyor-gidiyor tek bakışta görülür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Rezervasyon Takvimi" seçeneğine tıklayın.' },
      { title: 'Takvimi Okuyun', desc: 'Ekranın en üstünde tarih sütunları, sol kenarında oda numaraları yer alır. Her rezervasyon renkli bir blok olarak görünür. Bloğun üstünde misafir adı yazar.' },
      { title: 'İleri-Geri Kaydırın', desc: 'Ekranın üstündeki sol-sağ ok butonlarıyla hafta hafta kaydırabilirsiniz. Ya da üstteki tarih kutusunu tıklayarak doğrudan bir tarihe atlayabilirsiniz.' },
      { title: 'Rezervasyon Detayı', desc: 'Bir rezervasyon bloğuna tıkladığınızda ekranın sağından bir detay paneli süzülür. Bu panelde misafir adı, giriş-çıkış tarihi, oda tipi, ödeme durumu ve notlar yer alır.' },
      { title: 'Yeni Rezervasyon Açın', desc: 'Takvimde boş bir hücreye çift tıklarsanız o oda ve tarih için direkt Yeni Rezervasyon sihirbazı açılır.' },
      { title: 'Renk Kodlarını Anlayın', desc: 'Her renk bir ödeme/kaynak durumunu gösterebilir. Ekranın sol alt köşesindeki legend (renk açıklama kutusu) hangi rengin ne anlama geldiğini söyler.' }
    ]
  },

  'new-reservation': {
    purpose: 'Telefon, kapı veya e-posta yoluyla gelen müşteriler için sıfırdan yeni oda rezervasyonu oluşturma sihirbazıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Yeni Rezervasyon" seçeneğine tıklayın.' },
      { title: 'Tarihleri Girin', desc: 'Açılan sayfanın üst kısmında iki büyük tarih kutusu görünür. SOL kutu giriş (Check-in) tarihini, SAĞ kutu çıkış (Check-out) tarihini alır. Kutuya tıklayınca takvim açılır, günlere tıklayarak seçin.' },
      { title: 'Kişi Sayısı', desc: 'Tarih kutularının hemen altında "Yetişkin" ve "Çocuk" sayısı seçicileri yer alır. + ve – butonlarıyla ayarlayın. Çocuk seçerseniz sistem yaş sorar — yaşa göre yemek ücreti hesaplanır.' },
      { title: 'Müsait Odaları Bulun', desc: 'Sağ alt köşedeki büyük mavi "Müsait Odaları Bul" butonuna tıklayın. Sistem 2-3 saniyede o tarihlerde boş olan tüm oda tiplerini resimleri ve fiyatlarıyla listeler.' },
      { title: 'Odayı Seçin', desc: 'İstediğiniz odanın kartının altındaki yeşil "Seç" butonuna tıklayın. Seçilen oda sarı çerçeveyle vurgulanır ve bir sonraki adıma geçilir.' },
      { title: 'Fiyatı Düzenleyin (Gerekirse)', desc: 'Seçilen odanın fiyat kutusunda rakam görünür. Müşteriye özel indirim verecekseniz o kutudaki sayıyı silip yeni rakamı yazın. Yetkiniz varsa sistem kabul eder; yoksa yönetici onayı ister.', warn: 'Yetkinizin üstünde indirim yapmaya çalışırsanız sistem son adımda "Yönetici Şifresi Gerekli" uyarısı verir.' },
      { title: 'Müşteri Bilgilerini Girin', desc: 'Ad, soyad, telefon kutularını doldurun. Adı yazmaya başlarken sistem daha önce konaklamış biriyse "Bu isimde kayıtlı müşteri var" diye öneri çıkarır — üstüne tıklarsanız tüm bilgiler otomatik dolar.' },
      { title: 'Ödeme Yöntemini Seçin', desc: 'Alt kısımda "Ön Ödeme Al" veya "Çıkışta Öde" seçenekleri vardır. Ön ödeme alacaksanız tutarı ve ödeme tipini (Nakit/Kart) girin.' },
      { title: 'Rezervasyonu Tamamlayın', desc: 'En alttaki büyük yeşil "Rezervasyonu Tamamla" (veya "Kaydet") butonuna tıklayın. Sistem onay numarası üretir ve müşterinin telefonuna/e-postasına otomatik bildirim gönderir.' }
    ]
  },

  'room-rack': {
    purpose: 'Otelin tüm odalarının anlık durumunu (boş, dolu, kirli, arızalı) görsel bir kat planında (haritada) gösterir. Kim hangi odada, hangi oda boş, tek ekranda görülür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Room Rack" seçeneğine tıklayın.' },
      { title: 'Renk Kodlarını Anlayın', desc: 'YEŞİL kutu: Boş ve temiz (misafir alınabilir). KIRMIZI kutu: Dolu, misafir içinde yatıyor. SARI kutu: Kirli, temizlenmeyi bekliyor. GRİ kutu: Bakımda veya arızalı, misafir alınamaz.' },
      { title: 'Oda Detayını Görün', desc: 'Herhangi bir oda kutusuna tıkladığınızda sağdan bir panel açılır. Bu panelde o odanın misafir adı, giriş-çıkış tarihi, oda tipi ve anlık durumu yazar.' },
      { title: 'Oda Durumunu Değiştirin', desc: 'Oda kutusuna sağ tıklayın veya kutunun üst köşesindeki küçük menü simgesini tıklayın. "Durum Değiştir" seçeneğiyle oda statüsünü güncellerin (örn: Kirli → Temiz).' },
      { title: 'Kat Filtresi', desc: 'Ekranın solundaki kat numaralarına (1.Kat, 2.Kat vb.) tıklayarak sadece o katın odalarını görebilirsiniz.' }
    ]
  },

  'res-list': {
    purpose: 'Sistemdeki tüm rezervasyonları (geçmiş, bugün, gelecek, iptal) listeleyen, arama ve filtreleme yapılabilen ana rezervasyon listesidir.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Rezervasyon Listesi" seçeneğine tıklayın.' },
      { title: 'Arama Yapın', desc: 'Sayfanın üstündeki beyaz arama kutusuna müşteri adı, oda numarası veya rezervasyon kodu yazılıp Enter\'a basın. Sistem 5000 kayıt arasından anlık süzer.' },
      { title: 'Tarih Filtresi', desc: 'Sol taraftaki filtre panelinden "Giriş Tarihi" veya "Çıkış Tarihi" için tarih aralığı seçerek listeyi o döneme göre daraltın.' },
      { title: 'Durum Filtresi', desc: 'Filtre panelinde "Durum" seçicisinden "Aktif / İptal / Tamamlandı / No-Show" seçeneğini işaretleyin.' },
      { title: 'Rezervasyona Girin', desc: 'Listedeki bir satıra tıklarsanız o rezervasyonun detay kartı açılır.' },
      { title: 'Excel İndir', desc: 'Sağ üst köşedeki küçük Excel (tablo) ikonuna tıklayarak mevcut filtrelenmiş listeyi bilgisayarınıza Excel dosyası olarak indirin.' }
    ]
  },

  'res-card': {
    purpose: 'Tek bir rezervasyona ait tüm bilgileri (misafir, oda, ödeme durumu, notlar, routing) gösteren ve düzenlenebilen rezervasyon detay kartıdır.',
    steps: [
      { title: 'Açılış', desc: 'Rezervasyon Listesi\'nden bir kayda tıklayarak veya sol menüden "Rezervasyon Kartı" girerek açın.' },
      { title: 'Misafir Bilgisi Bölümü', desc: 'Sayfanın üst kısmında misafirin adı, telefonu, e-postası, TC/Pasaport numarası yer alır. "Düzenle" (kalem) ikonuna tıklayarak bunları güncelleyebilirsiniz.' },
      { title: 'Konaklama Detayı', desc: 'Ortada giriş-çıkış tarihleri, oda numarası, oda tipi, yetişkin/çocuk sayısı ve anlaşma tipi yazar. Tarih değişikliği yapmak istiyorsanız bu bölümden "Tarihleri Düzenle" seçin.' },
      { title: 'Notlar ve Özel İstekler', desc: 'Alt kısımdaki "Notlar" alanına misafire özel talepleri (alerjisi var, üst kat istemez, bebek karyolası lazım) yazın. Bu notlar Ön Büro ve Kat Hizmetleri ekranlarında da görünür.' },
      { title: 'Belge Yazdırın', desc: 'Sağ üst köşedeki "Yazdır" butonuyla rezervasyon onay belgesi veya folyo özeti alabilirsiniz.' }
    ]
  },

  'group-res': {
    purpose: 'Kafile, düğün, konferans veya şirket grubu için tek seferde çok sayıda oda bloğu oluşturmaya ve yönetmeye yarayan grup rezervasyonu modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Grup Rezervasyonları" seçeneğine tıklayın.' },
      { title: 'Yeni Grup Oluşturun', desc: 'Sağ üst köşedeki "+ Yeni Grup" butonuna tıklayın. Açılan formda grup adını (örn: "ABC Şirketi Toplantı Grubu"), giriş tarihi, çıkış tarihi ve tahmini kişi sayısını girin.' },
      { title: 'Oda Bloğu Ayarlayın', desc: 'Grup oluşturulduktan sonra "Oda Bloğu Ekle" butonuyla hangi oda tipinden kaç adet istediğinizi belirtin. Sistem o blokları rezerve eder.' },
      { title: 'Bireysel Kayıtlar', desc: 'Her oda için isme özel check-in yapmak isterseniz grup listesinden ilgili odaya tıklayıp "Misafir Ata" seçeneğiyle kişinin bilgilerini girin.' },
      { title: 'Toplu Fatura', desc: 'Grubun tamamı için tek fatura kesilmesini istiyorsanız "Routing Ayarla" ile tüm harcamaların tek hesaba gitmesini ayarlayın.' }
    ]
  },

  'channel': {
    purpose: 'Booking.com, Expedia, HRS, Agoda gibi online satış kanallarına oda fiyatı ve müsaitlik göndermek; bu kanallardan gelen rezervasyonları görmek ve yönetmek için kullanılan Kanal Yönetimi ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Kanal Yönetimi" seçeneğine tıklayın.' },
      { title: 'Bağlı Kanalları Görün', desc: 'Ekranın SOL tarafında bağlı kanalların listesi yer alır: Booking.com, Expedia, HRS vb. Yanında yeşil nokta varsa bağlantı aktif demektir. Kırmızı nokta bağlantı hatası demektir.' },
      { title: 'Booking Rezervasyonlarını Kontrol Edin', desc: 'Sol listeden "Booking.com"a tıklayın. Sağ tarafta Booking\'ten gelen rezervasyonlar listelenir. Yeni bir rezervasyon geldiyse listede "Yeni" etiketi yazar.' },
      { title: 'Fiyat Gönderin', desc: 'Üst menüden "Fiyat & Müsaitlik" sekmesine tıklayın. Tarih aralığı, oda tipi ve fiyatı giren alanları doldurun. En sağdaki "Tüm Kanallara Gönder" butonuna basın. Sistem aynı anda tüm platformları günceller.' },
      { title: 'Belirli Tarihi Kapatın', desc: 'Müsaitlik ekranında bir tarihe çift tıklayarak o tarih için tüm kanalları kapatabilirsiniz (örn: otelin dolduğu gün yeni rezervasyon almasını engellemek için).' },
      { title: 'Kanal Bağlantı Sorunu', desc: '', warn: 'Sol listede kırmızı nokta gören bir kanal varsa IT departmanını veya Sistem Yöneticisini bilgilendirin. Bu sürede o kanaldan rezervasyon alınamaz.' }
    ]
  },

  'crs': {
    purpose: 'Zincir oteller veya birden fazla mülk için merkezi rezervasyon yönetimi; tüm otellerdeki dolulukları ve rezervasyonları tek noktadan görme imkânı sağlar.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Ön Büro & Rez." > "Merkezi Rezervasyon" seçeneğine tıklayın.' },
      { title: 'Otel Filtresi', desc: 'Sol üstte otel seçici vardır. "Tüm Oteller" seçiliyse tüm zincirin verisi belirir. Belirli bir oteli seç diyerek sadece o otelin rezervasyonlarını filtreleyin.' },
      { title: 'Rezervasyon Dağıtımı', desc: 'Merkezi sistemden gelen talepleri ilgili otele atamak için satırın sağındaki "Onayla ve Aktar" butonuna tıklayın.' },
      { title: 'Karşılaştırma Raporu', desc: '"Rapor" sekmesinden oteller arası doluluk ve gelir karşılaştırmasını Excel olarak indirin.' }
    ]
  },

  // ─── OPERASYON ──────────────────────────────────────────────

  'housekeeping': {
    purpose: 'Kat görevlilerinin hangi odayı temizleyeceğini planlamak, oda durumlarını (kirli/temiz/arızalı) anlık takip etmek ve personel görevlendirmesi yapmak için kullanılan operasyon ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Kat Hizmetleri (HK)" seçeneğine tıklayın.' },
      { title: 'Haritadaki Renkleri Anlayın', desc: 'Ekranda kare kutucuklar (her biri bir oda) görünür. KIRMIZI: Kirli — misafir çıkmış, temizlenmesi lazım. YEŞİL: Temiz — misafir girebilir. SARI: Uyarı — personel içerde/bildirim bekliyor. GRİ: Arızalı — teknik servis bekleniyor.' },
      { title: 'Personel Atayın', desc: 'Kırmızı (kirli) bir oda kutusuna tıklayın. Sağdan açılan panelde "Personel Ata" seçicisinden temizlik personelini (Ayşe Hanım gibi) seçin ve "Kaydet"e basın. Personelin telefonuna bildirim gider.' },
      { title: 'Otomatik Dağıtım', desc: 'Sayfanın üstündeki "Otomatik Dağıt" butonuna basarsanız sistem, tüm kirli odaları o gün müsait personele dengeli olarak böler ve hepsine bildirim gönderir.' },
      { title: 'Temizlik Tamamlandı', desc: 'Personel temizliği bitirince kendi ekranından (veya siz onun adına) odanın durumunu KIRMIZI\'dan YEŞİL\'e çekin. "Durum Değiştir > Temiz" seçin.' },
      { title: 'Arıza Bildirimi', desc: 'Odada klima bozuksa, delik varsa vb.: Oda kutusuna tıklayın, "Arıza Bildir" butonuna basın. Arıza kategorisini (elektrik, su, mobilya vb.) seçip açıklama yazın. Sistem Teknik Servise otomatik iş emri açar.' },
      { title: 'Kayıp Eşya Uyarısı', desc: '', warn: 'Odada müşteriye ait bir eşya buldunuzsa, odayı "Temiz" yapmadan önce "Kayıp & Bulunan" modülüne fotoğraflı kayıt atın. Sonra temizleme işlemini tamamlayın.' }
    ]
  },

  'tech-service': {
    purpose: 'Otel genelinde bildirilen arızaların, bakım taleplerinin ve tamir işlerinin iş emri olarak kaydedildiği ve teknisyene atandığı teknik servis modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Teknik Servis" seçeneğine tıklayın.' },
      { title: 'Yeni İş Emri Açın', desc: 'Sağ üst köşedeki "+ Yeni İş Emri" butonuna tıklayın. Açılan formda: Arıza Kategorisi (Elektrik/Su/Klima/Mobilya/Diğer), Oda Numarası veya Konum (Lobi, Havuz vb.), Kısa Açıklama ve Öncelik Seviyesi (Düşük/Orta/Yüksek/Kritik) alanlarını doldurun.' },
      { title: 'Fotoğraf Ekleyin', desc: 'Formun altındaki "Fotoğraf Ekle" alanından arızanın fotoğrafını yükleyin. Bu teknisyenin ne göreceğini anlamasını kolaylaştırır.' },
      { title: 'Teknisyene Atayın', desc: '"Teknisyen" seçicisinden o gün müsait olan teknisyeni seçin ve "Oluştur" butonuna basın. Teknisyen bildirim alır.' },
      { title: 'İş Emrini Takip Edin', desc: 'Ana listede iş emirleri "Bekliyor / Devam Ediyor / Tamamlandı" statüsünde görünür. Üzerlerine tıklayarak güncelleme notlarını okuyabilirsiniz.' },
      { title: 'Tamamlama', desc: 'Teknisyen işi bitirince "Tamamlandı" olarak işaretler. İş emrinin tipi "Oda Arızası" ise sistem otomatik olarak Kat Hizmetleri\'ne uyarı gönderir ki o oda kontrol edilsin.' }
    ]
  },

  'spa': {
    purpose: 'SPA, masaj, hamam, sauna ve wellness hizmetlerinin randevu alınması, terapist planlaması ve tahsilatının yönetildiği departman ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "SPA & Wellness" seçeneğine tıklayın.' },
      { title: 'Takvimi Görün', desc: 'Ekran terapist bazlı randevu takvimi şeklinde açılır. Her terapistin sütununda o gün var randevuları renkli bloklar halinde görünür.' },
      { title: 'Randevu Oluşturun', desc: 'Sağ üst "+ Randevu" butonuna tıklayın. Hizmet türü (Masaj/Hamam/Tedavi), tarih, saat, süre ve misafiri (oda numarasından veya isimden) seçin, "Kaydet"e basın.' },
      { title: 'Misafirin Hesabına Yazın', desc: 'Hizmet tamamlandıktan sonra randevu bloğuna tıklayın. Açılan panelden "Hesaba Yaz" butonuyla SPA ücreti misafirin otel faturasına (folyosuna) otomatik eklenir.' },
      { title: 'Nakit Tahsilat', desc: 'Misafir direkt ödemek istiyorsa "Hemen Tahsil Et" seçeneğiyle nakit veya kart ödemesi alın.' }
    ]
  },

  'banquet': {
    purpose: 'Düğün, toplantı, konferans, iftar yemeği, mezuniyet gibi organizasyonların salon rezervasyonu, menü planlaması, ekipman yönetimi ve faturalandırmasının yapıldığı etkinlik modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Ziyafet & Etkinlik" seçeneğine tıklayın.' },
      { title: 'Etkinlik Oluşturun', desc: 'Sağ üst "+ Yeni Etkinlik" butonuna tıklayın. Etkinlik adı, tarih, saat, süre, katılımcı sayısı ve kullanılacak salon bilgilerini girin.' },
      { title: 'Salon Durumu', desc: 'Hangi salonun o tarihte müsait olduğunu görmek için takvim görünümüne geçin. Dolu salonlar kırmızı, boş olanlar yeşil görünür.' },
      { title: 'Menü ve Ekipman', desc: 'Oluşturduğunuz etkinliğe tıklayıp "Menü Seç" bölümünden yemek paketini belirleyin. "Ekipman" bölümünden projeksiyon, sahne vb. ihtiyaçları işaretleyin.' },
      { title: 'Fatura Oluşturun', desc: 'Etkinlik tamamlandıktan sonra "Fatura Oluştur" butonuyla detaylı döküm Finans modülüne otomatik aktarılır.' }
    ]
  },

  'smart-room': {
    purpose: 'Akıllı oda sistemleri (sıcaklık, aydınlatma, perde) ve otel geneli enerji tüketimini izlemek, uzaktan kontrol etmek için kullanılan IoT yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Smart Room & Energy" seçeneğine tıklayın.' },
      { title: 'Oda Seçin', desc: 'Sol paneldeki oda numaralarından birine tıklayın. Sağ tarafta o odanın anlık sıcaklığı, ışık seviyesi ve perde durumu gösterilir.' },
      { title: 'Uzaktan Kontrol Edin', desc: 'Misafir yokken: Klima sıcaklığını sliderı kaydırarak değiştirin, ışık düğmesini tıklayarak açıp kapatın. "Kaydet"e basınca komut odaya iletilir.' },
      { title: 'Enerji Raporu', desc: 'Üst menüden "Tüketim Raporu" sekmesine geçin. Oda bazlı ve departman bazlı elektrik/su tüketimini grafiklerle görün. Aşırı tüketen odalar kırmızıyla vurgulanır.' }
    ]
  },

  'lost-found': {
    purpose: 'Otelde bulunan veya müşterilerin unuttuğu eşyaların kayıt altına alındığı, sahiplerine ulaştırıldığı ve zimmet takibinin yapıldığı modüldür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Kayıp & Bulunan" seçeneğine tıklayın.' },
      { title: 'Yeni Eşya Kaydedin', desc: 'Sağ üst "+ Yeni Kayıt" butonuna tıklayın. Eşyanın bulunduğu yer (Oda 105 / Lobi / Havuz başı), eşyanın tanımı (Mavi deri cüzdan), bulan personelin adı ve bulunma tarihi/saatini girin.' },
      { title: 'Fotoğraf Ekleyin', desc: 'Form altındaki fotoğraf alanına eşyanın resmini yükleyin. Bu hem doğrulama hem de ileride yapılacak zimmet teslimi için gereklidir.' },
      { title: 'Sahibini Bulun', desc: 'Eğer yakın tarihte check-out yapan misafir listesinden sahibini tespit edebiliyorsanız, kayıt formundaki "Sahibine Bildir" butonuyla otomatik SMS/e-posta bildirimi gönderin.' },
      { title: 'Teslim Edin', desc: 'Sahibi gelip teslim aldığında kaydın üzerindeki "Teslim Edildi" seçeneğini işaretleyin ve teslim alan kişinin imzasını/notunu girin.' }
    ]
  },

  'laundry': {
    purpose: 'Misafir çamaşırlarının yıkama/ütüleme/kuru temizleme siparişlerinin alındığı, takip edildiği ve misafirin hesabına yansıtıldığı çamaşırhane yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Çamaşırhane" seçeneğine tıklayın.' },
      { title: 'Yeni Sipariş Alın', desc: 'Sağ üst "+ Sipariş Ekle" butonuna tıklayın. Oda numarasını girin (sistem misafirin adını otomatik getirir). Hizmet tipini seçin: Normal (24 saat), Ekspres (6 saat), Kuru Temizleme.' },
      { title: 'Kalemleri Girin', desc: 'Kaç adet gömlek, pantolon, iç çamaşırı vb. olduğunu girin. Sistem birim fiyatlarla toplam tutarı hesaplar.' },
      { title: 'Durumu Takip Edin', desc: 'Ana listede sipariş durumu "Teslim Alındı / Yıkanıyor / Hazır / Teslim Edildi" şeklinde güncellenir. "Hazır" gördüğünüzde misafiri arayabilirsiniz.' },
      { title: 'Hesaba Yansıtın', desc: 'Teslimat sonrasında, siparişin yanındaki "Hesaba Yaz" butonuyla çamaşırhane ücretini misafirin folio\'suna ekleyin.' }
    ]
  },

  'entertainment': {
    purpose: 'Animasyon, canlı müzik, show ve eğlence etkinliklerinin planlandığı, ekiplere görev atandığı ve misafir katılım durumunun takip edildiği departman ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Operasyon" > "Entertainment" seçeneğine tıklayın.' },
      { title: 'Etkinlik Takvimini Görün', desc: 'Ekranda haftalık takvim view açılır. Planlı etkinlikler renkli bloklar halinde gösterilir. Üstlerine tıklayarak detayları görebilirsiniz.' },
      { title: 'Yeni Etkinlik Ekleyin', desc: '"+ Etkinlik Ekle" butonuyla etkinliğin adını, yerini (Amfi Tiyatro/Havuz Sahası/Lobi), saatini ve sorumlu animatörü belirtin.' },
      { title: 'Katılım Takibi', desc: 'Etkinlik sonrasında kaç misafirin katıldığını girerek raporlama yapabilirsiniz.' }
    ]
  },

  // ─── YİYECEK & İÇECEK ───────────────────────────────────────

  'pos': {
    purpose: 'Restoran, bar, havuz başı ve tüm yiyecek-içecek satış noktalarında sipariş almak, mutfağa iletmek, hesabı kapatmak ve tahsilat yapmak için kullanılan gişe (POS) sistemidir.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Yiyecek & İçecek" > "Restoran POS" seçeneğine tıklayın.' },
      { title: 'Masa Seçin', desc: 'Ekranda restoranın masa planı görünür. YEŞİL masa: Boş. KIRMIZI masa: Dolu, adisyon açık. Boş (yeşil) bir masaya tıklayarak yeni müşteri için adisyon açın.' },
      { title: 'Sipariş Alın', desc: 'Sağ panelde kategoriler (Çorbalar / Ana Yemekler / İçecekler / Tatlılar) görünür. Müşterinin istediği ürünün üstüne tıklarsanız adisyona eklenir. Miktarı değiştirmek için + / – butonlarını kullanın.' },
      { title: 'Özel Not Ekleyin', desc: 'Bir ürüne uzun basın (veya ürün üstünde "Not" ikonuna tıklayın) ve özel isteği yazın: "Az pişmiş", "Baharatsız", "Yanında limon olsun".' },
      { title: 'Mutfağa Gönderin', desc: '"Mutfağa Gönder" (yeşil) butonuna basın. Seçilen ürünler anında mutfak ekranına (KDS) düşer. Garson bu tuşa basmadan ürünler mutfağa ulaşmaz.' },
      { title: 'Odaya Yazın', desc: 'Misafir "Hesabı odama yazın" diyorsa: Hesap kapatma ekranında "Oda Aktarımı" seçeneğini tıklayın, oda numarasını girin. Sistem misafirin adını doğrulayıp folyo\'suna ekler.' },
      { title: 'Ödeme Alın ve Masayı Kapatın', desc: '"Hesabı Kapat" butonuna basın. Nakit, Kart veya Oda Aktarımı seçeneklerinden birini seçin. Nakit için "Alınan Tutar"ı girin, sistem üstü hesaplar. "Onayla" ile masa tekrar yeşile döner.', warn: 'Yönetici yetkisi olmadan hesaba indirim veya ürün silme yapamazsınız. Bu işlemler için yönetici onay kodu gerekmektedir.' }
    ]
  },

  'minibar': {
    purpose: 'Müşterilerin oda mini barından tükettikleri ürünlerin sisteme girildiği ve misafirin hesabına otomatik yansıtıldığı oda ikram yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Yiyecek & İçecek" > "Mini Bar & İkram" seçeneğine tıklayın.' },
      { title: 'Oda Seçin', desc: 'Üstteki arama kutusuna oda numarasını (örn: 204) yazıp Enter\'a basın. O odanın mini bar ürün listesi açılır.' },
      { title: 'Tüketilenleri Girin', desc: 'Her ürünün yanında miktar bulunur. Misafirin içtiği kola 2 adet ise o ürünün yanındaki sayıyı 2 yapın.' },
      { title: 'Hesaba Aktarın', desc: '"Hesaba Yaz / Kaydet" butonuna basın. Seçilen ürün bedelleri misafirin folio\'suna otomatik işlenir. Sistem stok sayısını da otomatik düşer.' },
      { title: 'Stok Uyarısı', desc: '', warn: 'Bir ürün stokta "0" görünüyorsa Stok & Depo modülüne haber verin, depoya bildirim düşürün.' }
    ]
  },

  // ─── SATIŞ & PAZARLAMA ──────────────────────────────────────

  'revenue': {
    purpose: 'Oda fiyatlarını optimize etmek, RevPAR ve ADR gibi gelir metriklerini analiz etmek ve gelecek dönem doluluk tahminlerine göre fiyat stratejisi belirlemek için kullanılan gelir yönetimi ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Gelir Yönetimi" seçeneğine tıklayın.' },
      { title: 'Günlük Fiyat Takvimini Görün', desc: 'Ekranda tarih bazlı tablo yer alır. Her günün karşısında o günkü doluluk oranı (%), ortalama oda fiyatı (ADR) ve RevPAR değeri yazar.' },
      { title: 'Fiyat Güncelleme', desc: 'Belirli bir tarihe veya tarih aralığına tıklayın. Sağ panelde "Fiyatı Güncelle" alanına yeni fiyatı girin. "Tüm Kanallara Gönder" butonuyla Booking/Expedia dahil her yere güncelleme gider.' },
      { title: 'Otomatik Fiyatlama', desc: '"Dinamik Fiyatlandırma" sekmesinden doluluk eşiklerine göre otomatik fiyat kuralları tanımlayabilirsiniz (örn: doluluk%80 geçerse fiyatı %20 artır).' },
      { title: 'Rapor', desc: '"Gelir Raporu" sekmesinden dönem bazlı RevPAR, ADR ve doluluk karşılaştırma raporlarını alın.' }
    ]
  },

  'crm': {
    purpose: 'Misafir profilleri, konaklama geçmişi, harcama alışkanlıkları ve iletişim bilgilerinin tutulduğu, kampanya ve e-posta göndermenin yapıldığı müşteri ilişkileri yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Pazarlama (CRM)" seçeneğine tıklayın.' },
      { title: 'Misafir Arayın', desc: 'Üstteki arama çubuğuna müşterinin adını, telefon numarasını veya e-postasını yazıp Enter\'a basın.' },
      { title: 'Profil Detayını İnceleyin', desc: 'Bulunan misafirin kartına tıklayın. İçinde: Kaç kez konakladığı, toplam harcama miktarı, oda tercihleri, şikayet geçmişi, özel günleri (doğum günü, yıl dönümü) görünür.' },
      { title: 'Segmantasyon ve Kampanya', desc: 'Ana listede sol taraftaki filtrelerden (İstanbul\'dan gelenler, 5+ konaklama yapanlar vb.) bir segment tanımlayın. Sağ üstten "E-posta Kampanyası Gönder" butonuyla toplu mesaj gönderin.' },
      { title: 'Profil Güncelleme', desc: 'Misafir kartında "Düzenle" tuşuyla güncel telefon numarası, e-posta veya özel not ekleyebilirsiniz.' }
    ]
  },

  'loyalty': {
    purpose: 'Sadakat programı üyelerinin puanlarının takip edildiği, üyelik seviyelerinin (Silver/Gold/Platinum) yönetildiği ve ödüllerin tanımlandığı modüldür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Sadakat & Mobil" seçeneğine tıklayın.' },
      { title: 'Üye Arayın', desc: 'Üstteki arama kutusuna üyenin adını veya üyelik kartı numarasını yazıp Enter\'a basın.' },
      { title: 'Puan Ekleyin', desc: 'Üye kartında "Puan İşlemi" butonuna tıklayın. İşlem tipini "Puan Ekle" seçin, tutarı ve nedeni girin (Konaklama / Restoran / SPA). Kaydedin.' },
      { title: 'Puan Kullandırın', desc: '"Puan Düş" seçeneğiyle misafirin puanlarını ödül veya indirim karşılığı düşebilirsiniz.' },
      { title: 'Seviye Güncelleme', desc: 'Birikim yeterli olduğunda kart üstündeki "Seviye Güncelle" butonuyla Silver\'dan Gold\'a, Gold\'dan Platinum\'a terfi edebilirsiniz.' }
    ]
  },

  'sales-marketing': {
    purpose: 'B2B satış aktivitelerinin (lead takibi, teklif hazırlama, müşteri ziyareti) yönetildiği ve pazarlama bütçesinin planlandığı satış departmanı ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Satış & Pazarlama" seçeneğine tıklayın.' },
      { title: 'Lead Listesi', desc: 'Sol panelde müşteri adayları (lead) listelenir. "Ön Görüşme / Teklif Gönderildi / Kapalı" aşamalarına göre renklendirilir.' },
      { title: 'Yeni Teklif Hazırlayın', desc: '"+ Yeni Teklif" butonuyla şirket adı, iletişim kişisi, talep edilen tarih ve oda sayısı bilgilerini girin. "PDF Oluştur" ile profesyonel teklif belgesi üretin.' },
      { title: 'Aktivite Ekleyin', desc: 'Müşteriyle yapılan toplantıyı, aramayı veya ziyareti "Aktivite Ekle" ile kayıt altına alın. Böylece tüm satış geçmişi takip edilebilir.' }
    ]
  },

  'tours': {
    purpose: 'Tur operatörleri ve acentelerle yapılan gezi, transfer ve tur planlarının yönetildiği, misafirlere tur satışının yapıldığı modüldür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Tur & Acente" seçeneğine tıklayın.' },
      { title: 'Mevcut Turları Görün', desc: 'Ekranda aktif tur listesi yer alır. Her turun kapasitesi, tarihi ve fiyatı görünür.' },
      { title: 'Misafir Kaydı', desc: 'Bir turun kartına tıklayıp "Misafir Ekle" butonuyla otelde konaklayan misafiri o tura kaydedebilirsiniz. Ücret misafirin folyo\'suna düşer.' },
      { title: 'Yeni Tur Ekleyin', desc: '"+ Yeni Tur" butonuyla tur adı, güzergah, tarih, fiyat ve kapasite bilgilerini girin.' }
    ]
  },

  'contracts': {
    purpose: 'Acenteler veya kurumsal şirketlerle yapılan fiyat sözleşmelerinin (kontratların) sisteme tanımlandığı ve rezervasyonlarda otomatik uygulandığı modüldür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Acente Kontratları" seçeneğine tıklayın.' },
      { title: 'Kontrat Görün', desc: 'Listede tüm aktif ve geçmiş kontratlar yer alır. Birine tıklarsanız o kontrattaki oda tipleri, sezonluk fiyatlar ve geçerlilik tarihleri görünür.' },
      { title: 'Yeni Kontrat Ekleyin', desc: '"+ Kontrat Ekle" butonuyla acente adı, sözleşme tarihi, oda tipleri ve sezonlara göre fiyatları girin. Kaydedin.' },
      { title: 'Otomatik Uygulama', desc: 'Yeni rezervasyon yaparken misafirin kurum/acente bilgisini girerseniz sistem o kurumun kontrat fiyatını otomatik uygular.' }
    ]
  },

  'agency-contracts': {
    purpose: 'Acentelere özel komisyon oranları, allotman kotaları ve sözleşme koşullarının ayrıntılı yönetildiği gelişmiş acente sözleşme modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Satış & Pazarlama" > "Acente Sözleşmeleri" seçeneğine tıklayın.' },
      { title: 'Acente Seçin', desc: 'Sol listeden bir acenteyi seçin. Sağda o acentenin tüm sözleşme detayları (kota, komisyon %, geçerli tarih, iletişim) açılır.' },
      { title: 'Sözleşmeyi Güncelleyin', desc: '"Düzenle" butonuyla komisyon oranını veya kotayı güncelleyin ve kaydedin.' },
      { title: 'Kota Dolumu Takibi', desc: 'Sözleşme detayında allotman kotasının ne kadarının kullanıldığını gösteren bar görünür. Kota dolunca sistem otomatik uyarır.' }
    ]
  },

  // ─── FİNANS ─────────────────────────────────────────────────

  'folio': {
    purpose: 'Misafirin otelde yaptığı tüm harcamaları (oda bedeli, restoran, SPA, minibar, laundry vb.) gösteren, tahsilat alınan ve resmi faturanın kesildiği hesap kartı ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "Folio Yönetimi" seçeneğine tıklayın.' },
      { title: 'Müşteriyi Bulun', desc: 'Üstteki arama kutusuna oda numarasını (örn: 305) veya müşteri adını yazıp Enter\'a basın. O müşterinin hesap kartı açılır.' },
      { title: 'Tabloyu Okuyun', desc: 'SOL SÜTUN (kırmızı/borç): Misafirin birikmiş borçları (Oda kirası, Cola, Masaj ücreti vb.). SAĞ SÜTUN (yeşil/ödeme): Misafirin yaptığı ödemeler. EN ALTTA kalın "Kalan Bakiye" satırı yer alır. Bu mutlaka "0,00 TL" olmalıdır.' },
      { title: 'Tahsilat Alın', desc: 'Bakiye 0 değilse sağ alt köşedeki "Tahsilat Ekle" (veya "Ödeme Al") butonuna tıklayın. Tutar otomatik dolu gelir. Ödeme tipini seçin: NAKİT veya KREDİ KARTI. Kaydedin.', warn: 'Müşteri elinize NAKIT para verdiyse kesinlikle "Nakit" seçin. Kartı yoksa "Kredi Kartı" seçmeyin. Yanlış seçim gün sonu kasa açığına yol açar.' },
      { title: 'E-Fatura Kesin', desc: 'Bakiye sıfırlandıktan sonra sağ üst köşedeki "E-Fatura Oluştur" butonuna tıklayın. Bireysel fatura için TC kimlik numarasını, kurumsal fatura için VKN numarasını girin. Sistem GİB\'den şirket adını otomatik getirir. "Gönder" ile fatura resmi sisteme iletilir.' },
      { title: 'Hatalı Tutarı Düzeltin', desc: 'Listede hatalı girilmiş bir kalem görürseniz (misafir o kolayı içmedi diyorsa), o kalemi tıklayıp "İndirim Ekle" seçeneğiyle tutarı 0\'a düşürün.', warn: 'Hatalı kalemi "Sil" ile silmeyin — bu muhasebe kaydını bozar. Her zaman "İndirim Ekle" yolu tercih edilmelidir.' },
      { title: 'Routing (Harcama Yönlendirme)', desc: '"Routing Ayarları" sekmesinde misafirin oda harcamasını şirket hesabına, ekstra masraflarını kendi hesabına yönlendirecek kurallar tanımlayabilirsiniz.' }
    ]
  },

  'cash-desk': {
    purpose: 'Resepsiyonistin vardiya başında kasayı açtığı, gün boyu nakit ve kart tahsilatlarının takip edildiği, vardiya sonunda kasanın kapatılıp Z-raporu alındığı kasa yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "Kasa İşlemleri" seçeneğine tıklayın.' },
      { title: 'Vardiya Açın (İşe Başlarken)', desc: '"Vardiyanı Aç" butonuna tıklayın. Başlangıç kasa bakiyesini girin (kasadaki fiziksel para miktarı). Onaylayın.' },
      { title: 'Günlük Hareketleri İzleyin', desc: 'Vardiya boyunca yapılan tüm nakit ve kart ödemeleri otomatik listeye eklenir. Listeyi her zaman takip edebilirsiniz.' },
      { title: 'Kasa Sayımı (Vardiya Kapatmadan Önce)', desc: 'Fiziksel olarak kasadaki parayı sayın: kaç adet 200 TL, 100 TL, 50 TL, 20 TL, 10 TL, bozuk paralar. "Kasa Sayımı" formuna bu miktarları girin.' },
      { title: 'Vardiya Kapatın', desc: '"Vardiyanı Kapat" butonuna basın. Sistem sayılan miktarla sistemdeki rakamı karşılaştırır. Eğer fark varsa (örn: 50 TL fazla veya eksik) kırmızı uyarı verir.' },
      { title: 'Z-Raporu Alın', desc: 'Vardiya kapatıldıktan sonra "Z-Raporu Yazdır" butonuyla o vardiyaya ait nakit, kart ve toplam tahsilat dökümünü alın.' }
    ]
  },

  'finance': {
    purpose: 'GİB (Gelir İdaresi Başkanlığı) ile entegrasyon üzerinden e-fatura ve e-arşiv oluşturma, gönderme ve takip etme işlemlerinin yapıldığı resmi finans modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "E-Fatura / Finans" seçeneğine tıklayın.' },
      { title: 'Bekleyen Faturaları Görün', desc: 'Ana listede "Bekliyor" statüsündeki faturalar listelenir. Bunlar onaylı ama henüz GİB\'e gönderilmemiş faturalardır.' },
      { title: 'Fatura Gönderin', desc: 'Bir faturayi seçin. Sağ panelde detayları kontrol edin. "GİB\'e Gönder" butonuna tıklayın. Birkaç saniye içinde "Onaylandı" statüsüne geçer.' },
      { title: 'Hata Durumu', desc: 'Fatura "Hata" statüsüne geçerse sağ panelin altında hata kodu ve açıklaması yazar. Genellikle VKN hatası veya format hatası olur. Düzelttikten sonra tekrar gönderin.' },
      { title: 'Dönem Raporu', desc: 'Sağ üst köşeden "Dönem Raporu" butonuyla seçtiğiniz ay veya çeyreğe ait toplam fatura özetini Excel olarak indirin.' }
    ]
  },

  'night-audit': {
    purpose: 'Günü kapatmak için kullanılan en kritik finans modülüdür. Tüm açık hesaplara gece konaklama bedeli işlenir, kasa mutabakatı yapılır ve sistem bir sonraki güne geçer. Geri alınamaz işlemler içerir.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "Gece Raporu" seçeneğine tıklayın. Genellikle gece 01:00 ile 03:00 arası yapılır.' },
      { title: 'Günü Başlatın (Tarama)', desc: 'Ekranın üstündeki "Geceyi Başlat / Sistemi Tara" (mavi büyük buton) düğmesine basın. Sistem oteli tarar: Açık POS masaları, gelmemiş misafirler (No-Show), tamamlanmamış check-out\'lar, eksik KBS bildirimleri vb.' },
      { title: 'Kırmızı Uyarıları Temizleyin', desc: 'Ekranda beliren her kırmızı satır bir sorundur ve temizlenmeden bir sonraki adıma geçilemez. Her uyarıya tıklayın — sistem sizi o sorunu çözecek ekrana götürür. Gidip çözün ve geri dönün.' },
      { title: 'POS Açık Masa Uyarısı', desc: 'Restoran kapanmış ama bir masa açık kaldıysa uyarı verir. Restoran POS\'tan gidip o masayı kapatın ya da yönetici onayıyla iptal edin.' },
      { title: 'No-Show İşlemi', desc: 'Beklenen misafir gelmediyse uyarıda "No-Show Olarak İşaretle" butonuyla rezervasyonu iptal edin. Gecelik ceza ücreti varsa folyo\'ya eklenir.' },
      { title: 'Oda Bedellerini Basın', desc: 'Tüm uyarılar temizlenince "Oda Konaklamalarını İşle (Room Rate Posting)" büyük butonuna basın. Sistem, o gece otelde yatan her misafirin hesabına bir gecelik oda ücretini otomatik işler.' },
      { title: 'Günü Kapatın', desc: '"Günü Kapat" kırmızı büyük butonuna tıklayın. Onay penceresi çıkar, tekrar onaylayın. Sistem kapanır: Takvim ilerler, patron mailini alır, muhasebe verileri güncellenir.', warn: '"Günü Kapat" geri alınamaz. Tüm uyarıların temizlendiğinden ve kasa mutabakatının yapıldığından emin olmadan bu butona basmayın.' }
    ]
  },

  'accounting': {
    purpose: 'Otel genelindeki muhasebe kayıtlarının, hesap planının ve dönem mizanının takip edildiği genel muhasebe ekranıdır. Genellikle muhasebe departmanı kullanır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "Genel Muhasebe" seçeneğine tıklayın.' },
      { title: 'Hesap Planı', desc: 'Sol panelde hiyerarşik hesap ağacı yer alır. Bir hesaba tıkladığınızda sağda o hesabın dönem hareketleri listelenir.' },
      { title: 'Mizan Raporu', desc: 'Üst menüden "Mizan" sekmesine geçin. Dönem seçin ve "Oluştur" ile çift taraflı kayıtları gösteren mizan tablosunu alın.' },
      { title: 'Excel Export', desc: 'Her raporun sağ üstünde Excel indirme ikonu bulunur. Muhasebecinize vermek için kullanabilirsiniz.' }
    ]
  },

  'cost-control': {
    purpose: 'Departman bazlı operasyonel giderlerin, malzeme alış maliyetlerinin ve bütçe aşımlarının analiz edildiği maliyet kontrol ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "Maliyet Kontrol" seçeneğine tıklayın.' },
      { title: 'Departman Seçin', desc: 'Sol filtreden departmanı (Mutfak, SPA, Kat Hizmetleri vb.) seçin. Sağda o departmanın aylık gider grafiği ve kalem dökümü görünür.' },
      { title: 'Bütçe Karşılaştırması', desc: '"Bütçe vs Gerçek" sekmesinde planlanan gider ile gerçekleşen gider yan yana karşılaştırılır. Kırmızı satırlar bütçeyi aşmış kalemleri gösterir.' },
      { title: 'Uyarı Eşiği Tanımlayın', desc: '"Eşik Ayarla" bölümünden belirli bir gider kategorisi için limit belirleyin. Harcama bu limiti aşarsa sistem otomatik mail ile uyarı gönderir.' }
    ]
  },

  'checkout': {
    purpose: 'Misafirin otelden hızlıca ayrılabilmesi için folyo özetinin gösterildiği, tahsilatın tamamlandığı ve odanın anında serbest bırakıldığı hızlı çıkış ekranıdır.',
    steps: [
      { title: 'Açılış Yolları', desc: 'Ya sol menüden "Finans" > "Hızlı Check-out"a girin, ya da Ön Büro ekranındaki Departures listesinden misafirin 3 nokta menüsünden "Check-out"u seçin.' },
      { title: 'Özeti İnceleyin', desc: 'Ekranda misafirin toplam konaklama süresi, oda ücreti ve varsa restoran/minibar ekstraları listelenir. Yanlış kalem varsa bu aşamada "Folio\'ya Git" ile düzeltin.' },
      { title: 'Tahsilat Alın', desc: '"Ödeme Al" butonuyla kalan bakiyeyi nakit veya kart yoluyla tahsil edin. Bakiye sıfırlanınca "Check-out Tamamla" butonu aktif olur.' },
      { title: 'Fatura Gönderin', desc: '"E-Fatura Gönder" seçeneğiyle faturayı misafirin e-posta adresiyle resmi sisteme iletin.' },
      { title: 'Tamamlama', desc: '"Check-out Tamamla" butonuna basın. Oda otomatik Kat Hizmetleri ekranında "Kirli" olarak görünür ve temizlik süreci başlar.' }
    ]
  },

  'budget': {
    purpose: 'Otel geneli veya departman bazlı yıllık/aylık bütçelerin planlandığı ve gerçekleşen harcamalarla karşılaştırıldığı finansal planlama ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Finans" > "Bütçe Planlama" seçeneğine tıklayın.' },
      { title: 'Dönem ve Departman Seçin', desc: 'Üst kısımda yıl/ay ve departman seçicileri yer alır. İlgili dönemi ve departmanı seçin.' },
      { title: 'Hedefleri Girin', desc: 'Her gider kategorisinin karşısındaki "Hedef" kutusuna planlanan rakamı yazın. Tüm kalemleri girdikten sonra "Kaydet" deyin.' },
      { title: 'Gerçekleşen vs Plan Grafiği', desc: 'Sağ bölümde planlanan ve gerçekleşen değerlerin bar grafik karşılaştırması otomatik güncellenir.' }
    ]
  },

  // ─── MALZEME & İK ───────────────────────────────────────────

  'stock': {
    purpose: 'Otel ambarındaki tüm malzemelerin (gıda, temizlik ürünleri, tekstil, ofis malzemesi) stok miktarlarının, giriş-çıkışlarının ve minimum stok eşiklerinin takip edildiği envanter ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Malzeme & İK" > "Stok & Depo" seçeneğine tıklayın.' },
      { title: 'Ürün Arayın', desc: 'Üstteki arama kutusuna ürün adını yazıp Enter\'a basın. Mevcut stok miktarı, birim fiyatı ve hangi depoda olduğu görünür.' },
      { title: 'Stok Girişi (Mal Geldi)', desc: '"+Stok Girişi" butonuna tıklayın. Ürünü seçin (arama ile), gelen miktarı girin, tedarikçiyi ve belge numarasını yazın. "Kaydet" ile stok artar.' },
      { title: 'Stok Çıkışı (Departmana Verildi)', desc: '"Stok Çıkışı" butonuyla hangi departmanın kaç birim aldığını girin. Stok miktarı otomatik azalır.' },
      { title: 'Kritik Stok Uyarısı', desc: 'Stok miktarı minimum eşiğin altına düşen ürünler listede kırmızı zemin ile gösterilir. Bu ürünler için Satın Alma modülüne sipariş oluşturun.' },
      { title: 'Sayım', desc: '"Stok Sayımı Başlat" seçeneğiyle fiziksel sayım formunu açıp sayılan miktarları girin. Sistem sistem kayıtlarıyla karşılaştırır ve farkları raporlar.' }
    ]
  },

  'purchasing': {
    purpose: 'Otelin mal ve hizmet alım sürecini (talep, onay, sipariş, teslimat) baştan sona yönettiği satın alma modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Malzeme & İK" > "Satın Alma" seçeneğine tıklayın.' },
      { title: 'Satın Alma Talebi Oluşturun', desc: '"+Yeni Talep" butonuna tıklayın. Talep eden departmanı seçin, ürünleri ve miktarları listeleyin. Açıklama alanına gerekçe yazın. "Talep Gönder" ile onaya iletin.' },
      { title: 'Onay Süreci', desc: 'Talep "Onay Bekliyor" statüsünde görünür. Yönetici sistem üzerinden onaylarsa "Onaylandı" olur, reddederse "Reddedildi" olur ve not eklenir.' },
      { title: 'Siparişe Dönüştürün', desc: 'Onaylanan talep açıldığında "Sipariş Oluştur" butonuyla tedarikçiyi seçip sipariş verin. Sipariş numarası otomatik üretilir.' },
      { title: 'Teslimat Kaydedin', desc: 'Mallar gelince "Teslim Alındı" butonuyla gelen miktarları girin. Sistem Stok & Depo modülündeki miktarı otomatik artırır.' },
      { title: 'Fatura Eşleştirme', desc: 'Tedarikçi faturası geldiğinde "Fatura Eşleştir" ile sipariş ve teslimat bilgileriyle örtüştürün. Ardından ödeme için Finans modülüne iletilir.' }
    ]
  },

  'hr': {
    purpose: 'Otel personelinin özlük bilgilerini, vardiya planlamasını, izin yönetimini ve maaş hesaplamalarını tutan İnsan Kaynakları modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Malzeme & İK" > "Personel (HR)" seçeneğine tıklayın.' },
      { title: 'Personel Arayın', desc: 'Üstteki arama kutusuna personelin adını yazıp Enter\'a basın. Karta tıklayınca işe başlama tarihi, departmanı, pozisyonu ve aktif vardiyası görünür.' },
      { title: 'Yeni Personel Ekleyin', desc: '"+Personel Ekle" butonuyla ad, soyad, TC kimlik, iletişim, departman ve pozisyon bilgilerini doldurup kaydedin.' },
      { title: 'Vardiya Planı', desc: '"Vardiya" sekmesine geçin. Haftalık takvim görünümünde her personelin çalışma günleri görünür. Bir hücreye tıklayarak vardiya saati atayabilirsiniz. Sürükle-bırakla da değiştirebilirsiniz.' },
      { title: 'İzin Talebi', desc: 'Personel kartında "İzin Ekle" butonuyla izin türünü (Yıllık/Hastalık/Mazeret) ve tarih aralığını girin. Onaya gönderin.' },
      { title: 'Maaş İşlemleri', desc: '"Bordro" sekmesinden aylık çalışma saatleri, fazla mesai ve kesintileri görerek maaş bordrosunu oluşturun.' }
    ]
  },

  // ─── SİSTEM ─────────────────────────────────────────────────

  'it-infra': {
    purpose: 'Sistem sunucularının, veritabanlarının ve ağ altyapısının durumunu izlemek, bakımını planlamak ve log kayıtlarını incelemek için kullanılan BT altyapı yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Sistem" > "IT & Veritabanı" seçeneğine tıklayın. Sadece IT/Sistem Yöneticisi yetkisiyle erişilebilir.' },
      { title: 'Sunucu Durumunu İnceleyin', desc: 'Ekranda her sunucunun adı, IP adresi ve durum göstergesi (yeşil/sarı/kırmızı) yer alır. Kırmızı gören sunucu acil müdahale gerektirir.' },
      { title: 'Veritabanı Sağlığı', desc: '"Veritabanı" sekmesinde disk doluluk oranları, aktif bağlantı sayısı ve sorgu performansı grafikleri yer alır.' },
      { title: 'Sistem Logları', desc: '"Log Kayıtları" sekmesinden hangi kullanıcının ne zaman ne işlem yaptığını detaylı şekilde okuyabilirsiniz. Şüpheli işlemleri burada tespit edin.' }
    ]
  },

  'integrations': {
    purpose: 'Sistemin dışarıdaki uygulamalarla (ödeme POS\'u, kilit sistemi, kamera, müşteri uygulaması, doküman yönetimi) bağlantı durumunu izleme ve yönetme ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Sistem" > "Entegrasyonlar" seçeneğine tıklayın.' },
      { title: 'Bağlantı Durumlarını Görün', desc: 'Her entegrasyonun adı ve yanında yeşil (aktif) veya kırmızı (hata) durum noktası görünür.' },
      { title: 'Hatalı Bağlantıyı Düzeltin', desc: 'Kırmızı bağlantıya tıklayın. Hata mesajını okuyun. "Yeniden Bağlan" butonuyla bağlantıyı test edin. Sorun devam ederse sistem yöneticisini çağırın.' },
      { title: 'Log Takibi', desc: 'Her entegrasyonun sağındaki "Loglar" butonuyla son 100 iletişim kaydını görebilirsiniz.' }
    ]
  },

  'kbs': {
    purpose: 'Türk ve yabancı misafirlerin kimlik bilgilerinin Emniyet Genel Müdürlüğü sistemi AKBS\'ye (Yabancılar için KBS\'ye) bildirildiği yasal zorunluluk modülüdür. Eksik bildirim cezaya yol açar.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Sistem" > "Polis Listesi (KBS)" seçeneğine tıklayın.' },
      { title: 'Bekleyen Kayıtları Görün', desc: 'Ekranın ana listesinde henüz devlet sistemine iletilmemiş misafir kayıtları "Bekliyor" statüsünde sıralanır.' },
      { title: 'Eksik Bilgileri Tamamlayın', desc: 'Kırmızı uyarılı kayıtlara tıklayın. Eksik alanlar (TC No, doğum tarihi, uyruk vb.) vurgulanmış olur. Misafirin belgesinden kontrol edip girin.' },
      { title: 'Toplu Gönderme', desc: '"Tümünü Gönder" butonuyla listedeki tüm tamamlanmış kayıtları devlet sistemiyle senkronize edin.' },
      { title: 'Durum Takibi', desc: 'Gönderilen kayıtlar "İletildi / Onaylandı" statüsüne geçer. "Hata" dönen varsa hata kodunu okuyup bildirim formunu düzeltin ve tekrar gönderin.' },
      { title: 'Yasal Önem', desc: '', warn: 'Check-in\'den sonra 24 saat içinde KBS bildirimi yapılmalıdır. Gün içinde biriken "Bekliyor" kayıtları her vardiyada kontrol edin.' }
    ]
  },

  'surveys': {
    purpose: 'Misafir memnuniyetini ölçmek için anket oluşturma, check-out sonrası otomatik gönderme ve cevapları raporlayan anket yönetim sistemidir.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Sistem" > "Anket Yönetimi" seçeneğine tıklayın.' },
      { title: 'Mevcut Anket Sonuçları', desc: 'Ana ekranda gelen anket cevaplarının özeti (ortalama yıldız, departman bazlı puanlar) gösterilir.' },
      { title: 'Yeni Anket Oluşturun', desc: '"+Anket Oluştur" butonuyla soru tipini (5 yıldız, çoktan seçmeli, açık uçlu) ve soru metnini belirleyerek kendi anketinizi hazırlayın.' },
      { title: 'Otomatik Gönderimi Aktifleştirin', desc: '"Otomasyon" sekmesinde "Check-out Sonrası Otomatik Gönder" seçeneğini aktif yapın. Sistem check-out olan her misafirin e-postasına anket linkini otomatik iletir.' },
      { title: 'Cevapları İnceleyin', desc: 'Anket adına tıklayarak ayrıntılı cevapları, departman puanlarını ve açık yorum metinlerini okuyun.' }
    ]
  },

  'system-admin': {
    purpose: 'Kullanıcı hesapları, rol ve yetki yönetimi, sistem parametreleri ile genel yapılandırmanın yapıldığı en üst düzey sistem yönetim ekranıdır.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Sistem" > "Sistem Yönetimi" seçeneğine tıklayın. Sadece Sistem Yöneticisi (Admin) rolü ile erişilebilir.' },
      { title: 'Yeni Kullanıcı Ekleyin', desc: '"Kullanıcılar" sekmesinden "+ Yeni Kullanıcı" butonuna tıklayın. Ad, soyadı, e-posta, telefon ve rolü (Resepsiyonist/Muhasebi/Yönetici vb.) girin. "Kaydet"e basın. Kullanıcıya otobatik şifre maili gider.' },
      { title: 'Kullanıcı Pasif Yapın', desc: 'İşten ayrılan personelin hesabını silmek yerine "Pasif Yap" butonuyla deaktive edin. Böylece geçmiş loglar korunur.' },
      { title: 'Rol Yetkileri', desc: '"Roller" sekmesinde her rolün hangi modüllere erişeceğini, hangi işlemleri yapabileceğini onay kutuları ile belirleyin. Değiştikten sonra "Kaydet"e basın.' },
      { title: 'Sistem Parametreleri', desc: '"Ayarlar" sekmesinde otel adı, döviz birimi, check-out saati, gece audit saati gibi genel sistem parametrelerini güncelleyebilirsiniz.' }
    ]
  },

  'kvkk': {
    purpose: 'KVKK (Kişisel Verilerin Korunması Kanunu) kapsamındaki kişisel veri silme talepleri, gizlilik onayları ve veri maskeleme işlemlerinin yapıldığı güvenlik-uyum modülüdür.',
    steps: [
      { title: 'Menüyü Açın', desc: 'Sol menüden "Sistem" > "KVKK & Güvenlik" seçeneğine tıklayın.' },
      { title: 'Veri Silme Talebi İşleyin', desc: 'Bir misafir "Verilerimi silin" diye talep geldiğinde: Üstteki arama kutusuna adını yazın. Bulun ve "Veri Maskeleme" butonuna tıklayın. Onay penceresi çıkar, onaylayın. İsim ve iletişim bilgileri maskelenerek ******* haline getirilir, konaklama geçmişi muhasebeye yasal süre için saklanır.' },
      { title: 'Onay Listesi', desc: '"Onaylar" sekmesinde misafirlerin KVKK onay formlarını kabul edip etmediği listelenir. Onay vermemiş ama verileri işlenen birini gördüğünüzde hukuk departmanını bilgilendirin.' },
      { title: 'Veri İhlali Bildirimi', desc: 'Bir veri ihlali şüphesi oluştuysa "İhlal Bildir" butonuyla olay detaylarını girin. Sistem yasal süre içinde ilgili kurumlara bildirim şablonu oluşturur.' }
    ]
  }
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

export const guideData = modulesConfig.map(module => {
  const data = moduleKnowledge[module.id];
  const extraKeys = extraKeywordMap[module.id] || [];

  return {
    id: module.id,
    title: module.name,
    icon: module.icon,
    category: module.category,
    keywords: [...new Set([...module.keywords, ...extraKeys, module.name.toLowerCase()])],
    purpose: data?.purpose || `${module.name} ekranı, ${module.category} departmanına ait işlemleri yönetmek için kullanılır.`,
    steps: data?.steps || [
      { title: 'Menüyü Açın', desc: `Sol menüden "${module.category}" başlığına tıklayın, ardından "${module.name}" seçeneğine girin.` },
      { title: 'Arama Yapın', desc: 'Sayfanın üstündeki arama çubuğuna aradığınız ismi veya kodu yazıp Enter\'a basın.' },
      { title: 'İşlem Yapın', desc: 'Listede bulduğunuz satırın en sağındaki 3 nokta (⋮) menüsüne tıklayarak Düzenle, İptal Et veya Detay Gör seçeneklerini kullanın.' },
      { title: 'Kaydedin', desc: 'İşlemler tamamlandıktan sonra ekrana çıkan "Kaydet" veya "Onayla" butonuna basın.' }
    ]
  };
});
