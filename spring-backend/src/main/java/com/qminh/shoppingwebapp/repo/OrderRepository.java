package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.OrderBill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderBill, Long> {

}
