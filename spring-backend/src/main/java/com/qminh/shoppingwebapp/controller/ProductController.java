package com.qminh.shoppingwebapp.controller;
import com.qminh.shoppingwebapp.exception.ResourceNotFoundException;
import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    @GetMapping("/Products/{id}")
    public ResponseEntity<Product> getEmployeeById(@PathVariable(value = "id") Long proId)
            throws ResourceNotFoundException {
        Product pro = productRepository.findById(proId)
                .orElse(new Product());
        return ResponseEntity.ok().body(pro);
    }
    @GetMapping("/Products/all")
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @GetMapping("/Products")
    Page<Product> getProductPage(@RequestParam(defaultValue = "1") int pageNumber,
                                 @RequestParam(defaultValue = "12") int pageSize,
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


    @GetMapping("/getProducts")
    Page<Product> getProductPageForAdmin(@RequestParam(defaultValue = "1") int pageNumber,
                                 @RequestParam(defaultValue = "12") int pageSize,
                                 @RequestParam(defaultValue = "") String category, @RequestParam(defaultValue ="" ) String orderBy){
        Page<Product> page;
        String order="abc";
        if(orderBy.equals("id")){
            order="id";
        }
        else if(orderBy.equals("price")){
            order="price";
        }
        else if(orderBy.equals("name")){
            order="name";
        }
        else if(orderBy.equals("unit")){
            order="unitsInStock";
        }
        else if(orderBy.equals("last")){
            order="lastUpdate";
        }
        if(category.equals("all")){
            page = (Page<Product>) productRepository.findAll(PageRequest.of(pageNumber-1,pageSize,Sort.by(Sort.Direction.ASC, order)));
        }
        else{
            page=productRepository.findByCategory(category,PageRequest.of(pageNumber-1,pageSize,Sort.by(Sort.Direction.ASC, order)));
        }
        return page;
    }


}
