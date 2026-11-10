package com.jobportal.job_portal_backend.dto;

import com.jobportal.job_portal_backend.entity.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String location;

    @NotNull
    private Double salary;

    @NotNull
    private JobType jobType;
}
