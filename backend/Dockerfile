# Use Node.js LTS (Lightweight version)
FROM node:18-slim

# Install Tesseract OCR and dependencies
# - tesseract-ocr: The main OCR engine
# - tesseract-ocr-eng: English language data
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port 5000
EXPOSE 5000

# Start command
CMD ["npm", "start"]
