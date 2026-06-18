package com.britmart.ecommerce.controller;

import com.britmart.ecommerce.dto.QuestionDTO;
import com.britmart.ecommerce.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(questionService.getQuestionsByProduct(productId));
    }

    @PostMapping
    public ResponseEntity<QuestionDTO> askQuestion(@RequestBody QuestionDTO questionDTO) {
        return ResponseEntity.ok(questionService.askQuestion(questionDTO));
    }
}
