package com.britmart.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configure(http))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/reviews/**").permitAll()
                .requestMatchers("/api/questions/product/**").permitAll()
                // Authenticated endpoints
                .requestMatchers("/api/payment/**").permitAll()
                .requestMatchers("/api/orders/**").permitAll()
                .requestMatchers("/api/questions").permitAll()
                // Admin endpoints - Firebase token doğrulaması ile korunmalı
                .requestMatchers("/api/admin/**").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
