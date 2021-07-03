package com.qminh.shoppingwebapp.controller;
import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping("/Products/all")
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @GetMapping("/Products")
    Page<Product> getProductPage(@RequestParam(defaultValue = "1") int pageNumber,
                                 @RequestParam(defaultValue = "8") int pageSize,
                                 @RequestParam(defaultValue = "") String category){
        Page<Product> page;
        if(category.equals("all")){
            page = (Page<Product>) productRepository.findAll(PageRequest.of(pageNumber-1,pageSize));
        }
        else{
            page=productRepository.findByCategory(category,PageRequest.of(pageNumber-1,pageSize));
        }
        return page;
    }
    @GetMapping("/Products/search")
    Page<Product> getSearchResult(@RequestParam(defaultValue = "") String keyword){

        return productRepository.findByNameContaining(keyword,PageRequest.of(0,1000));
    }



}
