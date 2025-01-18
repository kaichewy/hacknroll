// Import required modules
const express = require('express'); // Import the Express framework

// Create an Express application
const app = express();

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send(`YOU'RE IN THE BACKEND LA`);
});

// Define another route (example)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Here is some sample data!', data: [1, 2, 3, 4] });
});

// Start the server
const PORT = 3000; // Choose a port for your server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});