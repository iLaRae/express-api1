const express = require('express');
const cors = require('cors');
const app = express();

// Use the cors middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from your frontend's origin
}));

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
