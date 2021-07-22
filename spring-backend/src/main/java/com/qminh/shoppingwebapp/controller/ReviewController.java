package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.Review;
import com.qminh.shoppingwebapp.repo.ProductRepository;
import com.qminh.shoppingwebapp.repo.ReviewRepository;
import com.qminh.shoppingwebapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class ReviewController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ReviewRepository reviewRepository;


    @GetMapping("/review/getProductReview")
    public Page<Review> getProductReview(@RequestParam(defaultValue = "") Long id,
                                         @RequestParam(defaultValue = "1") int pageNumber,
                                         @RequestParam(defaultValue = "5") int pageSize,
                                         @RequestParam(defaultValue = "d") String sort,
                                         @RequestParam(defaultValue = "all") String filter){

        Page<Review> page;
        Sort.Direction sd;
        if (sort.equals("a")) {
            sd = Sort.Direction.ASC;
        } else {
            sd = Sort.Direction.DESC;
        }
        if(filter.equals("all")){
            page=reviewRepository.findByProductId(id, PageRequest.of(pageNumber-1,pageSize,Sort.by(sd,"date")));
        }
        else{
            int number = Integer.parseInt(filter);
            page=reviewRepository.findByProductIdAndStar(id,number, PageRequest.of(pageNumber-1,pageSize,Sort.by(sd,"date")));
        }
        page.forEach(review -> {
            review.getUser().setPassword("");
        });

        return page;
    }

    @GetMapping("/review/getProductRating")
    public Map<String,Long> getProductRating(@RequestParam(defaultValue = "") Long id){
        Map<String,Long> map = new HashMap<>();

        map.put("fivestar",reviewRepository.countByProductIdAndStar(id,5));
        map.put("fourstar",reviewRepository.countByProductIdAndStar(id,4));
        map.put("threestar",reviewRepository.countByProductIdAndStar(id,3));
        map.put("twostar",reviewRepository.countByProductIdAndStar(id,2));
        map.put("onestar",reviewRepository.countByProductIdAndStar(id,1));
        return map;

    }

    @PostMapping("/review/postUserReview")
    public Map<String,String> postUserReview(@RequestBody Review r){
        Map<String,String> map = new HashMap<>();
        try{
            Review old_review = reviewRepository.findByUserIdAndAndProductId(r.getUser().getId(),r.getProduct().getId());
            if(old_review==null){
                reviewRepository.save(r);
                //System.out.println("null nè");
            }
            else{
                old_review.setDate(r.getDate());
                old_review.setContent(r.getContent());
                old_review.setStar(r.getStar());
                reviewRepository.save(old_review);
               // System.out.println("ko null nè");
            }

            map.put("success", "true");
        }
        catch (Exception e){
            map.put("success", "false");
            map.put("error", e.getMessage());
        }

        return map;

    }


}
