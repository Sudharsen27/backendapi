

// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const { v4: uuidv4 } = require('uuid');

// // In-memory submission storage
// let submissions = [];

// // CORS setup (allow frontend origin)
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3001',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// // Parse JSON request bodies
// app.use(express.json());

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log('Body:', req.body);
//   }
//   next();
// });

// // Root route
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// // Get all submissions
// app.get('/submissions', (req, res) => {
//   res.status(200).json({
//     success: true,
//     count: submissions.length,
//     data: submissions,
//   });
// });

// // Submit form data
// app.post('/submit', (req, res) => {
//   try {
//     const { name, email, phone } = req.body;

//     if (!name || !email || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: name, email, and phone are required',
//       });
//     }
//     const newSubmission = {
//       id: uuidv4(), // Unique ID for each person
//       name,
//       email,
//       phone,
//       timestamp: new Date().toISOString(),
//     };

//     submissions.push(newSubmission);

//     console.log('New submission saved:', newSubmission);
//     console.log('Total submissions:', submissions.length);

//     return res.status(200).json({
//       success: true,
//       message: 'Form submitted successfully',
//       data: newSubmission,
//     });
//   } catch (error) {
//     console.error('Error handling submission:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error processing the request',
//     });
//   }
// });

// // Get specific submission by ID
// app.get('/submissions/:id', (req, res) => {
//   const { id } = req.params;
//   const submission = submissions.find(sub => sub.id === id);

//   if (!submission) {
//     return res.status(404).json({
//       success: false,
//       message: 'Submission not found',
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     data: submission,
//   });
// });

// // Health check endpoint
// app.get('/test', (req, res) => {
//   res.json({
//     message: 'API is working!',
//     environment: process.env.NODE_ENV || 'development',
//     submissionsCount: submissions.length,
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//   });
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   // console.log('- GET /submissions - Get all submissions');
//   // console.log('- POST /submit - Create new submission');
//   // console.log('- GET /submissions/:id - Get submission by ID');
//   // console.log('- GET /test - API health check');
// });


// const express = require('express');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');
// const connectDB = require('./db/connectDB');
// const Submission = require('./models/Submission').default;

// const app = express();
// const PORT = process.env.PORT || 3000;

// // In-memory submission storage
// let submissions = [];

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3001',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   if (Object.keys(req.body || {}).length > 0) {
//     console.log('Body:', req.body);
//   }
//   next();
// });

// // Routes

// // Root route
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// // Get all submissions
// app.get('/submissions', (req, res) => {
//   res.status(200).json({
//     success: true,
//     count: submissions.length,
//     data: submissions,
//   });
// });

// // Submit form data
// // app.post('/submit', (req, res) => {
// //   const { name, email, phone } = req.body;

// //   if (!name || !email || !phone) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Missing required fields: name, email, and phone are required',
// //     });
// //   }

// //   const newSubmission = {
// //     id: uuidv4(),
// //     name,
// //     email,
// //     phone,
// //     timestamp: new Date().toISOString(),
// //   };

// //   submissions.push(newSubmission);

// //   console.log('New submission saved:', newSubmission);
// //   console.log('Total submissions:', submissions.length);

// //   return res.status(200).json({
// //     success: true,
// //     message: 'Form submitted successfully',
// //     data: newSubmission,
// //   });
// // });
// app.post('/submit', async (req, res) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone) {
//     return res.status(400).json({
//       success: false,
//       message: 'Missing required fields: name, email, and phone are required',
//     });
//   }

//   try {
//     const newSubmission = new Submission({ name, email, phone });
//     await newSubmission.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Form submitted and saved to DB successfully',
//       data: newSubmission,
//     });
//   } catch (error) {
//     console.error('Error saving to DB:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to save submission to database',
//     });
//   }
// });

// // Get a single submission by ID
// app.get('/submissions/:id', (req, res) => {
//   const { id } = req.params;
//   const submission = submissions.find(sub => sub.id === id);

//   if (!submission) {
//     return res.status(404).json({
//       success: false,
//       message: 'Submission not found',
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     data: submission,
//   });
// });

// // Health check endpoint
// app.get('/test', (req, res) => {
//   res.status(200).json({
//     message: 'API is working!',
//     environment: process.env.NODE_ENV || 'development',
//     submissionsCount: submissions.length,
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// connectDB();

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');
// const connectDB = require('./db/connectDB');
// const Submission = require('./models/Submission').default;

// const app = express();
// const PORT = process.env.PORT || 3000;

