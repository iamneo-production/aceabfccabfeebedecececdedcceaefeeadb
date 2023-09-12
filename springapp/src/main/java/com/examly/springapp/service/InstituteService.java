import java.util.List;
import java.util.Optional;

public interface InstituteService {
    InstituteModel createInstitute(InstituteModel institute);
    Optional<InstituteModel> getInstituteById(int instituteId);
    List<InstituteModel> getAllInstitutes();
    InstituteModel updateInstitute(int instituteId, InstituteModel updatedInstitute);
    void deleteInstitute(int instituteId);
    // Add custom service methods if needed
}
