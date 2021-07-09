package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.OrderBill;
import com.qminh.shoppingwebapp.model.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    Page<OrderDetail> findByOrderbill_Id(Long id, Pageable pageable);
}
