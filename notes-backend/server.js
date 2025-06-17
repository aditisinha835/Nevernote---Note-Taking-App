const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

const noteRoutes = require('./routes/notes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

mongoose.connect('mongodb://localhost:27017/notesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));