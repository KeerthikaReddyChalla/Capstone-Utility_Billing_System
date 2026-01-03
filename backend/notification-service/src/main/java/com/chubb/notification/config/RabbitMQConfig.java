package com.chubb.notification.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // ---------- EXCHANGE ----------
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange("utility.events.exchange");
    }

    // ---------- QUEUES ----------
    @Bean
    public Queue authQueue() {
        return new Queue("notification.auth.queue", true);
    }

    @Bean
    public Queue billQueue() {
        return new Queue("notification.bill.queue", true);
    }

    @Bean
    public Queue paymentQueue() {
        return new Queue("notification.payment.queue", true);
    }

    // ---------- BINDINGS ----------
    @Bean
    public Binding authBinding() {
        return BindingBuilder
                .bind(authQueue())
                .to(exchange())
                .with("auth.consumer.*");
    }

    @Bean
    public Binding billBinding() {
        return BindingBuilder
                .bind(billQueue())
                .to(exchange())
                .with("bill.*");
    }

    @Bean
    public Binding paymentBinding() {
        return BindingBuilder
                .bind(paymentQueue())
                .to(exchange())
                .with("payment.*");
    }

    // ---------- MESSAGE CONVERTER ----------
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // ---------- RABBIT TEMPLATE ----------
    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            MessageConverter messageConverter) {

        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        return template;
    }
}
