package com.Talentum.TalentumApplication.service;

import com.Talentum.TalentumApplication.model.Admin;
import com.Talentum.TalentumApplication.model.Company;
import com.Talentum.TalentumApplication.model.LoginRequest;
import com.Talentum.TalentumApplication.model.User;
import com.Talentum.TalentumApplication.repository.AdminRepository;
import com.Talentum.TalentumApplication.repository.CompanyRepository;
import com.Talentum.TalentumApplication.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(CompanyRepository companyRepository, UserRepository userRepository, AdminRepository adminRepository, PasswordEncoder passwordEncoder, JwtEncoder jwtEncoder) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtEncoder = jwtEncoder;
    }

    // Register User
    public User registerUser(User user) {

        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setDateOfBirth(user.getDateOfBirth());
        newUser.setCreatedAt(LocalDate.now());
        userRepository.save(newUser);
        return newUser;
    }

    // Register Company
    public Company registerCompany(Company company, byte[] logoBytes) throws IOException {
        try {
            if (companyRepository.existsByEmail(company.getEmail())) {
                throw new RuntimeException("Email is already taken");
            }
            if (companyRepository.existsByName(company.getName())) {
                throw new RuntimeException("Company name is already taken");
            }
            if (company.getPassword().length() < 8) {
                throw new RuntimeException("Password must be at least 8 characters long");
            }
            company.setPassword(passwordEncoder.encode(company.getPassword()));
            company.setLogo(logoBytes);
            company.setCreatedAt(LocalDate.now());
            companyRepository.save(company);
            return company;
        } catch (Exception e) {
            logger.error("Error registering company", e);
            throw e;
        }
    }

    // Login/*

    public Map<String, Object> login(LoginRequest body) {
        String email = body.getEmail();
        String password = body.getPassword();
        String role = null;
        String id = null;

        // Check User
        User user = userRepository.findAccountByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            role = "USER";
            id = String.valueOf(user.getId());  // Assuming User entity has getId()
            return createJwtResponse(email, role, id);
        }

        // Check Company
        Company company = companyRepository.findByEmail(email);
        if (company != null && passwordEncoder.matches(password, company.getPassword())) {
            role = "COMPANY";
            id = String.valueOf(company.getId());  // Assuming Company entity has getId()
            return createJwtResponse(email, role, id);
        }

        // Check Admin
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            role = "ADMIN";
            id = String.valueOf(admin.getId());  // Assuming Admin entity has getId()
            return createJwtResponse(email, role, id);
        }

        // If no match, throw an error
        throw new RuntimeException("Email not found or incorrect password");
    }

    private Map<String, Object> createJwtResponse(String email, String role, String id) {
        // Create JWT claims set
        var claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plus(1, ChronoUnit.HOURS))  // Token expires in 1 hour
                .subject(email)
                .claim("role", role)
                .claim("id", id)
                .build();

        // Encode the JWT token
        JwtEncoderParameters parameters = JwtEncoderParameters.from(claims);
        String token = jwtEncoder.encode(parameters).getTokenValue();


        // Create response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", role);
        response.put("id", id);  // Include ID in the response

        return response;
    }





}