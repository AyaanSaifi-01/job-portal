package com.jobportal.job_portal_backend.service;

import com.jobportal.job_portal_backend.dto.ApplicationResponse;
import com.jobportal.job_portal_backend.entity.Application;
import com.jobportal.job_portal_backend.entity.ApplicationStatus;

import java.util.List;

public interface ApplicationService {

    ApplicationResponse appliedForJob(Long jobId);

    List<ApplicationResponse> getApplicationsForJob(Long jobId);

    List<ApplicationResponse> getMyApplications();

    ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status);
}
