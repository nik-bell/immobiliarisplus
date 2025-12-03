package com.novegruppo.immobiliarisplus.services;

import com.novegruppo.immobiliarisplus.dtos.LoginRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.LoginResponseDTO;
import com.novegruppo.immobiliarisplus.dtos.RegisterRequestDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.repositories.OwnerRepository;
import com.novegruppo.immobiliarisplus.repositories.UserRepository;
import com.novegruppo.immobiliarisplus.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        // user authentication
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // generate JWT token
        String token = jwtUtil.generateToken(loginRequest.getEmail());

        // Retrieve user details
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new LoginResponseDTO(token, user.getEmail(), user.getRole().name());
    }

    public User register(RegisterRequestDTO registerRequest) {
        // Verify if email already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());
        user.setCreatedAt(LocalDateTime.now());

        // Associate owner if ownerId is provided
        if (registerRequest.getOwnerId() != null) {
            Optional<Owner> owner = ownerRepository.findById(registerRequest.getOwnerId());
            owner.ifPresent(user::setOwner);
        }

        return userRepository.save(user);
    }
}

