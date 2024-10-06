package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    public final JobRepository jobRepository;

    public CategoryService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Jobs
    // Get Jobs Per Category
    public List<Job> getAllJobsByCategory(Long categoryId) {
        return jobRepository.findByCategoryId(categoryId);
    }

    // Get Number of Jobs in Category
    public Integer getJobsCount(Long categoryId) {
        return jobRepository.findByCategoryId(categoryId).size();
    }
}
