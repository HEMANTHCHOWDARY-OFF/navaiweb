import React, { useState } from 'react';

const ResumeBuilderSidebar = ({ isOpen, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentChats] = useState([
    { id: 1, title: 'Software Engineer Resume', date: '2023-10-01' },
    { id: 2, title: 'Data Scientist Resume', date: '2023-09-28' },
    { id: 3, title: 'Product Manager Resume', date: '2023-09-25' },
  ]);

  const handleNewChat = () => {
    // Logic to start a new resume session
    console.log('Starting new resume session');
  };

  const filteredChats = recentChats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          {/* Search Chats */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Chats"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          {/* Recent Chats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Chats</h3>
            <ul className="space-y-2">
              {filteredChats.map((chat) => (
                <li
                  key={chat.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-900">{chat.title}</div>
                  <div className="text-sm text-gray-500">{chat.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ResumeBuilderSidebar;
