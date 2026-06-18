package com.britmart.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(name = "question_date", nullable = false)
    private LocalDateTime questionDate;

    @Column(columnDefinition = "TEXT")
    private String answer;

    @Column(name = "answered_by")
    private String answeredBy;

    @Column(name = "answer_date")
    private LocalDateTime answerDate;

    @PrePersist
    protected void onCreate() {
        questionDate = LocalDateTime.now();
    }
}
