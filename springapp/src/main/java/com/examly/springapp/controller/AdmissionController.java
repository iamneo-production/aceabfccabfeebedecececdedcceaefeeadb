package com.examly.springapp.controller;

import com.examly.springapp.model.AdmissionModel;
import com.examly.springapp.service.AdmissionService;
import com.examly.springapp.service.StudentService; // Import StudentService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpStatus;
import java.util.*;



@RestController
@CrossOrigin
@RequestMapping("/")
public class AdmissionController {
    private final AdmissionService admissionService;
    private final StudentService studentService;

    @Autowired
    public AdmissionController(AdmissionService admissionService, StudentService studentService) {
        this.admissionService = admissionService;
        this.studentService = studentService; // Initialize StudentService
    }

    // Add an admission
    @PostMapping("/admin/addAdmission")
    public ResponseEntity<AdmissionModel> addAdmission(@RequestBody AdmissionModel admission) {
        AdmissionModel createdAdmission = admissionService.createAdmission(admission);
        return ResponseEntity.ok(createdAdmission);
    }


    @PostMapping("/addAdmissionNew/{userId}")
public ResponseEntity<AdmissionModel> addAdmission(
        @PathVariable int userId,
        @RequestParam int courseId,
        @RequestParam int instituteId,
        @RequestParam String status
) {
    // Fetch the corresponding studentId from the Student table using userId
    int studentId = studentService.getStudentIdByUserId(userId);
    
    // Create a new AdmissionModel using the provided data
    AdmissionModel admission = new AdmissionModel(courseId, instituteId, status, studentId, userId);
    
    // Create the admission with studentId and userId
    AdmissionModel createdAdmission = admissionService.createAdmission(admission);
    
    return ResponseEntity.ok(createdAdmission);
}



        







    // Edit an admission by ID
    @PutMapping("/admin/editAdmission/{admissionId}")
    public ResponseEntity<AdmissionModel> editAdmission(
            @PathVariable int admissionId, @RequestBody AdmissionModel updatedAdmission) {
        AdmissionModel admission = admissionService.updateAdmission(admissionId, updatedAdmission);
        if (admission != null) {
            return ResponseEntity.ok(admission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    // View an admission by ID
@GetMapping("/admin/viewAdmission/{admissionId}")
public ResponseEntity<AdmissionModel> viewAdmission(@PathVariable int admissionId) {
    Optional<AdmissionModel> admission = admissionService.getAdmissionById(admissionId);
    return admission.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
}

  

    // Delete an admission by ID
    @DeleteMapping("/admin/deleteAdmission/{admissionId}")
    public ResponseEntity<Void> deleteAdmission(@PathVariable int admissionId) {
        admissionService.deleteAdmission(admissionId);
        return ResponseEntity.noContent().build();
    }

    // View status of an admission by ID
    @GetMapping("/admin/viewStatus/{admissionId}")
    public ResponseEntity<String> viewStatus(@PathVariable int admissionId) {
        Optional<AdmissionModel> admission = admissionService.getAdmissionById(admissionId);
        if (admission.isPresent()) {
            return ResponseEntity.ok(admission.get().getStatus());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // View all admissions
    @GetMapping("/admin/admission")
    public ResponseEntity<List<AdmissionModel>> viewAllAdmission() {
        List<AdmissionModel> admissions = admissionService.getAllAdmissions();
        return ResponseEntity.ok(admissions);
    }
}
