const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
const cors = require('cors')

// Configuration de dotenv
dotenv.config();

const app = express();
app.use(cors());
// app.use(cors({
//     origin: 'https://hist-front-app.onrender.com', // Autoriser seulement cette origine à accéder à l'API
// }));


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

// Correction pour définir une route racine
app.get('/', function (req, res) {
  return res.status(200).json({ message: 'Welcome to the API' });
});

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
