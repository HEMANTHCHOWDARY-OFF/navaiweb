const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('Testing Connection to:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'UNDEFINED');

if (!uri) {
    console.error('URI is undefined. Check .env path.');
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB Atlas!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('FAILURE: Could not connect.');
        console.error('Error:', err);
        process.exit(1);
    });
