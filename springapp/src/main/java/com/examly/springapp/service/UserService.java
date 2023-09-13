package com.examly.springapp.service;

import com.examly.springapp.model.UserModel;

import java.util.Optional;
import java.util.*;

public interface UserService {
    UserModel saveUser(UserModel user);
    public List<UserModel> getAllUsers();
    Optional<UserModel> getUserByEmailAndPassword(String email, String password);
    
    Optional<UserModel> findByEmailAndPasswordAndUserRole(String email, String password, String userRole);
    Optional<UserModel> getUserByEmail(String email);
}
