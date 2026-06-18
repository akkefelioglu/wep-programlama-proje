package com.britmart.ecommerce.service;

import com.britmart.ecommerce.dto.ReviewDTO;
import com.britmart.ecommerce.entity.Product;
import com.britmart.ecommerce.entity.Review;
import com.britmart.ecommerce.exception.ResourceNotFoundException;
import com.britmart.ecommerce.repository.ProductRepository;
import com.britmart.ecommerce.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public List<ReviewDTO> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO addReview(ReviewDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + dto.getProductId()));

        Review review = Review.builder()
                .product(product)
                .userName(dto.getUserName())
                .userEmail(dto.getUserEmail())
                .rating(dto.getRating())
                .comment(dto.getComment())
                .date(LocalDate.now())
                .helpful(0)
                .build();

        Review saved = reviewRepository.save(review);

        // Ürün rating ve yorum sayısını güncelle
        List<Review> allReviews = reviewRepository.findByProductId(product.getId());
        double avgRating = allReviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        product.setRating(Math.round(avgRating * 10.0) / 10.0);
        product.setReviewCount(allReviews.size());
        productRepository.save(product);

        return toDTO(saved);
    }

    private ReviewDTO toDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .productId(review.getProduct().getId())
                .userName(review.getUserName())
                .rating(review.getRating())
                .comment(review.getComment())
                .date(review.getDate().toString())
                .helpful(review.getHelpful())
                .build();
    }
}
