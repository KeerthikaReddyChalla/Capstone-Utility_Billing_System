# Utility Billing System – Microservices Architecture

This application is built on Spring Boot microservices, designed to manage the complete utility lifecycle — from consumer onboarding and meter readings to billing, payments, and notifications. The platform uses an event-driven microservices architecture, with **Dockerized services**, **Jenkins-based CI/CD automation**, and **JUnit testing** to support scalable, loosely coupled, and reliable service interactions.

## Features

- User authentication & role-based access (JWT)
- Consumer onboarding & management
- Meter reading ingestion
- Automated bill generation
- Online payment processing
- Overdue bill notifications
- Asynchronous communication using RabbitMQ
- Centralized configuration & service discovery

---

## Microservices

- **API Gateway** – Central entry point for all requests  
- **Auth Service** – Authentication & JWT token generation  
- **Consumer Service** – Consumer profile management  
- **Utility Service** – Utility & tariff management  
- **Meter Service** – Meter reading processing  
- **Billing Service** – Bill generation & overdue detection  
- **Payment Service** – Bill payment handling  
- **Notification Service** – User notifications  
- **Config Server** – Centralized configuration  
- **Eureka Server** – Service discovery  

---

## System Architecture

<img width="1195" height="786" alt="Screenshot 2026-01-06 225411" src="https://github.com/user-attachments/assets/248b4499-00c2-4ef7-b006-cb0970210556" />


