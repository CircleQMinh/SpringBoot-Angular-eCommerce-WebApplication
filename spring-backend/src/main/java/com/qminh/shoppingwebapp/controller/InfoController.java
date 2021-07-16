package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.OrderBill;
import com.qminh.shoppingwebapp.repo.OrderDetailRepository;
import com.qminh.shoppingwebapp.repo.OrderRepository;
import com.qminh.shoppingwebapp.repo.ProductRepository;
import com.qminh.shoppingwebapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class InfoController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/Dashboard/getSummaryInfo")
    Map<String,Long> getDashboardInfo(){
        Map<String,Long> map = new HashMap<>();

        try{
            map.put("userCount",userRepository.count());
            Page<OrderBill> page = orderRepository.findByStatus(1, PageRequest.of(0,10000));


            map.put("orderCount",page.stream().count());
            map.put("productCount",productRepository.count());
            map.put("success", 1L);
        }
        catch (Exception e){
            map.put("success", 0L);
        }
        return map;
    }


}
