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

1. Mocking a function:

   ```javascript
   const mockFn = jest.fn();

   mockFn(); // Call the mock function
   expect(mockFn).toHaveBeenCalled(); // Check if it was called
   ```

2. Mocking the return value of a function:

   ```javascript
   const mockFn = jest.fn().mockReturnValue("Hello World");

   expect(mockFn()).toBe("Hello World");
   ```

## Mocking Modules

1. Mocking an entire module:

   ```javascript
   jest.mock("module-name");

   const moduleName = require("module-name");
   moduleName.someFunction(); // The function is now a mock
   ```

2. Mocking a module with specific implementations:

   ```javascript
   jest.mock("module-name", () => ({
     someFunction: jest.fn().mockReturnValue("Mocked Value"),
   }));

   const { someFunction } = require("module-name");
   expect(someFunction()).toBe("Mocked Value");
   ```

## Mocking Implementation

1. Mocking the implementation of a function:

   ```javascript
   const mockFn = jest.fn().mockImplementation(() => "Hello Jest");

   expect(mockFn()).toBe("Hello Jest");
   ```

2. Mocking different return values for consecutive calls:

   ```javascript
   const mockFn = jest
     .fn()
     .mockReturnValueOnce("First Call")
     .mockReturnValueOnce("Second Call");

   expect(mockFn()).toBe("First Call");
   expect(mockFn()).toBe("Second Call");
   ```

## Mocking with `jest.spyOn`

1. Spying on a method of an object:

   ```javascript
   const obj = { method: () => "Original Value" };
   const spy = jest.spyOn(obj, "method").mockReturnValue("Mocked Value");

   expect(obj.method()).toBe("Mocked Value");
   spy.mockRestore(); // Restore original method
   ```

2. Spying on a module's method:

   ```javascript
   const fs = require("fs");
   const spy = jest
     .spyOn(fs, "readFileSync")
     .mockReturnValue("Mocked File Content");

   expect(fs.readFileSync("path/to/file")).toBe("Mocked File Content");
   spy.mockRestore(); // Restore original method
   ```

## Mocking Timers

1. Mocking `setTimeout` and other timer functions:

   ```javascript
   jest.useFakeTimers();

   const mockFn = jest.fn();
   setTimeout(mockFn, 1000);

   jest.runAllTimers();
   expect(mockFn).toHaveBeenCalled();
   ```

2. Advancing timers by a specific amount of time:

   ```javascript
   jest.useFakeTimers();

   const mockFn = jest.fn();
   setTimeout(mockFn, 1000);

   jest.advanceTimersByTime(1000);
   expect(mockFn).toHaveBeenCalled();
   ```

## Mocking Asynchronous Functions

1. Mocking a resolved promise:

   ```javascript
   const mockFn = jest.fn().mockResolvedValue("Resolved Value");

   await expect(mockFn()).resolves.toBe("Resolved Value");
   ```

2. Mocking a rejected promise:

   ```javascript
   const mockFn = jest.fn().mockRejectedValue(new Error("Rejected Error"));

   await expect(mockFn()).rejects.toThrow("Rejected Error");
   ```

## Clearing and Resetting Mocks

1. Clearing mock calls and instances:

   ```javascript
   const mockFn = jest.fn();
   mockFn();
   mockFn.mockClear(); // Clears mock calls
   expect(mockFn).not.toHaveBeenCalled();
   ```

2. Resetting mock implementations:

   ```javascript
   const mockFn = jest.fn().mockReturnValue("Initial Value");
   mockFn.mockReset(); // Resets the mock implementation
   expect(mockFn()).toBeUndefined();
   ```

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
