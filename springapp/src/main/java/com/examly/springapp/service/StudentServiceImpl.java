package com.examly.springapp.service;

import com.examly.springapp.model.StudentModel;
import com.examly.springapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public StudentModel createStudent(StudentModel student) {
        return studentRepository.save(student);
    }

    @Override
    public Optional<StudentModel> getStudentById(int studentId) {
        return studentRepository.findById(studentId);
    }

    @Override
    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public StudentModel updateStudent(int studentId, StudentModel updatedStudent) {
        Optional<StudentModel> existingStudent = studentRepository.findById(studentId);

        if (existingStudent.isPresent()) {
            updatedStudent.setStudentId(studentId);
            return studentRepository.save(updatedStudent);
        } else {
            // Handle the case when the student with the given ID does not exist.
            return null; // or throw an exception
        }
    }

    @Override
    public void deleteStudent(int studentId) {
        studentRepository.deleteById(studentId);
    }
    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public StudentModel getStudentByuserId(Long userId) {
        return studentRepository.findByUserUserId(userId);
    }
    @Override
    public StudentModel getStudentByUserId(Long userId) {
        return studentRepository.findByUserUserId(userId);
    }

    @Override
    public StudentModel createOrUpdateStudent(StudentModel studentData, Long userId) {
        StudentModel existingStudent = studentRepository.findByUserUserId(userId);
        if (existingStudent != null) {
            // Update existing student data
            existingStudent.setStudentName(studentData.getStudentName());
            existingStudent.setStudentDOB(studentData.getStudentDOB());
            existingStudent.setAddress(studentData.getAddress());
            existingStudent.setMobile(studentData.getMobile());
            existingStudent.setSSLC(studentData.getSSLC());
            existingStudent.setHSC(studentData.getHSC());
            existingStudent.setDiploma(studentData.getDiploma());
            existingStudent.setEligibility(studentData.getEligibility());
            // Update other fields as needed
            return studentRepository.save(existingStudent);
        } else {
            // Create a new student record
            return studentRepository.save(studentData);
        }
    }

    // Implement custom service methods if needed
}
