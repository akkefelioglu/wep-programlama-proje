package com.britmart.ecommerce.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {
    private boolean success;
    private String orderId;
    private String message;
    private String transactionId;
}
