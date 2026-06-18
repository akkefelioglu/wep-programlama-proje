package com.britmart.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "old_price", precision = 10, scale = 2)
    private BigDecimal oldPrice;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(nullable = false)
    private String category;

    @Column(name = "category_slug", nullable = false)
    private String categorySlug;

    @Column(nullable = false)
    private Double rating = 0.0;

    @Column(name = "review_count", nullable = false)
    private Integer reviewCount = 0;

    @Column(nullable = false)
    private String image;

    @Column(name = "in_stock", nullable = false)
    private Boolean inStock = true;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 10;

    private String badge;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;
}
