package com.nutribreak.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "break_records")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BreakRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @NotNull
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private BreakType breakType;

    private Boolean recommended;

    @Min(1) @Max(10)
    private Integer energyBefore;

    @Min(1) @Max(10)
    private Integer energyAfter;
}
