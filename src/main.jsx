import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Component/Home/home';
import TransactionForm from './Component/Transaction/transactionform';
import TransactionList from './Component/Transaction/transactionlist';
import SpendingChart from './Component/SpendingChart/spendingchart';  

import Layout from './Layout';
import { TransactionProvider } from './Component/Transaction/transactioncontext'; // 1. Import Provider

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout/>,
    children: [
      {path: "", element: <Home/>},
      {path: "/transactionlist", element: <TransactionList/>},
      {path: "/transactionform", element: <TransactionForm/>},
      {path: "/spendingchart", element: <SpendingChart/>}
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap router inside TransactionProvider */}
    <TransactionProvider>
      <RouterProvider router={router}/>
    </TransactionProvider>
  </StrictMode>
);