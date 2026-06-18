package com.britmart.ecommerce.controller;

import com.britmart.ecommerce.dto.ProductDTO;
import com.britmart.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProductDTO> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }

    @GetMapping("/category/{categorySlug}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String categorySlug) {
        return ResponseEntity.ok(productService.getProductsByCategory(categorySlug));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProductDTO>> getFeaturedProducts() {
        return ResponseEntity.ok(productService.getFeaturedProducts());
    }
}
