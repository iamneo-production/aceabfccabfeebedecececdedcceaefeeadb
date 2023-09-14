package com.examly.springapp.service;

import com.examly.springapp.model.StudentModel;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    StudentModel createStudent(StudentModel student);
    Optional<StudentModel> getStudentById(int studentId);
    Optional<StudentModel> getStudentByUserId(Long userId); // Updated return type
    List<StudentModel> getAllStudents();
    StudentModel updateStudent(int studentId, StudentModel updatedStudent);
    void deleteStudent(int studentId);
    // Add custom service methods if needed
    StudentModel getStudentByuserId(Long userId);
    StudentModel createOrUpdateStudent(StudentModel studentData, Long userId);
}
