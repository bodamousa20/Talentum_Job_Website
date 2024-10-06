package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.model.Category;
import com.Talentum.TalentumApplication.model.Company;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.repository.CategoryRepository;
import com.Talentum.TalentumApplication.repository.CompanyRepository;
import com.Talentum.TalentumApplication.repository.JobRepository;
import com.Talentum.TalentumApplication.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class AdminService {

    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public AdminService(CompanyRepository companyRepository, CategoryRepository categoryRepository, UserRepository userRepository, JobRepository jobRepository) {
        this.companyRepository = companyRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    // Category
    // Add Category
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }
    // Category Already Exists Check
    public boolean categoryExistsByName(String name) {
        return categoryRepository.existsByName(name);
    }

    // Delete Category
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Long jobId = category.getId();
        jobRepository.deleteAllById(Collections.singleton(jobId));
        categoryRepository.delete(category);
    }

    // Company
    // Get all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    public byte[] getCompanyLogo(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return company.getLogo();
    }

    // Delete Company
    public void deleteCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Long jobId = company.getId();
        jobRepository.deleteAllById(Collections.singleton(jobId));
        companyRepository.delete(company);
    }

    // User
    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}