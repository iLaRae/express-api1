const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


// Use the cors middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from your frontend's origin
}));

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/api/message1', (req, res) => {
  res.json({ message1: 'Hello Marisa! This is the backend of the server hello, how are you?' });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





