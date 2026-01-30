const axios = require('axios');
require('dotenv').config();

async function testGeminiApiKey() {
  const apiKey = process.env.GEMINI_API_KEY; // Load from .env file
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    return;
  }
  const modelName = 'gemini-1.5-flash'; // Replace with your model name if different

  const url = \`https://generativelanguage.googleapis.com/v1beta/models/\${modelName}:generateContent?key=\${apiKey}\`;

  const data = {
    contents: [{
      parts: [{
        text: "Say hello"
      }]
    }]
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('API call successful. Response data:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.error('API call failed with status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else {
      console.error('Error making API call:', error.message);
    }
  }
}

testGeminiApiKey();
