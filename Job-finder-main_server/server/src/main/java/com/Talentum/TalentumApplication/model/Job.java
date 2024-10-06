package com.Talentum.TalentumApplication.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String type;
    private String salary;
    private String location;
    private String gender;
    private String description;
    private String responsibilities;
    private String qualifications;
    private String benefits;
    private String experience;
    private Timestamp createdAt;
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Default constructor
    public Job() {}

    // Parameterized constructor

    public Job(String title, String type, String salary, String location, String gender, String description, String responsibilities, String qualifications, String benefits, String experience, Timestamp createdAt, Company company, Category category) {
        this.title = title;
        this.type = type;
        this.salary = salary;
        this.location = location;
        this.gender = gender;
        this.description = description;
        this.responsibilities = responsibilities;
        this.qualifications = qualifications;
        this.benefits = benefits;
        this.experience = experience;
        this.createdAt = createdAt;
        this.company = company;
        this.category = category;
    }

}