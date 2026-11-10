package com.jobportal.job_portal_backend.service.impl;

import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.Role;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.exception.ResourceNotFoundException;
import com.jobportal.job_portal_backend.repository.ApplicationRepository;
import com.jobportal.job_portal_backend.repository.JobRepository;
import com.jobportal.job_portal_backend.repository.UserRepository;
import com.jobportal.job_portal_backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(job -> new JobResponse(
                        job.getId(),
                        job.getTitle(),
                        job.getDescription(),
                        job.getLocation(),
                        job.getSalary(),
                        job.getJobType(),
                        job.getRecruiter().getId()
                ))
                .toList();
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
        if(user.getRole() == Role.RECRUITER) {
            List<Job> jobs = jobRepository.findByRecruiterId(id);

            for(Job job : jobs) {
                applicationRepository
                        .deleteAll(applicationRepository.findByJobId(job.getId()));
            }

            jobRepository.deleteAll(jobs);
        } else if (user.getRole() == Role.JOB_SEEKER) {
            applicationRepository.deleteAll(applicationRepository.findByJobSeekerId(id));
        }

        userRepository.deleteById(id);
    }

    @Override
    public void deleteJobById(Long id) {
        jobRepository.deleteById(id);
    }

    private UserResponse mapToResponse(User user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
