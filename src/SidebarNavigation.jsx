import React, { useState } from 'react';

const SidebarNavigation = ({ isOpen, toggleSidebar }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
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
      <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-transform duration-300 z-40 w-72 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>

          <nav className="space-y-2">
            {/* Home Overview */}
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-primary-blue cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Home Overview</span>
            </div>

            {/* Resume Tools */}
            <div>
              <div
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleExpanded('resume-tools')}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-gray-700">Resume Tools</span>
                </div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${expandedItems['resume-tools'] ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {expandedItems['resume-tools'] && (
                <div className="ml-8 mt-2 space-y-1">
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">Getting Started</div>
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">Templates</div>
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">AI Assistance</div>
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">Best Practices</div>
                </div>
              )}
            </div>

            {/* AI Interview */}
            <div>
              <div
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleExpanded('ai-interview')}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-700">AI Interview</span>
                </div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${expandedItems['ai-interview'] ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              {expandedItems['ai-interview'] && (
                <div className="ml-8 mt-2 space-y-1">
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">Mock Interviews</div>
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">Question Types</div>
                  <div className="p-2 text-sm text-gray-600 hover:text-primary-blue cursor-pointer">Performance Analysis</div>
                </div>
              )}
            </div>

            {/* Help / FAQ */}
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-gray-700">Help / FAQ</span>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;
