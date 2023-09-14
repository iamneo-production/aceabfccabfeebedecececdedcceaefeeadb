package com.examly.springapp.service;

import com.examly.springapp.model.StudentModel;

import java.util.Optional;
import java.util.*;

public interface StudentService {
    StudentModel createStudent(StudentModel student);
    Optional<StudentModel> getStudentById(int studentId);
    StudentModel getStudentByUserId(Long userId);
    List<StudentModel> getAllStudents();
    StudentModel updateStudent(int studentId, StudentModel updatedStudent);
    void deleteStudent(int studentId);
    // Add custom service methods if needed
    StudentModel getStudentByuserId(Long userId);
    StudentModel createOrUpdateStudent(StudentModel studentData, Long userId);
}

