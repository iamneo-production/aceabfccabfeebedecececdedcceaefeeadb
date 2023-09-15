package com.examly.springapp.repository;

import com.examly.springapp.model.AdmissionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

import java.util.Optional;

@Repository
public interface AdmissionRepository extends JpaRepository<AdmissionModel, Integer> {
    // Add custom query methods if needed
    List<AdmissionModel> findByUserId(int userId);


}

