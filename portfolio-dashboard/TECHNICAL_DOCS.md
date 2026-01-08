# Technical Documentation: Live Assets Dashboard

## Project Overview
**Live Assets** is a real-time financial tracking application. The primary engineering goal was to build a resilient, low-latency dashboard that aggregates financial data and provides a seamless user experience similar to a native desktop application.

## Key Challenges & Solutions

### 1. Challenge: Serverless Timeouts & Data Reliability (The "503" Error)
**The Problem:** Initially, the application attempted to scrape data from Google Finance using DOM parsing (`cheerio`). However, serverless environments (like Vercel Functions) have strict execution time limits (10s). The scraping process was slow and frequently blocked by anti-bot measures, leading to `503 Service Unavailable` timeout errors.
**The Solution:**
- Migrated the data fetching layer entirely to **`yahoo-finance2`**, a library that wraps internal Yahoo Finance API endpoints.
- This reduced data fetching time from ~8-10 seconds (scraping) to **<1 second** (API), ensuring the API route always responds well within Vercel's limits.
- The logic runs on the **Node.js runtime** within Next.js API routes (`/api/portfolio`), providing a stable environment for external requests.

### 2. Challenge: Sub-Directory Deployment
**The Problem:** The project structure is a "monorepo-style" setup where the actual Next.js application lives inside a subfolder (`portfolio/portfolio-dashboard`). Default deployment configurations on Vercel failed with `404` errors because the build system couldn't find `package.json` in the repository root.
**The Solution:**
- Configured the **Root Directory** setting in Vercel to explicitly point to `portfolio-dashboard`.
- This ensures dependencies are installed correctly and the `.next` build output is generated in the expected location.

### 3. Challenge: Real-Time Updates & UX
**The Problem:** Financial dashboards need live data. Traditional Server-Side Rendering (SSR) requires full page reloads to update numbers, which disrupts the user experience.
**The Solution:**
- Implemented **SWR (Stale-While-Revalidate)** for client-side data fetching.
- The dashboard immediately shows cached data (Stale) while fetching new data in the background (Revalidate).
- Configured a 15-second refresh interval (`refreshInterval: 15000`) to keep prices current without manual user intervention.

### 4. Challenge: Preserving UI State During Refreshes
**The Problem:** When the auto-refresh triggered, the entire table data would reload, causing any rows the user had expanded (to see details) to collapse back to their default state.
**The Solution:**
- Utilized **TanStack Table's** decoupled state management.
- The `expanded` state is maintained separately from the data source. When new data arrives via SWR, React selectively updates only the changed DOM nodes (prices/values), leaving the table structure (grouping/expansion) intact.