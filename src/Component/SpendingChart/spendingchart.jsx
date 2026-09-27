
import React, { useContext } from 'react';
import { TransactionContext } from '../Transaction/transactioncontext';

export default function SpendingChart() {
  const {
    transactions,
    selectedCurrency,
    convertAmount,
  } = useContext(TransactionContext);

  // Fixed colors for each expense category
  const categoryColors = {
    food: '#6366F1',
    transport: '#0EA5E9',
    shopping: '#EC4899',
    entertainment: '#8B5CF6',
    health: '#10B981',
    education: '#F59E0B',
    bills: '#F43F5E',
    rent: '#14B8A6',
    travel: '#F97316',
    other: '#64748B',
  };

  // Calculate expense totals by category
  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const totalExpense = Object.values(categoryTotals).reduce(
    (a, b) => a + b,
    0
  );

  const categories = Object.entries(categoryTotals);

  return (
    <div className="mx-auto my-5 w-full max-w-[680px] px-4">

      {/* Main Chart Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

        {/* Heading */}
        <div className="mb-5">
          <h3 className="text-base font-semibold text-gray-900">
            Spending Habits
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Category-wise expense breakdown
          </p>
        </div>

        {/* Empty State */}
        {categories.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">
            No expense data to display.
          </p>
        ) : (
          <div className="space-y-4">

            {categories.map(([category, amount]) => {
              const percentage =
                totalExpense > 0
                  ? (amount / totalExpense) * 100
                  : 0;

              // Match category names regardless of capitalization
              const color =
                categoryColors[category?.toLowerCase()] ||
                categoryColors.other;

              return (
                <div key={category}>

                  {/* Category and Amount */}
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="font-medium text-gray-700">
                      {category}
                    </span>

                    <span className="text-right text-gray-600">
                      {selectedCurrency} {convertAmount(amount)}
                      <span className="ml-1 text-gray-400">
                        ({percentage.toFixed(0)}%)
                      </span>
                    </span>
                  </div>

                  {/* Colored Progress Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}