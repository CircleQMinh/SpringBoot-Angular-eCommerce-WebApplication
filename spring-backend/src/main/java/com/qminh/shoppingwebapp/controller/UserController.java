package com.qminh.shoppingwebapp.controller;


import com.qminh.shoppingwebapp.exception.ResourceNotFoundException;
import com.qminh.shoppingwebapp.model.Product;
import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/Users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/Users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long UserId)
            throws ResourceNotFoundException {
        User user = userRepository.findById(UserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + UserId));
        return ResponseEntity.ok().body(user);
    }
    @GetMapping("/UserInfo/{uname}")
    public ResponseEntity<User> getUserByUName(@PathVariable(value = "uname") String un) {
        User user = userRepository.findByUsername(un);

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/Users/createUser")
    public User createUser( @RequestBody User User) {
        return userRepository.save(User);
    }

    @PutMapping("/Users/updateInfo/{uname}")
    public Map<String,Boolean> updateUserInfo(@PathVariable(value = "uname") String un,
                                                   @RequestBody User userDetails) {

        Map<String,Boolean> map=new HashMap<>();
        try{
            User u = userRepository.findByUsername(un);
            u.setPhone(userDetails.getPhone());
            u.setName(userDetails.getName());
            userRepository.save(u);
            map.put("success",true);

        }
        catch (Exception e){
            map.put("success",false);
        }
        return map;
    }
    @PutMapping("/Users/updateImg/{uname}")
    public Map<String,Boolean> changeUserImg(@PathVariable(value = "uname") String un,
                                             @RequestBody User userDetails){

        Map<String,Boolean> map=new HashMap<>();
        try{
            User u = userRepository.findByUsername(un);
            u.setImgUrl(userDetails.getImgUrl());
            userRepository.save(u);
            map.put("success",true);
        }
        catch (Exception e){
            map.put("success",false);
        }

        return map;
    }



    @GetMapping("/User/login")
    public Map<String, Boolean> tryLogin(@RequestParam(defaultValue = "empty") String un, @RequestParam(defaultValue = "empty") String pw) {
        List<User> users = userRepository.findByUsernameAndPassword(un,pw);
        Map<String, Boolean> response = new HashMap<>();
        if(users.isEmpty()){
            response.put("success", Boolean.FALSE);
        }
        else{
            response.put("success", Boolean.TRUE);
        }

        return response;
    }

    @GetMapping("/User/checkIfUsernameExist")
    public Map<String, Boolean> checkIfUsernameExist(@RequestParam(defaultValue = "empty") String username) {
        User u = userRepository.findByUsername(username);
        Map<String, Boolean> response = new HashMap<>();
        if(u==null){
            response.put("success", Boolean.FALSE);
        }
        else{
            response.put("success", Boolean.TRUE);
        }
        return response;
    }


    @GetMapping("/User/checkIfEmailExist")
    public Map<String, Boolean> checkIfEmailExist(@RequestParam(defaultValue = "empty") String email) {
        User u = userRepository.findByEmail(email);
        Map<String, Boolean> response = new HashMap<>();
        if(u==null){
            response.put("success", Boolean.FALSE);
        }
        else{
            response.put("success", Boolean.TRUE);
        }
        return response;
    }
    @GetMapping("/User/getUserList")
    public Page<User> getUserListSecure(@RequestParam(defaultValue = "1") int pageNumber,
                                        @RequestParam(defaultValue = "12") int pageSize,
                                        @RequestParam(defaultValue ="" ) String orderBy,
                                        @RequestParam(defaultValue = "") String role){


        Page<User> page;
        String order="abc";
        switch (orderBy) {
            case "id":
                order = "id";
                break;
            case "username":
                order = "username";
                break;
            case "name":
                order = "name";
                break;
            case "status":
                order = "status";
                break;
        }
        if(role.equals("all")){
            page=userRepository.findAll(PageRequest.of(pageNumber-1,pageSize, Sort.by(Sort.Direction.ASC, order)));

        }
        else{
            page=userRepository.findByRole(role,PageRequest.of(pageNumber-1,pageSize,Sort.by(Sort.Direction.ASC, order)));
        }
        page.forEach(user -> {
            user.setPassword("");
        });
        return page;
    }


    @PostMapping("/User/createNewUser")
    public Map<String, Boolean> createUserAdmin(@RequestBody User u) {

        Map<String, Boolean> response = new HashMap<>();
        try{
            userRepository.save(u);
            response.put("success", Boolean.TRUE);
        }
        catch (Exception e){
            response.put("success", Boolean.FALSE);
        }
        return response;
    }

    @PutMapping("/User/updateUser")
    public Map<String,Boolean> updateUser(@RequestBody User u){
        Map<String,Boolean> map=new HashMap<>();

        try {
            User user = userRepository.findByEmail(u.getEmail());
            user.setName(u.getName());
            user.setPhone(u.getPhone());
            user.setStatus(u.getStatus());
            user.setRole(u.getRole());
            user.setImgUrl(u.getImgUrl());
            userRepository.save(user);
            map.put("success",Boolean.TRUE);
        }
        catch (Exception e){
            map.put("success",Boolean.FALSE);
        }
        return map;
    }

    @DeleteMapping("/User/deleteUser/{id}")
    public Map<String,String> deleteUser(@PathVariable Long id){
        Map<String,String> map=new HashMap<>();
        User pro = userRepository.getById(id);
        try {
            userRepository.delete(pro);
            map.put("success","true");
        }
        catch (Exception e){
            map.put("success","false");
            map.put("error",e.getMessage());

        }
        return map;
    }
}
