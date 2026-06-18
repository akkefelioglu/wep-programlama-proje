package com.britmart.ecommerce.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String slug;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private String description;
    private String shortDescription;
    private String category;
    private String categorySlug;
    private Double rating;
    private Integer reviewCount;
    private String image;
    private Boolean inStock;
    private Integer stockQuantity;
    private String badge;
    private List<ReviewDTO> reviews;
}
