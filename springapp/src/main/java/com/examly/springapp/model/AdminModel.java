import javax.persistence.*;

@Entity
public class AdminModel extends UserModel {

    @Column(name = "mobile_number")
    private String mobileNumber;

    // Constructors
    public AdminModel() {
        // Default constructor
    }

    public AdminModel(String email, String password, String mobileNumber) {
        super(email, password);
        this.mobileNumber = mobileNumber;
    }

    // Getters and setters for admin-specific attributes
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
