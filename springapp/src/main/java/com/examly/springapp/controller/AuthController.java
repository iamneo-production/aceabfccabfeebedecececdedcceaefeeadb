package com.examly.springapp.controller;

import com.examly.springapp.model.AdminModel;
import com.examly.springapp.model.LoginModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.service.AdminService;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AdminService adminService;

    @Autowired
    public AuthController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    @GetMapping("/user/login")
    public boolean isUserPresent(@RequestBody LoginModel data) {
        // Check if a user with the given email and password exists
        List<UserModel> users = userService.getUsersByUserRole("customer");
        return users.stream().anyMatch(user -> user.getEmail().equals(data.getEmail()) && user.getPassword().equals(data.getPassword()));
    }

    @GetMapping("/admin/login")
    public boolean isAdminPresent(@RequestBody LoginModel data) {
        // Check if an admin with the given email and password exists
        List<AdminModel> admins = adminService.getAdminsByUserRole("admin");
        return admins.stream().anyMatch(admin -> admin.getEmail().equals(data.getEmail()) && admin.getPassword().equals(data.getPassword()));
    }

    @PostMapping("/user/signup")
    public void saveUser(@RequestBody UserModel user) {
        // Save the user data with userRole = "customer"
        user.setUserRole("customer");
        userService.saveUser(user);
    }

    @PostMapping("/admin/signup")
    public void saveAdmin(@RequestBody AdminModel admin) {
        // Save the admin data with userRole = "admin"
        admin.setUserRole("admin");
        adminService.saveAdmin(admin);
    }
}
