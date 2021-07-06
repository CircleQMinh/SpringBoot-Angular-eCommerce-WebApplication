package com.qminh.shoppingwebapp.model;

import javax.persistence.*;

@Entity
@Table(name = "verify_code")
public class VerifyCode {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "verify_code")
    private String verifyCode;

    @Column(name = "email")
    private String email;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVerifyCode() {
        return this.verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
