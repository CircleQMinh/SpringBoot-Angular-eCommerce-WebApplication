package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.OrderBill;
import com.qminh.shoppingwebapp.model.OrderDetail;
import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.OrderDetailRepository;
import com.qminh.shoppingwebapp.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @GetMapping("/Orders")
    public List<OrderBill> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/OrderDetails")
    public List<OrderDetail> getAllOrderDetail() {
        return orderDetailRepository.findAll();
    }

    @PostMapping("/Orders/createOrder")
    public OrderBill createOrder(@RequestBody OrderBill orderBill) {
        return orderRepository.save(orderBill);
    }
    @PostMapping("/Orders/createOrderDetail")
    public OrderDetail createOrderDetail( @RequestBody OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @GetMapping("/getUserOrders")
    public Page<OrderBill> getUserOrders(@RequestParam(defaultValue = "") Long id,
                                         @RequestParam(defaultValue = "order_date") String order,
                                         @RequestParam(defaultValue = "1") int pageNumber,
                                         @RequestParam(defaultValue = "5") int pageSize){

        Page<OrderBill> page = null;

        if(order.equals("order_date")){
            page=orderRepository.findByUserIdOrderByOrderDate(id,PageRequest.of(pageNumber-1,pageSize));
        }
        else if(order.equals("price")){
            page=orderRepository.findByUserIdOrderByTotalPriceDesc(id,PageRequest.of(pageNumber-1,pageSize));
        }
        else if(order.equals("method")){
            page=orderRepository.findByUserIdOrderByPaymentMethod(id,PageRequest.of(pageNumber-1,pageSize));
        }
        return page;
    }


    @GetMapping("/getOrderDetail")
    public List<OrderDetail> findOrderDetailById(@RequestParam(defaultValue = "0") long id){
        List<OrderDetail> list=orderDetailRepository.findByOrderbill_Id(id);
        return  list;
    }
}
