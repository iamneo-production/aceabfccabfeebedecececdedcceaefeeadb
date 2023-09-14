package com.examly.springapp.repository;

import com.examly.springapp.model.StudentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<StudentModel, Integer> {
    // Add custom query methods if needed
    StudentModel findByUserUserId(Long userId);
}
