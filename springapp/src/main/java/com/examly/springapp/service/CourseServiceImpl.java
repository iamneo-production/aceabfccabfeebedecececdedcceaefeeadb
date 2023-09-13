package com.examly.springapp.service;

import com.examly.springapp.model.CourseModel;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public CourseModel createCourse(CourseModel course) {
        return courseRepository.save(course);
    }
   
    public List<CourseModel> getCoursesByInstituteInstituteId(int instituteId) {
        return courseRepository.findByInstituteInstituteId(instituteId);
    }

    @Override
    public Optional<CourseModel> getCourseById(int courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public List<CourseModel> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public CourseModel updateCourse(int courseId, CourseModel updatedCourse) {
        Optional<CourseModel> existingCourse = courseRepository.findById(courseId);

        if (existingCourse.isPresent()) {
            updatedCourse.setCourseId(courseId);
            return courseRepository.save(updatedCourse);
        } else {
            // Handle the case when the course with the given ID does not exist.
            return null; // or throw an exception
        }
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepository.deleteById(courseId);
    }

    // Implement custom service methods if needed
}
