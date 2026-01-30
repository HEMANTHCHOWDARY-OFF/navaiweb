import React, { useState } from 'react';

const ResumeScreenerSidebar = ({ isOpen, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentScreenings] = useState([
    { id: 1, title: 'Software Engineer Resume', date: '2023-10-01', score: 85 },
    { id: 2, title: 'Data Scientist Resume', date: '2023-09-28', score: 92 },
    { id: 3, title: 'Product Manager Resume', date: '2023-09-25', score: 78 },
  ]);

  const handleNewScreening = () => {
    // Logic to start a new resume screening session
    console.log('Starting new resume screening session');
  };

  const filteredScreenings = recentScreenings.filter(screening =>
    screening.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="text-lg font-bold text-gray-900">Resume Screener</h2>
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewScreening}
            className="w-full bg-primary-blue text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-medium mb-6"
          >
            + New Screening
          </button>

          {/* Search Screenings */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Screenings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          {/* Recent Screenings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Screenings</h3>
            <ul className="space-y-2">
              {filteredScreenings.map((screening) => (
                <li
                  key={screening.id}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-900">{screening.title}</div>
                  <div className="text-sm text-gray-500">{screening.date}</div>
                  <div className="text-sm font-medium text-primary-blue">Score: {screening.score}%</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ResumeScreenerSidebar;
