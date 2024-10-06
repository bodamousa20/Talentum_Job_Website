package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.Job;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    List<Job> findByCompanyId(Long companyId);
    List<Job> findByCategoryId(Long categoryId);
    @Override
    List<Job> findAll(Specification<Job> spec);
}