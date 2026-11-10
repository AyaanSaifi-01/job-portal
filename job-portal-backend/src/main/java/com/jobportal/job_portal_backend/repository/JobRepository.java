package com.jobportal.job_portal_backend.repository;

import com.jobportal.job_portal_backend.dto.JobRequest;
import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByTitleContainingIgnoreCase(String title);

    List<Job> findByLocationContainingIgnoreCase(String location);

    List<Job> findByRecruiterId(Long recruiterId);

}
