package com.examly.springapp.service;

import com.examly.springapp.model.AdmissionModel;
import com.examly.springapp.repository.AdmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdmissionServiceImpl implements AdmissionService {

    private final AdmissionRepository admissionRepository;

    @Autowired
    public AdmissionServiceImpl(AdmissionRepository admissionRepository) {
        this.admissionRepository = admissionRepository;
    }

    @Override
    public AdmissionModel createAdmission(AdmissionModel admission, int studentId, int userId) {
        // Set the studentId and userId in the admission model
        admission.setStudentId(studentId);
        admission.setUserId(userId);
        
        // Save the admission record
        return admissionRepository.save(admission);
    }

    @Override
    public Optional<AdmissionModel> getAdmissionById(int admissionId) {
        return admissionRepository.findById(admissionId);
    }

    @Override
    public List<AdmissionModel> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    @Override
    public AdmissionModel updateAdmission(int admissionId, AdmissionModel updatedAdmission) {
        Optional<AdmissionModel> existingAdmission = admissionRepository.findById(admissionId);

        if (existingAdmission.isPresent()) {
            updatedAdmission.setAdmissionId(admissionId);
            return admissionRepository.save(updatedAdmission);
        } else {
            // Handle the case when the admission with the given ID does not exist.
            return null; // or throw an exception
        }
    }

    @Override
    public void deleteAdmission(int admissionId) {
        admissionRepository.deleteById(admissionId);
    }
}
