package com.examly.springapp.service;

import com.examly.springapp.model.CourseModel;

import java.util.Optional;
import java.util.*;
public interface CourseService {
    CourseModel createCourse(CourseModel course);
    Optional<CourseModel> getCourseById(int courseId);
    List<CourseModel> getAllCourses();
    String getCourseNameById(int courseId);

    List<CourseModel> getCoursesByInstituteInstituteId(int instituteId);


    CourseModel updateCourse(int courseId, CourseModel updatedCourse);
    void deleteCourse(int courseId);
    // Add custom service methods if needed
}
