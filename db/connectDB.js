



// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/data', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1); // Exit if DB connection fails
//   }
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/data', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     console.log('Continuing with in-memory storage only');
//   }
// };

// module.exports = connectDB;

// Enhanced database connection with detailed logging
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    console.log('Connection string (partially masked):', 
      process.env.MONGO_URI ? 
      process.env.MONGO_URI.replace(/(mongodb\+srv:\/\/[^:]+:)([^@]+)(@.+)/, '$1*****$3') : 
      'No connection string provided');
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/data', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully!');
    console.log('Connected to database:', mongoose.connection.db.databaseName);
    console.log('Connection state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected');
    
    // List all collections to verify access
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    return true;
  } catch (error) {
    console.error('MongoDB connection failed with error:', error.message);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB server. Check your network or Atlas access.');
    }
    if (error.message.includes('bad auth')) {
      console.error('Authentication failed. Check your username and password.');
    }
    if (error.message.includes('ENOTFOUND')) {
      console.error('Could not resolve hostname. Check your connection string.');
    }
    
    console.log('Continuing with in-memory storage only');
    return false;
  }
};

module.exports = connectDB;