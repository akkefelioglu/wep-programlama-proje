package com.britmart.ecommerce.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private String orderNumber;
    private String userEmail;
    private String userName;
    private BigDecimal total;
    private String status;
    private String cardLast4;
    private String shippingAddress;
    private String createdAt;
    private List<OrderItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDTO {
        private String productName;
        private String productImage;
        private Integer quantity;
        private BigDecimal price;
    }
}
