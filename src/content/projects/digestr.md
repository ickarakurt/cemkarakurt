---
title: "Digestr"
subtitle: "AI-Powered News Digest SaaS"
address: "https://digestr.app"
technologies:
  [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Better Auth",
    "Upstash",
    "Google Gemini",
    "Resend",
    "Discord",
    "Docker",
    "GitHub Actions",
  ]
featured: true
draft: false
---

An AI-powered news digest SaaS that aggregates sources (GitHub Trending, Hacker News, RSS, crypto), summarizes with LLMs, and delivers scheduled digests via web dashboard, email, and Discord.

Built with **Next.js 16 + React 19**, backed by **PostgreSQL + Drizzle ORM**, and secured with **Better Auth** (email/password + OAuth). Uses **Upstash Redis/QStash/Workflow** for scheduling and background jobs, **Google Gemini via AI SDK** for summary generation, and **Resend + Discord webhooks** for delivery. Tested with **Playwright + Node test runner** and deployed via **Docker + GitHub Actions** CI/CD pipeline.
