package com.jobportal.job_portal_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private String location;
    @NotNull
    private Double salary;
    @NotNull
    @Enumerated(EnumType.STRING)
    private JobType jobType;

    private Date createdAt = new Date();

    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    private User recruiter;
}
