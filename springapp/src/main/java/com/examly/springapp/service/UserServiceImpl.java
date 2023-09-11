
package com.examly.springapp.service;

import com.examly.springapp.model.UserModel;
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
    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<UserModel> getUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Optional<UserModel> getAdminByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPasswordAndUserRole(email, password, "admin");
    }
    @Override
    public Optional<UserModel> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    

    @Override
    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }
}
