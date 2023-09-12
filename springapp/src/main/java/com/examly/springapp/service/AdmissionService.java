import java.util.List;
import java.util.Optional;

public interface AdmissionService {
    AdmissionModel createAdmission(AdmissionModel admission);
    Optional<AdmissionModel> getAdmissionById(int admissionId);
    List<AdmissionModel> getAllAdmissions();
    AdmissionModel updateAdmission(int admissionId, AdmissionModel updatedAdmission);
    void deleteAdmission(int admissionId);
    // Add custom service methods if needed
}
