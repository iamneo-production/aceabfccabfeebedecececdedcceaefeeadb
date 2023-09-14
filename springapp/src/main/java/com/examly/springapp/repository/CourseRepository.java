package com.examly.springapp.repository;

import com.examly.springapp.model.CourseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.*;



import java.util.Optional;
@Repository
public interface CourseRepository extends JpaRepository<CourseModel, Integer> {
    // You can add custom query methods here if needed
    @Query("SELECT c FROM CourseModel c WHERE c.institute.instituteId = :instituteId")
List<CourseModel> findByInstituteInstituteId(@Param("instituteId") int instituteId);

}
