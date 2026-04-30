require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = process.env.MONGO_URI || process.env.mongoURI;

const connectDB = async () => {
    if (!dbUri) {
        throw new Error('MongoDB URI is missing. Set MONGO_URI or mongoURI in .env');
    }

    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
};

module.exports = connectDB;