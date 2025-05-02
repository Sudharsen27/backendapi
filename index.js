

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;

// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON request body

// // Handle GET requests to the root
// app.get('/', (req, res) => {
//   res.send('Hello from backend!');
// });

// // Handle POST requests to the /submit route
// app.post('/submit', (req, res) => {
//   const { name, email, phone } = req.body;
//   console.log('Received:', { name, email, phone });
//   res.json({ success: true, data: { name, email, phone } });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;

// // Enable CORS with specific options
// app.use(cors({
//   origin: 'http://localhost:3001', // Replace with your frontend URL
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Parse JSON request body
// app.use(express.json());

// // Add request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   console.log('Headers:', req.headers);
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log('Body:', req.body);
//   }
//   next();
// });

// // Handle GET requests to the root
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
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
    
//     console.log('Received form submission:', { name, email, phone });
    
//     // Send successful response
//     return res.status(200).json({ 
//       success: true, 
//       message: 'Form submitted successfully',
//       data: { name, email, phone } 
//     });
//   } catch (error) {
//     console.error('Error handling submission:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Server error processing the request' 
//     });
//   }
// });

// // Add a test endpoint that's easy to check with Postman
// app.get('/test', (req, res) => {
//   res.json({ message: 'Test endpoint working!' });
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
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;

// // Enable CORS with specific options
// app.use(cors({
//   origin: 'http://localhost:3001', // Replace with your frontend URL
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Parse JSON request body
// app.use(express.json());

// // Add request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   console.log('Headers:', req.headers);
//   if (req.body && Object.keys(req.body).length > 0) {
//     console.log('Body:', req.body);
//   }
//   next();
// });

// // Handle GET requests to the root
// app.get('/', (req, res) => {
//   res.send('Backend server is running!');
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
    
//     console.log('Received form submission:', { name, email, phone });
    
//     // Send successful response
//     return res.status(200).json({ 
//       success: true, 
//       message: 'Form submitted successfully',
//       data: { name, email, phone } 
//     });
//   } catch (error) {
//     console.error('Error handling submission:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Server error processing the request' 
//     });
//   }
// });

// // Add a test endpoint that's easy to check with Postman
// app.get('/test', (req, res) => {
//   res.json({ message: 'Test endpoint working!' });
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
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Enable CORS with specific options - update with your production frontend URL
// app.use(cors({
//   origin: process.env.FRONTEND_URL || '*', // In production, replace with your frontend URL
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
    
//     console.log('Received form submission:', { name, email, phone });
    
//     // Send successful response
//     return res.status(200).json({ 
//       success: true, 
//       message: 'Form submitted successfully',
//       data: { name, email, phone } 
//     });
//   } catch (error) {
//     console.error('Error handling submission:', error);
//     return res.status(500).json({ 
//       success: false, 
//       message: 'Server error processing the request' 
//     });
//   }
// });

// // Add a test endpoint for health checks
// app.get('/test', (req, res) => {
//   res.json({ 
//     message: 'API is working!',
//     environment: process.env.NODE_ENV || 'development'
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
// });

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with specific options - update with your production frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // In production, replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request body
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Handle GET requests to the root
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Handle POST requests to the /submit route
app.post('/submit', (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Validate request data
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and phone are required'
      });
    }
    
    console.log('Received form submission:', { name, email, phone });
    
    // Send successful response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: { name, email, phone }
    });
  } catch (error) {
    console.error('Error handling submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing the request'
    });
  }
});

// Add a test endpoint for health checks
app.get('/test', (req, res) => {
  res.json({
    message: 'API is working!',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});