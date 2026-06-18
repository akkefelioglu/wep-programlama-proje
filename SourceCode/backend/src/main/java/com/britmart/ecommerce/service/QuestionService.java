package com.britmart.ecommerce.service;

import com.britmart.ecommerce.dto.QuestionDTO;
import com.britmart.ecommerce.entity.Product;
import com.britmart.ecommerce.entity.Question;
import com.britmart.ecommerce.exception.ResourceNotFoundException;
import com.britmart.ecommerce.repository.ProductRepository;
import com.britmart.ecommerce.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ProductRepository productRepository;

    public List<QuestionDTO> getQuestionsByProduct(Long productId) {
        return questionRepository.findByProductId(productId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getUnansweredQuestions() {
        return questionRepository.findByAnswerIsNull().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public QuestionDTO askQuestion(QuestionDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + dto.getProductId()));

        Question question = Question.builder()
                .product(product)
                .userName(dto.getUserName())
                .userEmail(dto.getUserEmail())
                .question(dto.getQuestion())
                .build();

        return toDTO(questionRepository.save(question));
    }

    @Transactional
    public QuestionDTO answerQuestion(Long questionId, String answer, String answeredBy) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Soru bulunamadı: " + questionId));

        question.setAnswer(answer);
        question.setAnsweredBy(answeredBy);
        question.setAnswerDate(LocalDateTime.now());

        return toDTO(questionRepository.save(question));
    }

    private QuestionDTO toDTO(Question question) {
        return QuestionDTO.builder()
                .id(question.getId())
                .productId(question.getProduct().getId())
                .userName(question.getUserName())
                .userEmail(question.getUserEmail())
                .question(question.getQuestion())
                .questionDate(question.getQuestionDate().toString())
                .answer(question.getAnswer())
                .answeredBy(question.getAnsweredBy())
                .answerDate(question.getAnswerDate() != null ? question.getAnswerDate().toString() : null)
                .build();
    }
}
