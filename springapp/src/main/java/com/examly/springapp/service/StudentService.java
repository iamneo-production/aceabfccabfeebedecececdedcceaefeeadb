package com.examly.springapp.service;

import com.examly.springapp.model.StudentModel;
import java.util.List;
import java.util.Optional;

public interface StudentService {
    StudentModel createStudent(StudentModel student);
    Optional<StudentModel> getStudentById(int studentId);
    List<StudentModel> getAllStudents();
    StudentModel updateStudent(int studentId, StudentModel updatedStudent);
    void deleteStudent(int studentId);
    StudentModel getStudentByUserId(Long userId);
    StudentModel createOrUpdateStudent(StudentModel studentData, Long userId);
}
