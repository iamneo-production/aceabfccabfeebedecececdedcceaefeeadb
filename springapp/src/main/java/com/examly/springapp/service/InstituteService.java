package com.examly.springapp.service;

import com.examly.springapp.model.InstituteModel;

import java.util.Optional;
import java.util.*;

public interface InstituteService {
    InstituteModel createInstitute(InstituteModel institute);
    Optional<InstituteModel> getInstituteById(int instituteId);
    List<InstituteModel> getAllInstitutes();
    InstituteModel updateInstitute(int instituteId, InstituteModel updatedInstitute);
    void deleteInstitute(int instituteId);
    String getInstituteNameById(int instituteId);
    // Add custom service methods if needed
}
