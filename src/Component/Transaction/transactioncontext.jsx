import React, { createContext, useState, useEffect } from 'react';
import { fetchExchangeRates, AVAILABLE_CURRENCIES } from '../Currency/currencyconverter';

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const saved = localStorage.getItem('budgetLimit');
    return saved ? JSON.parse(saved) : 500;
  });

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 }); // Starts with USD base

  // Fetch live real-time rates from Frankfurter API on mount
  useEffect(() => {
    async function getRates() {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    }
    getRates();
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budgetLimit', JSON.stringify(budgetLimit));
  }, [budgetLimit]);

  // Helper function to convert amounts using live rates
  const convertAmount = (amountInUSD) => {
    if (!amountInUSD) return '0.00';
    const rate = exchangeRates[selectedCurrency] || 1;
    return (amountInUSD * rate).toFixed(2);
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        budgetLimit,
        setBudgetLimit,
        selectedCurrency,
        setSelectedCurrency,
        convertAmount,
        AVAILABLE_CURRENCIES,
        exchangeRates
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}