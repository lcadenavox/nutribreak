package com.nutribreak.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nutribreak.dto.UserDTO;
import com.nutribreak.mapper.UserMapper;
import com.nutribreak.exception.ResourceNotFoundException;
import com.nutribreak.model.User;
import com.nutribreak.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public Page<UserDTO> list(Pageable pageable) {
        return userRepository.findAll(pageable).map(userMapper::toDto);
    }

    @Transactional(readOnly = true)
    public UserDTO get(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toDto(u);
    }

    @Transactional
    public UserDTO create(User u) {
        return userMapper.toDto(userRepository.save(u));
    }

    @Transactional
    public UserDTO update(Long id, User updated) {
        User existing = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userMapper.updateEntity(userMapper.toDto(updated), existing);
        return userMapper.toDto(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) throw new ResourceNotFoundException("User not found");
        userRepository.deleteById(id);
    }
}
