import React, { useState } from 'react';
import SidebarNavigation from './SidebarNavigation.jsx';
import MainContent from './MainContent.jsx';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary-blue text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Top Navigation Bar - Dark Theme */}
      <header className="fixed top-0 left-0 right-0 border-b border-gray-700 shadow-lg z-30 h-[15rem] relative bg-gray-800">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Left: Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">NavAI</h1>
          </div>

          {/* Center: Menu Items */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-cyan-400 hover:text-white transition-colors font-medium hover:shadow-[0_0_10px_theme(colors.cyan.400)]">
              Home
            </a>
            <a href="#" className="text-cyan-400 hover:text-white transition-colors font-medium hover:shadow-[0_0_10px_theme(colors.cyan.400)]">
              Resume Builder
            </a>
            <a href="#" className="text-cyan-400 hover:text-white transition-colors font-medium hover:shadow-[0_0_10px_theme(colors.cyan.400)]">
              Resume Screener
            </a>
            <a href="#" className="text-cyan-400 hover:text-white transition-colors font-medium hover:shadow-[0_0_10px_theme(colors.cyan.400)]">
              AI Interview
            </a>
            <a href="#" className="text-cyan-400 hover:text-white transition-colors font-medium hover:shadow-[0_0_10px_theme(colors.cyan.400)]">
              Generate Questions
            </a>
          </nav>

          {/* Right: Search and Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-700 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search documentation..."
                className="bg-transparent text-white placeholder-gray-400 outline-none w-64"
              />
            </div>
            <button className="bg-danger-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <SidebarNavigation isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <MainContent />
    </div>
  );
};

export default AppLayout;
