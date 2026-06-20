# İLERİ WEB PROGRAMLAMA — FİNAL PROJESİ RAPORU

**GitHub:** https://github.com/akkefelioglu/wep-programlama-proje

**Ad Soyad:** Ali Kemal Kefelioğlu  
**Öğrenci No:** 25221602009  
**Tarih:** 18 Haziran 2026

---

## 1. Proje Tanıtımı

Bu projede **BritMart** adında İngiltere merkezli bir online perakende e-ticaret sitesinin tam kapsamlı (Full-Stack) uygulaması geliştirilmiştir. Vize projesinde oluşturulan React tabanlı frontend uygulaması, final projesi kapsamında Spring Boot backend mimarisi, PostgreSQL veritabanı, Firebase kimlik doğrulama (Authentication) ve sepet/ödeme işlemleri ile tam işlevsel bir e-ticaret platformuna dönüştürülmüştür. Ayrıca ürün ve mesaj yönetimi için yetkilendirmeli bir Admin Paneli eklenmiştir.

**Kullanılan Teknolojiler:**

| Teknoloji | Sürüm | Amaç |
|-----------|-------|------|
| React & TypeScript | 19.x / 5.x | Frontend UI & Tip güvenliği |
| Material UI | 6.x | Bileşen kütüphanesi ve modern tasarım |
| Spring Boot | 3.2.x | Backend API ve İş Mantığı (RESTful) |
| PostgreSQL | 16.x | İlişkisel Veritabanı Yönetimi |
| Firebase Auth | 9.x | Kullanıcı Kimlik Doğrulama (Tam Entegre) |
| Stripe Java SDK | 25.x | Ödeme Altyapısı (PaymentIntent Entegrasyonu) |

---

## 2. Proje Mimarisi ve Klasör Yapısı

Proje, frontend ve backend olarak iki ana modüle ayrılmış monorepo yapısında tasarlanmıştır. Backend tarafında Controller-Service-Repository katmanlı mimarisi (N-Tier Architecture) kullanılmıştır.

```text
SourceCode/
├── frontend/                 # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/       # UI Bileşenleri (admin, home, layout, product)
│   │   ├── config/           # Firebase ve diğer dış servis konfigürasyonları
│   │   ├── contexts/         # State Yönetimi (AuthContext, CartContext)
│   │   ├── pages/            # Sayfalar (Login, Cart, Checkout, AdminDashboard vs.)
│   │   └── types/            # TypeScript arayüzleri
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/com/britmart/ecommerce/
│   │   ├── config/           # Security, CORS, Firebase, Stripe ayarları
│   │   ├── controller/       # REST API Uç Noktaları
│   │   ├── dto/              # Veri Transfer Objeleri
│   │   ├── entity/           # Veritabanı Modelleri (Product, Order, Review, Question)
│   │   ├── repository/       # Spring Data JPA Interface'leri
│   │   └── service/          # İş Mantığı (Business Logic)
│   └── src/main/resources/   # application.properties ve data.sql
└── database/                 # PostgreSQL şema SQL dosyaları
```

---

## 3. Frontend Geliştirmeleri ve Yeni Sayfalar

Vize dönemindeki statik tasarıma ek olarak, uygulamanın state yönetimi Context API ile merkezi hale getirilmiş ve yeni sayfalar eklenmiştir:

### 3.1 Kimlik Doğrulama (Login / Register)
`AuthContext.tsx` üzerinden Firebase Authentication entegrasyonu yapılmıştır. Kullanıcılar E-posta/Şifre veya Google hesabı ile giriş yapabilir. `AdminRoute` ve `ProtectedRoute` bileşenleri ile sayfa bazlı yetkilendirme (Authorization) sağlanmıştır.

### 3.2 Sepet ve Ödeme Sistemi (Cart & Checkout)
- **CartContext:** Ürünlerin sepete eklenmesi, miktar güncellenmesi ve sepetin temizlenmesi işlemleri LocalStorage destekli olarak yönetilir. Navbar'daki sepet ikonu anlık olarak güncellenir.
- **CartPage:** Sepetteki ürünlerin listelendiği, adetlerinin değiştirilebildiği ve toplam tutarın hesaplandığı sayfadır.
- **CheckoutPage:** Teslimat bilgileri ve kart bilgilerinin alındığı güvenli ödeme sayfasıdır. Stripe altyapısı simüle edilerek sipariş kaydı oluşturulur.

