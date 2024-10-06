package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.model.JobApplication;
import com.Talentum.TalentumApplication.service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-application")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    // Apply for a job
    @PostMapping("/apply/{userId}/{jobId}")
    public ResponseEntity<?> applyForJob(@PathVariable Long userId,
                                         @PathVariable Long jobId,
                                         @RequestBody JobApplication jobApplication) {
        try {
            JobApplication savedApplication = jobApplicationService.applyForJob(userId, jobId, jobApplication);
            return ResponseEntity.ok(savedApplication);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all job applications
    @GetMapping("/all-applications")
    public ResponseEntity<?> getAllJobApplications() {
        return ResponseEntity.ok(jobApplicationService.getAllJobApplications());
    }

    // Get all job applications by user
    @GetMapping("/all-applications/user/{userId}")
    public ResponseEntity<?> getAllJobApplicationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(jobApplicationService.getAllJobApplicationsByUser(userId));
    }

    // Get all job applications by job
    @GetMapping("/all-applications/job/{jobId}")
    public ResponseEntity<?> getAllJobApplicationsByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobApplicationService.getAllJobApplicationsByJob(jobId));
    }

    // Get if a specific job is applied to by this user
    @GetMapping("/is-applied/{userId}/{jobId}")
    public ResponseEntity<Boolean> isJobAppliedByUser(@PathVariable Long userId, @PathVariable Long jobId) {
        boolean isApplied = jobApplicationService.isJobAppliedByUser(userId, jobId);
        return ResponseEntity.ok(isApplied);
    }

    // Get all Applications for a Company
    @GetMapping("/all-applications/company/{companyId}")
    public ResponseEntity<?> getAllJobApplicationsByCompany(@PathVariable Long companyId) {
        return ResponseEntity.ok(jobApplicationService.getAllJobApplicationsByCompany(companyId));
    }
}