import React, { useState } from 'react';

const AIInterviewMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    interviewType: '',
    feedback: false,
    practiceMode: false,
    voiceSupport: false
  });

  const handleStartInterview = () => {
    setCurrentStep(2);
  };

  const handleOptionChange = (option, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
    setSelectedOptions({
      interviewType: '',
      feedback: false,
      practiceMode: false,
      voiceSupport: false
    });
  };

  const handleBeginInterview = () => {
    console.log('Starting interview with options:', selectedOptions);
    // Logic to begin the actual interview
    alert('Interview started! (This is a placeholder - AI interview logic would go here)');
  };

  return (
    <main className="flex-1 pt-16 ml-0 md:ml-64">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Interview Simulator</h1>
          <p className="text-lg text-gray-600">Practice mock interviews powered by AI for HR, Technical, or Behavioral rounds</p>
        </div>

        {/* Step 1: Welcome Screen */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome to NavAI's AI Interview Simulator!</h2>
                  <p className="text-blue-100">Get instant feedback, track your progress, and improve your skills over time.</p>
                </div>
              </div>
            </div>

            {/* Start Interview Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleStartInterview}
                className="bg-primary-blue text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                </svg>
                <span>Start Interview</span>
              </button>
            </div>

            {/* AI Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">AI Disclaimer</h3>
                  <p className="text-sm text-yellow-700">
                    Note: NavAI is an AI-powered tool and may make mistakes or give unexpected answers.
                    Use feedback as guidance, not as absolute evaluation.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Feedback</h3>
                <p className="text-gray-600">Get real-time evaluation and suggestions</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">Monitor your improvement over time</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Types</h3>
                <p className="text-gray-600">HR, Technical, and Behavioral interviews</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Interview Options */}
        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBackToStep1}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Welcome</span>
            </button>

            {/* Options Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customize Your Interview</h2>
              <p className="text-gray-600">Choose your preferences for the best interview experience</p>
            </div>

            {/* Interview Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Interview Type */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Type</h3>
                <div className="space-y-3">
                  {['HR', 'Technical', 'Behavioral'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="interviewType"
                        value={type}
                        checked={selectedOptions.interviewType === type}
                        onChange={(e) => handleOptionChange('interviewType', e.target.value)}
                        className="w-4 h-4 text-primary-blue focus:ring-primary-blue"
                      />
                      <span className="text-gray-700">{type} Interview</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOptions.feedback}
                      onChange={(e) => handleOptionChange('feedback', e.target.checked)}
                      className="w-4 h-4 text-primary-blue focus:ring-primary-blue rounded"
                    />
                    <div>
                      <span className="text-gray-700 font-medium">AI-generated evaluation</span>
                      <p className="text-sm text-gray-500">Get detailed feedback after each session</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOptions.practiceMode}
                      onChange={(e) => handleOptionChange('practiceMode', e.target.checked)}
                      className="w-4 h-4 text-primary-blue focus:ring-primary-blue rounded"
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Practice Mode</span>
                      <p className="text-sm text-gray-500">Retry questions multiple times</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOptions.voiceSupport}
                      onChange={(e) => handleOptionChange('voiceSupport', e.target.checked)}
                      className="w-4 h-4 text-primary-blue focus:ring-primary-blue rounded"
                    />
                    <div>
                      <span className="text-gray-700 font-medium">Voice Support (Optional)</span>
                      <p className="text-sm text-gray-500">TTS for questions, STT for answers</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Start Interview Button */}
            <div className="text-center">
              <button
                onClick={handleBeginInterview}
                disabled={!selectedOptions.interviewType}
                className={`px-8 py-4 rounded-lg font-medium text-lg flex items-center space-x-3 mx-auto transition-all ${
                  selectedOptions.interviewType
                    ? 'bg-primary-blue text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                </svg>
                <span>Begin {selectedOptions.interviewType} Interview</span>
              </button>
              {!selectedOptions.interviewType && (
                <p className="text-sm text-gray-500 mt-2">Please select an interview type to continue</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AIInterviewMain;
