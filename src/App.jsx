import React, { useState, useEffect } from 'react';
import Header from './Component/Header';
import Footer from './Component/Footer';
import TransactionForm from './Component/TransactionForm';
import TransactionList from './Component/TransactionList';
import SpendingChart from './Component/SpendingChart';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, description: 'Monthly Salary', amount: 3500, type: 'income', category: 'Work', date: '2026-06-01' },
      { id: 2, description: 'Grocery run', amount: 120, type: 'expense', category: 'Food', date: '2026-06-04' },
      { id: 3, description: 'Electricity bill', amount: 85, type: 'expense', category: 'Utilities', date: '2026-06-05' }
    ];
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const saved = localStorage.getItem('budgetLimit');
    return saved ? JSON.parse(saved) : 500;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgetLimit', JSON.stringify(budgetLimit));
  }, [budgetLimit]);

  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full">
        <Header 
          transactions={transactions} 
          budgetLimit={budgetLimit} 
          onUpdateBudget={setBudgetLimit} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <SpendingChart transactions={transactions} />
          </div>

          <div className="lg:col-span-2">
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction} 
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
