import React, { useState } from 'react';
import AIQuestionGeneratorSidebar from './AIQuestionGeneratorSidebar.jsx';
import AIQuestionGeneratorMain from './AIQuestionGeneratorMain.jsx';

const AIQuestionGenerator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary-blue text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* AI Question Generator Sidebar */}
      <AIQuestionGeneratorSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* AI Question Generator Main Content */}
      <AIQuestionGeneratorMain />
    </div>
  );
};

export default AIQuestionGenerator;
