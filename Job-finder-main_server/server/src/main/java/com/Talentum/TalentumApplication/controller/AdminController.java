package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.model.Category;
import com.Talentum.TalentumApplication.model.Company;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Category
    // Add Category
    @PostMapping("/add-category")
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        if (adminService.categoryExistsByName(category.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Category with the same name already exists.");
        }
        Category savedCategory = adminService.addCategory(category);
        return new ResponseEntity<String>(String.valueOf(savedCategory), HttpStatus.CREATED);
    }
    // Delete Category
    @DeleteMapping("/delete-category/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
        adminService.deleteCategory(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body("Category deleted successfully with ID: " + categoryId);
    }

    // Company
    // Get All Companies
    @GetMapping("/all-companies")
    public List<Company> getAllCompanies() {
        return adminService.getAllCompanies();
    }

    // Get Single Company by ID
    @GetMapping("/company/{companyId}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long companyId) {
        try {
            Company company = adminService.getCompanyById(companyId);
            return ResponseEntity.ok(company);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    // Get Company Logo by ID
    @GetMapping("/company-logo/{companyId}")
    public ResponseEntity<byte[]> getCompanyLogo(@PathVariable Long companyId) {
        try {
            byte[] logo = adminService.getCompanyLogo(companyId);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(logo);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null);
        }
    }


    // Delete Company
    @DeleteMapping("/delete-company/{companyId}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long companyId) {
        adminService.deleteCompany(companyId);
        return ResponseEntity.status(HttpStatus.OK).body("Company deleted successfully with ID: " + companyId);
    }

    // User
    // Get All Users
    @GetMapping("/all-users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
}