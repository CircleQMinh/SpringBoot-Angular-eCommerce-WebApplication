package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.OrderBill;
import com.qminh.shoppingwebapp.model.OrderDetail;
import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.OrderDetailRepository;
import com.qminh.shoppingwebapp.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public OrderDetail createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @GetMapping("/getUserOrders")
    public Page<OrderBill> getUserOrders(@RequestParam(defaultValue = "") Long id,
                                         @RequestParam(defaultValue = "order_date") String order,
                                         @RequestParam(defaultValue = "1") int pageNumber,
                                         @RequestParam(defaultValue = "5") int pageSize) {

        Page<OrderBill> page = null;

        if (order.equals("order_date")) {
            page = orderRepository.findByUserIdOrderByOrderDate(id, PageRequest.of(pageNumber - 1, pageSize));
        } else if (order.equals("price")) {
            page = orderRepository.findByUserIdOrderByTotalPriceDesc(id, PageRequest.of(pageNumber - 1, pageSize));
        } else if (order.equals("method")) {
            page = orderRepository.findByUserIdOrderByPaymentMethod(id, PageRequest.of(pageNumber - 1, pageSize));
        }
        return page;
    }


    @GetMapping("/getOrderDetail")
    public Page<OrderDetail> getOrdersDetail(@RequestParam(defaultValue = "") Long id,
                                             @RequestParam(defaultValue = "1") int pageNumber,
                                             @RequestParam(defaultValue = "5") int pageSize) {
        Page<OrderDetail> page = null;
        page = orderDetailRepository.findByOrderbill_Id(id, PageRequest.of(pageNumber - 1, pageSize));
        page.forEach(orderDetail -> {
            orderDetail.getOrder().getUser().setPassword("");
        });
        return page;
    }

    @GetMapping("/getOrderList")
    public Page<OrderBill> getUserOrdersForAdmin(@RequestParam(defaultValue = "") int status,
                                                 @RequestParam(defaultValue = "order_date") String orderBy,
                                                 @RequestParam(defaultValue = "1") int pageNumber,
                                                 @RequestParam(defaultValue = "5") int pageSize,
                                                 @RequestParam(defaultValue = "a") String sort) {

        Page<OrderBill> page = null;

        Sort.Direction sd;
        if (sort.equals("a")) {
            sd = Sort.Direction.ASC;
        } else {
            sd = Sort.Direction.DESC;
        }


        String order = "abc";
        switch (orderBy) {
            case "id":
                order = "id";
                break;
            case "totalPrice":
                order = "totalPrice";
                break;
            case "orderDate":
                order = "orderDate";
                break;
            case "payment":
                order = "paymentMethod";
                break;
        }
        if (status == 0) {
            page = orderRepository.findAll(PageRequest.of(pageNumber - 1, pageSize, Sort.by(sd, order)));
        } else {
            page = orderRepository.findByStatus(status, PageRequest.of(pageNumber - 1, pageSize, Sort.by(sd, order)));
        }

        return page;
    }

    @PutMapping("/editOrder")
    public Map<String, String> editOrderStatus(@RequestBody OrderBill o) {
        Map<String, String> map = new HashMap<>();
        OrderBill order = orderRepository.findById(o.getId()).orElse(new OrderBill());
        try {
            order.setStatus(o.getStatus());
            orderRepository.save(order);
            map.put("success", Boolean.TRUE.toString());
        } catch (Exception e) {
            map.put("success", Boolean.FALSE.toString());
        }
        return map;
    }

    @DeleteMapping("deleteOrder/{id}")
    public Map<String, String> deleteUser(@PathVariable Long id) {
        Map<String, String> map = new HashMap<>();
        OrderBill pro = orderRepository.getById(id);
        try {
            orderRepository.delete(pro);
            map.put("success", "true");
        } catch (Exception e) {
            map.put("success", "false");
            map.put("error", e.getMessage());
        }
        return map;
    }

}
