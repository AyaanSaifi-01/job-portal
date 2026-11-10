package com.jobportal.job_portal_backend.dto;

import com.jobportal.job_portal_backend.entity.JobType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private JobType jobType;
    private Long recruiterId;
}
