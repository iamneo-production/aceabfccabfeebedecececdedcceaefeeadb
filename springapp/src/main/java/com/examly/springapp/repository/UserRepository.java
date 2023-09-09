package com.examly.springapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface UserRepository extends JpaRepository<UserModel, Long> {
    List<UserModel> findByUserRole(String userRole);
    // You can add more custom query methods here if needed
}
