package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.FavoriteProduct;
import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.FavoriteRepository;
import com.qminh.shoppingwebapp.repo.ProductRepository;
import com.qminh.shoppingwebapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class FavoriteController {
    @Autowired
    FavoriteRepository favoriteRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/account/favoriteItem")
    public Page<FavoriteProduct> getUserFavoriteProduct(@RequestParam(defaultValue = "") Long id,
                                                        @RequestParam(defaultValue = "1") int pageNumber,
                                                        @RequestParam(defaultValue = "5") int pageSize) {
        Page<FavoriteProduct> page = favoriteRepository.findByUserId(id, PageRequest.of(pageNumber - 1, pageSize, Sort.by(Sort.Direction.ASC, "product")));
        page.forEach(favoriteProduct -> {
            favoriteProduct.getUser().setPassword("");
        });
        return page;
    }

    @GetMapping("/account/addToFavorite")
    public Map<String, String> addToFav(@RequestParam(defaultValue = "") Long pro_id,
                                        @RequestParam(defaultValue = "1") Long userid) {
        Map<String, String> map = new HashMap<>();
        User user = userRepository.findById(userid).orElse(new User());
        Product pro = productRepository.getById(pro_id);
        try {
            List<FavoriteProduct> list = favoriteRepository.findByUserIdAndProductId(userid, pro_id);
            if (list.size() == 0) {
                FavoriteProduct fav = new FavoriteProduct();
                fav.setProduct(pro);
                fav.setUser(user);
                favoriteRepository.save(fav);
                map.put("mess", "Add product to favorite successfully!");
            } else {
                map.put("mess", "Product is already in your favorite item list!");
            }
        } catch (Exception e) {
            map.put("success", "false");
            map.put("error", e.getMessage());
        }

        return map;
    }

    @DeleteMapping("/account/removeFromFav/{id}")
    public Map<String, String> removeFromFav(@PathVariable Long id) {
        Map<String, String> map = new HashMap<>();
        try {
            FavoriteProduct fav = favoriteRepository.getById(id);
            favoriteRepository.delete(fav);
            map.put("success", "true");
        } catch (Exception e) {
            map.put("success", "false");
            map.put("error", e.getMessage());
        }

        return map;
    }

}
