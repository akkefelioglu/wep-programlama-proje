-- =============================================
-- BritMart E-Commerce Database Schema
-- PostgreSQL - Database: ecommdb
-- =============================================

-- Veritabanı oluştur (gerekirse)
-- CREATE DATABASE ecommdb;

-- Ürünler tablosu
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    category_slug VARCHAR(100) NOT NULL,
    rating DOUBLE PRECISION DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    image VARCHAR(500) NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 10,
    badge VARCHAR(100)
);

-- Yorumlar tablosu
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    helpful INTEGER DEFAULT 0
);

-- Siparişler tablosu
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    total DECIMAL(12,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Onaylandı',
    card_last4 VARCHAR(4),
    shipping_address TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sipariş kalemleri tablosu
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Soru & Cevap tablosu
CREATE TABLE IF NOT EXISTS questions (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    question_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    answer TEXT,
    answered_by VARCHAR(255),
    answer_date TIMESTAMP
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_questions_product ON questions(product_id);
CREATE INDEX IF NOT EXISTS idx_questions_unanswered ON questions(answer) WHERE answer IS NULL;
