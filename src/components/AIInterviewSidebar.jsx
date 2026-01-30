import React, { useState } from 'react';

const AIInterviewSidebar = ({ isOpen, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentInterviews] = useState([
    { id: 1, title: 'Technical Interview - Frontend', date: '2023-10-15', type: 'Technical' },
    { id: 2, title: 'HR Interview - Behavioral', date: '2023-10-12', type: 'HR' },
    { id: 3, title: 'System Design Interview', date: '2023-10-10', type: 'Technical' },
    { id: 4, title: 'Behavioral Interview - Leadership', date: '2023-10-08', type: 'Behavioral' },
  ]);

  const handleNewInterview = () => {
    // Logic to start a new interview session
    console.log('Starting new interview session');
  };

  const handleSearchInterviews = () => {
    // Logic to search interviews
    console.log('Searching interviews with term:', searchTerm);
  };

  const filteredInterviews = recentInterviews.filter(interview =>
    interview.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.type.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="text-lg font-bold text-gray-900">AI Interview</h2>
          </div>

          {/* New Interview Button */}
          <button
            onClick={handleNewInterview}
            className="w-full bg-primary-blue text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-medium mb-6 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
            </svg>
            <span>New Interview</span>
          </button>

          {/* Search Interviews */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Interviews"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Recent Interviews */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Interviews</h3>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {filteredInterviews.map((interview) => (
                <li
                  key={interview.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-900 text-sm">{interview.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{interview.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.type === 'Technical' ? 'bg-blue-100 text-blue-800' :
                      interview.type === 'HR' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {interview.type}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {filteredInterviews.length === 0 && searchTerm && (
              <p className="text-sm text-gray-500 text-center py-4">No interviews found</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AIInterviewSidebar;
