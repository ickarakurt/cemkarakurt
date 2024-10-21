---
author: Cem Karakurt
pubDatetime: 2023-10-02T00:00:00Z
modDatetime: 2023-10-02T00:00:00Z
title: "End-to-End Type Safety: Development and Runtime Validation with TypeScript and Zod"
slug: end-to-end-type-safety-development-and-runtime-validation-with-typescript-and-zod
featured: false
draft: false
tags:
  - typescript
  - frontend
  - backend
  - api
description:
  TypeScript is only half the battle. Learn how to achieve end-to-end type safety
  with runtime validation using Zod.
---

[**Typescript**](https://cemkarakurt.com/tags/typescript/ "Typescript") has revolutionized `type validation` in development, functioning primarily as a sophisticated linter to ensure type safety during this phase. However, TypeScript's capabilities don't extend to runtime. To bridge this gap, runtime validators like **yup**, **io-ts**, and **zod** come into play. This guide delves into leveraging these tools for a comprehensive validation strategy.

### Advanced Type Definition for a Todo Item

```ts
type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

### Creating a Robust Runtime Schema for the Todo Item with Zod

```ts
import * as z from "zod";

const TodoItemValidator = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
```

Here, Zod's schema mirrors the TypeScript type, ensuring congruence between compile-time and runtime validations.

### Comprehensive Strategy for Validation

#### 1. Define a Detailed Entity Schema

```ts
import * as z from "zod";

const TodoItemValidator = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
```

#### 2. Implement Granular Request and Response Validations

For [**backend**](https://cemkarakurt.com/tags/backend/ "backend") [**APIs**](https://cemkarakurt.com/tags/api/ "API"), use specific validators for request and response payloads.

```ts
// Define specific attributes for the create API request
const TodoItemCreateRequestValidator = TodoItemValidator.pick({
  title: true,
  done: true,
});

// Validator for the response when fetching a specific Todo item
const TodoItemGetByIdResponseValidator = TodoItemValidator;
```

#### 3\. Generate Sophisticated Types from Zod Validations

```ts
type TodoItemType = z.infer<typeof TodoItemValidator>;

type TodoItemCreateRequestType = z.infer<typeof TodoItemCreateRequestValidator>;

type TodoItemCreateResponseType = z.infer<
  typeof TodoItemGetByIdResponseValidator
>;
```

#### 4\. Integrate the Types in Frontend Development

```ts
import axios from "axios";

let data: TodoItemCreateRequestType = {
  title: "work work work",
  done: false,
};

axios
  .post<TodoItemCreateResponseType>("http://localhost:8080/todoitem", data)
  .then(response => {
    console.log(response.data);
  });
```

#### 5\. Apply Validators in Form Submissions and Backend API

For [**frontend**](https://cemkarakurt.com/tags/frontend/ "frontend") form submissions and backend API interactions, employ the validators to ensure data integrity.

```ts
// Validate incoming request payload
const validateRequestPayload =
  TodoItemCreateRequestValidator.safeParse(payload);

// Validate API response data
const validateResponse = TodoItemGetByIdResponseValidator.safeParse(response);

// Use `validate.success` for boolean validation result
```

### In-Depth Conclusion

We began with the creation of a comprehensive entity validator, a critical step in our type safety journey. Building upon this, we specified request and response validators, each with their distinct types derived from Zod schemas. This approach not only guarantees consistency between TypeScript's compile-time checks and Zod's runtime validation but also ensures a robust, error-resistant application. By meticulously implementing these strategies, developers can achieve unparalleled levels of type safety and data integrity in both [**frontend**](https://cemkarakurt.com/tags/frontend/ "frontend") and [**backend**](https://cemkarakurt.com/tags/backend/ "backend") environments.
