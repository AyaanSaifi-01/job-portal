package com.jobportal.job_portal_backend.service;

import com.jobportal.job_portal_backend.dto.JobRequest;
import com.jobportal.job_portal_backend.dto.JobResponse;
import com.jobportal.job_portal_backend.entity.Job;

import java.util.List;

public interface JobService {

    JobResponse createJob(JobRequest request);
    List<JobResponse> getAllJobs();
    List<JobResponse> getMyJobs();
    JobResponse getJobById(long id);
    JobResponse updateJob(Long id, JobRequest request);
    void deleteJob(Long id);
    void deleteJobByAdmin(Long id);
    List<JobResponse> searchJobsByTitle(String title);
    List<JobResponse> searchJobsByLocation(String location);

}
