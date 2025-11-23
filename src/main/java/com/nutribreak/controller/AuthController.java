package com.nutribreak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutribreak.dto.UserDTO;
import com.nutribreak.model.User;
import com.nutribreak.repository.UserRepository;
import com.nutribreak.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody User user, UriComponentsBuilder uri) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserDTO dto = userService.create(user);
        return ResponseEntity.created(uri.path("/api/users/{id}").build(dto.getId())).body(dto);
    }
}
