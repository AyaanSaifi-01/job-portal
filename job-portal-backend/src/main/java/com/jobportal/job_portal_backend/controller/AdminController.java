package com.jobportal.job_portal_backend.controller;

import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.Job;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.repository.JobRepository;
import com.jobportal.job_portal_backend.repository.UserRepository;
import com.jobportal.job_portal_backend.service.AdminService;
import com.jobportal.job_portal_backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/all/jobs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<JobResponse>> getAllJobsForAdmin() {
        return ResponseEntity.ok(adminService.getAllJobs());
    }

    @GetMapping("/all/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsersForAdmin() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @DeleteMapping("/{jobId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteJobByAdmin(@PathVariable Long jobId) {
        adminService.deleteJobById(jobId);
        return ResponseEntity.ok("Job with id "+ jobId + " is deleted successfully");
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUserByAdmin(@PathVariable Long userId) {
        adminService.deleteUserById(userId);
        return ResponseEntity.ok("User with id "+ userId + " is deleted successfully");
    }
}
