package com.examly.springapp.service;

import com.examly.springapp.model.CourseModel;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.model.InstituteModel;


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

    @Override
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
    @Override
    public String getCourseNameById(int courseId) {
        Optional<CourseModel> courseOptional = courseRepository.findById(courseId);
        return courseOptional.map(CourseModel::getCourseName).orElse(null);
    }

    // Implement custom service methods if needed


    @Autowired
    private InstituteService instituteService;

    @Override
    public CourseModel createCourseWithInstitute(int instituteId, CourseModel course) {
        // Retrieve the institute associated with the given instituteId
        Optional<InstituteModel> instituteOptional = instituteService.getInstituteById(instituteId);

        if (instituteOptional.isPresent()) {
            InstituteModel institute = instituteOptional.get();
            course.setInstitute(institute);
            return courseRepository.save(course);
        } else {
            // Handle the case when the institute with the given ID does not exist.
            return null; // or throw an exception
        }
    }
}
