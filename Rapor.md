# İLERİ WEB PROGRAMLAMA — VİZE PROJESİ RAPORU

**GitHub:** https://github.com/akkefelioglu/wep-programlama-proje

**Ad Soyad:** Ali Kemal Kefelioğlu  
**Öğrenci No:** 25221602009  
**Tarih:** 07 Nisan 2026

---

## 1. Proje Tanıtımı

Bu projede **BritMart** adında İngiltere merkezli bir online perakende e-ticaret sitesinin frontend uygulaması geliştirilmiştir. Uygulama, React ve TypeScript kullanılarak Vite bundlayer üzerinde oluşturulmuş olup, Material UI (MUI) bileşen kütüphanesi ile tasarlanmıştır. Sitede 6 kategoride toplam 16 ürün bulunmakta olup her ürün için detay sayfası, teknik özellikler ve müşteri değerlendirmeleri sunulmaktadır.

**Kullanılan Teknolojiler:**

| Teknoloji | Sürüm | Amaç |
|-----------|-------|------|
| React | 19.x | UI framework |
| TypeScript | 5.x | Tip güvenliği |
| Material UI | 6.x | Bileşen kütüphanesi |
| React Router | 6.x | Sayfa yönlendirme |
| Vite | 8.x | Build ve bundling |

---

## 2. Proje Mimarisi ve Klasör Yapısı

Proje, teslim formatına uygun şekilde `SourceCode/frontend` dizini altında yapılandırılmıştır. Uygulama `npm install` komutu ile kurulabilir ve `npm run dev` ile çalıştırılabilir.

```
SourceCode/frontend/
├── public/images/          # Ürün görselleri
├── src/
│   ├── components/         # Yeniden kullanılabilir bileşenler
│   │   ├── layout/         # Navbar, Footer, Layout
│   │   ├── home/           # HeroBanner, CategorySlider, ProductCard, FeaturedGrid
│   │   └── product/        # ProductGallery, ProductInfo, ProductSpecs, ProductReviews
│   ├── pages/              # Sayfa bileşenleri (HomePage, ProductDetailPage, NotFoundPage)
│   ├── data/               # Statik ürün verisi (products.ts)
│   ├── types/              # TypeScript arayüz tanımları
│   ├── theme.ts            # MUI tema yapılandırması
│   └── index.css           # Global stiller ve animasyonlar
└── index.html              # Giriş noktası
```

---

## 3. Ana Sayfa Tasarımı ve Kodlaması

Ana sayfa (`HomePage.tsx`) aşağıdaki bileşenlerden oluşmaktadır:

### 3.1 Hero Banner
`HeroBanner.tsx` bileşeni, tam genişlik gradient arka plan, animasyonlu ışık efektleri (orb) ve CSS `@keyframes` ile yapılmış `float` animasyonları içerir. Mouse hareketi ile parallax efekti `useEffect` hook'u ve CSS custom property (`--mouse-x`, `--mouse-y`) kullanılarak uygulanmıştır. İstatistik çubuğu (50K+ müşteri, 2000+ ürün, 4.9 puan) ve alt kısımda kargo/garanti/iade bilgi şeridi bulunmaktadır.

### 3.2 Kategori Slider
`CategorySlider.tsx`, yatay kaydırılabilir kategori kartlarını sunar. `useRef` ile scroll kontrolü sağlanır. Aktif kategori `useState` ile yönetilir ve seçilen kategoriye göre ürün listesi filtrelenir.

### 3.3 Ürün Kartları (ProductCard)
Her kart; ürün görseli, kategori etiketi, ad, kısa açıklama, MUI `Rating` bileşeni ile yıldız puanı, fiyat ve varsa indirimli fiyat bilgisi içerir. Hover durumunda CSS `transform: scale` ve `box-shadow` ile genişleme efekti, sağ tarafta favori/sepet/hızlı bakış ikon butonları görünür hale gelir.

### 3.4 Kampanya Bannerı ve Newsletter
Kampanya bölümü gradient arka plan üzerine dekoratif blur efektleri ile tasarlanmıştır. Newsletter bölümünde `<input>` ve MUI `Button` ile e-posta abonelik formu yer alır.