### 3.3 Soru & Cevap Sistemi (Product QA)
Ürün detay sayfasına eklenen bu özellikle, giriş yapmış kullanıcılar ürün hakkında soru sorabilir. Bu sorular admin paneline düşer ve admin tarafından cevaplandığında ürün sayfasında "Satıcı" etiketiyle listelenir.

---

## 4. Admin Paneli Tasarımı ve İşlevleri

Sadece `isAdmin` yetkisine sahip kullanıcıların (örn: admin@britmart.co.uk) erişebildiği özel bir yönetim arayüzü (`AdminLayout`) geliştirilmiştir.

- **Admin Dashboard (`AdminDashboard.tsx`):** Toplam ürün, sipariş, gelir ve aktif kullanıcı sayılarını gösteren istatistik kartları bulunur.
- **Ürün Yönetimi (`AdminProducts.tsx`):** Mevcut ürünlerin listelendiği, stok durumlarının güncellenebildiği ve yeni ürün eklenebilen detaylı tablodur.
- **Mesaj Yönetimi (`AdminMessages.tsx`):** Kullanıcılardan gelen soruların "Cevaplanmamış" ve "Cevaplanmış" olarak filtrelendiği ve direkt olarak yanıtlanabildiği yönetim sayfasıdır.

---

## 5. Backend Mimarisi ve Veritabanı (Spring Boot & PostgreSQL)

Uygulamanın arka yüzü tamamen RESTful prensiplere uygun olarak geliştirilmiştir.

### 5.1 Katmanlı Mimari
- **Entity & DTO:** Veritabanı tabloları JPA anotasyonları (`@Entity`, `@Table`) ile modellenmiştir. İstemciye gönderilen veriler DTO (Data Transfer Object) sınıfları ile filtrelenerek güvenlik sağlanmıştır.
- **Repository:** Spring Data JPA kullanılarak veritabanı CRUD işlemleri boilerplate kod yazılmadan çözülmüştür (`JpaRepository`).
- **Service:** Transaction yönetimi (`@Transactional`) ve iş kuralları bu katmanda uygulanmıştır. Ürün stok kontrolü, sipariş oluşturma, ürün puanı güncelleme gibi kritik işlemler burada yapılır.
- **Controller:** Frontend'in iletişim kurduğu uç noktalardır (`@RestController`). Cross-Origin sorunları için `@CrossOrigin` ayarları yapılandırılmıştır.

### 5.2 Veritabanı Tasarımı
PostgreSQL üzerinde 5 temel tablo oluşturulmuştur:
- `products`: Ürün temel bilgileri, fiyat, stok ve kategori.
- `reviews`: Ürünlere yapılan yıldızlı yorumlar ve değerlendirmeler.
- `questions`: Kullanıcıların ürün hakkındaki soruları ve admin yanıtları.
- `orders` & `order_items`: Sipariş üst bilgileri ve siparişe ait ürün kalemleri (One-To-Many ilişkisi).

### 5.3 Güvenlik ve Hata Yönetimi (Security & Exception Handling)
- **Spring Security:** `SecurityConfig` sınıfı ile API rotaları korunmuştur. Admin endpoint'leri hariç ürün ve yorum okuma endpoint'leri herkese açık bırakılmış, ödeme ve sipariş işlemleri giriş gerektirecek şekilde tasarlanmıştır.
- **Global Exception Handler:** `@RestControllerAdvice` kullanılarak proje genelindeki hatalar (örneğin 404 Not Found, 400 Bad Request, Validasyon Hataları) standart bir JSON formatında frontend'e iletilmiştir.

---

## 6. UX/UI ve Tasarım Kararları
Vizedeki "Premium Dark Theme" ve "Glassmorphism" tasarım dili korunmuş, yeni eklenen form alanlarında, akordiyon menülerde (Sipariş Geçmişi) ve admin paneli tablolarında aynı renk paleti (Elektrik Moru ve Neon Cyan) kullanılarak görsel tutarlılık sağlanmıştır. Geri bildirimler için MUI `Snackbar` ve `Alert` bileşenleri kullanılarak kullanıcı etkileşimi güçlendirilmiştir.

---

## 7. Sonuç
Vize projesinde sadece arayüzden ibaret olan BritMart uygulaması; veritabanı, güvenli kimlik doğrulama, API servisi ve admin panel entegrasyonuyla tam ölçekli, modern ve gerçek hayatta kullanılabilecek uçtan uca (End-to-End) bir e-ticaret platformuna başarıyla dönüştürülmüştür.
