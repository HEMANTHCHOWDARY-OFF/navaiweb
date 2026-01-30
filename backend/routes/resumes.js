const express = require('express');
const Resume = require('../models/Resume');
const axios = require('axios');
const router = express.Router();

// Create resume (no longer saves to DB for privacy)
router.post('/', async (req, res) => {
  try {
    // Return success without saving to prevent data storage
    res.status(201).json({ message: 'Resume generated successfully, but not stored.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all resumes for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get last 3 resumes for a user (disabled to prevent data retrieval)
router.get('/user/:userId/recent', async (req, res) => {
  try {
    // Return empty array to prevent fetching stored resumes
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get resume by ID
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update resume
router.put('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete resume
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate resume prompt
router.post('/generate', async (req, res) => {
  try {
    const { userId, title, personalInfo: header, professionalSummary, skills, workExperience, projects, education, certifications, achievements, volunteer: volunteerExperience, languages, references } = req.body;

    const prompt = `You are an expert resume writer. Generate a professional, ATS-friendly resume using the following details:

Header / Contact Information:
Full Name: ${header.name}
Mobile Number: ${header.phone}
Professional Email ID: ${header.email}
LinkedIn profile: ${header.linkedin || ''}
GitHub/Portfolio/Website: ${header.github || header.portfolio || ''}
Location: ${header.location ? `${header.location.city}, ${header.location.country}` : ''}

Professional Summary:
${professionalSummary || ''}

Skills:
Technical Skills: ${skills.filter(s => s.category.toLowerCase().includes('technical')).map(s => s.items.join(', ')).join(', ')}
Soft Skills: ${skills.filter(s => s.category.toLowerCase().includes('soft')).map(s => s.items.join(', ')).join(', ')}

Work Experience:
${workExperience.map((job, i) => `${i+1}. ${job.jobTitle}, ${job.company}, ${job.location ? `${job.location.city}, ${job.location.country}` : ''} (${job.duration})
- ${job.bullets.join('\n- ')}`).join('\n')}

Projects:
${projects.map((p, i) => `${i+1}. ${p.title}
Technologies: ${p.technologies.join(', ')}
- ${p.bullets.join('\n- ')}`).join('\n')}

Education:
${education.map(e => `${e.degree}, ${e.institution} (${e.duration}), ${e.cgpaPercentage}`).join('\n')}

Certifications / Training:
${certifications.map(c => `${c.name}, ${c.authority}, ${c.completionYear}`).join('\n')}

Achievements / Awards:
${achievements.map(a => `${a.title}, ${a.issuer}, ${a.date}`).join('\n')}

Volunteer Experience / Extracurriculars:
${volunteerExperience.map(v => `${v.role}, ${v.organization}, ${v.duration} – ${v.contributions.join(', ')}`).join('\n')}

Languages Known:
${languages.map(l => `${l.name} – ${l.proficiency}`).join(', ')}

References:
${references.map(r => `${r.name}, ${r.designation} at ${r.company}, Email: ${r.email}, Phone: ${r.phone}`).join('\n')}

Output: Create a professional, ATS-friendly resume.`;

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=${process.env.GOOGLE_GEMINI_API_KEY}`, { prompt: { text: prompt } });
    const aiContent = response.data.candidates[0].content.parts[0].text;

    const newResume = await Resume.create({ userId, title, personalInfo: header, professionalSummary, skills, workExperience, projects, education, certifications, achievements, volunteer: volunteerExperience, languages, references, generatedContent: aiContent });

    res.status(201).json({ success: true, resume: newResume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enhance professional summary
router.post('/enhance-summary', async (req, res) => {
  try {
    const { userId, professionalSummary, skills, workExperience, projects, education } = req.body;

    if (!professionalSummary) {
      return res.status(400).json({ error: 'Professional summary is required' });
    }

    const skillsSummary = skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
    const expSummary = workExperience.map(job => `${job.jobTitle} at ${job.company} (${job.duration}): ${job.bullets.join('; ')}`).join('\n');
    const projSummary = projects.map(p => `${p.title} (${p.technologies.join(', ')}): ${p.bullets.join('; ')}`).join('\n');
    const eduSummary = education.map(e => `${e.degree} from ${e.institution} (${e.duration || e.graduationYear})`).join('\n');

    const prompt = `You are an expert resume writer. Enhance the following professional summary to make it more impactful, concise (2-3 lines), ATS-friendly, and tailored to highlight key skills, experiences, and achievements from the provided user details. Focus on current role/qualifications, key skills, and career goals.

Current Summary:
${professionalSummary}

User Details:
Skills:
${skillsSummary}

Work Experience:
${expSummary}

Projects:
${projSummary}

Education:
${eduSummary}

Output ONLY the enhanced professional summary (2-3 lines, no additional text or explanations).`;

    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=${process.env.GOOGLE_GEMINI_API_KEY}`, { 
      prompt: { text: prompt } 
    });
    const enhancedSummary = response.data.candidates[0].content.parts[0].text.trim();

    res.json({ success: true, enhancedSummary });
  } catch (err) {
    console.error('Gemini API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to enhance summary. Please try again.' });
  }
});

module.exports = router;
