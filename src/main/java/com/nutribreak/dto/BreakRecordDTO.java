package com.nutribreak.dto;

import java.time.LocalDateTime;

import com.nutribreak.model.BreakType;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BreakRecordDTO {
    private Long id;
    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BreakType breakType;
    private Boolean recommended;
    private Integer energyBefore;
    private Integer energyAfter;
}
