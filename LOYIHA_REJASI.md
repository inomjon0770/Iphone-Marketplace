# 📱 iLux Apple Store & Atelier — To'liq Loyiha Rejasi (Master Plan)

Ushbu hujjat eng yuqori darajadagi (Full-position), tilla qoplamali eksklyuziv iPhone'lar, rasmiy Apple modellari, premium aksessuarlar hamda sotuvchilar va ma'muriyat uchun to'liq boshqaruv (Admin Panel) tizimiga ega veb-saytning to'liq arxitekturasi va rejasidir.

---

## 🎯 1. Loyihaning Maqsadi va Vizual Konsepsiyasi

* **Brend nomi:** **iLux Apple Atelier & Store** (O'zbekistondagi eng nufuzli Apple va Tilla qoplamali maxsus mahsulotlar ekotizimi)
* **Dizayn uslubi:** Apple Cupertino Monoxrom & Titanium dizayn falsafasi:
  * **Faqat Oq, Qora va Titan Kulrang (Yellow/Gold butunlay chiqarib tashlangan)**
  * Chuqur qora (Space Black / OLED #000000, #1d1d1f) va Titan kulrang tuslari (#86868b, #d2d2d7, #f5f5f7)
  * Toza sof oq (#ffffff) fon va panellar
  * Sayqallangan titan gradientlari (Titanium Matrix, Space Obsidian)
  * Shishasimon (Frosted Glass / Glassmorphism) silliq panellar
  * Apple Dynamic Island uslubidagi interaktiv xabarnomalar
  * **Zero-Lag (Qotmasdan ishlash):** 60/120fps CSS apparat tezlanishi, silliq mikromatsiyalar
  * **Moslashuvchanlik (Adaptive & Responsive):** Telefonlarda (iOS ilovadek qolipiga tushgan) va Kompyuterlarda (ekran chekkalarida nafis Apple bo'shliqlari bilan to'liq qulay).

---

## 💎 2. Mahsulotlar Katalogi va Turlari

1. **👑 Tilla Qoplamali & Eksklyuziv iPhone'lar (Custom Gold & Luxury):**
   * *iPhone 16 Pro Max 24K Gold Dragon & Falcon Edition* (Sof 24K tilla qoplama, gravirovkali orqa korpus)
   * *iPhone 16 Pro 18K Rose Gold Atelier* (Pushti tilla, titan ramka bilan)
   * *iPhone 15 Pro Max Damascus Steel & 24K Gold Inlay* (Damashq po'lati va sof tilla naqshlari)
   * *iPhone 16 Pro Emerald & Diamond Imperial* (Qimmatbaho toshlar va tilla)
   * Tilla sertifikati, maxsus yog'och-charm quti va umrbod kafolat haqida ma'lumotlar.

2. **📱 Rasmiy Apple iPhone Seriyasi:**
   * iPhone 16 Pro Max, iPhone 16 Pro (Desert Titanium, Natural Titanium, White, Black)
   * iPhone 16, iPhone 16 Plus
   * iPhone 15 Pro Max, iPhone 15, iPhone 14
   * Xotira variantlari: 128GB, 256GB, 512GB, 1TB

3. **🎧 Original Apple va Luxury Aksessuarlar:**
   * *AirPods Max (Space Black, Silver, Tilla quloqlik hoshiyali maxsus versiya)*
   * *AirPods Pro 2 (USB-C)*
   * *Apple Watch Ultra 2 (Titanium & 24K Gold Link Bracelet)*
   * *MagSafe 24K Gold & Haqiqiy Charm G'iloflar (Cases)*
   * *Apple 35W/70W Tezkor quvvatlagichlar, MagSafe zaryadkalari, kabellar*

---

## 🛍️ 3. Mijozlar Uchun Do'kon Qismi (Client Front-End)

1. **Dynamic Island & Apple Navigatsiya:**
   * Logo, Kategoriyalar, Jonli qidiruv (Live Search), Sevimlilar (Wishlist), Savatcha (Cart), Valyuta almashtirgich (UZS / USD) va Admin panelga tezkor kirish.
2. **Hero Bo'limi (Flagship Showcase):**
   * iPhone 16 Pro Max 24K Gold Edition interaktiv taqdimoti, video/animatsiya va "Xarid qilish" tugmasi.
3. **Katalog va Filtrlash:**
   * Kategoriya bo'yicha: Barchasi, Tilla iPhone'lar, Rasmiy iPhone, Aksessuarlar, Apple Watch.
   * Xotira va rang bo'yicha filtrlash.
   * Narx bo'yicha saralash.
4. **Mahsulot Kartochkasi va Detal Modali (Quick View):**
   * Bir nechta rakursdagi yuqori sifatli fotosuratlar.
   * Xotira tanlagich (256GB, 512GB, 1TB) — narx avtomatik yangilanadi.
   * Rang tanlagich (Titan, Tilla, Qora, Oq).
   * Texnik xarakteristikasi (Ekran, Protsessor, Kamera, Batareya).
   * "Bir bosishda xarid qilish" va "Savatchaga qo'shish".
5. **Savatcha va Buyurtma Berish (Checkout):**
   * Savatchadan tovarlar sonini boshqarish.
   * Tezkor buyurtma formasi: Ism, Telefon raqam, Manzil, Yetkazib berish turi.
   * To'lov turlari: Naqd, Karta (Uzcard/Humo/Visa), Bo'lib to'lash (0-0-12 muddatli to'lov).
   * Promo-kod kiritish tizimi.

---

## 📊 4. Sotuvchilar va Rahbariyat Uchun Admin Panel (Boshqaruv Tizimi)

Sayt ichiga to'liq integratsiya qilingan kuchli boshqaruv paneli:

1. **Asosiy Statistika Doskasi (Analytics Dashboard):**
   * **Umumiy tushum (Revenue)** va **Sof foyda (Net Profit)**
   * **Bugungi savdo ko'rsatkichi**
   * **Bu oyda eng ko'p sotilgan tovarlar (Top Selling Products):** Qaysi tovar eng zo'r ketganligi bo'yicha reyting, sotilgan soni va diagrammasi.
   * **Ombor qoldig'i hisobi (Inventory Stock Counter):** Do'konda qancha tovar bor, qancha qiymatdagi tovar turibdi.
   * **Tugab qolayotgan tovarlar signali (Low Stock Alert):** Soni 3 tadan kam qolgan tovarlar bo'yicha sotuvchini darhol ogohlantirish.
2. **Tovarlar Boshqaruvi (Mahsulotlar CRUD):**
   * Yangi tovar qo'shish (Nomi, Kategoriya, Tan narxi, Sotish narxi, Soni, Rasmi, Tilla probasi, Xotirasi).
   * Tovar ma'lumotlarini o'zgartirish va ombordagi sonini bitta bosishda to'ldirish (+ / -).
   * Tovarlarni o'chirish yoki faolsizlantirish.
3. **Buyurtmalar Boshqaruvi (Order Management):**
   * Kelib tushgan yangi buyurtmalar ro'yxati (Real-vaqt rejimida).
   * Statuslar: *Yangi, Tasdiqlandi, Yetkazilmoqda, Yakunlandi, Bekor qilindi*.
   * Har bir buyurtma uchun chek (kvitansiya) generatsiya qilish va chop etish (Print Receipt).
4. **Tezkor Kassa / POS Rejimi (Point of Sale):**
   * Do'konga jismonan kirib kelgan mijozga 5 soniyada tovar sotish.
   * Ombordan avtomatik sonini kamaytirish va kassa hisobotiga qo'shish.
5. **Eksport va Ma'lumotlarni Saqlash:**
   * Savdo va qoldiqlar hisobotini Excel/CSV formatida yuklab olish.
   * Barcha ma'lumotlar xavfsiz brauzer LocalStorage/IndexedDB xotirasida saqlanadi, qayta yuklanganda ham yo'qolmaydi.

---

## 📱 5. Texnik Stack va Ishlash Tezligi (Performance)

* **Texnologiyalar:** Modern React + Vite, toza va modulli Vanilla CSS (Apple Design System).
* **Shriftlar:** SF Pro Display / Inter tizimi, Apple piktogrammalari.
* **Qotmaslik (Zero Lag):** Hech qanday og'ir kutubxonalarsiz, sof GPU tezlanishli silliq render.
* **Mobil moslashuvchanlik:** iOS Safe Area qo'llab-quvvatlashi, pastki qulay menyu (Mobile Dock).

---

## 🎨 6. Pinterest Yangiliklari va Interaktivlik (Oxirgi Qo'shimchalar)

1. **Pinterest Havola 1 (`pin.it/7mhGWDG1s`):**
   * **360° Atelier Studio:** Foydalanuvchi 4 xil burchakdan mahsulotni to'liq ko'ra oladi (Space Black Titanium, Natural Titanium, White Titanium, Graphite Matrix).
   * Jonli metall qoplamasini almashtirish, xotira narx kalkulyatori va bepul lazer gravirovka kiritish.

2. **Pinterest Havola 2 (`pin.it/2ZdOCqnOX`):**
   * **Bang & Olufsen × iLux BeoSound 2 Atelier Edition Titanium:**
   * Aylanuvchi sensorli disk (Rotary sensory dial) bilan tovush balandligini real vaqtda sozlash.
   * Jonli 28 kanalli to'lqin ekvalayzeri (Soundwave visualizer) animatsiyasi va 432Hz garmonik audio.

3. **Pinterest Havola 3 (`pin.it/5PQGcpwCG`):**
   * **Magnetic 3D Card Tilt & Lighting Glare:**
   * Mahsulot kartochkalariga kursor yaqinlashganda 3D fizika asosida burilish va kursor koordinatalari bo'yicha monoxrom kumush yorug'lik nuri (silver specular glare) effekti.

4. **Pinterest Havola 4 (`pin.it/6LXz2evV6`):**
   * **Apple Intelligence & Siri Neural Text-to-Speech Studio:**
   * Foydalanuvchi ixtiyoriy matn yozishi yoki Apple Intelligence, Titanium Atelier ssenariy namunalarini tanlashi mumkin.
   * Jonli ovoz sintezi (Brauzer Web Speech API orqali real vaqtda nutq hosil qilish).
   * 42-kanalli dinamik to'lqin spektr ekvalayzeri (Waveform Visualizer) va interaktiv vaqt shkalasi (Scrubbing).
   * Ovoz personasini almashtirish (*Siri Space Titanium*, *Studio Master Obsidian*, *Apple Neural Pure*).
   * Tezlik sozlagichlari (`0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`), ovoz balandligi va sinxron matn (Karaoke highlight) funksiyasi.
   * WAV/Skript eksporti va nusxalash imkoniyati.
   * **Rang qoidasi:** 100% Oq, Qora va Titan Kulrang tuslarda (Sariq/Oltin ranglar umuman ishlatilmagan).

5. **Foydalanuvchi Yuklagan Dizayn Konsepsiyasi (Apple Cinema Showcase Mockup):**
   * **Tablet / Cinema Qolipi:** Yumshoq studiya foni ustida suzib turuvchi, qirralari yumaloqlangan (`rounded-[48px]`), qora hoshiyali (`border-[#18181b]`) va chuqur soya (`shadow-[0_30px_90px_-15px_rgba(0,0,0,0.45)]`) berilgan hashamatli Apple ekran qolipi.
   * **Ichki menyu:** Apple logotipi, navigatsiya tugmalari (`iPhone 16 Pro`, `iPhone 16`, `Apple Watch`, `iPad`, `AirPods`, `Atelier Studio`), qidiruv va savatcha.
   * **Chap tomon:** Vertikal ijtimoiy tarmoq indikatorlari (`FB`, `TW`, `IG`).
   * **Sarlavha va matn:** Metall teksturali `iPhone 16 Pro` sarlavhasi, `"Pro cameras. Pro display. Pro Performance."` shiori va oqlangan `"Learn more"` tugmasi.
   * **Orqa fon suv belgisi:** Katta shaffof `01`, `02`, `03`, `04` raqamlari.
   * **O'ng tomon:** Yuqori aniqlikdagi makro uch tomonlama titan kamera moduli fotosurati.
   * **Pastki chap slayd slayderi:** Interaktiv `01 —————— 04` progressiv chizig'i.
   * **Pastki o'ng suzuvchi karta:** Shishasimon Frosted Glass (`backdrop-blur-xl`) `"And then there was Pro"` video prevyu kartasi va audio effekt.

6. **Pinterest Havola 5 (`pin.it/4DMIxjTr4`):**
   * **AirPods Max Atelier Sound & Design Studio:**
   * **Ikki tomonlama parallel ko'rinish:** AirPods Max old va 45° quloqlik burchaklari yonma-yon fotorealistik 3D renderda namoyish etiladi.
   * **Chuqurlik foni (Depth-of-field):** Orqa chap va o'ng tomonlarda boshqa rangdagi AirPods modellari xira (blur) perspektivada suzib turadi.
   * **AppleCare+ for Headphones:** 2 yillik rasmiy himoya va kafolatni interaktiv qo'shish bloki.
   * **Qutida nimalar bor:** Rasmdagi kabi "What's in the Box" (USB-C, Smart Case, to'qilgan kabel, sertifikat).
   * **SELECT COLOR rang almashtirgich:** Space Black Obsidian, Silver Platinum, Natural Titanium, Graphite Matrix (100% monoxrom, sariq/oltin ranglarsiz).
   * Doiraviy `<` va `>` tugmalari orqali ranglarni navbat bilan almashtirish va audio chastota sinovi.

7. **Flowty.co & Pinterest Havola 6 (`pin.it/557LhCAuq`):**
   * **Flowty 3D Scroll Perspective Cinema:**
   * **Skrollga bog'langan 3D harakat:** Sahifani pastga aylantirganda markaziy Space Black iPhone 16 Pro apparat tezlanishi (GPU 60/120fps) bilan 3D fazoda aylanadi, rakursini o'zgartiradi va dinamik yorug'lik nurlari bilan jilolanadi.
   * **Kinetik tipografiya boblari:**
     * *01. Silence Digital Noise* (Diqqat va minimalizm)
     * *02. Grade 5 Aerospace Titanium* (Aviatsiya titani)
     * *03. 48MP Fusion Studio Optics* (Sapfir optika)
     * *04. Unleash Pure A18 Pro Power* (3nm Pro kremniy quvvati)
   * **Suzuvchi hamroh vidjetlar:** Flowty dizaynidagi kabi yuqori o'ng burchakdagi Apple Watch Ultra vidjeti (puls va vaqt hisobi bilan).
   * **Interaktiv 3D boshqaruv:** Foydalanuvchi xohlasa sichqoncha bilan skroll qiladi, xohlasa "3D Demo Aylanish" tugmasini bosadi yoki pastdagi 0-100% shkalani surib 3D modelni erkin boshqaradi.
   * **Rang qoidasi:** 100% Sof Oq, Qora va Titan Kulrang.

8. **Pinterest Havola 7 (`pin.it/25CSO1lEQ`):**
   * **Birinchi Tashrif VIP Reklama & Podium Intro (`IntroAdModal.jsx`):**
   * **Dizayn:** Titan tog'li tumanli manzara fonida, aylanma yoritilgan titan shohsupa (podium) ustida tik turgan iPhone 16 Pro.
   * **Xush kelibsiz taklifi:** Bepul shaxsiy lazer gravirovka, 2 yillik AppleCare+ VIP kafolati va Toshkent bo'ylab 2 soatlik ekspress yetkazib berish.
   * **Eksklyuziv kupon:** `TITANIUM2025` bir bosishda nusxalash va tasdiqlash bildirishnomasi.
   * **Audio va effekt:** Ochilganda garmonik 432Hz kristal audio sadosi va "Do'konga Kirish" bosilganda kumush konfetti portlashi.
   * **Foydalanuvchi qulayligi:** "Bugun qayta ko'rsatilmasin" parametri (`localStorage`), shuningdek menyudagi "VIP Reklama" tugmasi orqali istalgan payt qayta ko'rish imkoniyati.
   * **Rang qoidasi:** 100% monoxrom oq, qora va titan kulrang (sariq/oltin ranglarsiz).

---

## 🚀 7. Amalga Oshirish Bosqichlari (Yakunlangan)

1. [x] **1-bosqich:** Loyiha rejasini ishlab chiqish va tasdiqlash (`LOYIHA_REJASI.md`).
2. [x] **2-bosqich:** Vite + React loyihasini yaratish, toza arxitektura va monoxrom Apple CSS tizimini tayyorlash.
3. [x] **3-bosqich:** Ma'lumotlar bazasi (Mock DB + LocalStorage): Titan iPhone'lar, rasmiy modellar, aksessuarlar, sotuv statistikasi.
4. [x] **4-bosqich:** Mijozlar qismi (Apple Store UI): Dynamic Island, Bannerlar, Filtrlash, 3D Mahsulot kartalari, Detal modali, Savatcha, Checkout, 360° Studio, B&O Akustika.
5. [x] **5-bosqich:** Siri Neural Text-to-Speech Studio (`pin.it/6LXz2evV6`) integratsiyasi.
6. [x] **6-bosqich:** Foydalanuvchi yuborgan Apple Cinema Display Mockup Hero (`Hero.jsx`) integratsiyasi.
7. [x] **7-bosqich:** AirPods Max Dual-Angle Atelier Studio (`pin.it/4DMIxjTr4`) integratsiyasi.
8. [x] **8-bosqich:** Flowty.co & Pinterest (`pin.it/557LhCAuq`) 3D Scroll Animation (`FlowtyScrollExperience.jsx`) integratsiyasi.
9. [x] **9-bosqich:** Birinchi tashrif VIP Reklama & Podium Intro (`pin.it/25CSO1lEQ`, `IntroAdModal.jsx`) integratsiyasi.
10. [x] **10-bosqich:** Admin Panel: Statistika doskasi, oylik top tovarlar grafigi, ombor qoldig'i hisobi, tovar qo'shish/tahrirlash, buyurtmalar va POS kassa.
11. [x] **11-bosqich:** Silliq animatsiyalar, monoxrom ranglar qoidasi (faqat oq, qora, kulrang), zero-lag tekshiruvi.
