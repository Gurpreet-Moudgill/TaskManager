const express = require('express');
const connectDB = require('./config/dbConfig');
const taskRoutes = require('./routes/taskRoutes');
// require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

// Connect to the database
connectDB();

// Routes
app.use('/api', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
