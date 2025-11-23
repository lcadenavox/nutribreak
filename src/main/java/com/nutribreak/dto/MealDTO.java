package com.nutribreak.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MealDTO {
    private Long id;
    private Long userId;
    private LocalDateTime timestamp;
    private String items;
    private Integer calories;
}
