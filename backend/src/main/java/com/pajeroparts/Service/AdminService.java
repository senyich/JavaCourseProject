package com.pajeroparts.Service;

import com.pajeroparts.DTO.LoginRequest;
import com.pajeroparts.DTO.LoginResponse;
import com.pajeroparts.entity.AdminUser;
import com.pajeroparts.repositoryes.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Простое хранение токенов (в реальном проекте лучше использовать JWT)
    private String currentToken = null;

    public LoginResponse login(LoginRequest request) {
        Optional<AdminUser> admin = adminRepository.findByUsername(request.getUsername());

        if (admin.isPresent() &&
                passwordEncoder.matches(request.getPassword(), admin.get().getPasswordHash())) {

            // Генерируем простой токен
            currentToken = UUID.randomUUID().toString();
            return new LoginResponse(true, "Успешный вход", currentToken);
        }

        return new LoginResponse(false, "Неверный логин или пароль", null);
    }

    public boolean validateToken(String token) {
        return token != null && token.equals(currentToken);
    }

    public void logout() {
        currentToken = null;
    }
}