import React, { useState } from 'react';

const AIQuestionGeneratorSidebar = ({ isOpen, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentActivity] = useState([
    { id: 1, title: 'JavaScript Interview Questions', date: '2023-10-15', type: 'Manual' },
    { id: 2, title: 'Frontend Developer Questions', date: '2023-10-12', type: 'Resume-based' },
    { id: 3, title: 'React Developer Questions', date: '2023-10-10', type: 'Manual' },
    { id: 4, title: 'Data Science Questions', date: '2023-10-08', type: 'Resume-based' },
  ]);

  const handleNewQuestionSet = () => {
    // Logic to start a new question set
    console.log('Starting new question set');
  };

  const handleUploadResume = () => {
    // Logic to upload resume
    console.log('Upload resume for question generation');
  };

  const handleSavedQuestions = () => {
    // Logic to view saved questions
    console.log('Viewing saved questions');
  };

  const handleSearchQuestions = () => {
    // Logic to search questions
    console.log('Searching questions with term:', searchTerm);
  };

  const filteredActivity = recentActivity.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="text-lg font-bold text-gray-900">AI Question Generator</h2>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2 mb-6">
            <button
              onClick={handleNewQuestionSet}
              className="w-full bg-primary-blue text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Question Set</span>
            </button>

            <button
              onClick={handleUploadResume}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Upload Resume</span>
            </button>

            <button
              onClick={handleSavedQuestions}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Saved Questions</span>
            </button>

            <button
              onClick={handleSearchQuestions}
              className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Questions</span>
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Activity"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {filteredActivity.map((activity) => (
                <li
                  key={activity.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-900 text-sm">{activity.title}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{activity.date}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'Manual' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {filteredActivity.length === 0 && searchTerm && (
              <p className="text-sm text-gray-500 text-center py-4">No activity found</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AIQuestionGeneratorSidebar;
