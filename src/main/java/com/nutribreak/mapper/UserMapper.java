package com.nutribreak.mapper;

import com.nutribreak.dto.UserDTO;
import com.nutribreak.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
    User toEntity(UserDTO dto);
    void updateEntity(UserDTO dto, @MappingTarget User user);
}
