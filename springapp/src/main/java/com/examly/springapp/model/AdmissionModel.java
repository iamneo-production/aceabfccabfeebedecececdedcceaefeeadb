package com.examly.springapp.model;

// Imports...

@Entity
public class AdmissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admissionId;

    private int courseId;
    private int instituteId;
    private String status;

    @Column(name = "student_id") // New column for studentId
    private int studentId;

    @Column(name = "user_id") // New column for userId
    private int userId;

    // Constructors...

    // Getters and setters...

    // Update getters and setters for studentId and userId accordingly.
}
