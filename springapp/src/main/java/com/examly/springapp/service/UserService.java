// package com.examly.springapp.service;

// import com.examly.springapp.model.User;
// import org.springframework.stereotype.Service;

// import java.util.List;
// @Service
// public interface UserService {
//     public User saveUser(User user);
//     public List<User> getAllUsers();
// }
package com.examly.springapp.service;

import com.examly.springapp.model.User;

import java.util.Optional;
import java.util.*;

public interface UserService {
    User saveUser(User user);
    public List<User> getAllUsers();
    Optional<User> getUserByEmailAndPassword(String email, String password);
    Optional<User> getAdminByEmailAndPassword(String email, String password);
}
