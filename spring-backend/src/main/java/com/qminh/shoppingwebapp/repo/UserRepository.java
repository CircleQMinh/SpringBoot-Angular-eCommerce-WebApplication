package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsernameAndPassword(String un,String pw);
    User findByUsername(String un);
    User findByEmail(String email);

    Page<User> findAll(Pageable pageable);
    Page<User> findByRole(String role,Pageable pageable);

}
