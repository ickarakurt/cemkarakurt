---
author: Cem Karakurt
pubDatetime: 2023-12-30T00:00:00Z
modDatetime: 2023-12-30T00:00:00Z
title: "Messaging Services in AWS: SNS, SQS, Kinesis, and EventBridge"
slug: aws-messaging-sqs-sns-kinesis-eventbridge
featured: false
draft: false
tags:
  - aws
  - sqs
  - sns
  - kinesis
  - eventbridge
  - messaging
  - distributed-systems
description:
  Explore AWS messaging services like SNS, SQS, Kinesis, and EventBridge, and
  learn how to choose the right one for your distributed system.
---

- [Introduction](#introduction)
- [Simple Queue Service (SQS)](#simple-queue-service-sqs)
- [Simple Notification Service (SNS)](#simple-notification-service-sns)
- [Kinesis](#kinesis)
- [EventBridge](#eventbridge)
- [Comparative Analysis](#comparative-analysis)
- [System Design Example](#system-design-example)
- [Conclusion](#conclusion)

## Introduction

Messaging is vital in distributed systems, ensuring smooth communication between decoupled components. Choosing the right AWS messaging service like `SNS`, `SQS`, `Kinesis`, and `EventBridge` is crucial to prevent issues such as message loss, duplication, and budget overruns. This article delves into their features and ideal use cases.

## Simple Queue Service (SQS)

SQS acts as a buffer between producers and consumers in a `pull-based` model, ideal for ensuring message order and reliable delivery.

**Key Features:**

- **Message Retention:** Default 4 days. Up to 14 days
- **Throughput:** Unlimited for standard queues. For FIFO, 300 msg/s without batching, 3000 msg/s with
- **Queues:** Standard and FIFO
- **Use Case:** Perfect for tasks like sending welcome emails post user sign-up

### Dead Letter Queues

Dead letter queues (DLQs) are queues that receive messages that cannot be processed successfully. They are useful for debugging and reprocessing messages. SQS supports DLQs for both standard and FIFO queues.

## Simple Notification Service (SNS)

SNS shines as a `pub/sub` service, ideal for efficiently broadcasting messages to `multiple subscribers`.

**Key Features:**

- **Message Delivery:** Immediate, without retention
- **Throughput:** Unlimited
- **Use Case:** Ideal for sending notifications to multiple subscribers simultaneously

### Fanout with SQS

Combining SNS with SQS in a fanout pattern ensures message durability while leveraging SNS's broad reach.

SNS publishes messages to SQS queues, which are then consumed by subscribers. This approach ensures that messages are not lost even if subscribers are offline.

![System Architecture](/assets/blog6_diagram2.png)

## Kinesis

Kinesis is designed for `high-volume`, `real-time` message processing, a robust choice for immediate data processing and analysis.

**Key Features:**

- **Message Retention:** 24 hours to 365 days (with additional configuration)
- **Streams:** Standard and Enhanced Fanout
- **Use Case:** Optimal for processing large data streams, like real-time analytics

## EventBridge

EventBridge serves as a scalable `event bus`, connecting applications with AWS services and SaaS platforms seamlessly.

**Key Features:**

- **Event Patterns and Rules:** Supports a wide range of event scenarios
- **Integration:** Compatible with AWS and third-party services
- **Use Case:** Excellent for managing state changes and complex workflows

## Comparative Analysis

| Feature               | SQS                   | SNS                  | Kinesis              | EventBridge            |
| --------------------- | --------------------- | -------------------- | -------------------- | ---------------------- |
| **Model**             | Queue                 | Pub/Sub              | Streaming Data       | Event Bus              |
| **Throughput**        | Unlimited             | Unlimited            | High                 | High                   |
| **Message Retention** | Up to 14 days         | Immediate delivery   | 24 hours to 365 days | Immediate routing      |
| **Use Case**          | Decoupling components | Broadcasting to many | Real-time processing | Event-driven workflows |

# System Design Example

Consider a hypothetical e-commerce application integrating these AWS services for varied operations such as order processing, inventory management, notifications, and real-time analytics.

### Components

- **Web Application Servers**: Handle user browsing and order placements.
- **Order Processing Service**: Manages orders, interfacing with inventory and notification systems.
- **Inventory Management Service**: Monitors stock levels.
- **Notification Service**: Sends customer and internal notifications.
- **Analytics Service**: Analyzes real-time data.
- **Database**: Stores product and order data.

### AWS Messaging Services Integration

- **SQS for Order Processing**: Manages orders, ensuring efficient processing and database updates.
- **SNS for Notifications**: Broadcasts messages to multiple services, including order confirmations and inventory updates.
- **Kinesis for Analytics**: Streams user activity for real-time insights.
- **EventBridge for Integration**: Orchestrates events among various AWS services and triggers appropriate actions.

### Diagram

![System Architecture](/assets/blog6_diagram.png)

## Conclusion

Each AWS messaging service offers distinct benefits:

- **SQS:** Ideal for decoupling and ensuring ordered processing.
- **SNS:** Best for multi-subscriber message distribution.
- **Kinesis:** Suited for high-volume data streaming.
- **EventBridge:** Excellent for complex event-driven architectures.

**Note:** The details provided about AWS services (SQS, SNS, Kinesis, and EventBridge) such as message retention periods, throughput limits, and queue types, are subject to change. AWS continuously updates its services, so it's essential to refer to the [official AWS Documentation](https://aws.amazon.com/documentation/) for the most current and accurate information. This will ensure that you have up-to-date data for your system architecture and planning.
