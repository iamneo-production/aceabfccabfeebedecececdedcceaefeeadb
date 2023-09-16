
package com.examly.springapp.controller;

import com.examly.springapp.model.UserModel;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin()
@RequestMapping("/")


public class AuthController {
    @Autowired
    private UserService userService;


    @PostMapping("/user/signup")
    public ResponseEntity<String> signup(@RequestBody UserModel user) {
        // Check if the email already exists in the user table
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.ok("Email already exists");
        }
        // If the email doesn't exist, proceed with user registration
        else{
            userService.saveUser(user);
            return ResponseEntity.ok("New User has been added");
        }
    }


    @PostMapping("/admin/signup")
    public ResponseEntity<String> adminSignup(@RequestBody UserModel adminUser) {
        // Check if the email already exists in the user table
        if (userService.getUserByEmail(adminUser.getEmail()).isPresent()) {
            return ResponseEntity.ok("Email already exists");
        }

        // If the email doesn't exist, proceed with admin user registration
        userService.saveUser(adminUser);
        return ResponseEntity.ok("New Admin User has been added");
    }


    @PostMapping("/user/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestBody UserModel loginUser) {
        Optional<UserModel> user = userService.getUserByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());

        Map<String, String> response = new HashMap<>();
        if (user.isPresent()) {
            response.put("userId", user.get().getuserId().toString());
            return ResponseEntity.ok(response);
        } else {
            response.put("userId", "Not Found");
            return ResponseEntity.ok(response);
        }
    }





    @PostMapping("/admin/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody UserModel adminLoginUser) {
        Optional<UserModel> adminUser = userService.getAdminByEmailAndPassword(adminLoginUser.getEmail(), adminLoginUser.getPassword());

        Map<String, String> response = new HashMap<>();
        if (adminUser.isPresent()) {
            response.put("userId", adminUser.get().getuserId().toString());
            return ResponseEntity.ok(response);
        } else {
            response.put("userId", "Not Found");
            return ResponseEntity.ok(response);
        }
    }



    @GetMapping("/user/getAll")
    public List<UserModel> getAllUsers() {
        return userService.getAllUsers();
    }
}
