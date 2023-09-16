package com.examly.springapp.controller;

import com.examly.springapp.model.AdmissionModel;
import com.examly.springapp.service.AdmissionService;

import com.examly.springapp.model.CourseModel;
import com.examly.springapp.service.CourseService;

import com.examly.springapp.model.InstituteModel;
import com.examly.springapp.service.InstituteService;

import com.examly.springapp.model.StudentModel;
import com.examly.springapp.service.StudentService;

import com.examly.springapp.model.UserModel;
import com.examly.springapp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    private final StudentService studentService;
    private final CourseService courseService;
    private final InstituteService instituteService;

    @Autowired
    public AdminController(StudentService studentService, CourseService courseService,
            InstituteService instituteService) {
        this.studentService = studentService;
        this.courseService = courseService;
        this.instituteService = instituteService;
    }

    // Student operations
    @PostMapping("/addStudent")
    public ResponseEntity<StudentModel> addStudent(@RequestBody StudentModel student) {
        StudentModel createdStudent = studentService.createStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<StudentModel> viewStudent(@PathVariable int studentId) {
        Optional<StudentModel> student = studentService.getStudentById(studentId);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/editStudent/{studentId}")
    public ResponseEntity<StudentModel> editStudent(@PathVariable int studentId,
            @RequestBody StudentModel updatedStudent) {
        StudentModel student = studentService.updateStudent(studentId, updatedStudent);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteStudent/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable int studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student")
    public ResponseEntity<List<StudentModel>> viewAllStudents() {
        List<StudentModel> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("getStudent/{userId}")
    public ResponseEntity<StudentModel> getStudentByuserId(@PathVariable Long userId) {
        StudentModel student = studentService.getStudentByUserId(userId);
        return ResponseEntity.ok(student);
    }

    @PostMapping("addStudentNew/{userId}")
    public ResponseEntity<StudentModel> createOrUpdateStudent(@PathVariable Long userId,
            @RequestBody StudentModel studentData) {
        // Check if a student with the given user ID exists
        StudentModel existingStudent = studentService.getStudentByUserId(userId);

        if (existingStudent != null) {
            // A student with the same user ID already exists, update the existing student's
            // details
            existingStudent.setStudentName(studentData.getStudentName());
            existingStudent.setStudentDOB(studentData.getStudentDOB());
            existingStudent.setAddress(studentData.getAddress());
            existingStudent.setMobile(studentData.getMobile());
            existingStudent.setSSLC(studentData.getSSLC());
            existingStudent.setHSC(studentData.getHSC());
            existingStudent.setDiploma(studentData.getDiploma());
            existingStudent.setEligibility(studentData.getEligibility());

            // Save the updated student
            StudentModel updatedStudent = studentService.updateStudent(existingStudent.getStudentId(), existingStudent);

            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        } else {
            // No student with the same user ID exists, create a new student record with the
            // provided userId
            studentData.setUserId(userId); // Set the userId directly in the studentData
            StudentModel createdStudent = studentService.createStudent(studentData);

            return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
        }
    }

    // Course operations
    @PostMapping("/addCourse")
    public ResponseEntity<CourseModel> addCourse(@RequestBody CourseModel course) {
        CourseModel createdCourse = courseService.createCourse(course);
        return ResponseEntity.ok(createdCourse);
    }

    @GetMapping("/viewCourse/{courseId}")
    public ResponseEntity<CourseModel> viewCourse(@PathVariable int courseId) {
        Optional<CourseModel> course = courseService.getCourseById(courseId);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/editCourse/{courseId}")
    public ResponseEntity<CourseModel> editCourse(@PathVariable int courseId, @RequestBody CourseModel updatedCourse) {
        CourseModel course = courseService.updateCourse(courseId, updatedCourse);
        if (course != null) {
            return ResponseEntity.ok(course);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable int courseId) {
        courseService.deleteCourse(courseId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseModel>> viewAllCourses() {
        List<CourseModel> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/coursesByInstitute/{instituteId}")
    public ResponseEntity<List<CourseModel>> getCoursesByInstituteId(@PathVariable int instituteId) {
        List<CourseModel> courses = courseService.getCoursesByInstituteInstituteId(instituteId);

        if (courses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(courses);
        }
    }

    // Institute operations
    @PostMapping("/addInstitute")
    public ResponseEntity<InstituteModel> addInstitute(@RequestBody InstituteModel institute) {
        InstituteModel createdInstitute = instituteService.createInstitute(institute);
        return ResponseEntity.ok(createdInstitute);
    }

    @GetMapping("/viewInstitute/{instituteId}")
    public ResponseEntity<InstituteModel> viewInstitute(@PathVariable int instituteId) {
        Optional<InstituteModel> institute = instituteService.getInstituteById(instituteId);
        return institute.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/editInstitute/{instituteId}")
    public ResponseEntity<InstituteModel> editInstitute(@PathVariable int instituteId,
            @RequestBody InstituteModel updatedInstitute) {
        InstituteModel institute = instituteService.updateInstitute(instituteId, updatedInstitute);
        if (institute != null) {
            return ResponseEntity.ok(institute);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteInstitute/{instituteId}")
    public ResponseEntity<Void> deleteInstitute(@PathVariable int instituteId) {
        instituteService.deleteInstitute(instituteId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/institute")
    public ResponseEntity<List<InstituteModel>> viewAllInstitutes() {
        List<InstituteModel> institutes = instituteService.getAllInstitutes();
        return ResponseEntity.ok(institutes);
    }

    // Note this is for MASS INSERTING OF DATA .
    @PostMapping("/addInstitutes")
    public ResponseEntity<List<InstituteModel>> addInstitute(@RequestBody List<InstituteModel> institutes) {
        List<InstituteModel> createdInstitutes = new ArrayList<>();

        for (InstituteModel institute : institutes) {
            InstituteModel createdInstitute = instituteService.createInstitute(institute);
            createdInstitutes.add(createdInstitute);
        }

        return ResponseEntity.ok(createdInstitutes);
    }

    @PostMapping("/addCourses")
    public ResponseEntity<List<CourseModel>> addCourses(@RequestBody List<CourseModel> courses) {
        List<CourseModel> createdCourses = new ArrayList<>();

        for (CourseModel course : courses) {
            CourseModel createdCourse = courseService.createCourse(course);
            createdCourses.add(createdCourse);
        }

        return ResponseEntity.ok(createdCourses);
    }



   
    @PostMapping("/addCourseNew/{instituteId}")
    public ResponseEntity<CourseModel> addCourse(@RequestBody CourseModel course, @PathVariable int instituteId) {
        CourseModel createdCourse = courseService.createCourseWithInstitute(instituteId, course);
        if (createdCourse != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            // You can also throw an exception or return an error message here.
        }
    }

}
