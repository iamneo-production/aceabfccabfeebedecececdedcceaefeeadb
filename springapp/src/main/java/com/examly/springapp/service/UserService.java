package com.examly.springapp.service;

import com.examly.springapp.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}
