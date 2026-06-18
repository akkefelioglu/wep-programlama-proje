package com.britmart.ecommerce.repository;

import com.britmart.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    Optional<Order> findByOrderNumber(String orderNumber);
}
