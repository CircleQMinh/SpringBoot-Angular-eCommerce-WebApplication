package com.qminh.shoppingwebapp.model;

import javax.persistence.*;

@Entity
@Table(name = "favorite_product", schema = "dbtmdt")
public class FavoriteProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User userId) {
        this.user = userId;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product productId) {
        this.product = productId;
    }
}
