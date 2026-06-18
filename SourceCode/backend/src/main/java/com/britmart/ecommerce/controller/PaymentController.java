package com.britmart.ecommerce.controller;

import com.britmart.ecommerce.dto.PaymentRequestDTO;
import com.britmart.ecommerce.dto.PaymentResponseDTO;
import com.britmart.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<PaymentResponseDTO> processPayment(
            @Valid @RequestBody PaymentRequestDTO request,
            @RequestHeader(value = "X-User-Email", defaultValue = "guest@britmart.co.uk") String userEmail,
            @RequestHeader(value = "X-User-Name", defaultValue = "Misafir") String userName) {
        return ResponseEntity.ok(orderService.processPayment(request, userEmail, userName));
    }
}
