package com.jobportal.job_portal_backend.dto;

import com.jobportal.job_portal_backend.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long jobSeekerId;
    private String jobSeekerName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
}
