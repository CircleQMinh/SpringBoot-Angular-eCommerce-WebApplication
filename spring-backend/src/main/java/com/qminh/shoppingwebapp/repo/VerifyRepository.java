package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.User;
import com.qminh.shoppingwebapp.model.VerifyCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VerifyRepository extends JpaRepository<VerifyCode, Long> {

    List<VerifyCode> findByEmailAndVerifyCode(String email, String code);
    VerifyCode findByEmail(String email);
}
