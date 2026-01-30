import React from 'react';

const MainContent = () => {
  return (
    <main className="flex-1 pt-60">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
            <p className="text-gray-600 mb-4">Craft tailored, ATS-optimized resumes with AI assistance. Include sections for experience, skills, projects, education, certifications, achievements, volunteer work, languages, and references. Generate professional PDFs instantly for job applications.</p>
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

        {/* Instagram Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us on Instagram</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay connected for the latest career tips, app updates, AI insights, and user success stories.
              Our Instagram page inspires, educates, and engages you in your career journey while maximizing
              NavAI's AI-powered tools to help you achieve your professional goals.
            </p>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Latest Updates */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-primary-blue">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Latest Updates</h3>
              </div>
              <p className="text-gray-600 mb-4">Showcase new features, app enhancements, and tips to leverage NavAI effectively.</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ 24</span>
                <span>💬 8</span>
                <span>📤 12</span>
              </div>
            </div>

            {/* Career Tips & Insights */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-success-green">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success-green rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Career Tips & Insights</h3>
              </div>
              <p className="text-gray-600 mb-4">Provide bite-sized advice on resumes, interview prep, and job-search strategies.</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ 31</span>
                <span>💬 15</span>
                <span>📤 7</span>
              </div>
            </div>

            {/* Success Stories & Testimonials */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Success Stories</h3>
              </div>
              <p className="text-gray-600 mb-4">Highlight inspiring user stories, achievements, and real experiences using NavAI.</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ 45</span>
                <span>💬 22</span>
                <span>📤 18</span>
              </div>
            </div>

            {/* Events, Challenges & Contests */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-l-4 border-warning-yellow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning-yellow rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Events & Contests</h3>
              </div>
              <p className="text-gray-600 mb-4">Display upcoming webinars, live sessions, contests, and highlights of winners.</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ 28</span>
                <span>💬 11</span>
                <span>📤 9</span>
              </div>
            </div>

            {/* Community Highlights & Engagement */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border-l-4 border-pink-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Community Highlights</h3>
              </div>
              <p className="text-gray-600 mb-4">Show user-shared tips, AI-generated questions, and creative ways users interact with NavAI.</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>❤️ 37</span>
                <span>💬 19</span>
                <span>📤 14</span>
              </div>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://www.instagram.com/navai.off?igsh=MWxmeWFoNDV1aDl1eA=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Follow NavAI</span>
            </a>
            <button className="bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span>Share Your Story</span>
            </button>
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>View Feed</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