---

## 4. Ürün Detay Sayfası Tasarımı ve Kodlaması

Ürün detay sayfası (`ProductDetailPage.tsx`) React Router'ın `useParams` hook'u ile URL'den `slug` parametresini alır ve `getProductBySlug()` fonksiyonu ile ilgili ürünü bulur.

### 4.1 Breadcrumb Navigasyon
MUI `Breadcrumbs` bileşeni kullanılarak "Ana Sayfa > Kategori > Ürün Adı" şeklinde hiyerarşik gezinme sağlanır.

### 4.2 Ürün Galerisi (ProductGallery)
`useState` hook'u ile seçili görsel indeksi yönetilir. Ana görsel büyük boyutta gösterilir, alt kısımdaki küçük resimler (thumbnail) tıklanarak ana görsel değiştirilebilir. Seçili thumbnail'a `borderColor: '#6C63FF'` uygulanarak görsel geri bildirim verilir.

### 4.3 Ürün Bilgileri (ProductInfo)
- **Fiyat:** Güncel fiyat ve eski fiyat (üstü çizili) yan yana gösterilir. İndirim oranı `Chip` bileşeni ile vurgulanır
- **Renk Seçimi:** `useState` ile seçili renk indeksi yönetilir, MUI `Chip` bileşenleri kullanılır
- **Adet Seçici:** Artırma/azaltma butonları ile miktar kontrolü
- **Sepete Ekle:** Gradient arka planlı buton, `box-shadow` ile glow efekti

### 4.4 Teknik Özellikler (ProductSpecs)
`Object.entries()` ile ürünün `specs` alanı iterate edilir ve MUI `Table` bileşeninde zebra-striped satırlar halinde gösterilir.

### 4.5 Müşteri Değerlendirmeleri (ProductReviews)
Puan dağılımı MUI `LinearProgress` bar'ları ile görselleştirilir. Her yorum kartında kullanıcı avatarı (`Avatar` bileşeni, gradient arka plan), tarih, yıldız puanı ve "Faydalı" butonu bulunur.

### 4.6 Benzer Ürünler
`getRelatedProducts()` fonksiyonu aynı kategorideki diğer ürünleri döndürür ve `ProductCard` bileşenleri ile listelenir.

---

## 5. UX/UI Tasarım Kararları

### 5.1 Tema
Premium koyu (dark) tema tercih edilmiştir. MUI `createTheme` ile özel renk paleti tanımlanmıştır:
- Arka plan: `#06060B` (ultra koyu lacivert-siyah)
- Birincil (primary): `#6C63FF` (elektrik moru)
- İkincil (secondary): `#00D9FF` (neon cyan)
- Butonlar ve başlıklar için `linear-gradient(135deg, #6C63FF, #00D9FF)` gradyanı

### 5.2 Glassmorphism
Navbar ve kartlarda `backdrop-filter: blur(20px)` ve yarı-saydam arka plan (`rgba`) kullanılarak modern cam efekti elde edilmiştir.

### 5.3 Animasyonlar
`@keyframes` ile tanımlanan animasyonlar: `fadeInUp` (sayfa geçişi), `float` (hero orb), `pulse` (canlı gösterge), `shimmer` (loading efekti). CSS `transition` ile hover efektleri (scale, shadow, color).

### 5.4 Responsive Tasarım
MUI Grid `breakpoints` sistemi (`xs`, `sm`, `md`, `lg`) ile duyarlı düzen sağlanmıştır. Mobilde hamburger menü (`Drawer` bileşeni), masaüstünde yatay navigasyon gösterilir.

---

## 6. Sonuç

BritMart projesi, React ekosisteminin temel bileşenlerini (component, hook, router, theme) kullanarak modern bir e-ticaret ön yüzünün nasıl oluşturulacağını göstermektedir. TypeScript ile tip güvenliği, Material UI ile tutarlı tasarım dili ve CSS animasyonları ile zengin kullanıcı deneyimi sağlanmıştır.
