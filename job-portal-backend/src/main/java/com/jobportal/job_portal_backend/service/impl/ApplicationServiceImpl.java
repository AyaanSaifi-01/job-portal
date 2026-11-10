package com.jobportal.job_portal_backend.service.impl;

import com.jobportal.job_portal_backend.dto.ApplicationResponse;
import com.jobportal.job_portal_backend.entity.Application;
import com.jobportal.job_portal_backend.entity.ApplicationStatus;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.exception.BadRequestException;
import com.jobportal.job_portal_backend.exception.ForbiddenException;
import com.jobportal.job_portal_backend.exception.ResourceNotFoundException;
import com.jobportal.job_portal_backend.repository.ApplicationRepository;
import com.jobportal.job_portal_backend.repository.JobRepository;
import com.jobportal.job_portal_backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    @Override
    public ApplicationResponse appliedForJob(Long jobId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User jobSeeker = (User) authentication.getPrincipal();

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if(applicationRepository.existsByJobIdAndJobSeekerId(jobId, jobSeeker.getId())) {
            throw new BadRequestException("Already applied for this job");
        }

        Application application = new Application();
        application.setJob(job);
        application.setJobSeeker(jobSeeker);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedAt(LocalDateTime.now());

        Application applicationForJob = applicationRepository.save(application);
        return mapToResponse(applicationForJob);
    }

    @Override
    public List<ApplicationResponse> getApplicationsForJob(Long jobId) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User recruiter = (User) authentication.getPrincipal();

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if(!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new ForbiddenException("You can only view applications for your own jobs");
        }

        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<ApplicationResponse> getMyApplications() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        User jobSeeker = (User) authentication.getPrincipal();

        return applicationRepository.findByJobSeekerId(jobSeeker.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User recruiter = (User) authentication.getPrincipal();

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        Job job = application.getJob();
        if(!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new ForbiddenException("You can only view applications for your own jobs");
        }

        application.setStatus(status);
        Application updateApp = applicationRepository.save(application);
        return mapToResponse(updateApp);
    }

    private ApplicationResponse mapToResponse(Application application) {
        return new ApplicationResponse(
                application.getId(),
                application.getJob().getId(),
                application.getJob().getTitle(),
                application.getJobSeeker().getId(),
                application.getJobSeeker().getName(),
                application.getStatus(),
                application.getAppliedAt()
        );
    }
}
