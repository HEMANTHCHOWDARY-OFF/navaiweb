const express = require('express');
const multer = require('multer');
const ResumeScreening = require('../models/ResumeScreening');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('node-tesseract-ocr');
const OpenAI = require('openai');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

console.log('Loaded env vars for API keys:', {
  GROQ_API_KEY: process.env.GROQ_API_KEY ? 'set' : 'not set',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'set' : 'not set',
});

// Create screening
router.post('/', auth, upload.single('resume'), async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    console.log('Upload received:', { userId, fileName: file?.originalname, filePath: file?.path });

    if (!file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Extract text based on file type
    let resumeText = '';
    let extractionMethod = '';

    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (fileExtension === '.pdf') {
      extractionMethod = 'pdf-parse';
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      resumeText = data.text;

      console.log('PDF-parse extracted text length:', resumeText.length);

      // If text is too short, try OCR for scanned PDFs
      if (resumeText.trim().length < 100) {
        try {
          console.log('Text too short, attempting OCR...');
          const ocrResult = await Tesseract.recognize(file.path, {
            lang: 'eng',
            oem: 1, // LSTM only
            psm: 6  // Assume a single uniform block of text
          });
          const ocrText = ocrResult.data;
          if (ocrText.trim().length > resumeText.trim().length) {
            resumeText = ocrText;
            extractionMethod = 'OCR';
            console.log('OCR extracted text length:', resumeText.length);
          } else {
            console.log('OCR text not longer than PDF-parse, using PDF-parse');
          }
        } catch (ocrErr) {
          console.error('OCR failed (Tesseract may not be installed):', ocrErr.message);
          // Continue with PDF-parse text
        }
      }
    } else if (fileExtension === '.docx' || fileExtension === '.doc') {
      try {
        extractionMethod = 'mammoth';
        const result = await mammoth.extractRawText({ path: file.path });
        resumeText = result.value; // The raw text
        const messages = result.messages; // Any messages, such as warnings during conversion
        if (messages.length > 0) {
          console.log('Mammoth messages:', messages);
        }
      } catch (err) {
        console.error('Mammoth extraction error:', err);
        throw new Error('Failed to extract text from DOCX file');
      }
    } else {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or DOCX.' });
    }

    console.log(`Final extracted text length (${extractionMethod}):`, resumeText.length);

    if (!resumeText || resumeText.trim().length < 50) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: 'Failed to extract sufficient text from resume. For scanned PDFs, ensure Tesseract OCR is installed.' });
    }

    // Call Groq API
    const prompt = `Analyze the following resume text and provide a JSON response with the following structure:
    {
      "atsScore": number (0-100),
      "keywords": array of strings (suggested keywords),
      "overallScore": number (0-100),
      "feedback": array of strings (improvement suggestions)
    }
    Resume text: ${resumeText}
    
    IMPORTANT: Return ONLY the raw JSON object. Do not include any markdown formatting (like \`\`\`json), explanations, or conversational text.`;

    let analysis;
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = chatCompletion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("No response from Groq");
      }

      console.log("Groq response received, length:", responseText.length);

      try {
        analysis = JSON.parse(responseText);
      } catch (parseError) {
        console.log("Direct JSON parse failed, attempting to find JSON in text...");
        // Try to extract JSON between curly braces if direct parse fails
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysis = JSON.parse(jsonMatch[0]);
        } else {
          console.error("Failed to extract JSON from response:", responseText);
          throw new Error("Invalid JSON format from AI");
        }
      }
    } catch (groqErr) {
      console.error("Groq API error:", groqErr);
      fs.unlinkSync(file.path);
      return res.status(500).json({ error: "Groq API error: " + groqErr.message });
    }

    // Validate analysis
    if (!analysis.atsScore || !analysis.keywords || !analysis.overallScore || !analysis.feedback) {
      fs.unlinkSync(file.path);
      return res.status(500).json({ error: 'Invalid AI response structure' });
    }

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    console.log('Screening completed successfully');

    // Return analysis without saving to DB
    res.status(200).json({
      atsScore: analysis.atsScore,
      keywords: analysis.keywords,
      overallScore: analysis.overallScore,
      feedback: analysis.feedback
    });
  } catch (err) {
    console.error('Screening error:', err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message });
  }
});

// Get all screenings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const screenings = await ResumeScreening.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(screenings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get last 3 screenings for a user
router.get('/user/:userId/recent', async (req, res) => {
  try {
    const screenings = await ResumeScreening.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(3);
    res.json(screenings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get screening by ID
router.get('/:id', async (req, res) => {
  try {
    const screening = await ResumeScreening.findById(req.params.id);
    if (!screening) return res.status(404).json({ error: 'Screening not found' });
    res.json(screening);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
