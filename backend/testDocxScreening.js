const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function testResumeScreening() {
    try {
        // 1. Login to get token
        // We'll create a dummy user or use an existing one if possible, 
        // but for simplicity, let's try to register/login a test user.
        const baseUrl = 'http://localhost:5000/api';
        const testEmail = `test_${Date.now()}@example.com`;
        const testPassword = 'password123';

        console.log('Registering test user...');
        let token;
        try {
            const regRes = await axios.post(`${baseUrl}/users/register`, {
                name: 'Test User',
                email: testEmail,
                password: testPassword,
                role: 'Job Seeker'
            });
            console.log('Registration success. Response keys:', Object.keys(regRes.data));
            token = regRes.data.accessToken;
        } catch (e) {
            // If registration fails (maybe user exists?), try login
            console.log('Registration failed (likely exists), trying login... Error:', e.message);
            try {
                const loginRes = await axios.post(`${baseUrl}/users/login`, {
                    email: testEmail,
                    password: testPassword
                });
                console.log('Login success. Response keys:', Object.keys(loginRes.data));
                token = loginRes.data.accessToken;
            } catch (loginErr) {
                console.error('Login failed:', loginErr.message);
                throw loginErr;
            }
        }

        console.log('Got token:', token);

        // 2. Upload DOCX
        const docxPath = path.join(__dirname, '..', 'resume.docx');
        if (!fs.existsSync(docxPath)) {
            throw new Error(`File not found: ${docxPath}`);
        }

        const form = new FormData();
        form.append('resume', fs.createReadStream(docxPath));

        console.log('Uploading resume.docx...');
        const screeningRes = await axios.post(`${baseUrl}/resumeScreenings`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('\n--- Analysis Result ---');
        console.log(JSON.stringify(screeningRes.data, null, 2));

        if (screeningRes.data.atsScore && screeningRes.data.keywords) {
            console.log('\nSUCCESS: Resume analyzed successfully!');
        } else {
            console.error('\nFAILURE: Analysis result missing expected fields.');
        }

    } catch (err) {
        console.error('Test failed:', err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
    }
}

testResumeScreening();
