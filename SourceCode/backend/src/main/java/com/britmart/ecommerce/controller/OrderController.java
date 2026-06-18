package com.britmart.ecommerce.controller;

import com.britmart.ecommerce.dto.OrderDTO;
import com.britmart.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/user/{email}")
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getOrdersByUser(email));
    }
}
