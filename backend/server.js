require('dotenv').config(); // Load dotenv at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using dotenv
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  fullname: String,
  mobile_number: String,
  full_address: String,
  email: String,
  gender: String,
  question_suggestion: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle POST request for form submission
app.post('/contact', async (req, res) => {
  try {
    const { fullname, mobile_number, full_address, email, gender, question_suggestion } = req.body;
    
    // Create a new Contact document
    const newContact = new Contact({
      fullname,
      mobile_number,
      full_address,
      email,
      gender,
      question_suggestion
    });
    
    // Save the contact to the database
    await newContact.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ message: 'Error saving data!' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
