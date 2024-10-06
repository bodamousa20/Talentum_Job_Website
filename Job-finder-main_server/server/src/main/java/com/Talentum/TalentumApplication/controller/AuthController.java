package com.Talentum.TalentumApplication.controller;

import com.Talentum.TalentumApplication.model.Company;
import com.Talentum.TalentumApplication.model.LoginRequest;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authenticationService;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthService authenticationService) {
        this.authenticationService = authenticationService;
    }

    // Register
    // Register User
    @PostMapping("/register-user")
    public ResponseEntity<?> addUser(@RequestBody @Validated User user) {
        try {
            User newUser = authenticationService.registerUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Register Company
    @PostMapping("/register-company")
    public ResponseEntity<?> registerCompany(@RequestParam("data") MultipartFile data) {
        logger.debug("Received request to register company");
        try {
            if (data.isEmpty()) {
                logger.warn("MultipartFile is empty");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"MultipartFile is empty\"}");
            }

            String[] parts = new String(data.getBytes()).split(";");
            if (parts.length < 2) {
                logger.warn("Invalid data format");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Invalid data format\"}");
            }

            String companyJson = parts[0];
            String base64Logo = parts[1].replaceAll("\\s", ""); // Remove any whitespace characters
            byte[] logoBytes = Base64.getDecoder().decode(base64Logo);

            ObjectMapper objectMapper = new ObjectMapper();
            Company company = objectMapper.readValue(companyJson, Company.class);

            authenticationService.registerCompany(company, logoBytes);
            logger.info("Company registered successfully");
            return ResponseEntity.ok("{\"message\": \"Company registered successfully\"}");
        } catch (IllegalArgumentException e) {
            logger.error("Invalid Base64 input", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Invalid Base64 input: " + e.getMessage() + "\"}");
        } catch (Exception e) {
            logger.error("Error registering company", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Error registering company: " + e.getMessage() + "\"}");
        }
    }

    // Login
    // Login User or Company
    @PostMapping("/login")
    public ResponseEntity<?> loginForm(@RequestBody LoginRequest data) {
        try {
            Map<String, Object> response = authenticationService.login(data);
            String token = (String) response.get("token");
            String id = (String) response.get("id");

            // Return the token in the response header and the body with user details
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(response);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Email not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } else if (e.getMessage().equals("Incorrect password")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
