package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.exception.ResourceNotFoundException;
import com.Talentum.TalentumApplication.model.Category;
import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.repository.CategoryRepository;
import com.Talentum.TalentumApplication.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicService {

    private final JobRepository jobRepository;
    private final CategoryRepository categoryRepository;

    public PublicService(JobRepository jobRepository, CategoryRepository categoryRepository) {
        this.jobRepository = jobRepository;
        this.categoryRepository = categoryRepository;
    }

    // Category
    // Get all Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Job
    // Get Job
    public Job getJob(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
    }

    // Get all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}