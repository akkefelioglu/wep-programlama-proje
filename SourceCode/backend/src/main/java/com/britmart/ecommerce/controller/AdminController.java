package com.britmart.ecommerce.controller;

import com.britmart.ecommerce.dto.ProductDTO;
import com.britmart.ecommerce.dto.QuestionDTO;
import com.britmart.ecommerce.service.ProductService;
import com.britmart.ecommerce.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final ProductService productService;
    private final QuestionService questionService;

    // ===== Ürün Yönetimi =====

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.createProduct(productDTO));
    }

    @PutMapping("/products/{id}/stock")
    public ResponseEntity<ProductDTO> updateStock(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(productService.updateStock(id, body.get("stockQuantity")));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // ===== Mesaj Yönetimi =====

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/questions/unanswered")
    public ResponseEntity<List<QuestionDTO>> getUnansweredQuestions() {
        return ResponseEntity.ok(questionService.getUnansweredQuestions());
    }

    @PutMapping("/questions/{id}/answer")
    public ResponseEntity<QuestionDTO> answerQuestion(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(
                questionService.answerQuestion(id, body.get("answer"), body.get("answeredBy")));
    }
}
