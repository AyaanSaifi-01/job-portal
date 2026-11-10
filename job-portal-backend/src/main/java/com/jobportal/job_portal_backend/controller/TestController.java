package com.jobportal.job_portal_backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/job-seeker")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public String jobSeeker() {
        return "Job Seeker access granted";
    }

    @GetMapping("/recruiter")
    @PreAuthorize("hasRole('RECRUITER')")
    public String recruiter() {
        return "Recruiter access granted";
    }

    @GetMapping
    public String test() {
        return "Authenticated successfully";
    }
}
