package com.nutribreak.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nutribreak.model.Meal;

public interface MealRepository extends JpaRepository<Meal, Long> {
}
