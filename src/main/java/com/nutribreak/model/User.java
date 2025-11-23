package com.nutribreak.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 8)
    private String password;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Builder.Default
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private WorkMode workMode = WorkMode.REMOTE;

    @Min(1) @Max(10)
    private Integer mood;

    @Min(1) @Max(10)
    private Integer energy;

    @Min(0)
    private Integer screenTimeMinutes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Meal> meals = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<BreakRecord> breaks = new HashSet<>();
}
