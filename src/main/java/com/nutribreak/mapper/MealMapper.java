package com.nutribreak.mapper;

import com.nutribreak.dto.MealDTO;
import com.nutribreak.model.Meal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MealMapper {
    @Mapping(source = "user.id", target = "userId")
    MealDTO toDto(Meal meal);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    Meal toEntity(MealDTO dto);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateEntity(MealDTO dto, @MappingTarget Meal meal);
}
