package com.qminh.shoppingwebapp.controller;


import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.model.VerifyCode;
import com.qminh.shoppingwebapp.repo.UserRepository;
import com.qminh.shoppingwebapp.repo.VerifyRepository;
import com.qminh.shoppingwebapp.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class VerifyController {

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerifyRepository verifyRepository;

    @GetMapping("/requestVerifyChangePassword")
    public Map<String,String> requestVerifyChangePass(@RequestParam(defaultValue = "") String email,
                                                      @RequestParam(defaultValue = "") String pass,
                                                      @RequestParam(defaultValue = "") String code){
        Map<String,String> response = new HashMap<>();

        List<VerifyCode> vc = verifyRepository.findByEmailAndVerifyCode(email,code);
        if(vc.isEmpty()){
            response.put("success","false");
        }
        else{
            User u = userRepository.findByEmail(email);
            u.setPassword(pass);
            userRepository.save(u);
            for(int i=0;i<vc.size();i++){
                verifyRepository.delete(vc.get(i));
            }
            response.put("success","true");
        }
        return response;
    }


}
