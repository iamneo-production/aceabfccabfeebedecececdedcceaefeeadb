package com.examly.springapp.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
@Entity
public class CourseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;
    
    private String courseName;
    private String courseDescription;
    private int courseDuration;
    
    // Institute ID as a foreign key
    @ManyToOne
    @JoinColumn(name = "institute_id")
    private InstituteModel institute;
    
    // Constructors...

    // Default constructor
    public CourseModel() {
    }

    // Parameterized constructor
    public CourseModel(String courseName, String courseDescription, int courseDuration, InstituteModel institute) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseDuration = courseDuration;
        this.institute = institute;
    }

    // Getters and setters...

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public int getCourseDuration() {
        return courseDuration;
    }

    public void setCourseDuration(int courseDuration) {
        this.courseDuration = courseDuration;
    }

    public InstituteModel getInstitute() {
        return institute;
    }

    public void setInstitute(InstituteModel institute) {
        this.institute = institute;
    }
}
