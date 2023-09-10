// package com.examly.springapp.controller;

// import com.examly.springapp.model.User;
// import com.examly.springapp.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// @CrossOrigin
// @RestController
// @RequestMapping("/user")

// public class AuthController {
//     @Autowired
//     private UserService userService;

//     @PostMapping("/add")
//     public String add(@RequestBody User user){
//         userService.saveUser(user);
//         return "New User has been added";
//     }
//     @GetMapping("/getAll")
//     public List<User> getAllUsers(){
//         return userService.getAllUsers();
//     }

// }
package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public Long userLogin(@RequestBody User loginUser) {
        Optional<User> user = userService.getUserByEmailAndPassword(loginUser.getEmail(), loginUser.getPassword());
        return user.map(User::getUserId).orElse(null);
    }

   

    @PostMapping("/admin/login")
    public Long adminLogin(@RequestBody User adminLoginUser) {
        Optional<User> adminUser = userService.getAdminByEmailAndPassword(adminLoginUser.getEmail(), adminLoginUser.getPassword());
        return adminUser.map(User::getUserId).orElse(null);
    }

    @GetMapping("/user/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
