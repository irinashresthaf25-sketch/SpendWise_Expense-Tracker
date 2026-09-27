# Expense Tracker

A single-page personal expense tracker built with React and React Router. Track income and expenses, filter your history by category, watch a monthly budget limit, convert totals into different currencies with live exchange rates, and export your transaction history as CSV or PDF.

## Features

- **Dashboard** – total income, total expenses, and running balance, converted live into your selected currency
- **Add transactions** – description, amount, type (income/expense), category, date
- **Transaction history** with category filtering and one-click delete
- **Spending breakdown** – per-category expense totals as percentage bars
- **Budget limit** – set a monthly cap, get a warning banner when the current month's expenses exceed it
- **Currency conversion** – live exchange rates pulled from ExchangeRate-API, switch currency anywhere in the app
- **CSV export** and **PDF export** of the current (filtered) transaction list
- **Persistence** – transactions and budget limit are saved to `localStorage` and survive a refresh
- **Client-side routing** via React Router, four views: Dashboard, Add Transaction, History, Spending Habits

## Tech stack

| Layer | Choice |
|---|---|
| UI library | React 19 (functional components + hooks) |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| State sharing | Context API (`TransactionContext`) |
| Persistence | Browser `localStorage` |
| Exchange rates | ExchangeRate-API |
| PDF export | jsPDF + jspdf-autotable |
| CSV export | Hand-rolled (no library) |
| Build tool | Vite |

## Getting started

### Prerequisites
- Node.js 18+
- npm

### Install and run

```bash
git clone https://github.com/irinashresthaf25-sketch/SpendWise_Expense-Tracker.git
cd SpendWise_Expense-Tracker
npm install
npm run dev
```

Vite will print the local dev URL (default `http://localhost:5173`).

### Other scripts

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

### Environment variables

The app needs an ExchangeRate-API key for live currency conversion. Get a free key at [exchangerate-api.com](https://www.exchangerate-api.com/), create a `.env` file in the project root, and add:

```
VITE_EXCHANGE_RATE_API_KEY=your_key_here
```

Then update `src/Component/Currency/currencyconverter.jsx` to read `import.meta.env.VITE_EXCHANGE_RATE_API_KEY` instead of a hardcoded string, and make sure `.env` is listed in `.gitignore`. Never commit an API key directly into a source file.

## Routes

| Path | View |
|---|---|
| `/` | Dashboard (financial overview, budget, currency switcher) |
| `/transactionform` | Add a new transaction |
| `/transactionlist` | Transaction history with filtering and export |
| `/spendingchart` | Category-wise spending breakdown |

## Project structure

```
src/
├── Component/
│   ├── Header/header.jsx              # top nav + financial overview + currency switcher
│   ├── Footer/footer.jsx
│   ├── Home/home.jsx                  # dashboard view
│   ├── Transaction/
│   │   ├── transactioncontext.jsx     # TransactionContext: transactions, budget, currency, rates
│   │   ├── transactionform.jsx        # controlled form to add a transaction
│   │   └── transactionlist.jsx        # history, filtering, export buttons
│   ├── SpendingChart/spendingchart.jsx
│   ├── Currency/currencyconverter.jsx # fetches live exchange rates
│   └── Utility/utility.jsx            # CSV and PDF export functions
├── Layout.jsx                         # shared nav + outlet for routed pages
└── main.jsx                           # router setup, wraps app in TransactionProvider
```

## React concepts used

- Functional components throughout
- `useState` for form inputs, filters, and initial context state
- `useEffect` for syncing transactions/budget to `localStorage` and fetching exchange rates on mount
- Context API (`TransactionContext`) to share transaction data and actions across routed pages without prop drilling
- Controlled forms with `onChange` / `onSubmit`
- List rendering with `.map()`
- Conditional rendering for empty states and the budget-exceeded warning

## Known limitations

- Data lives only in the browser's `localStorage`, no backend, no cross-device sync
- No user accounts or authentication
- No recurring transactions (despite a CSV export column for it, it's currently always "No")
- Currency conversion depends on a third-party API being reachable; falls back to USD-only if the fetch fails

