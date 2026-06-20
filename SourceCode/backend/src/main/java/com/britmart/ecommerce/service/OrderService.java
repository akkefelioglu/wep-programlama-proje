package com.britmart.ecommerce.service;

import com.britmart.ecommerce.dto.OrderDTO;
import com.britmart.ecommerce.dto.PaymentRequestDTO;
import com.britmart.ecommerce.dto.PaymentResponseDTO;
import com.britmart.ecommerce.entity.Order;
import com.britmart.ecommerce.entity.OrderItem;
import com.britmart.ecommerce.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<OrderDTO> getOrdersByUser(String userEmail) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(userEmail).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PaymentResponseDTO processPayment(PaymentRequestDTO request, String userEmail, String userName) {
        try {
            // Stripe PaymentIntent oluştur
            com.stripe.param.PaymentIntentCreateParams params =
                    com.stripe.param.PaymentIntentCreateParams.builder()
                            .setAmount(request.getAmount().longValue() * 100L) // Kuruş cinsinden
                            .setCurrency("try")
                            .setDescription("BritMart Siparişi: " + userEmail)
                            .setReceiptEmail(userEmail)
                            .build();

            com.stripe.model.PaymentIntent intent = com.stripe.model.PaymentIntent.create(params);

            // Veritabanına siparişi kaydet
            Order order = Order.builder()
                    .userEmail(userEmail)
                    .userName(userName)
                    .total(request.getAmount())
                    .cardLast4(request.getCardNumber().substring(request.getCardNumber().length() - 4))
                    .shippingAddress(request.getShippingAddress())
                    .status("Onaylandı")
                    .build();

            List<OrderItem> items = request.getItems().stream()
                    .map(item -> OrderItem.builder()
                            .order(order)
                            .productName(item.getProductName())
                            .productImage(item.getProductImage())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .build())
                    .collect(Collectors.toList());
            order.setItems(items);

            Order savedOrder = orderRepository.save(order);

            return PaymentResponseDTO.builder()
                    .success(true)
                    .orderId(savedOrder.getOrderNumber())
                    .message("Ödeme başarıyla tamamlandı")
                    .transactionId(intent.getId())
                    .build();

        } catch (com.stripe.exception.StripeException e) {
            System.err.println("Stripe Ödeme Hatası: " + e.getMessage());
            return PaymentResponseDTO.builder()
                    .success(false)
                    .message("Ödeme işlemi sırasında bir hata oluştu: " + e.getMessage())
                    .build();
        }
    }

    private OrderDTO toDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userEmail(order.getUserEmail())
                .userName(order.getUserName())
                .total(order.getTotal())
                .status(order.getStatus())
                .cardLast4(order.getCardLast4())
                .shippingAddress(order.getShippingAddress())
                .createdAt(order.getCreatedAt().toString())
                .items(order.getItems().stream()
                        .map(item -> OrderDTO.OrderItemDTO.builder()
                                .productName(item.getProductName())
                                .productImage(item.getProductImage())
                                .quantity(item.getQuantity())
                                .price(item.getPrice())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
