package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategory(String cate, Pageable pageable);
    Page<Product> findByNameContaining(String name,Pageable pageable);

}
