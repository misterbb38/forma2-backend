const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

// Configuration de dotenv
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true
}));

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/forms', formRoutes);

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
