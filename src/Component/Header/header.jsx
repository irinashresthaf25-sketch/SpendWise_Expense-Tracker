import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TransactionContext } from '../Transaction/transactioncontext';

export default function Header() {
  const {
    selectedCurrency,
    setSelectedCurrency,
    AVAILABLE_CURRENCIES,
  } = useContext(TransactionContext);

  const navClass = ({ isActive }) =>
    `whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? 'bg-indigo-50 text-indigo-600 font-semibold'
        : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
    }`;

  return (
    <header className="flex w-full flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm md:flex-row md:gap-6">

      {/* Logo */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-2xl">💰</span>

        <h1 className="!m-0 !text-2xl !font-bold !leading-tight tracking-tight text-gray-900">
          SpendWise
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap items-center justify-center gap-1">
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>

        <NavLink to="/transactionform" className={navClass}>
          Add Transaction
        </NavLink>

        <NavLink to="/transactionlist" className={navClass}>
          History
        </NavLink>

        <NavLink to="/spendingchart" className={navClass}>
          Spending Habits
        </NavLink>
      </nav>

      {/* Currency Selector */}
      <div className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
          Currency
        </span>

        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="max-w-24 cursor-pointer bg-transparent text-sm font-semibold text-indigo-600 outline-none"
        >
          {AVAILABLE_CURRENCIES?.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

    </header>
  );
}