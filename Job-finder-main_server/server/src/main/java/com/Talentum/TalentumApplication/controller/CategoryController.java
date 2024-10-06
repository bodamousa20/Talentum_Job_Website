package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.model.Job;
import com.Talentum.TalentumApplication.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    public final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {this.categoryService = categoryService;}

    // Jobs
    // get jobs per category
    @GetMapping("/category-jobs/{categoryId}")
    public ResponseEntity<List<Job>> getAllJobsByCategory(@PathVariable Long categoryId) {
        List<Job> jobs = categoryService.getAllJobsByCategory(categoryId);
        return ResponseEntity.ok(jobs);
    }

    // get number of jobs in category
    @GetMapping("/jobs-count/{categoryId}")
    public ResponseEntity<Integer> saveJob(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.getJobsCount(categoryId));
    }


}