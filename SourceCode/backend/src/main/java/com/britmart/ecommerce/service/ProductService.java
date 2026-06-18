package com.britmart.ecommerce.service;

import com.britmart.ecommerce.dto.ProductDTO;
import com.britmart.ecommerce.entity.Product;
import com.britmart.ecommerce.exception.ResourceNotFoundException;
import com.britmart.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + slug));
        return toDTO(product);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + id));
        return toDTO(product);
    }

    public List<ProductDTO> getProductsByCategory(String categorySlug) {
        return productRepository.findByCategorySlug(categorySlug).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByBadgeIsNotNull().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = Product.builder()
                .name(dto.getName())
                .slug(dto.getSlug())
                .price(dto.getPrice())
                .oldPrice(dto.getOldPrice())
                .description(dto.getDescription())
                .shortDescription(dto.getShortDescription())
                .category(dto.getCategory())
                .categorySlug(dto.getCategorySlug())
                .image(dto.getImage())
                .inStock(dto.getInStock() != null ? dto.getInStock() : true)
                .stockQuantity(dto.getStockQuantity() != null ? dto.getStockQuantity() : 10)
                .badge(dto.getBadge())
                .rating(0.0)
                .reviewCount(0)
                .build();
        return toDTO(productRepository.save(product));
    }

    @Transactional
    public ProductDTO updateStock(Long id, Integer stockQuantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + id));
        product.setStockQuantity(stockQuantity);
        product.setInStock(stockQuantity > 0);
        return toDTO(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ürün bulunamadı: " + id);
        }
        productRepository.deleteById(id);
    }

    private ProductDTO toDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .price(product.getPrice())
                .oldPrice(product.getOldPrice())
                .description(product.getDescription())
                .shortDescription(product.getShortDescription())
                .category(product.getCategory())
                .categorySlug(product.getCategorySlug())
                .rating(product.getRating())
                .reviewCount(product.getReviewCount())
                .image(product.getImage())
                .inStock(product.getInStock())
                .stockQuantity(product.getStockQuantity())
                .badge(product.getBadge())
                .build();
    }
}
