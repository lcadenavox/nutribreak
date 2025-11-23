package com.nutribreak.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import org.springframework.security.core.Authentication;
import com.nutribreak.dto.MealDTO;
import com.nutribreak.service.MealService;
import com.nutribreak.messaging.EventPublisher;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/meals")
@Validated
@RequiredArgsConstructor
public class MealController {
    private final MealService mealService;
    @Autowired(required = false)
    private EventPublisher publisher;

    @GetMapping
    public Page<MealDTO> list(Pageable pageable) { return mealService.list(pageable); }

    @GetMapping("/{id}")
    public MealDTO get(@PathVariable Long id) { return mealService.get(id); }

    @PostMapping
    public ResponseEntity<MealDTO> create(@Valid @RequestBody MealDTO mealDto, Authentication auth, UriComponentsBuilder uri) {
        MealDTO dto = mealService.createForUser(mealDto, auth.getName());
        if (publisher != null) publisher.publish("MEAL_CREATED:" + dto.getId());
        return ResponseEntity.created(uri.path("/api/meals/{id}").build(dto.getId())).body(dto);
    }

    @PutMapping("/{id}")
    public MealDTO update(@PathVariable Long id, @Valid @RequestBody MealDTO mealDto) { return mealService.update(id, mealDto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mealService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
