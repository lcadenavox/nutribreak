package com.nutribreak.dto;

import com.nutribreak.model.WorkMode;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SuggestionRequestDTO {
    private Integer mood; // 1-10
    private Integer energy; // 1-10
    private WorkMode workMode;
    private Integer screenTimeMinutes;
    private String language; // "pt" or "en"
}
