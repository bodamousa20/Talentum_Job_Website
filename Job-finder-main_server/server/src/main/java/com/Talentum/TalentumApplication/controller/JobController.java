package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.repository.JobRepository;
import com.Talentum.TalentumApplication.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/jobs")
public class JobController {

    private final JobService jobService;
    private final JobRepository jobRepository;

    public JobController(JobService jobService, JobRepository jobRepository) {
        this.jobService = jobService;
        this.jobRepository = jobRepository;
    }

    @GetMapping("/paginated")
    public Map<String, Object> getPaginatedJobs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Job> jobPage = jobService.getPaginatedJobs(pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", jobPage.getTotalElements());
        response.put("jobs", jobPage.getContent());
        return response;
    }

    @GetMapping("/filter")
    public List<Job> getJobsByKeyword(
            @RequestParam(value = "categoryIds", required = false) List<Long> categoryIds,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "types", required = false) List<String> types,
            @RequestParam(value = "experience", required = false) String experience) {
        Specification<Job> spec = JobService.getJobsByKeyword(title, city, types, experience, categoryIds);
        System.out.println("Jobs: " + jobRepository.findAll(spec).size());
        return jobRepository.findAll(spec);

    }
}