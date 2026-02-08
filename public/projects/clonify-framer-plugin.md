# Clonify Framer Plugin

![Clonify Framer Plugin](/projects/images/clonify-framer.jpg)

## What It Does

Same idea as the Figma plugin, but for Framer. Designers can browse 1,000+ Clonify templates and import sections directly into their Framer projects. Layout, spacing, and styling carry over during import.

**Plugin:** [Clonify on Framer Marketplace](https://www.framer.com/marketplace/plugins/clonify/)

---

## What I Built

- Framer plugin using the Framer Plugin API and TypeScript
- Template browsing with search and preview
- One-click import with preserved layouts
- Subscription enforcement (free vs. premium access)
- Lazy loading for the 1,000+ asset library

---

## The Hard Parts

**Different API, different constraints.** Framer's plugin API works differently from Figma's. The component mapping logic had to be rebuilt specifically for how Framer handles elements, layers, and properties.

**Performance with 1,000+ assets.** The library is large. Without lazy loading and caching, scrolling through templates would be sluggish. I optimized the fetching and rendering pipeline so it feels snappy even on the full catalog.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Plugin | Framer Plugin API, TypeScript |
| Backend | Clonify API |
| Auth | Token-based, subscription-gated |
