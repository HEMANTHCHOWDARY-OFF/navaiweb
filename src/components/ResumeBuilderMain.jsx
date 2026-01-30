import React, { useState, useMemo } from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, PageMargin } from 'docx';
import { saveAs } from 'file-saver';
import { pdf, PDFViewer } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

const ResumeBuilderMain = ({ formData, setFormData, saveResume, user, api }) => {

  const [pdfLoading, setPdfLoading] = useState(false);
  const [isGeneratingDOCX, setIsGeneratingDOCX] = useState(false);

  const handleInputChange = (section, index, field, value, subIndex = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (index === null && field === null) {
        newData[section] = value;
      } else if (Array.isArray(newData[section])) {
        if (subIndex !== null) {
          // For array fields like bullets, items
          if (!Array.isArray(newData[section][index][field])) {
            newData[section][index][field] = [...(newData[section][index][field] || []), ''];
          }
          newData[section][index][field][subIndex] = value;
        } else {
          // For object in array, like title, duration
          if (typeof newData[section][index] === 'object' && !Array.isArray(newData[section][index])) {
            if (field.includes('.')) {
              const [parent, child] = field.split('.');
              if (!newData[section][index][parent]) {
                newData[section][index][parent] = {};
              }
              newData[section][index][parent][child] = value;
            } else {
              newData[section][index][field] = value;
            }
          } else {
            newData[section][index] = value;
          }
        }
      } else if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        // For object sections like personalInfo
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          if (!newData[section][parent]) {
            newData[section][parent] = {};
          }
          newData[section][parent][child] = value;
        } else {
          newData[section][field] = value;
        }
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  const addField = (section, template = {}) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeField = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addSubField = (section, index, field) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][field].push('');
      return newData;
    });
  };

  const removeSubField = (section, index, field, subIndex) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][index][field].splice(subIndex, 1);
      return newData;
    });
  };

  const validateForm = () => {
    const { personalInfo, professionalSummary, skills, workExperience, projects, education } = formData;
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
      return false;
    }
    if (!professionalSummary) {
      return false;
    }
    if (skills.length === 0 || skills[0].category === '') {
      return false;
    }
    if (workExperience.length === 0 || workExperience[0].jobTitle === '') {
      return false;
    }
    if (projects.length === 0 || projects[0].title === '') {
      return false;
    }
    if (education.length === 0 || education[0].degree === '') {
      return false;
    }
    return true;
  };

  const isValid = useMemo(() => validateForm(), [formData.personalInfo.name, formData.personalInfo.email, formData.personalInfo.phone, formData.professionalSummary, formData.skills, formData.workExperience, formData.projects, formData.education]);

  const handlePdfDownload = async () => {
    setPdfLoading(true);
    try {
      const blob = await pdf(<ResumePDF data={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleGenerateDOCX = async () => {
    setIsGeneratingDOCX(true);

    try {
      await generateDOCX(formData);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Failed to generate DOCX. Please try again.');
    } finally {
      setIsGeneratingDOCX(false);
    }
  };

  const generateDOCX = async (data) => {
    const { personalInfo, professionalSummary, skills, workExperience, projects, education, certifications, achievements, volunteer, languages, references } = data;

    // Helper to create bullet points
    const createBulletParagraphs = (bullets) => {
      return bullets.filter(b => b.trim()).map(bullet => 
        new Paragraph({
          children: [
            new TextRun({
              text: '• ',
              bold: false,
            }),
            new TextRun({
              text: bullet,
              bold: false,
            }),
          ],
          bullet: {
            level: 0,
          },
        })
      );
    };

    // Helper to create skills with categories
    const createSkills = () => {
      const skillSections = [];
      skills.forEach((skill, catIndex) => {
        if (skill.category.trim() && skill.items.some(item => item.trim())) {
          // Category header
          skillSections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: skill.category,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 80 },
            })
          );
          // Skill items as bullets
          const skillBullets = skill.items.filter(item => item.trim()).map(item => 
            new Paragraph({
              children: [
                new TextRun({
                  text: '• ',
                  bold: false,
                }),
                new TextRun({
                  text: item,
                  bold: false,
                  size: 24,
                }),
              ],
              bullet: {
                level: 0,
              },
            })
          );
          skillSections.push(...skillBullets);
        }
      });
      return skillSections;
    };

    // Build document sections
    const sections = [];

    // Header
    const locationStr = personalInfo.location ? `${personalInfo.location.city || ''}${personalInfo.location.city && personalInfo.location.country ? ', ' : ''}${personalInfo.location.country || ''}`.trim() : '';
    const contactParts = [
      personalInfo.address,
      locationStr,
      personalInfo.email,
      personalInfo.phone,
      personalInfo.linkedin,
      personalInfo.github || personalInfo.portfolio
    ].filter(part => part && part.trim());

    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.name,
            bold: true,
            size: 48, // 24pt * 2
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join(' | '),
            bold: false,
            size: 20, // 10pt * 2
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [],
        borders: {
          top: {
            style: BorderStyle.SINGLE,
            size: 4, // 1pt * 4
            color: '000000',
          },
        },
        spacing: { after: 200 }, // 10pt * 20
      })
    );

    // Professional Summary
    if (professionalSummary) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Professional Summary',
              bold: true,
              size: 28, // 14pt * 2
            }),
          ],
          spacing: { after: 160 }, // 8pt * 20
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: professionalSummary,
              bold: false,
              size: 22, // 11pt * 2
            }),
          ],
          spacing: { after: 100 }, // 5pt * 20
        }),
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4, // 1pt * 4
              color: '000000',
            },
          },
          spacing: { after: 100 }, // 5pt * 20
        })
      );
    }

    // Education
    if (education.some(edu => edu.degree)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Education',
              bold: true,
              size: 28, // 14pt * 2
            }),
          ],
          spacing: { after: 160 }, // 8pt * 20
        })
      );
      education.forEach(edu => {
        if (edu.degree) {
          const eduParts = [
            edu.degree,
            edu.institution,
            edu.duration || edu.graduationYear,
            edu.cgpaPercentage ? `Score/CGPA: ${edu.cgpaPercentage}` : ''
          ].filter(part => part.trim());
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: eduParts.join(' | '),
                  bold: false,
                  size: 22, // 11pt * 2
                }),
              ],
              spacing: { after: 80 }, // 4pt * 20
            })
          );
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Skills
    if (skills.some(s => s.items.some(i => i.trim()))) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Skills',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        }),
        ...createSkills(),
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Experience
    if (workExperience.some(exp => exp.jobTitle)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Experience',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        })
      );
      workExperience.forEach((exp, i) => {
        if (exp.jobTitle) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.jobTitle,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { after: 40 }, // 2pt * 20
            })
          );
          if (exp.company) {
            sections.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.company,
                    italics: true,
                    size: 20, // 10pt * 2
                  }),
                ],
                spacing: { after: 40 },
              })
            );
          }
          const locParts = [
            `${exp.location.city || ''}${exp.location.city && exp.location.country ? ', ' : ''}${exp.location.country || ''}`.trim(),
            exp.duration
          ].filter(part => part.trim());
          if (locParts.length > 0) {
            sections.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: locParts.join(' | '),
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 80 },
              })
            );
          }
          sections.push(...createBulletParagraphs(exp.bullets));
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Projects
    if (projects.some(proj => proj.title)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Projects',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        })
      );
      projects.forEach((proj, i) => {
        if (proj.title) {
          const titleText = `${proj.title}${proj.duration ? ` (${proj.duration})` : ''}`;
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: titleText,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { after: 40 },
            })
          );
          const technologiesArray = typeof proj.technologies === 'string' 
            ? proj.technologies.split(',').map(t => t.trim()).filter(t => t) 
            : proj.technologies || [];
          if (technologiesArray.length > 0) {
            sections.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: technologiesArray.join(', '),
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 80 },
              })
            );
          }
          sections.push(...createBulletParagraphs(proj.bullets));
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Certifications
    if (certifications.some(cert => cert.name)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Certifications',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        })
      );
      certifications.forEach(cert => {
        if (cert.name) {
          const certParts = [
            cert.name,
            cert.authority,
            cert.completionYear || cert.validity
          ].filter(part => part.trim());
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: certParts.join(' | '),
                  bold: false,
                  size: 22,
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Achievements
    if (achievements.some(ach => ach.title)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Achievements',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        })
      );
      achievements.forEach(ach => {
        if (ach.title) {
          const achParts = [
            ach.title,
            ach.issuer,
            ach.date
          ].filter(part => part.trim());
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: achParts.join(' | '),
                  bold: false,
                  size: 22,
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Volunteer Experience
    if (volunteer.some(vol => vol.role)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Volunteer Experience',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        })
      );
      volunteer.forEach(vol => {
        if (vol.role) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: vol.role,
                  bold: true,
                  size: 22,
                }),
              ],
              spacing: { after: 40 },
            })
          );
          if (vol.organization) {
            sections.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: vol.organization,
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 40 },
              })
            );
          }
          if (vol.duration) {
            sections.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: vol.duration,
                    italics: true,
                    size: 20,
                  }),
                ],
                spacing: { after: 80 },
              })
            );
          }
          sections.push(...createBulletParagraphs(vol.contributions));
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // Languages
    if (languages.some(lang => lang.name)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Languages',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        }),
        ...languages.filter(lang => lang.name).map(lang =>
          new Paragraph({
            children: [
              new TextRun({
                text: '• ',
                bold: false,
              }),
              new TextRun({
                text: `${lang.name} (${lang.proficiency})`,
                bold: false,
                size: 22,
              }),
            ],
            bullet: {
              level: 0,
            },
          })
        ),
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    // References
    if (references.some(ref => ref.name)) {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'References',
              bold: true,
              size: 28,
            }),
          ],
          spacing: { after: 160 },
        })
      );
      references.forEach(ref => {
        if (ref.name) {
          const refParts = [
            ref.name,
            ref.designation,
            ref.email,
            ref.phone
          ].filter(part => part.trim());
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: refParts.join(' | '),
                  bold: false,
                  size: 22,
                }),
              ],
              spacing: { after: 80 },
            })
          );
        }
      });
      sections.push(
        new Paragraph({
          children: [],
          borders: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: '000000',
            },
          },
          spacing: { after: 100 },
        })
      );
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: sections,
        margins: {
          top: 800, // 40pt * 20
          right: 800,
          bottom: 800,
          left: 800,
        },
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.docx`);
  };



  return (
    <main className="flex-1 pt-16 ml-0 md:ml-64">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Builder</h1>
          <p className="text-lg text-gray-600">Build your professional resume</p>
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

        {/* Resume Builder Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Resume Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resume Title</h2>
            <input
              type="text"
              placeholder="Resume Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', null, null, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          </div>

          {/* Header / Contact Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Header / Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.personalInfo.name}
                onChange={(e) => handleInputChange('personalInfo', null, 'name', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', null, 'address', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="email"
                placeholder="Professional Email ID *"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', null, 'email', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required
              />
              <input
                type="tel"
                placeholder="Mobile Number *"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', null, 'phone', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required
              />
              <input
                type="text"
                placeholder="LinkedIn Profile"
                value={formData.personalInfo.linkedin}
                onChange={(e) => handleInputChange('personalInfo', null, 'linkedin', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="text"
                placeholder="GitHub / Portfolio / Website"
                value={formData.personalInfo.github || formData.personalInfo.portfolio}
                onChange={(e) => handleInputChange('personalInfo', null, 'github', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="text"
                placeholder="Location (City)"
                value={formData.personalInfo.location.city}
                onChange={(e) => handleInputChange('personalInfo', null, 'location.city', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <input
                type="text"
                placeholder="Location (Country)"
                value={formData.personalInfo.location.country}
                onChange={(e) => handleInputChange('personalInfo', null, 'location.country', e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Summary / Objective *</h2>
            <textarea
              placeholder="2–3 line summary covering current role/qualification, key skills, career goal / desired role"
              value={formData.professionalSummary}
              onChange={(e) => handleInputChange('professionalSummary', null, null, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue h-24"
              required
            />
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills *</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="text"
                  placeholder="Category (e.g., Programming Languages)"
                  value={skill.category}
                  onChange={(e) => handleInputChange('skills', index, 'category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
                />
                {skill.items.map((item, subIndex) => (
                  <div key={subIndex} className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={item}
                      onChange={(e) => handleInputChange('skills', index, 'items', e.target.value, subIndex)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    <button
                      onClick={() => removeSubField('skills', index, 'items', subIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSubField('skills', index, 'items')}
                  className="text-primary-blue underline"
                >
                  + Add Skill
                </button>
                <button
                  onClick={() => removeField('skills', index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove Category
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('skills', { category: '', items: [''] })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Skill Category
            </button>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Work Experience / Internships *</h2>
            {formData.workExperience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleInputChange('workExperience', index, 'jobTitle', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => handleInputChange('workExperience', index, 'company', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Location (City)"
                    value={exp.location.city}
                    onChange={(e) => handleInputChange('workExperience', index, 'location.city', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Location (Country)"
                    value={exp.location.country}
                    onChange={(e) => handleInputChange('workExperience', index, 'location.country', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Duration (Month/Year – Month/Year)"
                    value={exp.duration}
                    onChange={(e) => handleInputChange('workExperience', index, 'duration', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <h3 className="font-semibold mb-2">Responsibilities and Achievements (3–5 bullet points)</h3>
                {exp.bullets.map((bullet, subIndex) => (
                  <div key={subIndex} className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Bullet point"
                      value={bullet}
                      onChange={(e) => handleInputChange('workExperience', index, 'bullets', e.target.value, subIndex)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    <button
                      onClick={() => removeSubField('workExperience', index, 'bullets', subIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSubField('workExperience', index, 'bullets')}
                  className="text-primary-blue underline"
                >
                  + Add Bullet
                </button>
                <button
                  onClick={() => removeField('workExperience', index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('workExperience', {
                jobTitle: '',
                company: '',
                location: { city: '', country: '' },
                duration: '',
                bullets: ['']
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Work Experience
            </button>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projects *</h2>
            {formData.projects.map((proj, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleInputChange('projects', index, 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
                />
                <input
                  type="text"
                  placeholder="Technologies / Tools used (comma-separated)"
                  value={proj.technologies}
                  onChange={(e) => handleInputChange('projects', index, 'technologies', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
                />
                <input
                  type="text"
                  placeholder="Duration (Month/Year – Month/Year)"
                  value={proj.duration}
                  onChange={(e) => handleInputChange('projects', index, 'duration', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
                />
                <h3 className="font-semibold mb-2">Purpose, what was built/done, outcome/impact (2–3 bullet points)</h3>
                {proj.bullets.map((bullet, subIndex) => (
                  <div key={subIndex} className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Bullet point"
                      value={bullet}
                      onChange={(e) => handleInputChange('projects', index, 'bullets', e.target.value, subIndex)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    <button
                      onClick={() => removeSubField('projects', index, 'bullets', subIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSubField('projects', index, 'bullets')}
                  className="text-primary-blue underline"
                >
                  + Add Bullet
                </button>
                <button
                  onClick={() => removeField('projects', index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove Project
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('projects', {
                title: '',
                technologies: '',
                duration: '',
                bullets: ['']
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Project
            </button>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Education *</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Degree / Course"
                    value={edu.degree}
                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="College / University Name"
                    value={edu.institution}
                    onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Duration / Graduation Year"
                    value={edu.duration || edu.graduationYear}
                    onChange={(e) => handleInputChange('education', index, 'duration', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="CGPA / Percentage"
                    value={edu.cgpaPercentage}
                    onChange={(e) => handleInputChange('education', index, 'cgpaPercentage', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <button
                  onClick={() => removeField('education', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('education', {
                degree: '',
                institution: '',
                duration: '',
                graduationYear: '',
                cgpaPercentage: ''
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Education
            </button>
          </div>

          {/* Optional Sections */}
          <details className="mb-6">
            <summary className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer">Certifications / Training</summary>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleInputChange('certifications', index, 'name', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Authority / Platform"
                    value={cert.authority}
                    onChange={(e) => handleInputChange('certifications', index, 'authority', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Completion Year / Validity"
                    value={cert.completionYear || cert.validity}
                    onChange={(e) => handleInputChange('certifications', index, 'completionYear', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <button
                  onClick={() => removeField('certifications', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('certifications', {
                name: '',
                authority: '',
                completionYear: '',
                validity: ''
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Certification
            </button>
          </details>

          <details className="mb-6">
            <summary className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer">Achievements / Awards</summary>
            {formData.achievements.map((ach, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Award / Achievement Title"
                    value={ach.title}
                    onChange={(e) => handleInputChange('achievements', index, 'title', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Body / Event"
                    value={ach.issuer}
                    onChange={(e) => handleInputChange('achievements', index, 'issuer', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Date / Year"
                    value={ach.date}
                    onChange={(e) => handleInputChange('achievements', index, 'date', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <button
                  onClick={() => removeField('achievements', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('achievements', {
                title: '',
                issuer: '',
                date: ''
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Achievement
            </button>
          </details>

          <details className="mb-6">
            <summary className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer">Volunteer Experience / Extracurriculars</summary>
            {formData.volunteer.map((vol, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Role / Position"
                    value={vol.role}
                    onChange={(e) => handleInputChange('volunteer', index, 'role', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Organization / Event Name"
                    value={vol.organization}
                    onChange={(e) => handleInputChange('volunteer', index, 'organization', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={vol.duration}
                    onChange={(e) => handleInputChange('volunteer', index, 'duration', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <h3 className="font-semibold mb-2">Key contributions / impact</h3>
                {vol.contributions.map((contrib, subIndex) => (
                  <div key={subIndex} className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Contribution"
                      value={contrib}
                      onChange={(e) => handleInputChange('volunteer', index, 'contributions', e.target.value, subIndex)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                    <button
                      onClick={() => removeSubField('volunteer', index, 'contributions', subIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addSubField('volunteer', index, 'contributions')}
                  className="text-primary-blue underline"
                >
                  + Add Contribution
                </button>
                <button
                  onClick={() => removeField('volunteer', index)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('volunteer', {
                role: '',
                organization: '',
                duration: '',
                contributions: ['']
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Volunteer Experience
            </button>
          </details>

          <details className="mb-6">
            <summary className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer">Languages Known</summary>
            {formData.languages.map((lang, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.name}
                    onChange={(e) => handleInputChange('languages', index, 'name', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => handleInputChange('languages', index, 'proficiency', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  >
                    <option value="">Select Proficiency</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
                <button
                  onClick={() => removeField('languages', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('languages', {
                name: '',
                proficiency: ''
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Language
            </button>
          </details>

          <details className="mb-6">
            <summary className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer">References</summary>
            {formData.references.map((ref, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Name of Referee"
                    value={ref.name}
                    onChange={(e) => handleInputChange('references', index, 'name', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="text"
                    placeholder="Designation & Company"
                    value={ref.designation}
                    onChange={(e) => handleInputChange('references', index, 'designation', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="email"
                    placeholder="Email ID"
                    value={ref.email}
                    onChange={(e) => handleInputChange('references', index, 'email', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={ref.phone}
                    onChange={(e) => handleInputChange('references', index, 'phone', e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <button
                  onClick={() => removeField('references', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addField('references', {
                name: '',
                designation: '',
                company: '',
                email: '',
                phone: ''
              })}
              className="bg-primary-blue text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add Reference
            </button>
          </details>

          {/* Generate Resume Button */}
          <>
            <button
              onClick={handlePdfDownload}
              disabled={pdfLoading || isGeneratingDOCX}
              className="w-full bg-primary-blue text-white p-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg text-center block disabled:opacity-50"
            >
              {pdfLoading ? 'Generating PDF...' : 'Download Resume (PDF)'}
            </button>
            <button
              onClick={handleGenerateDOCX}
              disabled={isGeneratingDOCX}
              className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg text-center block mt-2 disabled:opacity-50"
            >
              {isGeneratingDOCX ? 'Generating DOCX...' : 'Download Resume (DOCX)'}
            </button>
            {!isValid && (
              <p className="text-yellow-600 text-sm mt-2 text-center">
                Note: Some fields may be empty; consider filling them for a complete resume.
              </p>
            )}
          </>

          {/* Resume Preview */}
          {isValid && (
            <div className="mt-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 p-4 bg-gray-50 border-b border-gray-200">
                Resume Preview
              </h3>
              <div className="p-4">
                <PDFViewer width="100%" height={600} className="w-full">
                  <ResumePDF data={formData} />
                </PDFViewer>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilderMain;