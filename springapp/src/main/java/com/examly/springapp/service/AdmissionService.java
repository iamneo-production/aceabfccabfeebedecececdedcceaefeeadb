package com.examly.springapp.service;

import com.examly.springapp.model.AdmissionModel;

import java.util.Optional;
import java.util.List;

public interface AdmissionService {
    AdmissionModel createAdmission(AdmissionModel admission, int studentId, int userId);
    Optional<AdmissionModel> getAdmissionById(int admissionId);
    List<AdmissionModel> getAllAdmissions();
    AdmissionModel updateAdmission(int admissionId, AdmissionModel updatedAdmission);
    void deleteAdmission(int admissionId);
    // Add custom service methods if needed
}
