---
author: Cem Karakurt
pubDatetime: 2022-09-12T00:00:00Z
modDatetime: 2022-09-12T00:00:00Z
title: "How To Test React Hooks with 2 Different Approaches"
slug: how-to-test-react-hooks-with-2-different-approach
featured: false
draft: false
tags:
  - react
  - testing
  - frontend
description:
  Explore React hooks testing through UI interactions and direct calls with the
  React Testing Library. Get started with clear, practical examples.
---

Testing [**React**](https://cemkarakurt.com/tags/react/ "React") hooks doesn't have to be daunting. Today, I'm thrilled to walk you through two approaches that will elevate your [**testing**](https://cemkarakurt.com/tags/testing/ "testing") game. Whether you're a fan of direct engagement with the UI or prefer the straightforward path of calling hook methods directly, I've got you covered. Let's embark on this journey together.

**Rendering a Component And Interacting with UI Elements**

1. Import the React Testing Library and the hook you want to test into the test file.
2. Create a test case and wrap the hook in a custom render function provided by the React Testing Library.
3. Use the custom render function to render the hook and any associated components.
4. Use the React Testing Library’s query functions to interact with the rendered components and test the behavior of the hook.
5. Assert on the behavior and state of the hook using the React Testing Library’s assertions.

For example:

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import useCounter from "./useCounter";

test("useCounter increments and decrements the counter correctly", () => {
  // Custom render function that provides the hook as a prop to the component
  const renderHook = (props = {}) => {
    const wrapper = ({ children }) => <div>{children(useCounter())}</div>;
    return render(<wrapper {...props} />);
  };

  // Render the hook and get the value of the counter
  const { getByText } = renderHook();
  const counterValue = getByText("0");

  // Test that the counter value increases when the increment button is clicked
  fireEvent.click(getByText("+"));
  expect(counterValue.textContent).toBe("1");

  // Test that the counter value decreases when the decrement button is clicked
  fireEvent.click(getByText("-"));
  expect(counterValue.textContent).toBe("0");
});
```

**With Calling Hook Methods**

Import the react testing library and the react hook you want to test into your test file.

1.  Create a test case for the hook using the test function from the react testing library.
2.  In the test case, render the hook using the renderHook function from the react testing library.
3.  Use the act function from the react testing library to simulate events and actions that would trigger the hook to update.
4.  Use the result object returned by the renderHook function to access the state and values returned by the hook and assert that they are correct using the expect function from the react testing library.

For example:

```ts
import { renderHook, act, test } from "@testing-library/react-hooks";
import useCounter from "./useCounter";

test("useCounter hook", () => {
  const { result } = renderHook(() => useCounter());

  // assert initial value of counter is 0
  expect(result.current.counter).toBe(0);

  // simulate increment action
  act(() => result.current.increment());

  // assert that counter value has increased by 1
  expect(result.current.counter).toBe(1);

  // simulate decrement action
  act(() => result.current.decrement());

  // assert that counter value has decreased by 1
  expect(result.current.counter).toBe(0);
});
```
