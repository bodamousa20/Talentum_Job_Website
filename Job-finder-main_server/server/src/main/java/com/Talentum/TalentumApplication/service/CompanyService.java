package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.exception.ResourceNotFoundException;
import com.Talentum.TalentumApplication.model.Category;
import com.Talentum.TalentumApplication.model.Company;
import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.model.SavedJob;
import com.Talentum.TalentumApplication.repository.CategoryRepository;
import com.Talentum.TalentumApplication.repository.CompanyRepository;
import com.Talentum.TalentumApplication.repository.JobRepository;
import com.Talentum.TalentumApplication.repository.savedJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final JobRepository jobRepository;
    private final savedJobRepository savedJobRepository;

    public CompanyService(CompanyRepository companyRepository, CategoryRepository categoryRepository, JobRepository jobRepository, savedJobRepository savedJobRepository) {
        this.companyRepository = companyRepository;
        this.categoryRepository = categoryRepository;
        this.jobRepository = jobRepository;
        this.savedJobRepository = savedJobRepository;
    }

    // Jobs
    // Create Job
    public Job createJob(Job job, Long categoryId, Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        job.setCompany(company);
        job.setCategory(category);
        job.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return jobRepository.save(job);
    }

    // Update Job
    public Job updateJob(Long jobId, Job updatedJob) {
        try {
            Job existingJob = jobRepository.findById(jobId)
                    .orElseThrow(() -> new RuntimeException("Job not found"));
            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setType(updatedJob.getType());
            existingJob.setSalary(updatedJob.getSalary());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setGender(updatedJob.getGender());
            existingJob.setDescription(updatedJob.getDescription());
            existingJob.setResponsibilities(updatedJob.getResponsibilities());
            existingJob.setQualifications(updatedJob.getQualifications());
            existingJob.setBenefits(updatedJob.getBenefits());
            existingJob.setExperience(updatedJob.getExperience());
            existingJob.setCreatedAt(updatedJob.getCreatedAt());
            return jobRepository.save(existingJob);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Cannot update job: " + e.getMessage());
        } catch (RuntimeException e) {
            throw new RuntimeException("Job not found: " + e.getMessage());
        }
    }

    // Delete Job
    public String deleteJobById(Long jobId) {
        try {
            SavedJob savedJob = savedJobRepository.findByJobId(jobId);
            if (savedJob != null) {
                savedJobRepository.delete(savedJob);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        try {
            SavedJob savedJob = savedJobRepository.findByJobId(jobId);
            if (savedJob != null) {
                savedJobRepository.delete(savedJob);
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("The job is not found"));
        jobRepository.delete(job);
        return "Deleted successfully";
    }

    // Get All Jobs per Company
    public List<Job> getAllCompanyJobs(Long companyId) {
        return jobRepository.findByCompanyId(companyId);
    }

}
