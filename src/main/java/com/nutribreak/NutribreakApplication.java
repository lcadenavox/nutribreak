package com.nutribreak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nutribreak.repository.UserRepository;
import com.nutribreak.model.User;
import com.nutribreak.model.Role;
import com.nutribreak.model.WorkMode;

@SpringBootApplication
@EnableCaching
public class NutribreakApplication {

	public static void main(String[] args) {
		SpringApplication.run(NutribreakApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder encoder) {
		return args -> {
			if (userRepository.count() == 0) {
				User admin = User.builder()
					.name("Administrator")
					.email("admin@nutribreak.local")
					.password(encoder.encode("Admin123!"))
					.role(Role.ADMIN)
					.workMode(WorkMode.REMOTE)
					.mood(7)
					.energy(7)
					.screenTimeMinutes(0)
					.build();
				userRepository.save(admin);
			}
		};
	}

}
