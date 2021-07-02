package com.qminh.shoppingwebapp.controller;


import com.qminh.shoppingwebapp.exception.ResourceNotFoundException;
import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<User> getUserByUName(@PathVariable(value = "uname") String un)
            throws ResourceNotFoundException {
        User user = userRepository.findByUsername(un);

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/Users")
    public User createUser( @RequestBody User User) {
        return userRepository.save(User);
    }

    @PutMapping("/Users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long UserId,
                                                   @RequestBody User UserDetails) throws ResourceNotFoundException {
        User user = userRepository.findById(UserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + UserId));
        user.setEmail(UserDetails.getEmail());
        user.setPhone(UserDetails.getPhone());
        user.setName(UserDetails.getName());
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/Users/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long UserId)
            throws ResourceNotFoundException {
        User User = userRepository.findById(UserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + UserId));

        userRepository.delete(User);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    @GetMapping("/User/login")
    public Map<String, Boolean> tryLogin(@RequestParam(defaultValue = "empty") String un, @RequestParam(defaultValue = "empty") String pw)
            throws ResourceNotFoundException {
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
}
