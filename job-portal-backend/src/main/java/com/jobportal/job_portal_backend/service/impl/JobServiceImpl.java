package com.jobportal.job_portal_backend.service.impl;

import com.jobportal.job_portal_backend.dto.JobRequest;
import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.exception.ForbiddenException;
import com.jobportal.job_portal_backend.exception.ResourceNotFoundException;
import com.jobportal.job_portal_backend.repository.JobRepository;
import com.jobportal.job_portal_backend.repository.UserRepository;
import com.jobportal.job_portal_backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Override
    public JobResponse createJob(JobRequest request) {
        Job newJob = new Job();
        newJob.setTitle(request.getTitle());
        newJob.setDescription(request.getDescription());
        newJob.setJobType(request.getJobType());
        newJob.setSalary(request.getSalary());
        newJob.setLocation(request.getLocation());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User recruiter = (User) authentication.getPrincipal();
        newJob.setRecruiter(recruiter);

        Job job =  jobRepository.save(newJob);
        return mapToResponse(job);
    }

    @Override
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public JobResponse getJobById(long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found"));
        return mapToResponse(job);
    }

    @Override
    public JobResponse updateJob(Long id, JobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found with id: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User recruiter = (User) authentication.getPrincipal();

        if(!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("You can only modify your own jobs");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setJobType(request.getJobType());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());

        Job updatedJob =  jobRepository.save(job);
        return mapToResponse(updatedJob);
    }

    @Override
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Not Found with id: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User recruiter = (User) authentication.getPrincipal();
        if(!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new ForbiddenException("You can only delete your own jobs");
        }
        jobRepository.deleteById(id);
    }

    @Override
    public void deleteJobByAdmin(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public List<JobResponse> searchJobsByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<JobResponse> searchJobsByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<JobResponse> getMyJobs() {
       String email = SecurityContextHolder.getContext().getAuthentication().getName();

       User recruiter = userRepository.findByEmail(email)
               .orElseThrow(() -> new ResourceNotFoundException("Recruiter Not Found"));

       return jobRepository.findByRecruiterId(recruiter.getId())
               .stream()
               .map(this::mapToResponse)
               .toList();
    }

    private JobResponse mapToResponse(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getLocation(),
                job.getSalary(),
                job.getJobType(),
                job.getRecruiter().getId()
        );
    }
}
