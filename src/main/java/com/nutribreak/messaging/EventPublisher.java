package com.nutribreak.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@ConditionalOnBean(RabbitTemplate.class)
@ConditionalOnProperty(name = "nutribreak.amqp.enabled", havingValue = "true", matchIfMissing = false)
public class EventPublisher {
    private final RabbitTemplate rabbitTemplate;
    @Value("${nutribreak.events.queue}")
    private String queueName;

    public void publish(Object payload) {
        rabbitTemplate.convertAndSend(queueName, payload);
    }
}
