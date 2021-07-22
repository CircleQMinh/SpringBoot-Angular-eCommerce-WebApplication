package com.qminh.shoppingwebapp.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "review", schema = "dbtmdt")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "productid")
    private Product product;

    @Column(name = "blogid")
    private Integer blogid;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "content")
    private String content;

    @Column(name = "star")
    private Integer star;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User userid) {
        this.user = userid;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product productid) {
        this.product = productid;
    }

    public Integer getBlogid() {
        return this.blogid;
    }

    public void setBlogid(Integer blogid) {
        this.blogid = blogid;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStar() {
        return this.star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }
}
