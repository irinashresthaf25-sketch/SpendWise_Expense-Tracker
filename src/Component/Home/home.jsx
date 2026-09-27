import React, { useContext, useState, useEffect } from 'react';

import { TransactionContext } from '../Transaction/transactioncontext';

export default function Home() {
  const {
    transactions,
    budgetLimit,
    setBudgetLimit,
    selectedCurrency,
    convertAmount,
  } = useContext(TransactionContext);

  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [budgetInput, setBudgetInput] = useState(String(budgetLimit ?? 0));

  useEffect(() => {
    setBudgetInput(String(budgetLimit ?? 0));
  }, [budgetLimit]);

  // Calculate total income
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate total expenses
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  // Reserve 10% of income for savings
  const mandatorySavings = totalIncome * 0.1;

  // Calculate available balance
  const netBalance = totalIncome - totalExpense - mandatorySavings;

  // Calculate current month's expenses
  const currentMonth = new Date().toISOString().slice(0, 7);

  const currentMonthExpenses = transactions
    .filter(
      (t) =>
        t.type === 'expense' &&
        t.date.startsWith(currentMonth)
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const isExceeded = currentMonthExpenses > budgetLimit;

  // Save monthly budget
  const handleBudgetSave = (e) => {
    e.preventDefault();

    const amount = Number(budgetInput);

    if (
      !Number.isFinite(amount) ||
      amount < 0 ||
      budgetInput.trim() === ''
    ) {
      return;
    }

    setBudgetLimit(amount);
    setShowBudgetForm(false);
  };

  // Shared card styles
  const cardStyle =
    'min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm';

  const labelStyle =
    'text-xs font-medium uppercase tracking-wide text-gray-500';

  const amountStyle =
    'mt-2 break-words text-xl font-bold tracking-tight sm:text-2xl';

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-5">

      {/* Dashboard Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your financial overview
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBudgetForm((prev) => !prev)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {showBudgetForm ? 'Close' : '+ Budget Allocation'}
        </button>
      </div>

      {/* Budget Allocation Form */}
      {showBudgetForm && (
        <form
          onSubmit={handleBudgetSave}
          className="mb-5 rounded-lg border border-indigo-100 bg-white p-4 shadow-sm"
        >
          <h3 className="mb-3 text-base font-semibold text-gray-900">
            Set Monthly Budget
          </h3>

          <label
            htmlFor="monthlyBudget"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Budget amount ({selectedCurrency})
          </label>

          <input
            id="monthlyBudget"
            type="number"
            min="0"
            step="0.01"
            required
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Enter your monthly budget"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Save Budget
            </button>

            <button
              type="button"
              onClick={() => {
                setBudgetInput(String(budgetLimit ?? 0));
                setShowBudgetForm(false);
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Monthly Budget Summary */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Monthly Budget
          </p>

          <p className="mt-1 text-lg font-bold text-gray-900">
            {selectedCurrency} {convertAmount(budgetLimit)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">
            Spent this month
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {selectedCurrency} {convertAmount(currentMonthExpenses)}
          </p>
        </div>
      </div>

      {/* Budget Alert */}
      {isExceeded && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <span className="font-semibold">
            Budget exceeded.
          </span>{' '}
          You are over budget by {selectedCurrency}{' '}
          {convertAmount(currentMonthExpenses - budgetLimit)}.
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* Total Income */}
        <div className={`${cardStyle} border-l-4 border-l-emerald-500`}>
          <h3 className={labelStyle}>Total Income</h3>

          <p className={`${amountStyle} text-emerald-600`}>
            +{selectedCurrency} {convertAmount(totalIncome)}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Total money received
          </p>
        </div>

        {/* Total Expenses */}
        <div className={`${cardStyle} border-l-4 border-l-rose-500`}>
          <h3 className={labelStyle}>Total Expenses</h3>

          <p className={`${amountStyle} text-rose-600`}>
            -{selectedCurrency} {convertAmount(totalExpense)}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Total money spent
          </p>
        </div>

        {/* Running Balance */}
        <div className={`${cardStyle} border-l-4 border-l-indigo-500`}>
          <h3 className={labelStyle}>Running Balance</h3>

          <p
            className={`${amountStyle} ${
              netBalance >= 0
                ? 'text-indigo-600'
                : 'text-rose-600'
            }`}
          >
            {netBalance < 0 ? '-' : ''}
            {selectedCurrency} {convertAmount(Math.abs(netBalance))}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            After expenses and savings
          </p>
        </div>

        {/* Total Savings: Hidden Until Hover */}
        <div
          className={`${cardStyle} group relative border-l-4 border-l-amber-500`}
        >
          <h3 className={labelStyle}>
            Total Savings
          </h3>

          <div className="relative mt -0.5 flex items-center justify-center">
            <p className="w-full cursor-pointer text-center text-xl font-bold tracking-tight text-amber-600 sm:text-2xl">
              Savings 🔒
            </p>

            {/* Hidden Savings Tooltip */}
            <div className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-lg group-hover:block">
              {selectedCurrency} {convertAmount(mandatorySavings)}
            </div>
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Hover to reveal savings
          </p>
        </div>

      </div>
    </div>
  );
}