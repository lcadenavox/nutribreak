package com.nutribreak.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.nutribreak.dto.SuggestionRequestDTO;
import com.nutribreak.dto.SuggestionResponseDTO;
import com.nutribreak.model.BreakType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    @Cacheable(value = "suggestions", key = "#req.mood + '-' + #req.energy + '-' + #req.workMode + '-' + #req.screenTimeMinutes + '-' + #req.language")
    public SuggestionResponseDTO generate(SuggestionRequestDTO req) {
        String content = fallback();
        BreakType breakType = pickBreakType(req.getEnergy(), req.getMood(), req.getScreenTimeMinutes());
        return SuggestionResponseDTO.builder()
            .suggestionText(content)
            .recommendedBreakType(breakType)
            .recommendedMealIdea("Fruit, nuts and water")
            .build();
    }

    private BreakType pickBreakType(Integer energy, Integer mood, Integer screen) {
        if (screen != null && screen > 120) return BreakType.FOCUS_RESET;
        if (energy != null && energy < 4) return BreakType.MEAL;
        if (mood != null && mood < 4) return BreakType.STRETCH;
        return BreakType.MICRO;
    }

    private String fallback() {
        return "Take a short hydration + stretch break and have a balanced snack (fruits + nuts).";
    }
}
