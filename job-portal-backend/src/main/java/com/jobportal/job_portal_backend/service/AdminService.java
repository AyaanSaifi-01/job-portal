package com.jobportal.job_portal_backend.service;

import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.repository.UserRepository;
import org.hibernate.boot.models.JpaAnnotations;

import java.util.List;

public interface AdminService {

    List<UserResponse> getAllUsers();
    List<JobResponse> getAllJobs();
    void deleteUserById(Long id);
    void deleteJobById(Long id);
}
