package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.FavoriteProduct;
import com.qminh.shoppingwebapp.model.OrderBill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteProduct, Long> {



    Page<FavoriteProduct> findByUserId(Long id,Pageable pageable);
    List<FavoriteProduct> findByUserIdAndProductId(Long uid,Long pid );
}
