package com.examly.springapp.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
public class CourseWithAdmissionsDTO {
    private CourseModel course;
    private int admissionCount;

    public CourseWithAdmissionsDTO(CourseModel course, int admissionCount) {
        this.course = course;
        this.admissionCount = admissionCount;
    }

    public CourseModel getCourse() {
        return course;
    }

    public int getAdmissionCount() {
        return admissionCount;
    }
}
