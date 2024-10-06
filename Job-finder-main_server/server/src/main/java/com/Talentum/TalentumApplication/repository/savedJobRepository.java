package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface savedJobRepository extends JpaRepository<SavedJob,Long> {
    List<SavedJob> findByUserId(Long userId);
    SavedJob findByJobId(Long jobId);
    void deleteByJobId(Long jobId);
    boolean existsByUserIdAndJobId(Long userId, Long jobId);
}
