import React, { useState } from 'react';

const ResumeScreenerMain = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [overallScore, setOverallScore] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Simulate analysis
      setTimeout(() => {
        setAtsScore(85);
        setKeywords(['React', 'JavaScript', 'Node.js', 'Python', 'Machine Learning']);
        setOverallScore(88);
        setFeedback([
          'Great use of action verbs in work experience',
          'Consider adding more quantifiable achievements',
          'Skills section could be more specific to job requirements',
          'Resume length is optimal for ATS systems'
        ]);
      }, 2000);
    }
  };

  const handleNewAnalysis = () => {
    setUploadedFile(null);
    setAtsScore(null);
    setKeywords([]);
    setOverallScore(null);
    setFeedback([]);
  };

  return (
    <main className="flex-1 pt-16 ml-0 md:ml-64">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Screener</h1>
          <p className="text-lg text-gray-600">Analyze and optimize your resume with AI-powered insights</p>
        </div>

        {/* Resume Screener Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upload Resume */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
            </div>
            <p className="text-gray-600 mb-4">Upload your resume in PDF or DOC format for analysis</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <span className="text-primary-blue font-medium hover:text-blue-600">
                  {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                </span>
                <span className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX (max 10MB)</span>
              </label>
            </div>
          </div>

          {/* ATS Compatibility Check */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-success-green rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">ATS Compatibility</h2>
            </div>
            <p className="text-gray-600 mb-4">Check how well your resume performs with Applicant Tracking Systems</p>
            {atsScore !== null ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-success-green mb-2">{atsScore}%</div>
                <div className="text-sm text-gray-500">ATS Compatibility Score</div>
                <div className={`mt-4 p-3 rounded-lg ${atsScore >= 80 ? 'bg-green-50 text-green-700' : atsScore >= 60 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                  {atsScore >= 80 ? 'Excellent ATS compatibility!' : atsScore >= 60 ? 'Good compatibility with room for improvement' : 'Needs significant ATS optimization'}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-lg">Upload a resume to see ATS score</div>
              </div>
            )}
          </div>

          {/* Keyword Optimization */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-warning-yellow rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Keyword Optimization</h2>
            </div>
            <p className="text-gray-600 mb-4">Suggested keywords to improve your resume's visibility</p>
            {keywords.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  These keywords are commonly searched for in your field. Consider incorporating them naturally into your resume.
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-lg">Upload a resume to see keyword suggestions</div>
              </div>
            )}
          </div>

          {/* Score & Feedback */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Score & Feedback</h2>
            </div>
            <p className="text-gray-600 mb-4">Overall resume score and detailed improvement suggestions</p>
            {overallScore !== null ? (
              <div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary-blue mb-2">{overallScore}%</div>
                  <div className="text-sm text-gray-500">Overall Resume Score</div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Detailed Feedback:</h4>
                  {feedback.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-lg">Upload a resume to see score and feedback</div>
              </div>
            )}
          </div>
        </div>

        {/* New Analysis Button */}
        {uploadedFile && (
          <div className="text-center">
            <button
              onClick={handleNewAnalysis}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Start New Analysis
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResumeScreenerMain;
