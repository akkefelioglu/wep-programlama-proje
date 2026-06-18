package com.britmart.ecommerce.config;

import org.springframework.context.annotation.Configuration;

/**
 * Firebase Admin SDK yapılandırması.
 * Gerçek kullanım için Firebase Console'dan indirilen
 * service-account-key.json dosyası gereklidir.
 *
 * Kurulum:
 * 1. Firebase Console -> Proje Ayarları -> Hizmet Hesapları
 * 2. "Yeni özel anahtar oluştur" butonuna tıklayın
 * 3. İndirilen JSON dosyasını src/main/resources/ altına koyun
 * 4. application.properties'e dosya yolunu ekleyin
 */
@Configuration
public class FirebaseConfig {
    // Firebase Admin SDK entegrasyonu
    // Demo modda çalışır, gerçek kullanım için
    // service account credentials gerekir

    // @PostConstruct
    // public void init() throws IOException {
    //     FileInputStream serviceAccount =
    //         new FileInputStream("src/main/resources/firebase-service-account.json");
    //     FirebaseOptions options = FirebaseOptions.builder()
    //         .setCredentials(GoogleCredentials.fromStream(serviceAccount))
    //         .build();
    //     FirebaseApp.initializeApp(options);
    // }
}
