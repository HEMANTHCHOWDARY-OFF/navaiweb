import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function testGroqApiKey() {
  try {
    console.log("Groq API Key:", process.env.GROQ_API_KEY);

    const res = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
    });

    const data = await res.json();
    console.log("Response from Groq API models endpoint:", data);
  } catch (error) {
    console.error("Error testing Groq API key:", error);
  }
}

testGroqApiKey();
