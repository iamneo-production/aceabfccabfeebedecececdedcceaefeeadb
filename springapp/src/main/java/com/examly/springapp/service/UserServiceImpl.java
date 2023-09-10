// package com.examly.springapp.service;

// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// import java.util.List;
// @Service
// public class UserServiceImpl implements UserService{

//     @Autowired
//     private UserRepository userRepository;
//     @Override
//     public User saveUser(User user) {
//         return userRepository.save(user);
//     }

//     @Override
//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }
// }
package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Optional<User> getAdminByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPasswordAndUserRole(email, password, "admin");
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
