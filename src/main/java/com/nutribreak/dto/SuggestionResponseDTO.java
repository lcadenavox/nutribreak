package com.nutribreak.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SuggestionResponseDTO {
    private String suggestionText;
    private String recommendedBreakType;
    private String recommendedMealIdea;
}
