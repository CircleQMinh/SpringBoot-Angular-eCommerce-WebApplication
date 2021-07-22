package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByProductId(Long id, Pageable pageable);
    Page<Review> findByProductIdAndStar(Long id,int star,Pageable pageable);
    Long countByProductIdAndStar(Long id,int star);

    Review findByUserIdAndAndProductId(Long id,Long uid);
}
