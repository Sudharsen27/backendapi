
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // In-memory storage for submissions (note: this will reset when the server restarts)
// // For production, you would use a database instead
// let submissions = [];

// // Enable CORS with specific options - update with your production frontend URL
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3001', // In production, replace with your frontend URL
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Parse JSON request body
// app.use(express.json());

// // Add request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log('Body:', req.body);
//   }
//   next();
// });

// // Handle GET requests to the root
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
// });

// // Get all submissions
// app.get('/submissions', (req, res) => {
//   res.status(200).json({
//     success: true,
//     count: submissions.length,
//     data: submissions
//   });
// });

// // Handle POST requests to the /submit route
// app.post('/submit', (req, res) => {
//   try {
//     const { name, email, phone } = req.body;
    
//     // Validate request data
//     if (!name || !email || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: name, email, and phone are required'
//       });
//     }
    
//     // Create a submission object with timestamp
//     const newSubmission = {
//       id: Date.now().toString(), // Simple unique ID
//       name,
//       email,
//       phone,
//       timestamp: new Date().toISOString()
//     };
    
//     // Add to submissions array
//     submissions.push(newSubmission);
    
//     console.log('New submission saved:', newSubmission);
//     console.log('Total submissions:', submissions.length);
    
//     // Send successful response
//     return res.status(200).json({
//       success: true,
//       message: 'Form submitted successfully',
//       data: newSubmission
//     });
//   } catch (error) {
//     console.error('Error handling submission:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error processing the request'
//     });
//   }
// });

// // Add a route to get a specific submission by ID
// app.get('/submissions/:id', (req, res) => {
//   const { id } = req.params;
//   const submission = submissions.find(sub => sub.id === id);
  
//   if (!submission) {
//     return res.status(404).json({
//       success: false,
//       message: 'Submission not found'
//     });
//   }
  
//   return res.status(200).json({
//     success: true,
//     data: submission
//   });
// });

// // Add a test endpoint for health checks
// app.get('/test', (req, res) => {
//   res.json({
//     message: 'API is working!',
//     environment: process.env.NODE_ENV || 'development',
//     submissionsCount: submissions.length
//   });
// });

// // Handle 404 routes
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({ success: false, message: 'Internal server error' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`- GET /submissions - Get all submissions`);
//   console.log(`- POST /submit - Create new submission`);
//   console.log(`- GET /submissions/:id - Get submission by ID`);
//   console.log(`- GET /test - API health check`);
// });

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

// In-memory submission storage
let submissions = [];

// CORS setup (allow frontend origin)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON request bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Get all submissions
app.get('/submissions', (req, res) => {
  res.status(200).json({
    success: true,
    count: submissions.length,
    data: submissions,
  });
});

// Submit form data
app.post('/submit', (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and phone are required',
      });
    }
    const newSubmission = {
      id: uuidv4(), // Unique ID for each person
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
    };

    submissions.push(newSubmission);

    console.log('New submission saved:', newSubmission);
    console.log('Total submissions:', submissions.length);

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: newSubmission,
    });
  } catch (error) {
    console.error('Error handling submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing the request',
    });
  }
});

// Get specific submission by ID
app.get('/submissions/:id', (req, res) => {
  const { id } = req.params;
  const submission = submissions.find(sub => sub.id === id);

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: 'Submission not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: submission,
  });
});

// Health check endpoint
app.get('/test', (req, res) => {
  res.json({
    message: 'API is working!',
    environment: process.env.NODE_ENV || 'development',
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log('- GET /submissions - Get all submissions');
  // console.log('- POST /submit - Create new submission');
  // console.log('- GET /submissions/:id - Get submission by ID');
  // console.log('- GET /test - API health check');
});
