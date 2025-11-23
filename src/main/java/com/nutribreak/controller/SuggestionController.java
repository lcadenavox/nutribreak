package com.nutribreak.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutribreak.dto.SuggestionRequestDTO;
import com.nutribreak.dto.SuggestionResponseDTO;
import com.nutribreak.service.SuggestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
public class SuggestionController {
    private final SuggestionService suggestionService;

    @PostMapping
    public SuggestionResponseDTO generate(@RequestBody SuggestionRequestDTO req) {
        return suggestionService.generate(req);
    }
}
