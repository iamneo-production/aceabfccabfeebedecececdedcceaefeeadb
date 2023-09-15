package com.examly.springapp.service;

import com.examly.springapp.model.InstituteModel;
import com.examly.springapp.repository.InstituteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class InstituteServiceImpl implements InstituteService {
    @Autowired
    private InstituteRepository instituteRepository;

    @Override
    public InstituteModel createInstitute(InstituteModel institute) {
        return instituteRepository.save(institute);
    }

    @Override
    public Optional<InstituteModel> getInstituteById(int instituteId) {
        return instituteRepository.findById(instituteId);
    }

    @Override
    public List<InstituteModel> getAllInstitutes() {
        return instituteRepository.findAll();
    }

    @Override
    public InstituteModel updateInstitute(int instituteId, InstituteModel updatedInstitute) {
        Optional<InstituteModel> existingInstitute = instituteRepository.findById(instituteId);

        if (existingInstitute.isPresent()) {
            updatedInstitute.setInstituteId(instituteId);
            return instituteRepository.save(updatedInstitute);
        } else {
            // Handle the case when the institute with the given ID does not exist.
            return null; // or throw an exception
        }
    }
    @Override
    public String getInstituteNameById(int instituteId) {
        Optional<InstituteModel> instituteOptional = instituteRepository.findById(instituteId);
        return instituteOptional.map(InstituteModel::getInstituteName).orElse(null);
    }


    @Override
    public void deleteInstitute(int instituteId) {
        instituteRepository.deleteById(instituteId);
    }

    // Implement custom service methods if needed
}
