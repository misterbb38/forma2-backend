const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            
            dbName : "forma2"  // 
            
        });

        console.log('MongoDB connected'.cyan.underline.bold);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};


module.exports = connectDB;
