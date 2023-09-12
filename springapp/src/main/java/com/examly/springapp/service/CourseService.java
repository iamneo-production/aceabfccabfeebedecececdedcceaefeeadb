import java.util.List;
import java.util.Optional;

public interface CourseService {
    CourseModel createCourse(CourseModel course);
    Optional<CourseModel> getCourseById(int courseId);
    List<CourseModel> getAllCourses();
    CourseModel updateCourse(int courseId, CourseModel updatedCourse);
    void deleteCourse(int courseId);
    // Add custom service methods if needed
}
