package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.exception.ResourceNotFoundException;
import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Saved Jobs
    // Save Jobs
    @PostMapping("/save-job/{userId}/{jobId}")
    public ResponseEntity<String> saveJob(@PathVariable Long userId, @PathVariable Long jobId) {
        userService.saveJob(userId, jobId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Job saved successfully.");
    }

    // Check if Job is Saved
    @GetMapping("/is-job-saved/{userId}/{jobId}")
    public ResponseEntity<Boolean> isJobSaved(@PathVariable Long userId, @PathVariable Long jobId) {
        boolean isJobSaved = userService.isJobSaved(userId, jobId);
        return ResponseEntity.ok(isJobSaved);
    }

    // Un-Save Job
    @DeleteMapping("/saved-jobs/{jobId}")
    public ResponseEntity<String> deleteSavedJob(@PathVariable Long jobId) {
        try {
            userService.deleteSavedJob(jobId);
            return ResponseEntity.ok("Deleted Successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Saved job not found");
        }
    }

    // Get Saved Jobs
    @GetMapping("/saved-jobs/{userId}")
    public ResponseEntity<List<Job>> getAllSavedJobs(@PathVariable("userId") Long userId) {
        try {
            List<Job> jobs = userService.getAllSavedJobs(userId);
            if (jobs.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(jobs);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // User
    // Get Profile
    @GetMapping("/profile/{userId}")
    public ResponseEntity<User> getProfile(@PathVariable Long userId) {
        try {
            User user = userService.getProfile(userId);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}