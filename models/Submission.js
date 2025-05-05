// const mongoose = require('mongoose');

// const submissionSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Submission', submissionSchema);

// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });
// submissions.push(newSubmission); 
// const Submission = mongoose.model('Submission', submissionSchema);
// export default Submission;


const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);

// Export both default and named export to support both import styles
module.exports = Submission;
module.exports.default = Submission;