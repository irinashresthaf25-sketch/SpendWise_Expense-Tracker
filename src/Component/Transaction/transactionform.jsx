import React, { useState, useContext } from 'react';
import { TransactionContext } from '../Transaction/transactioncontext';
import { useNavigate } from 'react-router-dom';

export default function TransactionForm() {
  const { addTransaction } = useContext(TransactionContext);
  const navigate = useNavigate();

  const todayStr = new Date().toLocaleDateString('en-CA');

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const expenseCategories = [
    'Food',
    'Transport',
    'Shopping',
    'Entertainment',
    'Health',
    'Education',
    'Bills',
    'Rent',
    'Travel',
    'Other',
  ];

  const incomeCategories = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Gift',
    'Bonus',
    'Other',
  ];

  const categories =
    type === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount || Number(amount) <= 0) {
      return;
    }

    addTransaction({
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date,
    });

    navigate('/transactionlist');
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);

    setCategory(newType === 'expense' ? 'Food' : 'Salary');
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

        <h3 className="text-xl font-bold text-gray-800 mb-5">
          Add Transaction
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Description + Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Description
              </label>

              <input
                type="text"
                placeholder="e.g., Grocery shopping"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Amount ($)
              </label>

              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

          </div>

          {/* Type + Category + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Type
              </label>

              <select
                value={type}
                onChange={handleTypeChange}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={todayStr}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            Save Transaction
          </button>

        </form>
      </div>
    </div>
  );
}