import React from 'react';

const MainContent = () => {
  return (
    <main className="flex-1 pt-16">
      <div className="p-6 md:p-8">
        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NavAI Documentation</h1>
          <p className="text-lg text-gray-600">Your comprehensive guide to career development tools</p>
        </div>

        {/* Get Started Card */}
        <div className="mb-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Get Started with NavAI</h2>
          </div>
        </div>

        {/* Feature Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Build Professional Resumes */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Build Professional Resumes</h3>
            </div>
            <p className="text-gray-600 mb-4">Create stunning resumes with our AI-powered builder</p>
            <a href="#" className="text-primary-blue font-medium hover:text-blue-700 transition-colors">
              Get Started →
            </a>
          </div>

          {/* Card 2: Screen & Optimize */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Screen & Optimize</h3>
            </div>
            <p className="text-gray-600 mb-4">Analyze and improve your resume for better results</p>
            <a href="#" className="text-primary-blue font-medium hover:text-blue-700 transition-colors">
              Learn More →
            </a>
          </div>

          {/* Card 3: Practice Interviews */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Practice Interviews</h3>
            </div>
            <p className="text-gray-600 mb-4">Prepare with AI-powered mock interviews</p>
            <a href="#" className="text-primary-blue font-medium hover:text-blue-700 transition-colors">
              Start Practicing →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
