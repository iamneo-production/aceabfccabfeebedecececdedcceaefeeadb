package com.examly.springapp.service;

import com.examly.springapp.model.CourseModel;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.*;

public interface CourseService {
    CourseModel createCourse(CourseModel course);
    Optional<CourseModel> getCourseById(int courseId);
    List<CourseModel> getAllCourses();
    CourseModel updateCourse(int courseId, CourseModel updatedCourse);
    void deleteCourse(int courseId);
    // Add custom service methods if needed
}
