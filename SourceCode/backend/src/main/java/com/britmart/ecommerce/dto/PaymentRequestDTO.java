package com.britmart.ecommerce.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequestDTO {

    @NotBlank(message = "Kart numarası boş olamaz")
    private String cardNumber;

    @NotBlank(message = "Son kullanma tarihi boş olamaz")
    private String expiryDate;

    @NotBlank(message = "CVV boş olamaz")
    private String cvv;

    @NotBlank(message = "Kart üzerindeki isim boş olamaz")
    private String cardName;

    @NotBlank(message = "Adres boş olamaz")
    private String shippingAddress;

    @NotNull(message = "Toplam tutar belirtilmelidir")
    private BigDecimal amount;

    private List<CartItemDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemDTO {
        private Long productId;
        private String productName;
        private String productImage;
        private Integer quantity;
        private BigDecimal price;
    }
}
