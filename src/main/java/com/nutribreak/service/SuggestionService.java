package com.nutribreak.service;

import java.util.Locale;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.nutribreak.dto.SuggestionRequestDTO;
import com.nutribreak.dto.SuggestionResponseDTO;
import com.nutribreak.model.BreakType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    private final MessageSource messageSource;

    @Cacheable(value = "suggestions", key = "#req.mood + '-' + #req.energy + '-' + #req.workMode + '-' + #req.screenTimeMinutes + '-' + #req.language")
    public SuggestionResponseDTO generate(SuggestionRequestDTO req) {
        Locale locale = "pt".equalsIgnoreCase(req.getLanguage()) ? new Locale("pt") : Locale.ENGLISH;
        String content = messageSource.getMessage("suggestion.default", null, locale);
        BreakType breakType = pickBreakType(req.getEnergy(), req.getMood(), req.getScreenTimeMinutes());
        String mealIdea = getMealIdea(locale);
        String breakTypeName = getBreakTypeName(breakType, locale);
        
        return SuggestionResponseDTO.builder()
            .suggestionText(content)
            .recommendedBreakType(breakTypeName)
            .recommendedMealIdea(mealIdea)
            .build();
    }

    private BreakType pickBreakType(Integer energy, Integer mood, Integer screen) {
        if (screen != null && screen > 120) return BreakType.FOCUS_RESET;
        if (energy != null && energy < 4) return BreakType.MEAL;
        if (mood != null && mood < 4) return BreakType.STRETCH;
        return BreakType.MICRO;
    }

    private String getMealIdea(Locale locale) {
        if (locale.getLanguage().equals("pt")) {
            return "Frutas, castanhas e água";
        }
        return "Fruit, nuts and water";
    }

    private String getBreakTypeName(BreakType type, Locale locale) {
        if (locale.getLanguage().equals("pt")) {
            return switch(type) {
                case MICRO -> "Micropause";
                case STRETCH -> "Alongamento";
                case HYDRATION -> "Hidratação";
                case MEAL -> "Refeição";
                case FOCUS_RESET -> "Resetar Foco";
            };
        }
        return type.name();
    }
}
