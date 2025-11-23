package com.nutribreak.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "meals")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @NotNull
    private LocalDateTime timestamp;

    @NotBlank
    private String items;

    @Min(0)
    private Integer calories;
}
