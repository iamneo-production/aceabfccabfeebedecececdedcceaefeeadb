package com.examly.springapp.service;

import com.examly.springapp.model.AdmissionModel;
import com.examly.springapp.repository.AdmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AdmissionServiceImpl implements AdmissionService {
    @Autowired
    private AdmissionRepository admissionRepository;

    @Override
    public AdmissionModel createAdmission(AdmissionModel admission) {
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
            return null; 
        }
    }

    @Override
    public void deleteAdmission(int admissionId) {
        admissionRepository.deleteById(admissionId);
    }

    // Implement custom service methods if needed
}
