package com.examly.springapp.service;
import com.examly.springapp.model.StudentModel;

import com.examly.springapp.model.AdmissionModel;


import java.util.Optional;
import java.util.*;

public interface AdmissionService {
    AdmissionModel createAdmission(AdmissionModel admission);
    Optional<AdmissionModel> getAdmissionById(int admissionId);
    List<AdmissionModel> getAllAdmissions();
    AdmissionModel updateAdmission(int admissionId, AdmissionModel updatedAdmission);
    void deleteAdmission(int admissionId);
    // Add custom service methods if needed
    StudentModel getStudentByUserId(Long userId);
    
   



    // Other methods in AdmissionService



}
