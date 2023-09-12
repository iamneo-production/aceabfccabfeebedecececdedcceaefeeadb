package com.examly.springapp.repository;

import com.examly.springapp.model.CourseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CourseRepository extends JpaRepository<CourseModel, Integer> {
    // You can add custom query methods here if needed
}
