import React, { useState } from 'react';

const ResumeBuilderMain = () => {
  const [formData, setFormData] = useState({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    education: [{ degree: '', institution: '', year: '' }],
    skills: '',
    workExperience: [{ jobTitle: '', company: '', duration: '', description: '' }],
    projects: [{ name: '', description: '', technologies: '' }],
  });

  const handleInputChange = (section, index, field, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (Array.isArray(newData[section])) {
        newData[section][index][field] = value;
      } else {
        newData[section][field] = value;
      }
      return newData;
    });
  };

  const addField = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const removeField = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleGenerateResume = () => {
    // Logic to generate resume (placeholder)
    console.log('Generating resume with data:', formData);
    alert('Resume generated! (This is a placeholder)');
  };

  return (
    <main className="flex-1 pt-16 ml-0 md:ml-64">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Builder</h1>
          <p className="text-lg text-gray-600">Build your professional resume with AI assistance</p>
        </div>

        {/* Resume Builder Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.personalInfo.name}
                onChange={(e) => handleInputChange('personalInfo', null, 'name', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', null, 'address', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleInputChange('education', index, 'year', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <button
                  onClick={() => removeField('education', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('education')}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
            <textarea
              placeholder="Enter your skills (comma-separated)"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', null, null, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue h-24"
            />
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Work Experience</h2>
            {formData.workExperience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleInputChange('workExperience', index, 'jobTitle', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleInputChange('workExperience', index, 'company', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleInputChange('workExperience', index, 'duration', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleInputChange('workExperience', index, 'description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue h-20 mb-4"
                />
                <button
                  onClick={() => removeField('workExperience', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('workExperience')}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Work Experience
            </button>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projects</h2>
            {formData.projects.map((proj, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue h-20 mb-4"
                />
                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={proj.technologies}
                  onChange={(e) => handleInputChange('projects', index, 'technologies', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
                />
                <button
                  onClick={() => removeField('projects', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('projects')}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Project
            </button>
          </div>

          {/* Generate Resume Button */}
          <button
            onClick={handleGenerateResume}
            className="w-full bg-primary-blue text-white p-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg"
          >
            Generate Resume
          </button>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilderMain;
