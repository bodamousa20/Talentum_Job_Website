package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.model.JobApplication;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.repository.JobApplicationRepository;
import com.Talentum.TalentumApplication.repository.JobRepository;
import com.Talentum.TalentumApplication.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class JobApplicationService {
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository, UserRepository userRepository, JobRepository jobRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public JobApplication applyForJob(Long userId, Long jobId, JobApplication jobApplication) {
        if (jobApplication == null) {
            throw new IllegalArgumentException("JobApplication cannot be null");
        }
        if (userId == null || jobId == null) {
            throw new IllegalArgumentException("UserId and JobId cannot be null");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        JobApplication existingApplication = jobApplicationRepository.getByUserId(user.getId());
        if (existingApplication != null && existingApplication.getJob().getId().equals(jobId)) {
            throw new RuntimeException("You have already submitted an application for this job.");
        }

        jobApplication.setUser(user);
        jobApplication.setJob(job);
        jobApplication.setAppliedAt(new Timestamp(System.currentTimeMillis()));

        return jobApplicationRepository.save(jobApplication);
    }

    public List<JobApplication> getAllJobApplications() {
        return jobApplicationRepository.findAll();
    }

    public List<JobApplication> getAllJobApplicationsByUser(Long userId) {
        return jobApplicationRepository.findByUserId(userId);
    }

    public List<JobApplication> getAllJobApplicationsByJob(Long jobId) {
        return jobApplicationRepository.findByJobId(jobId);
    }

    public List<JobApplication> getAllJobApplicationsByCompany(Long companyId) {
        return jobApplicationRepository.findByJobCompanyId(companyId);
    }

    public boolean isJobAppliedByUser(Long userId, Long jobId) {
        return jobApplicationRepository.existsByUserIdAndJobId(userId, jobId);
    }
}