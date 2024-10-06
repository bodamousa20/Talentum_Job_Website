package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.service.CompanyService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // Jobs
    // Add Job
    @PostMapping("{companyId}/add-job/category/{categoryId}")
    public ResponseEntity<Job> createJob(@RequestBody Job job, @PathVariable Long categoryId, @PathVariable Long companyId) {
        Job newJob = companyService.createJob(job, categoryId, companyId);
        return ResponseEntity.status(HttpStatus.CREATED).body(newJob);
    }

    // Update Job
    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<?> updateJob(@PathVariable long jobId, @RequestBody Job updatedJob) {
        try {
            Job savedJob = companyService.updateJob(jobId, updatedJob);
            return ResponseEntity.ok(savedJob);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cannot update job: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found: " + e.getMessage());
        }
    }

    // Delete Job
    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<String> deleteJobById(@PathVariable Long jobId) {
        try {
            String response = companyService.deleteJobById(jobId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Get All Jobs per Company
    @GetMapping("/jobs/{companyId}")
    public List<Job> getAllCompanyJobs(@PathVariable Long companyId) {
        return companyService.getAllCompanyJobs(companyId);
    }
}
