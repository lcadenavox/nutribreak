package com.nutribreak.config;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@Configuration
@ConditionalOnProperty(name = "nutribreak.events.queue")
public class RabbitConfig {
    @Value("${nutribreak.events.queue}")
    private String queueName;

    @Bean
    Queue nutribreakQueue() { return new Queue(queueName, true); }
}
