package com.nutribreak.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.nutribreak.repository.UserRepository;
import com.nutribreak.model.User;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final UserRepository userRepository;

    @Bean
    PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    UserDetailsService userDetailsService() {
        return email -> {
            User u = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            UserDetails details = org.springframework.security.core.userdetails.User
                .withUsername(u.getEmail())
                .password(u.getPassword())
                .roles(u.getRole().name())
                .build();
            return details;
        };
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/actuator/**", "/h2/**").permitAll()
                .anyRequest().authenticated())
            .httpBasic();
        http.headers(headers -> headers.frameOptions(frame -> frame.disable())); // allow H2 console
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.addAllowedOrigin("http://localhost:5173");
        cfg.setAllowCredentials(true);
        cfg.addAllowedHeader("Authorization");
        cfg.addAllowedHeader("Content-Type");
        cfg.addAllowedHeader("Accept");
        cfg.addAllowedMethod("GET");
        cfg.addAllowedMethod("POST");
        cfg.addAllowedMethod("PUT");
        cfg.addAllowedMethod("DELETE");
        cfg.addAllowedMethod("OPTIONS");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", cfg);
        return source;
    }
}
