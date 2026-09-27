
import React from 'react';
import Header from './Component/Header/header';
import { Outlet } from 'react-router-dom';
import Footer from './Component/Footer/footer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50/60 font-sans">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}