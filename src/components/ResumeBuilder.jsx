import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ResumeBuilderSidebar from './ResumeBuilderSidebar.jsx';
import ResumeBuilderMain from './ResumeBuilderMain.jsx';

const ResumeBuilder = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, api } = useAuth();

  const initialFormData = {
    title: 'My Resume',
    personalInfo: {
      name: '',
      address: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      portfolio: '',
      location: { city: '', country: '' }
    },
    professionalSummary: '',
    skills: [{ category: '', items: [''] }],
    workExperience: [{
      jobTitle: '',
      company: '',
      location: { city: '', country: '' },
      duration: '',
      bullets: ['']
    }],
    projects: [{
      title: '',
      technologies: '',
      duration: '',
      bullets: ['']
    }],
    education: [{
      degree: '',
      institution: '',
      duration: '',
      graduationYear: '',
      cgpaPercentage: ''
    }],
    certifications: [{
      name: '',
      authority: '',
      completionYear: '',
      validity: ''
    }],
    achievements: [{
      title: '',
      issuer: '',
      date: ''
    }],
    volunteer: [{
      role: '',
      organization: '',
      duration: '',
      contributions: ['']
    }],
    languages: [{
      name: '',
      proficiency: ''
    }],
    references: [{
      name: '',
      designation: '',
      company: '',
      email: '',
      phone: ''
    }]
  };

  const [formData, setFormData] = useState(initialFormData);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const saveResume = async () => {
    if (!user) {
      alert('Please log in to save your resume.');
      return null;
    }
    try {
      const resumeData = { ...formData, userId: user.id };
      const response = await api.post('/api/resumes', resumeData);
      return response.data;
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
      return null;
    }
  };

  const loadResume = async (resumeId) => {
    try {
      const response = await api.get(`/api/resumes/${resumeId}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error loading resume:', error);
      alert('Failed to load resume. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary-blue text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Resume Builder Sidebar */}
      <ResumeBuilderSidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onNewChat={resetForm}
        onLoadResume={loadResume}
        user={user}
        api={api}
      />

      {/* Resume Builder Main Content */}
      <ResumeBuilderMain 
        formData={formData} 
        setFormData={setFormData}
        saveResume={saveResume}
        user={user}
        api={api}
      />
    </div>
  );
};

export default ResumeBuilder;
