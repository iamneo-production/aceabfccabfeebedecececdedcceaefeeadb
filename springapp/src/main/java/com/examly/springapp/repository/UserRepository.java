import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    List<UserModel> findByUserRole(String userRole);
    // You can add more custom query methods here if needed
}
