package com.qminh.shoppingwebapp.controller;
import com.qminh.shoppingwebapp.exception.ResourceNotFoundException;
import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.ProductRepository;
import com.qminh.shoppingwebapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/Products")
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }
}
