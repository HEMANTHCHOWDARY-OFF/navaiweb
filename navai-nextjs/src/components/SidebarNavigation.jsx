import React, { useState } from 'react';

const SidebarNavigation = ({ isOpen, toggleSidebar }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [activeSection, setActiveSection] = useState('home');

  const toggleExpanded = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
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
            <h2 className="text-lg font-bold text-gray-900">NavAI</h2>
          </div>

          <nav className="space-y-2">
            {/* About NavAI */}
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                activeSection === 'about' ? 'bg-primary-blue text-white' : ''
              }`}
              onClick={() => handleSectionClick('about')}
            >
              <svg className={`w-5 h-5 ${activeSection === 'about' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18v16H3V4z" />
              </svg>
              <span className={`font-medium ${activeSection === 'about' ? 'text-white' : 'text-gray-700'}`}>About NavAI</span>
            </div>

            {/* Profile */}
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                activeSection === 'profile' ? 'bg-primary-blue text-white' : ''
              }`}
              onClick={() => handleSectionClick('profile')}
            >
              <svg className={`w-5 h-5 ${activeSection === 'profile' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={`font-medium ${activeSection === 'profile' ? 'text-white' : 'text-gray-700'}`}>Profile</span>
            </div>

            {/* Settings */}
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                activeSection === 'settings' ? 'bg-primary-blue text-white' : ''
              }`}
              onClick={() => handleSectionClick('settings')}
            >
              <svg className={`w-5 h-5 ${activeSection === 'settings' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51z" />
              </svg>
              <span className={`font-medium ${activeSection === 'settings' ? 'text-white' : 'text-gray-700'}`}>Settings</span>
            </div>

            {/* Instagram */}
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                activeSection === 'instagram' ? 'bg-primary-blue text-white' : ''
              }`}
              onClick={() => handleSectionClick('instagram')}
            >
              <svg className={`w-5 h-5 ${activeSection === 'instagram' ? 'text-white' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zM12 7a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                <circle cx="12" cy="12" r="3.25" fill="white" />
              </svg>
              <span className={`font-medium ${activeSection === 'instagram' ? 'text-white' : 'text-gray-700'}`}>Instagram</span>
            </div>

            {/* YouTube */}
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                activeSection === 'youtube' ? 'bg-primary-blue text-white' : ''
              }`}
              onClick={() => handleSectionClick('youtube')}
            >
              <svg className={`w-5 h-5 ${activeSection === 'youtube' ? 'text-white' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 15l5.19-3L10 9v6z" fill="white" />
                <path d="M21.8 8s-.2-1.4-.8-2a3.36 3.36 0 00-2.4-1.7C16.7 4 12 4 12 4s-4.7 0-6.6.3a3.36 3.36 0 00-2.4 1.7c-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2a3.36 3.36 0 002.4 1.7c1.9.3 6.6.3 6.6.3s4.7 0 6.6-.3a3.36 3.36 0 002.4-1.7c.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2z" />
              </svg>
              <span className={`font-medium ${activeSection === 'youtube' ? 'text-white' : 'text-gray-700'}`}>YouTube</span>
            </div>

            {/* Help / FAQ */}
            <div
              className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                activeSection === 'help' ? 'bg-primary-blue text-white' : ''
              }`}
              onClick={() => handleSectionClick('help')}
            >
              <svg className={`w-5 h-5 ${activeSection === 'help' ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`font-medium ${activeSection === 'help' ? 'text-white' : 'text-gray-700'}`}>Help / FAQ</span>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;
