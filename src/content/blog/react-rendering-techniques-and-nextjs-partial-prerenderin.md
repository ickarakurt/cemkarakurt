---
author: Cem Karakurt
pubDatetime: 2024-10-06T18:00:00Z
modDatetime: 2024-10-06T18:00:00Z
title: "React Rendering Techniques and NextJS Partial Prerendering"
slug: "react-rendering-techniques-and-nextjs-partial-prerendering"
featured: true
draft: false
tags:
  - nextjs
  - react
  - streaming
  - seo
  - performance
  - streaming
  - web-development
  - user-experience
  - frontend
description: Learn about React rendering techniques and how NextJS Partial Prerendering combines static content with dynamic content to improve SEO and user experience.
---

## Table of Contents

- [Introduction](#introduction)
- [Rendering Techniques](#rendering-techniques)
- [Deep Dive: What is Partial Prerendering?](#deep-dive-what-is-partial-prerendering)
- [How to Enable Partial Prerendering in NextJS](#how-to-enable-partial-prerendering-in-nextjs)
- [Conclusion](#conclusion)
- [Sources](#sources)

## Introduction

[NextJS](https://cemkarakurt.com/tags/nextjs/ "NextJS") is working on a feature called **Partial Prerendering**. It allows you to **prerender static content** at build time and then **stream dynamic content** at request time. This feature is beneficial for [**SEO**](https://cemkarakurt.com/tags/nextjs/ "Search Engine Optimization") and [**UX**](https://cemkarakurt.com/tags/user-experience/ "User Experience") because users can see the static content quickly while dynamic content loads in the background, improving the user experience and making the website more search engine friendly.

### Rendering Techniques

#### Client-Side Rendering (CSR)

- The page is rendered on the **client side** using JavaScript.
- The page is initially _empty_ and then filled with content after the JavaScript is loaded.
- **Good for interactivity** but _bad for SEO and initial load time_.

![Client-Side Rendering](/assets/csr.svg)

#### Server-Side Rendering (SSR)

- The page is rendered on the **server** and sent to the client as HTML.
- The page is _fully loaded_ when the user first accesses it.
- **Good for SEO and initial load time** but _bad for interactivity_.

![Server-Side Rendering](/assets/ssr.svg)

#### Static Site Generation (SSG)

- The page is rendered at **build time** and served as static HTML.
- The page is _fully loaded_ when the user first accesses it.
- **Good for SEO and initial load time** but _bad for dynamic content_.

![Static Site Generation](/assets/ssg.svg)

#### Streaming

- The page is rendered in **chunks** and sent to the client as they are ready.
- The page is _partially loaded_ when the user first accesses it.
- **Good for SEO, initial load time, and dynamic content**.

![Streaming](/assets/streaming.svg)

#### Partial Prerendering (PPR)

- The page is rendered in chunks with **static content at build time** and **dynamic content at request time**.
- The page is _partially loaded_ when the user first accesses it.
- **Good for SEO, initial load time, and dynamic content**.

![Partial Prerendering](/assets/ppr.svg)

### Deep Dive: What is Partial Prerendering?

#### From Real Life Perspective

Imagine rendering as **moving into a new apartment**. When you first arrive, you have _essential furniture_ like a bed, table, and chairs - these represent the **static content**. You can immediately start living in the apartment with these basics. However, you also want additional items like a TV, fridge, and washing machine - these represent **dynamic content**.

Instead of waiting for everything to be in place before moving in, you start living in the apartment right away with the essentials. Meanwhile, you order the additional items, which are delivered and set up gradually. This **parallel process** allows you to enjoy your new home quickly while still getting all the amenities you want.

This is similar to Partial Prerendering: you get the "keys" to your website (static content) fast, allowing users to interact with it immediately. At the same time, the "additional furniture" (dynamic content) is being prepared and added, enhancing the experience without delaying the initial access.

#### From Technical Perspective

When a user visits a website using Partial Prerendering, they receive an **initial HTML document** containing pre-rendered static content. This static content is generated during the **build process**. Simultaneously, the dynamic content is fetched and rendered in segments. These dynamic segments gradually replace **placeholder elements** within the initial HTML. This approach enables users to view and interact with the static content immediately, while the dynamic elements load progressively in the background. And all this is done in a **single request** without additional round trips to the server by using [**streaming**](https://cemkarakurt.com/tags/streaming/ "streaming").

The below pseudo code explains the process of Partial Prerendering:

```ts
// Build time
function buildTime() {
  // Generate static content
  staticContent = generateStaticContent();

  // Prepare placeholders for dynamic content
  dynamicContentPlaceholders = prepareDynamicPlaceholders();

  // Combine static content and placeholders
  initialHTML = combineStaticAndPlaceholders(
    staticContent,
    dynamicContentPlaceholders
  );

  // Store initial HTML for quick serving
  storeForServing(initialHTML);
}

// Request time
function requestTime(request) {
  // Quickly serve the initial HTML with static content and placeholders
  serveInitialHTML();

  // Start streaming for dynamic content
  stream = createStream();

  // For each dynamic component
  for (placeholder in dynamicContentPlaceholders) {
    // Fetch data or perform necessary computations
    dynamicData = fetchDataForPlaceholder(placeholder);

    // Render dynamic component
    renderedComponent = renderDynamicComponent(dynamicData);

    // Stream the rendered component to replace placeholder
    stream.write(renderedComponent);
  }

  // Close the stream when all dynamic content is sent
  stream.end();
}

// Main PPR process
function partialPrerendering() {
  buildTime(); // Prepare static content at build time

  // For each incoming request
  onRequest(request => {
    requestTime(request); // Serve static content quickly and stream dynamic content
  });
}
```

### How to Enable Partial Prerendering in NextJS

Enable PPR in `next.config.js`:

```tsx
// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
```

#### Use Suspense in your dynamic component

`Suspense` is a [**React**](https://cemkarakurt.com/tags/react/ "React") feature that allows you to **wait for a component to load** before rendering it. You can use Suspense to fetch data for your dynamic component and show a loading indicator while the data is being fetched.

```tsx
// page.tsx
import { Suspense } from "react";
import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui";

export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  );
}
```

### Incremental adoption of PPR

Next 15 supports **incremental adoption** of Partial Prerendering. You can incrementally adopt PPR in layouts and pages by setting the `ppr` option in `next.config.js` to `'incremental'`, and exporting the `experimental_ppr` route config option at the top of the file:

```tsx
// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
};

export default nextConfig;
```

```tsx
// app/page.tsx
import { Suspense } from "react";
import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui";

export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  );
}
```

This way, you can incrementally adopt Partial Prerendering in your Next.js application and observe how it improves the [**user experience**](https://cemkarakurt.com/tags/user-experience/ "User Experience") and [**SEO**](https://cemkarakurt.com/tags/seo/ "Search Engine Optimization").

### Conclusion

[**NextJS**](https://cemkarakurt.com/tags/nextjs/ "NextJS") Partial Prerendering is a powerful feature that combines the benefits of static site generation and server-side rendering. It allows you to serve static content quickly while streaming dynamic content, providing a better [**user experience**](https://cemkarakurt.com/tags/user-experience/ "User Experience") and improving [**SEO**](https://cemkarakurt.com/tags/seo/ "Search Engine Optimization").

The [**JS**](https://cemkarakurt.com/tags/javascript/ "Javascript") ecosystem is changing rapidly. It's crucial to keep up with the latest trends and technologies. Partial Prerendering is a new feature being popularized by NextJS, and you can be sure it will be widely used in the future. So, it's a good idea to learn about it and start using it in your projects. **Adapt to changes** and stay ahead of the curve.

### Sources

- [NextJS Partial Prerendering](https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering)
- [NextJS Streaming](https://nextjs.org/learn/dashboard-app/streaming)
- [NextJS Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
