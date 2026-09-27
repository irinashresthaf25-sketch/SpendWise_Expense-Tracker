import React, { useState, useContext } from 'react';
import { TransactionContext } from '../Transaction/transactioncontext';
import { exportToCSV, exportToPDF } from '../Utility/utility';

export default function TransactionList() {
  const {
    transactions,
    deleteTransaction,
    selectedCurrency,
    convertAmount,
  } = useContext(TransactionContext);

  const [filterCategory, setFilterCategory] = useState('All');

  const filteredTransactions = transactions.filter((t) => {
    if (filterCategory === 'All') return true;
    return t.category === filterCategory;
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 max-w-xl mx-auto my-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2.5">

        <h2 className="text-lg font-bold text-gray-800">
          Transaction History
        </h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Export Buttons */}
          <div className="flex items-center gap-1.5">

            <button
              onClick={() =>
                exportToCSV(
                  filteredTransactions,
                  selectedCurrency,
                  convertAmount
                )
              }
              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              📄 CSV
            </button>

            <button
              onClick={() =>
                exportToPDF(
                  filteredTransactions,
                  selectedCurrency,
                  convertAmount
                )
              }
              className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              📕 PDF
            </button>

          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">

            <span className="text-[10px] font-semibold text-gray-400 uppercase">
              Filter:
            </span>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Work">Work</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
            </select>

          </div>
        </div>
      </div>

      {/* Transaction Items */}
      <div className="space-y-2">

        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-400 py-6 text-sm">
            No transactions found.
          </p>
        ) : (
          filteredTransactions.map((t) => (

            <div
              key={t.id}
              className="flex justify-between items-center p-2.5 bg-gray-50 hover:bg-gray-100/70 transition rounded-lg border border-gray-100"
            >

              {/* Transaction Details */}
              <div className="min-w-0">

                <p className="font-semibold text-gray-800 text-sm truncate">
                  {t.description}
                </p>

                <div className="flex items-center gap-1.5 mt-1">

                  <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-200/70 text-gray-600 rounded-md">
                    {t.category}
                  </span>

                  <span className="text-[10px] text-gray-400">
                    {t.date}
                  </span>

                </div>
              </div>

              {/* Amount + Delete */}
              <div className="flex items-center gap-2.5 ml-3">

                <span
                  className={`font-bold text-sm whitespace-nowrap ${
                    t.type === 'income'
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }`}
                >
                  {t.type === 'income'
                    ? `+$${selectedCurrency} ${convertAmount(t.amount)}`
                    : `-$${selectedCurrency} ${convertAmount(t.amount)}`}
                </span>

                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete transaction"
                >
                  ✕
                </button>

              </div>

            </div>

          ))
        )}

      </div>
    </div>
  );
}