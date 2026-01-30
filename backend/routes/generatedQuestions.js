const express = require('express');
const GeneratedQuestion = require('../models/GeneratedQuestion');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const OpenAI = require('openai');

const upload = multer({ dest: 'uploads/' });

// Initialize OpenAI client (Groq) - verify key exists
if (!process.env.GROQ_API_KEY) {
  console.error('CRITICAL: GROQ_API_KEY is missing from environment variables!');
}

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// Create generated questions
router.post('/', async (req, res) => {
  try {
    const questions = new GeneratedQuestion(req.body);
    await questions.save();
    res.status(201).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all generated questions for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const questions = await GeneratedQuestion.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recent generated questions for a user (limit 5)
router.get('/user/:userId/recent', async (req, res) => {
  try {
    const questions = await GeneratedQuestion.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(5);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const questions = await GeneratedQuestion.findById(req.params.id);
    if (!questions) return res.status(404).json({ error: 'Questions not found' });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate questions using Groq API (Manual)
router.post('/generate', async (req, res) => {
  try {
    const { userId, instructions, jobRole, difficulty, questionType, numberOfQuestions } = req.body;

    if (!userId || !instructions) {
      return res.status(400).json({ error: 'userId and instructions are required' });
    }

    const prompt = `Generate exactly ${numberOfQuestions || 5} ${questionType || 'Multiple Choice'} questions for the position of ${jobRole || 'general'} with ${difficulty || 'Medium'} difficulty. 

Instructions: ${instructions}

Make sure the questions are highly relevant to the job role and instructions provided. Do not generate fewer or more questions than requested.

Please format each question as:
Question: [question text]
Type: [question type]
Difficulty: [difficulty]
${questionType === 'Multiple Choice' ? 'Options: A. [option1] B. [option2] C. [option3] D. [option4]' : ''}

Separate each question with ---`;

    console.log('Generating questions with prompt:', prompt);

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const generatedText = chatCompletion.choices[0]?.message?.content || "";
    console.log('Groq API response length:', generatedText.length);

    // Parse the generated text into structured questions
    const questions = parseGeneratedQuestions(generatedText, questionType || 'Multiple Choice', difficulty || 'Medium');

    // Save to database
    const generatedQuestion = new GeneratedQuestion({
      userId,
      questions,
      topic: jobRole || 'General',
      instructions
    });
    await generatedQuestion.save();

    res.json({ questions });

  } catch (err) {
    console.error('Error generating questions:', err);
    res.status(500).json({ error: err.message || 'Failed to generate questions' });
  }
});

// Generate questions from Resume (Groq API)
router.post('/generate-from-resume', upload.single('resume'), async (req, res) => {
  try {
    console.log('--- Resume Generation Request Started ---');
    const { userId, interviewType, difficulty, numberOfQuestions } = req.body;
    const file = req.file;

    if (!file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'Resume file is required' });
    }

    console.log('Resume upload received:', {
      userId,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype
    });

    // Extract text based on file type
    let resumeText = '';
    const fileExtension = path.extname(file.originalname).toLowerCase();
    console.log('Processing file extension:', fileExtension);

    try {
      if (fileExtension === '.pdf') {
        const dataBuffer = fs.readFileSync(file.path);

        try {
          // Try standard PDF parse
          const data = await pdfParse(dataBuffer);
          resumeText = data.text;
          console.log('PDF text extracted via pdf-parse. Length:', resumeText.length);
        } catch (pdfError) {
          console.warn('pdf-parse failed:', pdfError.message);
          console.log('Attempting OCR fallback...');
        }

        // OCR Fallback if pdf-parse failed or returned little text
        if (!resumeText || resumeText.trim().length < 50) {
          try {
            const config = {
              lang: "eng",
              oem: 1,
              psm: 3,
            };
            console.log('Starting OCR...');
            resumeText = await Tesseract.recognize(file.path, config);
            console.log('OCR text extracted. Length:', resumeText.length);
          } catch (ocrError) {
            console.error('OCR failed or not installed:', ocrError.message);
            // If both failed, we can't proceed
            if (!resumeText) throw new Error('Could not parse PDF. Ensure it is text-based or Tesseract OCR is installed on the server.');
          }
        }

      } else if (fileExtension === '.docx' || fileExtension === '.doc') {
        const result = await mammoth.extractRawText({ path: file.path });
        resumeText = result.value;
        console.log('DOCX text extracted. Length:', resumeText.length);
      } else {
        console.error('Unsupported file format:', fileExtension);
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or DOCX.' });
      }
    } catch (parseError) {
      const errorMsg = `File parsing failed: ${parseError.message}`;
      console.error(errorMsg);
      // Log to file
      fs.appendFileSync(path.join(__dirname, '..', 'error_log.txt'), `${new Date().toISOString()} - ${errorMsg}\n`);

      fs.unlinkSync(file.path);
      return res.status(500).json({ error: errorMsg });
    }

    // Cleanup file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    if (!resumeText || resumeText.trim().length < 50) {
      const msg = 'Insufficient text extracted from resume. File might be empty or image-based without OCR.';
      console.error(msg);
      fs.appendFileSync(path.join(__dirname, '..', 'error_log.txt'), `${new Date().toISOString()} - ${msg}\n`);
      return res.status(400).json({ error: msg });
    }

    const prompt = `Based on the following resume, generate exactly ${numberOfQuestions || 5} ${interviewType || 'Technical'} interview questions with ${difficulty || 'Medium'} difficulty.

Resume Content:
${resumeText.substring(0, 10000)} // Truncate to avoid token limits if necessary

Instructions:
Generate questions that directly relate to the projects, skills, and experience mentioned in the resume.

Please format each question as:
Question: [question text]
Type: ${interviewType || 'Technical'}
Difficulty: ${difficulty || 'Medium'}
Based On: [Specific section or project from resume]

Separate each question with ---`;

    console.log('Sending request to Groq API...');

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const generatedText = chatCompletion.choices[0]?.message?.content || "";
    console.log('Groq API response received. Length:', generatedText.length);

    const questions = parseGeneratedQuestions(generatedText, interviewType || 'Technical', difficulty || 'Medium');

    const generatedQuestion = new GeneratedQuestion({
      userId,
      questions,
      topic: 'Resume-Based Interview',
      instructions: `Interview Type: ${interviewType}, Difficulty: ${difficulty}`
    });
    await generatedQuestion.save();

    console.log('Questions saved to DB');
    res.json({ questions });

  } catch (err) {
    console.error('Error generating resume questions:', err);
    const logPath = path.join(__dirname, '..', 'error_log.txt');
    fs.appendFileSync(logPath, `${new Date().toISOString()} - Error: ${err.message}\nStack: ${err.stack}\n`);

    if (req.file && fs.existsSync(req.file.path)) {
      try { fs.unlinkSync(req.file.path); } catch (e) { /* ignore */ }
    }

    const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to generate questions from resume';
    res.status(500).json({ error: errorMessage });
  }
});


function parseGeneratedQuestions(text, defaultType, defaultDifficulty) {
  const questions = [];
  const sections = text.split('---').map(s => s.trim()).filter(s => s);

  for (const section of sections) {
    const lines = section.split('\n').map(l => l.trim()).filter(l => l);
    let question = '';
    let type = defaultType;
    let difficulty = defaultDifficulty;
    let basedOn = '';
    let options = [];

    for (const line of lines) {
      if (line.startsWith('Question:')) {
        question = line.replace('Question:', '').trim();
      } else if (line.startsWith('Type:')) {
        type = line.replace('Type:', '').trim();
      } else if (line.startsWith('Difficulty:')) {
        difficulty = line.replace('Difficulty:', '').trim();
      } else if (line.startsWith('Based On:')) {
        basedOn = line.replace('Based On:', '').trim();
      } else if (line.startsWith('Options:')) {
        const optsText = line.replace('Options:', '').trim();
        options = optsText.split(/(?=[A-D]\.)/).filter(o => o).map(o => o.trim());
        // Fallback split if regex fails or different format
        if (options.length === 1 && options[0].includes('B.')) {
          options = optsText.split(/[A-D]\.\s*/).filter(o => o).map(o => o.trim());
        }
      }
    }

    if (question) {
      const qObj = {
        question,
        type,
        difficulty,
        options
      };
      if (basedOn) qObj.basedOn = basedOn;
      questions.push(qObj);
    }
  }

  return questions;
}

module.exports = router;
