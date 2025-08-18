# Email Service

A project for asynchronous email sending using **Fastify**, **RabbitMQ**, and **Nodemailer**.

---

## Technologies Used

- [Fastify](https://www.fastify.io/) - Fast web framework for Node.js  
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker for asynchronous queues  
- [Nodemailer](https://nodemailer.com/about/) - Library for sending emails  

---

## Features

- Asynchronous email sending via RabbitMQ queues  
- Support for multiple senders and email templates  
- Scalable: can add multiple workers to process queues  
- Basic queue management for emails  

---

## Prerequisites

- Node.js >= 18  
- RabbitMQ running locally or remotely  

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/your-username/email-service.git
cd email-service
```

2. Install dependencies:
```bash
yarn
```

3. Set up environment variables (create a .env file):
```
RABBITMQ_URL=amqp://user:password@localhost:5672
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
```

## Running the Project

1. Start the Fastify Backend and Producer RabbitMQ server:
```
yarn dev:backend
```

2. Start the Fastify Consumer RabbitMQ server:
```
yarn dev:consumer
```

