package com.examly.springapp.controller;

import com.examly.springapp.model.AdmissionModel;
import com.examly.springapp.service.AdmissionService;
import com.examly.springapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdmissionController {
    private final AdmissionService admissionService;

    @Autowired
    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    // Add an admission
    @PostMapping("/addAdmission")
    public ResponseEntity<AdmissionModel> addAdmission(@RequestBody AdmissionModel admission) {
        AdmissionModel createdAdmission = admissionService.createAdmission(admission);
        return ResponseEntity.ok(createdAdmission);
    }

    @Autowired
    private StudentService studentService; // Inject the StudentService

    @PostMapping("/addAdmissionNew/{userId}")
    public ResponseEntity<AdmissionModel> addAdmission(
            @RequestBody AdmissionModel admission,
            @PathVariable Long userId) {

        int studentId = studentService.getStudentByUserId(userId).getUserId().intValue(); // Typecast to int

        admission.setUserId(userId.intValue()); // Typecast to int
        admission.setStudentId(studentId);

        AdmissionModel createdAdmission = admissionService.createAdmission(admission);
        return ResponseEntity.ok(createdAdmission);
    }

    // Edit an admission by ID
    @PutMapping("/editAdmission/{admissionId}")
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
    @GetMapping("/viewAdmission/{admissionId}")
    public ResponseEntity<AdmissionModel> viewAdmission(@PathVariable int admissionId) {
        Optional<AdmissionModel> admission = admissionService.getAdmissionById(admissionId);
        return admission.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an admission by ID
    @DeleteMapping("/deleteAdmission/{admissionId}")
    public ResponseEntity<Void> deleteAdmission(@PathVariable int admissionId) {
        admissionService.deleteAdmission(admissionId);
        return ResponseEntity.noContent().build();
    }

    // View status of an admission by ID
    @GetMapping("/viewStatus/{admissionId}")
    public ResponseEntity<String> viewStatus(@PathVariable int admissionId) {
        Optional<AdmissionModel> admission = admissionService.getAdmissionById(admissionId);
        if (admission.isPresent()) {
            return ResponseEntity.ok(admission.get().getStatus());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // View all admissions
    @GetMapping("/admission")
    public ResponseEntity<List<AdmissionModel>> viewAllAdmission() {
        List<AdmissionModel> admissions = admissionService.getAllAdmissions();
        return ResponseEntity.ok(admissions);
    }
    @GetMapping("/viewAdmissionByUserId/{userId}")
    public ResponseEntity<List<AdmissionModel>> viewAdmissionsByUserId(@PathVariable int userId) {
        List<AdmissionModel> admissions = admissionService.getAdmissionsByUserId(userId);
        if (!admissions.isEmpty()) {
            return ResponseEntity.ok(admissions);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

}


