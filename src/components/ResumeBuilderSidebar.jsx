import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ResumeBuilderSidebar = ({ isOpen, toggleSidebar, onNewChat }) => {
  const handleNewChat = () => {
    // Logic to start a new resume session
    if (onNewChat) {
      onNewChat();
    }
    console.log('Starting new resume session');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-transform duration-300 z-40 w-64 border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6">
          {/* NavAI Logo at Top */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Resume Builder</h2>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full bg-primary-blue text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-medium mb-6"
          >
            + New Chat
          </button>

          {/* How to Generate Your Resume Instructions */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">How to Generate Your Resume</h3>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Enter your personal information in the header section.</li>
              <li>Fill out work experience, projects, education, and other sections with details.</li>
              <li>Optionally use the AI Enhance button for professional summary.</li>
              <li>Review your content for accuracy.</li>
              <li>Click "Download Resume (PDF)" or "Download Resume (DOCX)" to generate and download locally.</li>
            </ol>
            <p className="text-xs text-gray-500 mt-3 italic">
              Note: Resumes are generated locally for privacy and not stored on the server.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ResumeBuilderSidebar;
