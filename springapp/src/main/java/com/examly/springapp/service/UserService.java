package com.examly.springapp.service;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserModel> getUsersByUserRole(String userRole) {
        return userRepository.findByUserRole(userRole);
    }

    public void saveUser(UserModel user) {
        userRepository.save(user);
    }

    // You can add more service methods here if needed
}