// // In-memory submission storage
// let submissions = [];

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3001',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// app.use(express.json());

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   if (Object.keys(req.body || {}).length > 0) {
//     console.log('Body:', req.body);
//   }
//   next();
// });

// // Routes

// // Root route
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// // Get all submissions
// app.get('/submissions', async (req, res) => {
//   try {
//     const dbSubmissions = await Submission.find({});
//     res.status(200).json({
//       success: true,
//       count: dbSubmissions.length,
//       data: dbSubmissions,
//     });
//   } catch (error) {
//     console.error('Error fetching submissions:', error);
//     // Fallback to in-memory if DB fails
//     res.status(200).json({
//       success: true,
//       count: submissions.length,
//       data: submissions,
//       notice: 'Returned from in-memory storage due to database error'
//     });
//   }
// });

// // Submit form data
// app.post('/submit', async (req, res) => {
//   const { name, email, phone } = req.body;

//   if (!name || !email || !phone) {
//     return res.status(400).json({
//       success: false,
//       message: 'Missing required fields: name, email, and phone are required',
//     });
//   }

//   try {
//     const newSubmission = new Submission({ name, email, phone });
//     await newSubmission.save();

//     // Also keep a copy in memory as backup
//     const memorySubmission = {
//       id: newSubmission._id.toString(),
//       name,
//       email,
//       phone,
//       timestamp: new Date().toISOString(),
//     };
//     submissions.push(memorySubmission);

//     return res.status(200).json({
//       success: true,
//       message: 'Form submitted and saved to DB successfully',
//       data: newSubmission,
//     });
//   } catch (error) {
//     console.error('Error saving to DB:', error);
    
//     // Save to in-memory as fallback
//     const newSubmission = {
//       id: uuidv4(),
//       name,
//       email,
//       phone,
//       timestamp: new Date().toISOString(),
//     };

//     submissions.push(newSubmission);

//     console.log('New submission saved to memory:', newSubmission);
//     console.log('Total submissions in memory:', submissions.length);

//     return res.status(200).json({
//       success: true,
//       message: 'Form submitted successfully (saved to memory due to DB error)',
//       data: newSubmission,
//     });
//   }
// });

// // Get a single submission by ID
// app.get('/submissions/:id', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     // Try to find in database first
//     const submission = await Submission.findById(id);
    
//     if (submission) {
//       return res.status(200).json({
//         success: true,
//         data: submission,
//       });
//     }
    
//     // If not found in DB, check in-memory
//     const memorySubmission = submissions.find(sub => sub.id === id);
    
//     if (!memorySubmission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Submission not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: memorySubmission,
//       notice: 'Retrieved from in-memory storage'
//     });
//   } catch (error) {
//     console.error('Error finding submission by ID:', error);
    
//     // Try in-memory as fallback
//     const memorySubmission = submissions.find(sub => sub.id === id);
    
//     if (!memorySubmission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Submission not found',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: memorySubmission,
//       notice: 'Retrieved from in-memory storage due to DB error'
//     });
//   }
// });

// // Health check endpoint
// app.get('/test', (req, res) => {
//   res.status(200).json({
//     message: 'API is working!',
//     environment: process.env.NODE_ENV || 'development',
//     submissionsCount: submissions.length,
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//   });
// });

// // Connect to database first
// connectDB()
//   .then(() => {
//     // Start the server after DB connection
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Database connection failed, starting server anyway:', err);
//     // Start server even if DB connection fails
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT} (DB connection failed)`);
//     });
//   });

// app.js - Single file application with everything included
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory submission storage
let submissions = [];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/data', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.log('Continuing with in-memory storage only');
  }
};

// Define Submission Schema and Model
const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (Object.keys(req.body || {}).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Routes

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Get all submissions
app.get('/submissions', async (req, res) => {
  try {
    const dbSubmissions = await Submission.find({});
    res.status(200).json({
      success: true,
      count: dbSubmissions.length,
      data: dbSubmissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    // Fallback to in-memory if DB fails
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
      notice: 'Returned from in-memory storage due to database error'
    });
  }
});

// Submit form data
app.post('/submit', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, and phone are required',
    });
  }

  try {
    const newSubmission = new Submission({ name, email, phone });
    await newSubmission.save();

    // Also keep a copy in memory as backup
    const memorySubmission = {
      id: newSubmission._id.toString(),
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
    };
    submissions.push(memorySubmission);

    return res.status(200).json({
      success: true,
      message: 'Form submitted and saved to DB successfully',
      data: newSubmission,
    });
  } catch (error) {
    console.error('Error saving to DB:', error);
    
    // Save to in-memory as fallback
    const newSubmission = {
      id: uuidv4(),
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    console.log('New submission saved to memory:', newSubmission);
    console.log('Total submissions in memory:', submissions.length);

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully (saved to memory due to DB error)',
      data: newSubmission,
    });
  }
});

// Get a single submission by ID
app.get('/submissions/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Try to find in database first
    const submission = await Submission.findById(id);
    
    if (submission) {
      return res.status(200).json({
        success: true,
        data: submission,
      });
    }
    
    // If not found in DB, check in-memory
    const memorySubmission = submissions.find(sub => sub.id === id);
    
    if (!memorySubmission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: memorySubmission,
      notice: 'Retrieved from in-memory storage'
    });
  } catch (error) {
    console.error('Error finding submission by ID:', error);
    
    // Try in-memory as fallback
    const memorySubmission = submissions.find(sub => sub.id === id);
    
    if (!memorySubmission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: memorySubmission,
      notice: 'Retrieved from in-memory storage due to DB error'
    });
  }
});

// Health check endpoint
app.get('/test', (req, res) => {
  res.status(200).json({
    message: 'API is working!',
    environment: process.env.NODE_ENV || 'development',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    submissionsCount: submissions.length,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start with connection attempt
connectDB()
  .then(() => {
    // After connection or failure, start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    // If connectDB throws an error, still start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (no database connection)`);
    });
  });