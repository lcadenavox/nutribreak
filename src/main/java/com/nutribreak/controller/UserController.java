package com.nutribreak.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.nutribreak.dto.UserDTO;
import com.nutribreak.model.User;
import com.nutribreak.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@Validated
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserDTO> list(Pageable pageable) { return userService.list(pageable); }

    @GetMapping("/{id}")
    public UserDTO get(@PathVariable Long id) { return userService.get(id); }

    @PostMapping
    public ResponseEntity<UserDTO> create(@Valid @RequestBody User user, UriComponentsBuilder uri) {
        UserDTO dto = userService.create(user);
        return ResponseEntity.created(uri.path("/api/users/{id}").build(dto.getId())).body(dto);
    }

    @PutMapping("/{id}")
    public UserDTO update(@PathVariable Long id, @Valid @RequestBody User user) { return userService.update(id, user); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
