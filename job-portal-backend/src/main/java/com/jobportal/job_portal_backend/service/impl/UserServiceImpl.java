package com.jobportal.job_portal_backend.service.impl;

import com.jobportal.job_portal_backend.dto.LoginRequest;
import com.jobportal.job_portal_backend.dto.LoginResponse;
import com.jobportal.job_portal_backend.dto.RegisterRequest;
import com.jobportal.job_portal_backend.dto.UserResponse;
import com.jobportal.job_portal_backend.entity.User;
import com.jobportal.job_portal_backend.exception.BadRequestException;
import com.jobportal.job_portal_backend.exception.UnAuthorizedException;
import com.jobportal.job_portal_backend.repository.UserRepository;
import com.jobportal.job_portal_backend.security.JwtService;
import com.jobportal.job_portal_backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private final JwtService  jwtService;

    @Override
    public UserResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        User newRegisterUser = new User();
        newRegisterUser.setName(request.getName());
        newRegisterUser.setEmail(request.getEmail());
        newRegisterUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newRegisterUser.setRole(request.getRole());

        User savedUser = userRepository.save(newRegisterUser);
        return mapToResponse(savedUser);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnAuthorizedException("Invalid email or password");
        }

        String token = jwtService.generateToken(user);
        return new LoginResponse(token);
    }

    @Override
    public void deleteUserByAdmin(Long id) {
        userRepository.deleteById(id);
    }

    private UserResponse mapToResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
