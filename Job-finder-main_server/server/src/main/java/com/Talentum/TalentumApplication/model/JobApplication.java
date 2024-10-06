package com.Talentum.TalentumApplication.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;


@Setter
@Getter
@Entity(name = "JobApplication")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String country;
    private String qualification;
    private String status;
    private String reasonOfHire;
    private String linkedInLink;
    private String githubLink;
    private Date availableStartDate;
    private Timestamp appliedAt;

    public JobApplication() {
    }

    public JobApplication(User user, Job job, String firstname, String lastname, String email,String country, String phone, String reasonOfHire, String linkedInLink, String githubLink, String qualification, String status,Date availableStartDate,Timestamp appliedAt) {
        this.user = user;
        this.job = job;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.reasonOfHire = reasonOfHire;
        this.availableStartDate = availableStartDate;
        this.linkedInLink = linkedInLink;
        this.githubLink = githubLink;
        this.qualification = qualification;
        this.status = status;
        this.appliedAt = appliedAt;
    }
}

