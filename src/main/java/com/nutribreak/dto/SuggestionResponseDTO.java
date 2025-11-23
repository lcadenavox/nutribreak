package com.nutribreak.dto;

import com.nutribreak.model.BreakType;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SuggestionResponseDTO {
    private String suggestionText;
    private BreakType recommendedBreakType;
    private String recommendedMealIdea;
}
