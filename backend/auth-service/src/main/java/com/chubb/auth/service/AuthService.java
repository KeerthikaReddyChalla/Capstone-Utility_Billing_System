package com.chubb.auth.service;

import java.util.List;

import com.capstone.auth.dto.ChangePasswordRequest;
import com.capstone.auth.dto.ForgotPasswordRequest;
import com.capstone.auth.dto.JwtResponse;
import com.capstone.auth.dto.LoginRequest;
import com.capstone.auth.dto.RegisterRequest;
import com.capstone.auth.dto.ResetPasswordRequest;
import com.capstone.auth.model.User;

public interface AuthService {

    void register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

    void changePassword(String email, ChangePasswordRequest request);

    List<User> getAllUsers();

    User getUserById(String userId);

    void deleteUser(String userId);
}

