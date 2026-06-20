-- BritMart E-Commerce Database - Başlangıç Verileri
-- PostgreSQL

-- Ürünler
INSERT INTO products (name, slug, price, old_price, description, short_description, category, category_slug, rating, review_count, image, in_stock, stock_quantity, badge)
VALUES
('Nova Pro Max Akıllı Telefon', 'nova-pro-max', 42999.00, 49999.00, 'Nova Pro Max, çığır açan kamera sistemi ve güçlü işlemcisiyle mobil deneyimi yeniden tanımlıyor.', '200MP Kamera | 6.8" AMOLED | 5000mAh Batarya', 'Akıllı Telefonlar', 'telefonlar', 4.8, 1247, '/images/smartphone.png', true, 25, 'Çok Satan'),
('Pixel Ultra Telefon', 'pixel-ultra', 34999.00, 39999.00, 'Pixel Ultra, saf Android deneyimini en üst düzeye taşıyor.', 'Tensor G4 | 6.5" OLED | AI Destekli', 'Akıllı Telefonlar', 'telefonlar', 4.6, 892, '/images/smartphone.png', true, 18, 'Yeni'),
('Galaxy Edge Lite', 'galaxy-edge-lite', 18999.00, NULL, 'Galaxy Edge Lite, uygun fiyatla premium özellikler sunan akıllı telefon.', '6.4" Super AMOLED | 64MP Kamera | 4500mAh', 'Akıllı Telefonlar', 'telefonlar', 4.3, 654, '/images/smartphone.png', true, 30, NULL),
('ProBook Ultra 16" Laptop', 'probook-ultra-16', 64999.00, 74999.00, 'ProBook Ultra, profesyoneller için tasarlanmış yüksek performanslı bir laptop.', 'M3 Max | 36GB RAM | 16" Retina XDR', 'Laptoplar', 'laptoplar', 4.9, 567, '/images/laptop.png', true, 12, 'Editörün Seçimi'),
('ZenBook Pro 14 OLED', 'zenbook-pro-14', 38999.00, 42999.00, 'ZenBook Pro 14, OLED ekranıyla renk doğruluğu arayanlar için ideal.', 'i9 + RTX 4060 | 14" OLED | 32GB RAM', 'Laptoplar', 'laptoplar', 4.7, 423, '/images/laptop.png', true, 15, 'İndirimde'),
('SonicElite ANC Pro Kulaklık', 'sonicelite-anc-pro', 8999.00, 11999.00, 'SonicElite ANC Pro, aktif gürültü engelleme teknolojisiyle ses deneyimini zirveye taşıyor.', 'ANC | Hi-Res Audio | 30 Saat Pil', 'Kulaklıklar', 'kulakliklar', 4.7, 2341, '/images/headphones.png', true, 50, 'En Popüler'),
('VitaWatch Pro Akıllı Saat', 'vitawatch-pro', 12999.00, 15999.00, 'VitaWatch Pro, sağlık takibini bir üst seviyeye taşıyor.', 'EKG + SpO2 | Titanyum | 5 Gün Pil', 'Akıllı Saatler', 'saatler', 4.6, 789, '/images/smartwatch.png', true, 20, 'Sağlık Odaklı'),
('ThunderBass Max Hoparlör', 'thunderbass-max', 6999.00, 8499.00, 'ThunderBass Max, güçlü bas ve 360° ses yayılımı ile evin her köşesini müzikle doldurun.', '360° Ses | IPX7 | 24 Saat Pil', 'Hoparlörler', 'hoparlorler', 4.5, 876, '/images/speaker.png', true, 35, 'İndirimde')
ON CONFLICT DO NOTHING;

-- Örnek Yorumlar
INSERT INTO reviews (product_id, user_name, user_email, rating, comment, date, helpful)
VALUES
(1, 'Ahmet Y.', 'ahmet@test.com', 5, 'Harika bir telefon! Kamera kalitesi inanılmaz, özellikle gece modunda çektiğim fotoğraflar profesyonel düzeyde çıkıyor.', '2026-03-15', 34),
(1, 'Elif K.', 'elif@test.com', 4, 'Genel olarak çok memnunum. Tek eksiği biraz ağır olması ama performansı muhteşem.', '2026-03-10', 18),
(4, 'Burak S.', 'burak@test.com', 5, 'Video düzenleme için aldım. 4K timeline da hiç takılma yok. Pil ömrü de inanılmaz.', '2026-03-18', 56),
(6, 'Merve K.', 'merve@test.com', 5, 'Gürültü engelleme harika! Ofiste bile tamamen sessiz bir ortam yaratıyor.', '2026-03-22', 67)
ON CONFLICT DO NOTHING;

-- Örnek Sorular
INSERT INTO questions (product_id, user_name, user_email, question, question_date, answer, answered_by, answer_date)
VALUES
(1, 'Deniz A.', 'deniz@test.com', 'Bu telefon kablosuz şarj destekliyor mu?', '2026-03-20 10:30:00', 'Evet, 15W kablosuz şarj ve 5W ters kablosuz şarj desteklemektedir.', 'BritMart Admin', '2026-03-20 14:00:00'),
(4, 'Sema K.', 'sema@test.com', 'Bu laptop ile oyun oynayabilir miyim?', '2026-03-25 09:15:00', NULL, NULL, NULL)
ON CONFLICT DO NOTHING;
