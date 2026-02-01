import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import html2pdf from 'html2pdf.js';

const AIQuestionGeneratorMain = () => {
  const { user, api } = useAuth();
  const [activeTab, setActiveTab] = useState('manual');
  const [manualFormData, setManualFormData] = useState({
    jobRole: '',
    instructions: '',
    difficulty: 'Medium',
    questionType: 'Multiple Choice',
    numberOfQuestions: 5,
    aiStyle: 'formal',
    randomization: false
  });
  const [resumeFormData, setResumeFormData] = useState({
    interviewType: 'Technical',
    difficulty: 'Medium',
    numberOfQuestions: 5
  });
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleManualInputChange = (field, value) => {
    setManualFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResumeInputChange = (field, value) => {
    setResumeFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateManualQuestions = async () => {
    if (!user) {
      alert('Please log in to generate questions.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await api.post('/api/generatedQuestions/generate', {
        userId: user.id,
        jobRole: manualFormData.jobRole,
        instructions: manualFormData.instructions,
        difficulty: manualFormData.difficulty,
        questionType: manualFormData.questionType,
        numberOfQuestions: manualFormData.numberOfQuestions,
        aiStyle: manualFormData.aiStyle,
        randomization: manualFormData.randomization
      });

      const questions = response.data.questions;
      setGeneratedQuestions(questions);

      alert('Questions generated successfully!');
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateResumeQuestions = async () => {
    if (!user) {
      alert('Please log in to generate questions.');
      return;
    }

    if (!resumeFormData.file) {
      alert('Please upload a resume first.');
      return;
    }

    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('interviewType', resumeFormData.interviewType);
      formData.append('difficulty', resumeFormData.difficulty);
      formData.append('numberOfQuestions', resumeFormData.numberOfQuestions);
      formData.append('resume', resumeFormData.file);

      const response = await api.post('/api/generatedQuestions/generate-from-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const questions = response.data.questions;
      setGeneratedQuestions(questions);
      alert('Questions generated from resume successfully!');

    } catch (error) {
      console.error('Error generating resume questions:', error);
      const errorMessage = error.response?.data?.error || 'Failed to generate questions from resume. Please try again.';
      alert(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveQuestions = () => {
    // Questions are auto-saved to DB on generation. 
    // This button can serve as a confirmation or re-save if we add edit functionality later.
    // For now, simple success message.
    alert('Questions are saved in your history!');
  };

  const handleExportQuestions = (format) => {
    if (generatedQuestions.length === 0) return;

    if (format === 'pdf') {
      const element = document.getElementById('generated-questions-export');
      const opt = {
        margin: 1,
        filename: 'interview-questions.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
    else if (format === 'csv') {
      // ... CSV logic stays same ...
      const headers = ['Question', 'Type', 'Difficulty', 'Options'];
      const csvContent = [
        headers.join(','),
        ...generatedQuestions.map(q => {
          const options = q.options ? `"${q.options.join('; ')}"` : '';
          return `"${q.question.replace(/"/g, '""')}","${q.type}","${q.difficulty}",${options}`;
        })
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'interview-questions.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else if (format === 'clipboard') {
      const textContent = generatedQuestions.map((q, i) => {
        let text = `${i + 1}. ${q.question}\nType: ${q.type} | Difficulty: ${q.difficulty}`;
        if (q.options && q.options.length > 0) {
          text += '\nOptions:\n' + q.options.map((opt, oi) => `  ${String.fromCharCode(65 + oi)}. ${opt}`).join('\n');
        }
        return text;
      }).join('\n\n');

      navigator.clipboard.writeText(textContent)
        .then(() => alert('Questions copied to clipboard!'))
        .catch(err => console.error('Failed to copy code: ', err));
    }
  };

  const handleEditQuestion = (id, newQuestion) => {
    setGeneratedQuestions(prev =>
      prev.map(q => q.id === id ? { ...q, question: newQuestion } : q)
    );
  };

  const handleDeleteQuestion = (id) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <main className="flex-1 pt-16 ml-0 md:ml-64">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Question Generator</h1>
          <p className="text-lg text-gray-600">Generate interview questions manually or from uploaded resumes</p>
        </div>



        {/* AI Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-800 leading-relaxed">
              AI Disclaimer: AI powered tool may make mistakes or give unexpected answers. Use as guidance, not advice.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('manual')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'manual'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Manual Create Question Set
              </button>
              <button
                onClick={() => setActiveTab('resume')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'resume'
                  ? 'border-primary-blue text-primary-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Resume-based Question Generation
              </button>
            </nav>
          </div>
        </div>

        {/* Manual Question Creation */}
        {activeTab === 'manual' && (
          <div className="space-y-6">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Question Set</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Role / Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Java Developer, HR, Data Science"
                      value={manualFormData.jobRole}
                      onChange={(e) => handleManualInputChange('jobRole', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={manualFormData.difficulty}
                      onChange={(e) => handleManualInputChange('difficulty', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Type
                    </label>
                    <select
                      value={manualFormData.questionType}
                      onChange={(e) => handleManualInputChange('questionType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="Coding">Coding</option>
                      <option value="Behavioral">Behavioral</option>
                      <option value="Open-ended">Open-ended</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={manualFormData.numberOfQuestions}
                      onChange={(e) => handleManualInputChange('numberOfQuestions', parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>
                </div>

                {/* Right Column: Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions for AI
                  </label>
                  <textarea
                    placeholder="Provide specific instructions for generating questions, e.g., 'Focus on Spring Boot framework, include practical coding scenarios, emphasize problem-solving skills...'"
                    value={manualFormData.instructions}
                    onChange={(e) => handleManualInputChange('instructions', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-vertical h-[calc(100%-2rem)] min-h-[160px]"
                  />
                </div>
              </div>

              {/* AI Settings */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Settings (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AI Style
                    </label>
                    <select
                      value={manualFormData.aiStyle}
                      onChange={(e) => handleManualInputChange('aiStyle', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="formal">Formal</option>
                      <option value="casual">Casual</option>
                      <option value="tricky">Tricky</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={manualFormData.randomization}
                        onChange={(e) => handleManualInputChange('randomization', e.target.checked)}
                        className="w-4 h-4 text-primary-blue focus:ring-primary-blue rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Shuffle questions and choices</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateManualQuestions}
                disabled={!manualFormData.jobRole || isGenerating}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${manualFormData.jobRole && !isGenerating
                  ? 'bg-primary-blue text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {isGenerating ? 'Generating Questions...' : 'Generate Questions'}
              </button>
            </div>
          </div>
        )}

        {/* Resume-based Question Generation */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Resume</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>

                {resumeFormData.file ? (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900">{resumeFormData.file.name}</p>
                    <p className="text-xs text-gray-500">{(resumeFormData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      onClick={() => setResumeFormData(prev => ({ ...prev, file: null }))}
                      className="text-red-600 text-sm hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-2">Drag and drop your resume here, or</p>
                    <label className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer inline-block">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.doc"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleResumeInputChange('file', e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">Supports PDF, DOCX formats</p>
                  </>
                )}
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Type
                  </label>
                  <select
                    value={resumeFormData.interviewType}
                    onChange={(e) => handleResumeInputChange('interviewType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="Technical">Technical</option>
                    <option value="HR">HR</option>
                    <option value="Behavioral">Behavioral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={resumeFormData.difficulty}
                    onChange={(e) => handleResumeInputChange('difficulty', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={resumeFormData.numberOfQuestions}
                    onChange={(e) => handleResumeInputChange('numberOfQuestions', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateResumeQuestions}
                disabled={isGenerating || !resumeFormData.file}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${!isGenerating && resumeFormData.file
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {isGenerating ? 'Analyzing Resume...' : 'Generate Questions from Resume'}
              </button>
            </div>
          </div>
        )}

        {/* Generated Questions Preview */}
        {generatedQuestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Generated Questions</h2>
              <div className="flex space-x-3">

                <button
                  onClick={() => handleExportQuestions('pdf')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => handleExportQuestions('clipboard')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <div id="generated-questions-export" className="space-y-4">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {question.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {question.type}
                        </span>
                        {question.basedOn && (
                          <span className="text-gray-500 italic">{question.basedOn}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => {
                          const newQuestion = prompt('Edit question:', question.question);
                          if (newQuestion) handleEditQuestion(question.id, newQuestion);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {question.options && (
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 mb-2">Options:</p>
                      <ul className="space-y-1">
                        {question.options.map((option, optIndex) => (
                          <li key={optIndex} className="text-sm text-gray-700 ml-4">
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
              <span className="text-lg text-gray-700">Generating questions...</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AIQuestionGeneratorMain;
