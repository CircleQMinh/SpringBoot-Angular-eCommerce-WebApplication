package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.UserRepository;
import com.qminh.shoppingwebapp.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class MailController {

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private UserRepository userRepository;


    @GetMapping ("/sendEmailVerifyRegister")
    public Map<String, String> sendSimpleEmail(@RequestParam(defaultValue = "") String email) {

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();
        Map<String, String> response = new HashMap<>();
        message.setTo(email);
        message.setSubject("Your Verification Code ");
        String code= RandomString.getRandomString(6);
        message.setText("Use this code to verify your account : "+code);
        response.put("success","true");
        response.put("code",code);
        // Send Message!
        this.emailSender.send(message);

        return response;
    }

    @GetMapping ("/sendEmailVerifyForgot")
    public Map<String, String> sendEmailForgot(@RequestParam(defaultValue = "") String email) {

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();
        Map<String, String> response = new HashMap<>();
        message.setTo(email);
        message.setSubject("Your Password Reset Verification Code ");
        String code= RandomString.getRandomString(6);
        message.setText("Use this code to verify your account : "+code);
        response.put("success","true");
        response.put("code",code);
        // Send Message!
        this.emailSender.send(message);

        return response;
    }

    @GetMapping ("/sendEmailNewPassword")
    public Map<String, String> sendEmailNewPassword(@RequestParam(defaultValue = "") String email) {

        User u = userRepository.findByEmail(email);
        String newPass=RandomString.getRandomString(8);
        u.setPassword(newPass);
        userRepository.save(u);

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();
        Map<String, String> response = new HashMap<>();
        message.setTo(email);
        message.setSubject("Your Password Reset Has Been Reset ");
        message.setText("Use this new password to login to your account : "+newPass);
        response.put("success","true");
        // Send Message!
        this.emailSender.send(message);

        return response;
    }
}
