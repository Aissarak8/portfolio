---
title: How I Built This Portfolio
date: 2026-06-30
category: Web Development
excerpt: A look at the tech and decisions behind this site — React, Vite, Tailwind CSS v4, a live GitHub dashboard, and a local AI assistant.
readTime: 4 min
---

# How I Built This Portfolio

This website is my biggest project so far, and it's also a project *about* my projects. Here's how it's put together.

## The stack

- **React 18 + Vite** — fast dev server and optimized builds.
- **Tailwind CSS v4** — a small, custom design system (one indigo → sky gradient, lots of whitespace).
- **Framer Motion** — subtle scroll animations and micro-interactions.
- **React Router** — for the project case-study pages and this blog.

## A few things I'm proud of

### Everything is data-driven
All the content lives in `src/data/*`. To update the site, I edit data — not components. This keeps things clean and easy to maintain.

### A live GitHub dashboard
The dashboard pulls real data from the **GitHub API** — repositories, followers, languages and recent commits. If the data isn't available, it shows a clean placeholder instead of fake numbers.

### An interactive terminal and a local AI assistant
You can explore the site by typing commands in a terminal, or chat with a small assistant that answers questions about me. The assistant runs **entirely in the browser** from a local JSON file — no external AI API.

## What I learned

- How to design and ship a consistent design system.
- How to integrate third-party APIs cleanly with React hooks.
- How to structure a React app so it can grow without becoming a mess.

## What's next

I want to add real project screenshots, a downloadable CV, and automated tests. This site will keep evolving as I do.
