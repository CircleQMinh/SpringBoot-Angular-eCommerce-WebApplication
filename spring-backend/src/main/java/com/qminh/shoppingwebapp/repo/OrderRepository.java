package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.OrderBill;
import com.qminh.shoppingwebapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderBill, Long> {


    Page<OrderBill> findByUserIdOrderByOrderDate(Long id, Pageable pageable);
    Page<OrderBill> findByUserIdOrderByTotalPriceDesc(Long id, Pageable pageable);
    Page<OrderBill> findByUserIdOrderByPaymentMethod(Long id, Pageable pageable);

}
