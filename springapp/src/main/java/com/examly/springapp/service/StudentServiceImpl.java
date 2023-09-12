import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public StudentModel createStudent(StudentModel student) {
        return studentRepository.save(student);
    }

    @Override
    public Optional<StudentModel> getStudentById(int studentId) {
        return studentRepository.findById(studentId);
    }

    @Override
    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public StudentModel updateStudent(int studentId, StudentModel updatedStudent) {
        Optional<StudentModel> existingStudent = studentRepository.findById(studentId);

        if (existingStudent.isPresent()) {
            updatedStudent.setStudentId(studentId);
            return studentRepository.save(updatedStudent);
        } else {
            // Handle the case when the student with the given ID does not exist.
            return null; // or throw an exception
        }
    }

    @Override
    public void deleteStudent(int studentId) {
        studentRepository.deleteById(studentId);
    }

    // Implement custom service methods if needed
}
