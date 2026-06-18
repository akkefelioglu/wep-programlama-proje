package com.britmart.ecommerce.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Long id;
    private Long productId;

    @NotBlank(message = "Kullanıcı adı boş olamaz")
    private String userName;

    private String userEmail;

    @Min(value = 1, message = "Puan en az 1 olmalıdır")
    @Max(value = 5, message = "Puan en fazla 5 olmalıdır")
    private Integer rating;

    @NotBlank(message = "Yorum boş olamaz")
    private String comment;

    private String date;
    private Integer helpful;
}
