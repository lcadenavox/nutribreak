package com.nutribreak.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Component
@Slf4j
@ConditionalOnBean(RabbitTemplate.class)
public class EventListener {
    @RabbitListener(queues = "${nutribreak.events.queue}")
    public void handle(Object message) {
        log.info("Received async event: {}", message);
        // Placeholder for further processing
    }
}
