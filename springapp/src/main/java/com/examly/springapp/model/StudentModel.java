package com.examly.springapp.model;

import java.util.Date;
import javax.persistence.*;
import lombok.*;

@Entity
@Data
public class StudentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    private String studentName;

    @Temporal(TemporalType.DATE)
    private Date studentDOB;

    private String address;
    private String mobile;
    private int SSLC;
    private int HSC;
    private int Diploma;
    private String eligibility;

    private Long userId; // Added userId field

    // Constructors...

    // Default constructor
    public StudentModel() {
    }

    // Parameterized constructor
    public StudentModel(String studentName, Date studentDOB, String address, String mobile, int SSLC, int HSC, int Diploma, String eligibility, Long userId) {
        this.studentName = studentName;
        this.studentDOB = studentDOB;
        this.address = address;
        this.mobile = mobile;
        this.SSLC = SSLC;
        this.HSC = HSC;
        this.Diploma = Diploma;
        this.eligibility = eligibility;
        this.userId = userId; // Set userId
    }

    // Getters and setters...

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Date getStudentDOB() {
        return studentDOB;
    }

    public void setStudentDOB(Date studentDOB) {
        this.studentDOB = studentDOB;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public int getSSLC() {
        return SSLC;
    }

    public void setSSLC(int SSLC) {
        this.SSLC = SSLC;
    }

    public int getHSC() {
        return HSC;
    }

    public void setHSC(int HSC) {
        this.HSC = HSC;
    }

    public int getDiploma() {
        return Diploma;
    }

    public void setDiploma(int Diploma) {
        this.Diploma = Diploma;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
