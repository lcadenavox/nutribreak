package com.nutribreak.mapper;

import com.nutribreak.dto.BreakRecordDTO;
import com.nutribreak.model.BreakRecord;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BreakRecordMapper {
    @Mapping(source = "user.id", target = "userId")
    BreakRecordDTO toDto(BreakRecord breakRecord);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    BreakRecord toEntity(BreakRecordDTO dto);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateEntity(BreakRecordDTO dto, @MappingTarget BreakRecord breakRecord);
}
