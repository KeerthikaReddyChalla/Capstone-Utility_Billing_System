package com.chubb.notification.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange("utility.events.exchange");
    }

    @Bean
    public Queue billQueue() {
        return new Queue("notification.bill.queue");
    }

    @Bean
    public Queue paymentQueue() {
        return new Queue("notification.payment.queue");
    }

    @Bean
    public Queue authQueue() {
        return new Queue("notification.auth.queue");
    }

    @Bean
    public Binding billBinding() {
        return BindingBuilder.bind(billQueue())
                .to(exchange()).with("bill.*");
    }

    @Bean
    public Binding paymentBinding() {
        return BindingBuilder.bind(paymentQueue())
                .to(exchange()).with("payment.*");
    }

    @Bean
    public Binding authBinding() {
        return BindingBuilder.bind(authQueue())
                .to(exchange()).with("auth.*");
    }
}

