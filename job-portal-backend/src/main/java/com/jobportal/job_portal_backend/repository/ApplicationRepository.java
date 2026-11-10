package com.jobportal.job_portal_backend.repository;

import com.jobportal.job_portal_backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByJobIdAndJobSeekerId(Long jobId, Long jobSeekerId);

    List<Application> findByJobId(Long jobId);

    List<Application> findByJobSeekerId(Long jobSeekerId);

    List<Application> findByJobRecruiterId(Long recruiterId);


}
