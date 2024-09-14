const Form = require('../models/formModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config(); // Cela doit être fait avant d'utiliser les variables d'environnement

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Créer une nouvelle entrée
exports.createForm = async (req, res) => {
  try {
    const { nom, prenom, surnom, telephone, email } = req.body;

    let passportUrl, registrationUrl;

    // Upload du fichier passport vers Cloudinary
    if (req.files && req.files.passport) {
      const passportResult = await cloudinary.uploader.upload(req.files.passport.tempFilePath, {
        folder: 'documents',
        resource_type: 'auto'
      });
      passportUrl = passportResult.secure_url;
      fs.unlinkSync(req.files.passport.tempFilePath); // Supprime le fichier temporaire
    }

    // Upload du fichier registration vers Cloudinary
    if (req.files && req.files.registration) {
      const registrationResult = await cloudinary.uploader.upload(req.files.registration.tempFilePath, {
        folder: 'documents',
        resource_type: 'auto'
      });
      registrationUrl = registrationResult.secure_url;
      fs.unlinkSync(req.files.registration.tempFilePath); // Supprime le fichier temporaire
    }

    // Création du formulaire avec les données envoyées
    const form = new Form({
      nom,
      prenom,
      surnom,
      telephone,
      email,
      passport: passportUrl,
      registration: registrationUrl
    });

    await form.save(); // Sauvegarde dans la base de données

    res.status(201).json({ success: true, data: form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Modifier une entrée existante
exports.updateForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    const { nom, prenom, surnom, telephone, email } = req.body;

    form.nom = nom || form.nom;
    form.prenom = prenom || form.prenom;
    form.surnom = surnom || form.surnom;
    form.telephone = telephone || form.telephone;
    form.email = email || form.email;

    // Mise à jour du fichier passport si nécessaire
    if (req.files && req.files.passport) {
      const passportResult = await cloudinary.uploader.upload(req.files.passport.tempFilePath, {
        folder: 'documents',
        resource_type: 'auto'
      });
      form.passport = passportResult.secure_url;
      fs.unlinkSync(req.files.passport.tempFilePath);
    }

    // Mise à jour du fichier registration si nécessaire
    if (req.files && req.files.registration) {
      const registrationResult = await cloudinary.uploader.upload(req.files.registration.tempFilePath, {
        folder: 'documents',
        resource_type: 'auto'
      });
      form.registration = registrationResult.secure_url;
      fs.unlinkSync(req.files.registration.tempFilePath);
    }

    await form.save();
    res.status(200).json({ success: true, data: form });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Afficher toutes les entrées
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer une entrée
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    // Suppression du formulaire
    await form.remove();
    res.status(200).json({ success: true, message: 'Form deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
