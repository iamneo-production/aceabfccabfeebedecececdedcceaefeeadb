package com.examly.springapp.model;
import jakarta.persistence.Entity;




@Entity
public class LoginModel extends UserModel {

    // Constructors
    public LoginModel() {
        // Default constructor
    }

    public LoginModel(String email, String password, String userRole) {
        super(email, password, userRole);
    }

    // No additional attributes for login-specific model
}
