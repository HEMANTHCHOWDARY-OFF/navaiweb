import React from 'react';
import Instagram from './Instagram.jsx';

const MainContent = ({ onNavigateToAIInterview }) => {
  const handleStartPracticing = () => {
    if (onNavigateToAIInterview) {
      onNavigateToAIInterview();
    }
  };

  return (
    <main className="flex-1 pt-16 ml-0 md:ml-64">
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

        {/* About NavAI Detailed Content */}
        <div className="space-y-8">
          {/* Section 1: Resume Builder */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 border-l-4 border-primary-blue">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary-blue rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">1. Resume Builder</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-primary-blue mb-2">What it is:</p>
                <p>The Resume Builder is a powerful, AI-enhanced tool designed to help users create professional, customized resumes effortlessly. It transforms your career information into eye-catching resumes tailored to specific job opportunities, ensuring they stand out in today's competitive job market.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-primary-blue mb-2">Why it's important for job seekers:</p>
                <p>A well-crafted resume is your first impression in the job application process. Our Resume Builder ensures your qualifications are presented professionally and readably, helping you make a strong impact on both human recruiters and Applicant Tracking Systems (ATS).</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-primary-blue mb-2">How to create professional, customized resumes efficiently:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Start by selecting from our collection of industry-specific templates designed by career experts</li>
                  <li>Input your personal information, education, work experience, and skills using our intuitive step-by-step interface</li>
                  <li>Customize each section with relevant keywords and quantifiable achievements to highlight your value</li>
                  <li>Choose from multiple color schemes and layouts to match your personal brand or target industry</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-primary-blue mb-2">Key Features:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Selecting templates:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Browse templates categorized by industry (tech, finance, healthcare, creative, etc.)</li>
                      <li>Preview how your information will appear before making a final selection</li>
                      <li>Switch between templates easily without losing your content</li>
                      <li>Access modern, ATS-friendly designs that maintain professionalism</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Adding sections:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Use the dynamic section builder to add custom sections like volunteer work, publications, or awards</li>
                      <li>Rearrange sections with simple drag-and-drop functionality</li>
                      <li>Include optional sections that strengthen your application for specific roles</li>
                      <li>Add multimedia elements like links to portfolios or professional profiles</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-primary-blue mb-2">Making resumes ATS-friendly:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Our system automatically incorporates relevant keywords from job descriptions</li>
                  <li>Ensures proper formatting that Applicant Tracking Systems can easily parse</li>
                  <li>Provides real-time feedback on resume score and optimization suggestions</li>
                  <li>Generates both PDF and text versions for different application requirements</li>
                  <li>Includes tips for avoiding common ATS pitfalls like graphics or unusual fonts</li>
                </ul>
              </div>
              <div className="bg-primary-blue bg-opacity-10 rounded-lg p-4 border border-primary-blue border-opacity-20">
                <p className="font-semibold text-primary-blue mb-2">Usage Summary:</p>
                <p>The Resume Builder section allows users to create polished resumes quickly, with AI assistance for optimization. Users can select templates, customize content, and ensure ATS compatibility, making it ideal for job seekers at any career stage.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Resume Screener */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">2. Resume Screener</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-green-600 mb-2">Purpose:</p>
                <p>The Resume Screener is an intelligent resume analysis tool that uses advanced AI to evaluate, score, and provide detailed feedback on resume quality and job fit. It helps users quickly assess and filter resumes with objective, data-driven insights.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-green-600 mb-2">How it helps users:</p>
                <p>Whether you're a job seeker self-assessing your resume or a recruiter evaluating candidates, our Resume Screener saves hours of manual review while providing consistent, unbiased analysis that identifies strengths and areas for improvement.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-green-600 mb-2">Key Features:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Quickly evaluate and filter resumes using AI:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Upload single or multiple resumes for instant analysis</li>
                      <li>Receive comprehensive scoring based on content quality, formatting, and keyword relevance</li>
                      <li>Get detailed breakdowns of strengths and areas for improvement</li>
                      <li>Filter and rank resumes based on job requirements and qualifications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Saving time and improving hiring or self-assessment:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Automated scoring eliminates bias and provides consistent evaluation criteria</li>
                      <li>Identifies missing information or weak areas that could hurt your candidacy</li>
                      <li>Compares your resume against industry standards and best practices</li>
                      <li>Reduces time spent on manual resume reviews by up to 80%</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-green-600 mb-2">Advanced Analysis:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Detailed section-by-section analysis with specific recommendations</li>
                  <li>Keyword density and relevance scoring for ATS optimization</li>
                  <li>Readability and formatting assessments with improvement suggestions</li>
                  <li>Overall resume strength score with actionable feedback</li>
                  <li>Highlighted key phrases and achievements for quick review</li>
                </ul>
              </div>
              <div className="bg-green-500 bg-opacity-10 rounded-lg p-4 border border-green-500 border-opacity-20">
                <p className="font-semibold text-green-600 mb-2">Usage Summary:</p>
                <p>The Resume Screener section enables efficient resume evaluation through AI analysis. Users can upload resumes, receive detailed feedback, compare candidates, and identify key skills, making it essential for both job seekers and recruiters.</p>
              </div>
            </div>
          </div>

          {/* Section 3: AI Interview */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">3. AI Interview</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-purple-600 mb-2">What it offers:</p>
                <p>The AI Interview section provides a comprehensive mock interview platform with AI-powered feedback, realistic scenarios, and multiple interview types to prepare users for any interview situation. It simulates real interview conditions to build confidence and improve performance.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-purple-600 mb-2">How it helps improve confidence and performance:</p>
                <p>Practice in a safe, judgment-free environment that replicates actual interview dynamics, helping users build confidence, refine responses, and track improvement over time.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-purple-600 mb-2">Types of mock interviews available:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>HR Round: Focuses on behavioral questions, company culture fit, and motivation</li>
                  <li>Technical Round: Industry-specific technical questions and problem-solving scenarios</li>
                  <li>Behavioral Round: Past experience-based questions using the STAR method</li>
                  <li>Situational Round: Hypothetical scenarios and future-oriented questions</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-purple-600 mb-2">Key Features:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Improving confidence, performance, communication, and readiness:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Realistic timing and pressure simulation to build interview stamina</li>
                      <li>Immediate AI feedback on response quality, clarity, and relevance</li>
                      <li>Video recording capabilities for self-review and improvement tracking</li>
                      <li>Progress tracking to see improvement over multiple practice sessions</li>
                      <li>Personalized tips based on your performance patterns</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Choosing interview type:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Select based on the type of role and company you're targeting</li>
                      <li>Customize difficulty level from entry-level to executive positions</li>
                      <li>Choose industry-specific scenarios for more relevant practice</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-purple-500 bg-opacity-10 rounded-lg p-4 border border-purple-500 border-opacity-20">
                <p className="font-semibold text-purple-600 mb-2">Usage Summary:</p>
                <p>The AI Interview section offers realistic mock interviews with AI feedback. Users can choose interview types, practice multiple times, and use detailed feedback to improve confidence and performance for real interviews.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Generate Question Section */}
          <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl shadow-lg p-8 border-l-4 border-orange-500">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">4. Generate Question Section</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-orange-600 mb-2">What it does:</p>
                <p>The Generate Question Section is a versatile question generation system that creates relevant, high-quality interview questions either manually or automatically from uploaded resumes. It supports both interviewers creating assessments and candidates preparing effectively.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-orange-600 mb-2">How it supports interview preparation and assessment:</p>
                <p>Provides customized question banks tailored to specific roles, helping users create structured interviews and practice sessions that match real-world scenarios.</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-orange-600 mb-2">Key Features:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Creating question sets manually:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Use our intuitive interface to build custom question sets</li>
                      <li>Categorize questions by type (behavioral, technical, situational)</li>
                      <li>Set difficulty levels and time allocations for each question</li>
                      <li>Save and reuse question sets for multiple candidates or practice sessions</li>
                      <li>Add custom instructions or evaluation criteria</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Generating questions automatically from uploaded resumes:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Upload a resume to automatically extract relevant information</li>
                      <li>AI analyzes experience, skills, and background to generate targeted questions</li>
                      <li>Ensures questions are directly related to the candidate's qualifications</li>
                      <li>Reduces bias by focusing on demonstrated experience and skills</li>
                      <li>Generates questions in multiple formats (multiple choice, coding, open-ended)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-orange-600 mb-2">Advanced Options:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Selecting job roles: Choose from predefined job categories and roles</li>
                  <li>Choosing difficulty levels: Entry-level to Executive-level with custom options</li>
                  <li>Selecting question types: Behavioral, Technical, Situational, Case Study, Coding</li>
                  <li>Export and sharing options: PDF, CSV, sharing with teams, integration with scheduling systems</li>
                </ul>
              </div>
              <div className="bg-orange-500 bg-opacity-10 rounded-lg p-4 border border-orange-500 border-opacity-20">
                <p className="font-semibold text-orange-600 mb-2">Usage Summary:</p>
                <p>The Generate Question Section allows users to create custom question sets manually or generate them automatically from resumes. Users can select job roles, difficulty levels, and question types, making it perfect for interview preparation and assessment creation.</p>
              </div>
            </div>
          </div>

          {/* Instagram Section */}
          <Instagram />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
