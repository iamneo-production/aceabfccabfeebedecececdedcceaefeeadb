package com.examly.springapp.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;



@Entity
public class AdminModel extends UserModel {

    @Column(name = "mobile_number")
    private String mobileNumber;

    // Constructors
    public AdminModel() {
        // Default constructor
    }

    public AdminModel(String email, String password, String userRole, String mobileNumber) {
        super(email, password, userRole);
        this.mobileNumber = mobileNumber;
    }

    // Getters and setters for admin-specific attributes
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
