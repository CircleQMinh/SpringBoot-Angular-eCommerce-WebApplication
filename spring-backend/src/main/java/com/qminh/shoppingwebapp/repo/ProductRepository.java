package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {


}
