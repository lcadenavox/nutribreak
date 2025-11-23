package com.nutribreak.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.nutribreak.dto.BreakRecordDTO;
import org.springframework.security.core.Authentication;
import com.nutribreak.service.BreakRecordService;
import com.nutribreak.messaging.EventPublisher;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/breaks")
@Validated
@RequiredArgsConstructor
public class BreakRecordController {
    private final BreakRecordService breakRecordService;
    @Autowired(required = false)
    private EventPublisher publisher;

    @GetMapping
    public Page<BreakRecordDTO> list(Pageable pageable) { return breakRecordService.list(pageable); }

    @GetMapping("/{id}")
    public BreakRecordDTO get(@PathVariable Long id) { return breakRecordService.get(id); }

    @PostMapping
    public ResponseEntity<BreakRecordDTO> create(@Valid @RequestBody BreakRecordDTO breakDto, Authentication auth, UriComponentsBuilder uri) {
        BreakRecordDTO dto = breakRecordService.createForUser(breakDto, auth.getName());
        if (publisher != null) publisher.publish("BREAK_CREATED:" + dto.getId());
        return ResponseEntity.created(uri.path("/api/breaks/{id}").build(dto.getId())).body(dto);
    }

    @PutMapping("/{id}")
    public BreakRecordDTO update(@PathVariable Long id, @Valid @RequestBody BreakRecordDTO breakDto) { return breakRecordService.update(id, breakDto); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        breakRecordService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
