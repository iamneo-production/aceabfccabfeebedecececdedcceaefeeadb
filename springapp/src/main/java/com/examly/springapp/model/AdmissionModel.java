import javax.persistence.*;

@Entity
public class AdmissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admissionId;

    private int courseId;
    private int instituteId;
    private String status;

    // Many-to-One relationship with StudentModel
    @ManyToOne
    @JoinColumn(name = "studentId")
    private StudentModel student;

    // Many-to-One relationship with UserModel (for userId)
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserModel user;

    // Constructors...

    // Default constructor
    public AdmissionModel() {
    }

    // Parameterized constructor
    public AdmissionModel(int courseId, int instituteId, String status, StudentModel student, UserModel user) {
        this.courseId = courseId;
        this.instituteId = instituteId;
        this.status = status;
        this.student = student;
        this.user = user;
    }

    // Getters and setters...

    public int getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(int admissionId) {
        this.admissionId = admissionId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public int getInstituteId() {
        return instituteId;
    }

    public void setInstituteId(int instituteId) {
        this.instituteId = instituteId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public StudentModel getStudent() {
        return student;
    }

    public void setStudent(StudentModel student) {
        this.student = student;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
