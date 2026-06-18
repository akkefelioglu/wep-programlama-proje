package com.britmart.ecommerce.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
    private Long id;
    private Long productId;
    private String userName;
    private String userEmail;
    private String question;
    private String questionDate;
    private String answer;
    private String answeredBy;
    private String answerDate;
}
