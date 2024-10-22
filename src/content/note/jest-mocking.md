---
author: Cem Karakurt
pubDatetime: 2024-10-21T08:00:00Z
modDatetime: 2024-10-21T08:00:00Z
title: Jest Mocking Cheat Sheet
slug: jest-mocking
featured: false
draft: false
tags:
  - testing
description: A cheat sheet for different ways to mock with Jest.
---

# Jest Mocking Cheat Sheet

## Basic Mocking

1. **Mocking a function:**

   This creates a mock function using `jest.fn()`, which can track how it's called and with what arguments.

   ```javascript
   const mockFn = jest.fn();

   mockFn(); // Call the mock function
   expect(mockFn).toHaveBeenCalled(); // Check if it was called
   ```

**Tip:** Mock functions also track how many times they are called and the parameters passed, which is useful in tests with multiple calls.

2. **Mocking the return value of a function:**

   In this example, the mock function always returns "Hello World".

   ```javascript
   const mockFn = jest.fn().mockReturnValue("Hello World");

   expect(mockFn()).toBe("Hello World");
   ```

**Note:** `mockReturnValue` is useful when you need to simulate constant return values for your mock functions.

## Mocking Modules

1. **Mocking an entire module:**

   The `jest.mock` method automatically mocks all functions inside a module.

   ```javascript
   jest.mock("module-name");

   const moduleName = require("module-name");
   moduleName.someFunction(); // The function is now a mock
   ```

**Detail:** This is particularly helpful when testing modules that make network requests or interact with databases to avoid actual calls during testing.

2. **Mocking a module with specific implementations:**

   Instead of mocking the whole module, you can mock specific methods.

   ```javascript
   jest.mock("module-name", () => ({
     someFunction: jest.fn().mockReturnValue("Mocked Value"),
   }));

   const { someFunction } = require("module-name");
   expect(someFunction()).toBe("Mocked Value");
   ```

**Use Case:** This is useful when you want more control over certain module methods while leaving others untouched.

## Mocking Implementation

1. **Mocking the implementation of a function:**

   The `mockImplementation` method allows you to replace the function's logic.

   ```javascript
   const mockFn = jest.fn().mockImplementation(() => "Hello Jest");

   expect(mockFn()).toBe("Hello Jest");
   ```

**Detail:** This is great for complex mocking logic where you need different behaviors based on conditions or inputs.

2. **Mocking different return values for consecutive calls:**

   This is useful for simulating different scenarios in multiple function calls, such as paginated API responses.

   ```javascript
   const mockFn = jest
     .fn()
     .mockReturnValueOnce("First Call")
     .mockReturnValueOnce("Second Call");

   expect(mockFn()).toBe("First Call");
   expect(mockFn()).toBe("Second Call");
   ```

**Best Practice:** Use this pattern when testing functions that are called multiple times with different results.

## Mocking with `jest.spyOn`

1. **Spying on a method of an object:**

   The `jest.spyOn` method tracks calls to an existing method without replacing it entirely unless you mock it.

   ```javascript
   const obj = { method: () => "Original Value" };
   const spy = jest.spyOn(obj, "method").mockReturnValue("Mocked Value");

   expect(obj.method()).toBe("Mocked Value");
   spy.mockRestore(); // Restore original method
   ```

**Important:** Always call `mockRestore` after tests to ensure you restore the original implementation.

2. **Spying on a module's method:**

   You can use `jest.spyOn` to spy on module functions such as `fs.readFileSync`.

   ```javascript
   const fs = require("fs");
   const spy = jest
     .spyOn(fs, "readFileSync")
     .mockReturnValue("Mocked File Content");

   expect(fs.readFileSync("path/to/file")).toBe("Mocked File Content");
   spy.mockRestore(); // Restore original method
   ```

**Pro Tip:** This is handy when you want to avoid modifying global state or when you're testing isolated functions.

## Mocking Timers

1. **Mocking `setTimeout` and other timer functions:**

   Jest's `useFakeTimers()` enables mocking of all time-related functions, such as `setTimeout`, `setInterval`, etc.

   ```javascript
   jest.useFakeTimers();

   const mockFn = jest.fn();
   setTimeout(mockFn, 1000);

   jest.runAllTimers();
   expect(mockFn).toHaveBeenCalled();
   ```

**Use Case:** Use this when testing functions that depend on time or delays, like retry logic or animations.

2. **Advancing timers by a specific amount of time:**

   You can manually control the passage of time with `jest.advanceTimersByTime()`.

   ```javascript
   jest.useFakeTimers();

   const mockFn = jest.fn();
   setTimeout(mockFn, 1000);

   jest.advanceTimersByTime(1000);
   expect(mockFn).toHaveBeenCalled();
   ```

**Example:** Useful for simulating timeouts or testing long-running operations without waiting.

## Mocking Asynchronous Functions

1. **Mocking a resolved promise:**

   This is how you mock an async function that resolves with a value.

   ```javascript
   const mockFn = jest.fn().mockResolvedValue("Resolved Value");

   await expect(mockFn()).resolves.toBe("Resolved Value");
   ```

2. **Mocking a rejected promise:**

   Mock an async function that throws an error.

   ```javascript
   const mockFn = jest.fn().mockRejectedValue(new Error("Rejected Error"));

   await expect(mockFn()).rejects.toThrow("Rejected Error");
   ```

**Tip:** Use `mockResolvedValue` and `mockRejectedValue` to simulate async behavior when testing API calls or database queries.

## Clearing and Resetting Mocks

1. **Clearing mock calls and instances:**

   Use `mockClear()` to clear the recorded calls and instances without changing the mock’s behavior.

   ```javascript
   const mockFn = jest.fn();
   mockFn();
   mockFn.mockClear(); // Clears mock calls
   expect(mockFn).not.toHaveBeenCalled();
   ```

2. **Resetting mock implementations:**

   The `mockReset()` method resets both the recorded calls and the mock’s implementation.

   ```javascript
   const mockFn = jest.fn().mockReturnValue("Initial Value");
   mockFn.mockReset(); // Resets the mock implementation
   expect(mockFn()).toBeUndefined();
   ```

**Difference:** While `mockClear` only removes calls, `mockReset` completely removes both calls and any predefined behavior.

## Summary of Methods

- **jest.fn()**: Create a mock function.
- **jest.mock()**: Mock an entire module.
- **jest.spyOn()**: Spy on a method or function.
- **jest.useFakeTimers()**: Mock timer functions.
- **mockClear()**: Clear mock function calls.
- **mockReset()**: Reset the mock function implementation.
- **mockRestore()**: Restore the original function implementation.

## References

- [Jest Documentation](https://jestjs.io/docs/en/mock-functions)
