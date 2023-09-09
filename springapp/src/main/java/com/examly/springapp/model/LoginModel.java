import javax.persistence.*;

@Entity
public class LoginModel extends UserModel {

    @Column(name = "user_role")
    private String userRole;

    // Constructors
    public LoginModel() {
        // Default constructor
    }

    public LoginModel(String email, String password, String userRole) {
        super(email, password);
        this.userRole = userRole;
    }

    // Getter and setter for the userRole attribute
    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
