package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    JobApplication getByUserId(Long userId);
    List<JobApplication> findByUserId(Long userId);
    List<JobApplication> findByJobId(Long jobId);
    List<JobApplication> findByJobCompanyId(Long companyId);
    boolean existsByUserIdAndJobId(Long userId, Long jobId);
}