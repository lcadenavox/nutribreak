package com.nutribreak.dto;

import com.nutribreak.model.Role;
import com.nutribreak.model.WorkMode;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private WorkMode workMode;
    private Integer mood;
    private Integer energy;
    private Integer screenTimeMinutes;
}
