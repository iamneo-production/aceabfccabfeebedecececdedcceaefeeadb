package com.examly.springapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AdmissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admissionId;

    private int courseId;
    private int instituteId;
    private String status;

    @Column(name = "student_id")
    private int studentId;

    @Column(name = "user_id")
    private int userId;

    // Constructors...

    // Default constructor
    public AdmissionModel() {
    }

    // Parameterized constructor
    public AdmissionModel(int courseId, int instituteId, String status, int studentId, int userId) {
        this.courseId = courseId;
        this.instituteId = instituteId;
        this.status = status;
        this.studentId = studentId;
        this.userId = userId;
    }

    // Getters and setters...

    // Update getters and setters for studentId and userId accordingly.

    public int getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(int admissionId) {
        this.admissionId = admissionId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public int getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(int instituteId) {
        this.instituteId = instituteId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
