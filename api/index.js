const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Use the cors middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from your frontend's origin
}));

const submissionsFile = path.join(__dirname, 'submissions.csv');

// Function to write data to CSV file
const writeToCSV = (data) => {
  const { firstName, lastName, email } = data;
  const csvLine = `${firstName},${lastName},${email}\n`;

  fs.appendFile(submissionsFile, csvLine, (err) => {
    if (err) {
      console.error('Error writing to CSV file', err);
    } else {
      console.log('Data successfully written to CSV file');
    }
  });
};

// Initialize CSV file with headers if it doesn't exist
if (!fs.existsSync(submissionsFile)) {
  fs.writeFile(submissionsFile, 'First Name,Last Name,Email\n', (err) => {
    if (err) {
      console.error('Error initializing CSV file', err);
    }
  });
}

app.post('/api/submit', (req, res) => {
  const { firstName, lastName, email } = req.body;
  const submission = { firstName, lastName, email };

  writeToCSV(submission);

  console.log('New submission:', submission);
  res.status(200).send('Form submission received!');
});

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/api/message1', (req, res) => {
  res.json({ message1: 'Hello Marisa! This is the backend of the server hello, how are you?' });
});

app.post('/api/process-number', (req, res) => {
  const { number } = req.body;
  
  if (typeof number === 'number') {
    const result = number * 2;
    res.json({ result });
  } else {
    res.status(400).json({ error: 'Invalid input, please send a number.' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





