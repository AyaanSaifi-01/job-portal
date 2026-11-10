package com.jobportal.job_portal_backend.controller;

import com.jobportal.job_portal_backend.dto.LoginRequest;
import com.jobportal.job_portal_backend.dto.LoginResponse;
import com.jobportal.job_portal_backend.dto.RegisterRequest;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody RegisterRequest request){
        return new ResponseEntity<>(userService.register(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
