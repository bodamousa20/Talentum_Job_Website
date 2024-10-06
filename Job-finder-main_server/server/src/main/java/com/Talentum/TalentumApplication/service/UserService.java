package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.exception.ResourceNotFoundException;
import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.model.SavedJob;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.repository.JobRepository;
import com.Talentum.TalentumApplication.repository.UserRepository;
import com.Talentum.TalentumApplication.repository.savedJobRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final savedJobRepository savedJobRepository;

    public UserService(UserRepository userRepository, JobRepository jobRepository, savedJobRepository savedJobRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.savedJobRepository = savedJobRepository;
    }

    // Saved Jobs
    // Save Job
    public void saveJob(Long userId, Long jobId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        boolean isJobAlreadySaved = savedJobRepository.existsByUserIdAndJobId(userId, jobId);
        if (isJobAlreadySaved) {
            throw new IllegalStateException("Job is already saved.");
        }

        SavedJob savedJob = new SavedJob();
        savedJob.setUser(user);
        savedJob.setJob(job);
        savedJobRepository.save(savedJob);
    }

    // Check if Job is Saved
    public boolean isJobSaved(Long userId, Long jobId) {
        return savedJobRepository.existsByUserIdAndJobId(userId, jobId);
    }

    // Un-Save Job
    @Transactional
    public void deleteSavedJob(Long id) {
        savedJobRepository.deleteByJobId(id);
    }

    // Get Saved Jobs
    public List<Job> getAllSavedJobs(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<SavedJob> savedJobs = savedJobRepository.findByUserId(user.getId());
        return savedJobs.stream()
                .map(SavedJob::getJob)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    // User
    // Get Profile
    public User getProfile(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}