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
      <header className="fixed top-0 left-0 right-0 bg-navy-dark border-b border-gray-700 shadow-lg z-30 h-16">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Left: Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img src="/NavAI_logo.png" alt="NavAI Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-white">NavAI</h1>
          </div>

          {/* Center: Menu Items */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
              Resume Builder
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
              Resume Screener
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
              AI Interview
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium relative group">
              Generate Questions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
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
