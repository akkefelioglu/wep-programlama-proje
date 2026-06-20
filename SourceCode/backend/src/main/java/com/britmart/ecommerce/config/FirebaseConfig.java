package com.britmart.ecommerce.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;

/**
 * Firebase Admin SDK yapılandırması.
 * Firebase Console'dan indirilen service-account-key.json dosyası ile
 * kullanıcı kimlik doğrulama tokenlarını sunucu tarafında doğrulamak için kullanılır.
 *
 * Kurulum:
 * 1. Firebase Console -> Proje Ayarları -> Hizmet Hesapları
 * 2. "Yeni özel anahtar oluştur" butonuna tıklayın
 * 3. İndirilen JSON dosyasını src/main/resources/ altına koyun
 * 4. application.properties'e dosya yolunu ekleyin:
 *    firebase.credentials.path=classpath:firebase-service-account.json
 */
@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.path:}")
    private Resource firebaseCredentials;

    @PostConstruct
    public void init() {
        try {
            if (firebaseCredentials != null && firebaseCredentials.exists()) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(firebaseCredentials.getInputStream()))
                        .build();

                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                    System.out.println("✅ Firebase Admin SDK başarıyla başlatıldı.");
                }
            } else {
                System.out.println("⚠️ Firebase credentials dosyası bulunamadı. " +
                        "Demo modda çalışılıyor. " +
                        "Gerçek kullanım için firebase-service-account.json dosyasını " +
                        "src/main/resources/ altına koyunuz.");
            }
        } catch (IOException e) {
            System.err.println("❌ Firebase başlatılamadı: " + e.getMessage());
            System.out.println("⚠️ Demo modda devam ediliyor.");
        }
    }
}
