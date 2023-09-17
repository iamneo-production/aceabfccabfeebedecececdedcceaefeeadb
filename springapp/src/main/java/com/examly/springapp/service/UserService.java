package com.examly.springapp.service;

import com.examly.springapp.model.UserModel;

import java.util.Optional;
import java.util.*;

public interface UserService {
    UserModel saveUser(UserModel user);
    public List<UserModel> getAllUsers();
    Optional<UserModel> getUserByEmailAndPassword(String email, String password);
    Optional<UserModel> getAdminByEmailAndPassword(String email, String password);
    Optional<UserModel> getUserByEmail(String email);
    Long getNewUserId();
}
