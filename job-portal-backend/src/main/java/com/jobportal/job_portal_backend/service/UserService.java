package com.jobportal.job_portal_backend.service;

import com.jobportal.job_portal_backend.dto.LoginRequest;
import com.jobportal.job_portal_backend.dto.LoginResponse;
import com.jobportal.job_portal_backend.dto.RegisterRequest;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.User;

public interface UserService {
    UserResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    void deleteUserByAdmin(Long id);
}
