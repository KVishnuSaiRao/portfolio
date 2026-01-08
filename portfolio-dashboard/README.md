# Live Assets - Real-Time Portfolio Tracker

A high-performance, full-stack Next.js dashboard that tracks stock portfolio performance in real-time. It aggregates live market data, calculates sector allocation, and visualizes P/E ratios and gain/loss metrics without page reloads.

🔗 **Live Demo:** [https://liveassets.vercel.app/](https://liveassets.vercel.app/)

## 🚀 Features
- **Real-Time Market Data:** Fetches live stock prices using the `yahoo-finance2` API.
- **Dynamic Dashboard:** Interactive table with sorting, sector grouping, and expandable rows.
- **Visual Performance Indicators:** Color-coded gain/loss metrics for instant analysis.
- **Responsive Interface:** Fully responsive design built with Tailwind CSS.
- **Server-Side Security:** API logic runs securely on the Node.js runtime, hiding data fetching implementation details.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** SWR (Stale-While-Revalidate) for background updates.
- **Table Logic:** TanStack Table (React Table v8)
- **Data Source:** `yahoo-finance2`

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js 18+** installed.
- A package manager like `npm`, `yarn`, or `pnpm`.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/portfolio.git](https://github.com/your-username/portfolio.git)
cd portfolio
# Navigate to the app directory
cd portfolio-dashboard