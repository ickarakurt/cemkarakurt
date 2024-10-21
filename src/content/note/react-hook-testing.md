---
author: Cem Karakurt
pubDatetime: 2024-10-20T08:00:00Z
modDatetime: 2024-10-20T08:00:00Z
title: React Testing Hooks with `renderHook`
slug: react-hook-testing
featured: true
draft: false
tags:
  - react
  - testing
description: A cheat sheet for testing React hooks.
---

# React Hook Testing with `renderHook`

## Basic Setup

1. Install the testing library for hooks:

   ```bash
   npm install @testing-library/react-hooks
   ```

2. Import `renderHook` and `act` in your test file:

   ```javascript
   import { renderHook, act } from "@testing-library/react-hooks";
   ```

## Basic Usage

- Testing a simple hook:

  ```javascript
  const { result } = renderHook(() => useCustomHook());

  expect(result.current.someValue).toBe(initialValue);
  ```

## Updating Hook State

- When the hook involves state updates, use `act`:

  ```javascript
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
  ```

## Testing with Props

- Pass props to the hook and update them:

  ```javascript
  const { result, rerender } = renderHook(({ value }) => useCustomHook(value), {
    initialProps: { value: 0 },
  });

  expect(result.current.value).toBe(0);

  // Update the prop
  rerender({ value: 1 });
  expect(result.current.value).toBe(1);
  ```

## Testing Async Hooks

- Handling asynchronous code with hooks:

  ```javascript
  const { result, waitForNextUpdate } = renderHook(() => useAsyncHook());

  expect(result.current.loading).toBe(true);

  // Wait for the next state update
  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual(expectedData);
  ```

## Using `waitFor`

- For hooks that might update multiple times:

  ```javascript
  import { waitFor } from "@testing-library/react";

  const { result } = renderHook(() => useDebouncedValue(input));

  await waitFor(() => {
    expect(result.current).toBe(expectedValue);
  });
  ```

## Cleaning Up After Tests

- To ensure proper cleanup between tests:

  ```javascript
  afterEach(() => {
    // Clean up any effects left behind
    cleanup();
  });
  ```

## Mocking External Dependencies

- Example with `jest.mock`:

  ```javascript
  jest.mock("some-external-library", () => ({
    someFunction: jest.fn().mockReturnValue(mockValue),
  }));
  ```

## Summary of Methods

- **renderHook**: Render a hook function and return an object containing the result and helper methods.
- **act**: Wrap state updates to ensure React's state batching works correctly.
- **rerender**: Re-render the hook with new props.
- **waitForNextUpdate**: Wait for the next state update.
- **waitFor**: Wait for a condition to be met.

## References

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/react-hooks GitHub](https://github.com/testing-library/react-hooks-testing-library)
