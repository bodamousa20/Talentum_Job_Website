package com.Talentum.TalentumApplication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.sql.ConnectionBuilder;
import java.sql.Timestamp;
import java.time.LocalDate;

@Setter
@Getter
@Entity(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    @NotBlank(message = "Username is required")
    private String username;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Phone number is required")
    @Size(min = 11,max = 11, message = "Phone number must be 11 Numbers Long")
    private String phoneNumber;
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
    private Timestamp dateOfBirth;
    private LocalDate createdAt;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String username, String email, String phoneNumber, String password, Timestamp dateOfBirth, LocalDate createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.createdAt = createdAt;
    }


}
