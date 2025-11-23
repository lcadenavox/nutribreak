package com.nutribreak.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nutribreak.dto.MealDTO;
import com.nutribreak.mapper.MealMapper;
import com.nutribreak.exception.ResourceNotFoundException;
import com.nutribreak.model.Meal;
import com.nutribreak.model.User;
import java.time.LocalDateTime;
import com.nutribreak.repository.MealRepository;
import com.nutribreak.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MealService {
    private final MealRepository mealRepository;
    private final UserRepository userRepository;
    private final MealMapper mealMapper;

    @Transactional(readOnly = true)
    public Page<MealDTO> list(Pageable pageable) {
        return mealRepository.findAll(pageable).map(mealMapper::toDto);
    }

    @Transactional
    public MealDTO createForUser(MealDTO mealDto, String email) {
        User u = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Meal meal = mealMapper.toEntity(mealDto);
        meal.setUser(u);
        if (meal.getTimestamp() == null) meal.setTimestamp(LocalDateTime.now());
        return mealMapper.toDto(mealRepository.save(meal));
    }

    @Transactional(readOnly = true)
    public MealDTO get(Long id) {
        Meal m = mealRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Meal not found"));
        return mealMapper.toDto(m);
    }

    @Transactional
    public MealDTO update(Long id, MealDTO updatedDto) {
        Meal existing = mealRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Meal not found"));
        mealMapper.updateEntity(updatedDto, existing);
        return mealMapper.toDto(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!mealRepository.existsById(id)) throw new ResourceNotFoundException("Meal not found");
        mealRepository.deleteById(id);
    }
}
