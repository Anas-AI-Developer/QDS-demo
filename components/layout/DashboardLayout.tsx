
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-secondary dark:bg-dark-secondary">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
