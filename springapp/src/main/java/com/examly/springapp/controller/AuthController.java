
package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

import org.springframework.http.HttpStatus;


@CrossOrigin
@RestController

public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/user/signup")
    public String signup(@RequestBody User user) {
        userService.saveUser(user);
        return "New User has been added";
    }
    @PostMapping("/admin/signup")
    public String adminSignup(@RequestBody User adminUser) {
        // Implement admin signup logic here
        userService.saveUser(adminUser);
        return "New Admin User has been added";
    }

    @PostMapping("/user/login")
public ResponseEntity<Map<String, Long>> userLogin(@RequestBody User loginUser) {
Optional<User> user = userService.getUserByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());

Map<String, Long> response = new HashMap<>();
if (user.isPresent()) {
    response.put("userId", user.get().getUserId());
    return ResponseEntity.ok(response);
} else {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
}
}


// @PostMapping("/admin/login")
// public ResponseEntity<Map<String, String>> adminLogin(@RequestBody User adminLoginUser) {
//     Optional<User> adminUser = userService.getAdminByEmailAndPassword(adminLoginUser.getEmail(), adminLoginUser.getPassword());

//     Map<String, String> response = new HashMap<>();
//         if(user.isPresent()){
//         response.put("userId", adminUser.get().getUserId().toString());
//         return ResponseEntity.ok(response);
//         }
//         else{
//             response.put("userId","Not FOUND");
//             return ResponseEntity.ok(response);
//         }
// }
@PostMapping("/admin/login")
public ResponseEntity<Map<String, String>> adminLogin(@RequestBody User adminLoginUser) {
    Optional<User> adminUser = userService.getAdminByEmailAndPassword(adminLoginUser.getEmail(), adminLoginUser.getPassword());

    Map<String, String> response = new HashMap<>();
    if (adminUser.isPresent()) {
        response.put("userId", adminUser.get().getUserId().toString());
        return ResponseEntity.ok(response);
    } else {
        response.put("userId", "Not Found");
        return ResponseEntity.ok(response);
    }
}



    @GetMapping("/user/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
