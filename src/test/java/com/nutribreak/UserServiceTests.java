package com.nutribreak;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.nutribreak.model.Role;
import com.nutribreak.model.User;
import com.nutribreak.model.WorkMode;
import com.nutribreak.service.UserService;

@SpringBootTest
@Transactional
class UserServiceTests {

    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder encoder;

    @Test
    void createUserWorks() {
        User u = User.builder()
            .name("Test User")
            .email("testuser@example.com")
            .password(encoder.encode("Password123!"))
            .role(Role.USER)
            .workMode(WorkMode.REMOTE)
            .mood(6)
            .energy(5)
            .screenTimeMinutes(90)
            .build();
        var dto = userService.create(u);
        assertThat(dto.getId()).isNotNull();
        assertThat(dto.getEmail()).isEqualTo("testuser@example.com");
    }
}
