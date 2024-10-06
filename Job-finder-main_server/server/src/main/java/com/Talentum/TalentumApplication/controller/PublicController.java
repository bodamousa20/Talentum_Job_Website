package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.exception.ResourceNotFoundException;
import com.Talentum.TalentumApplication.model.Category;
import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.service.PublicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final PublicService publicService;

    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

    // Category
    // Get All Categories
    @GetMapping("/all-categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> allCategories = publicService.getAllCategories();
        return ResponseEntity.ok(allCategories);
    }

    // Job
    // Get Job
    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<Job> getJob(@PathVariable Long jobId) {
        try {
            Job job = publicService.getJob(jobId);
            return ResponseEntity.ok(job);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get all jobs
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        try {
            List<Job> jobs = publicService.getAllJobs();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}