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
// exports.createForm = async (req, res) => {
//   try {
//     const { nom, prenom, surnom, telephone, email } = req.body;

//     let passportUrl, registrationUrl;

//     // Upload du fichier passport vers Cloudinary
//     if (req.files && req.files.passport) {
//       const passportResult = await cloudinary.uploader.upload(req.files.passport.tempFilePath, {
//         folder: 'documents',
//         resource_type: 'auto'
//       });
//       passportUrl = passportResult.secure_url;
//       fs.unlinkSync(req.files.passport.tempFilePath); // Supprime le fichier temporaire
//     }

//     // Upload du fichier registration vers Cloudinary
//     if (req.files && req.files.registration) {
//       const registrationResult = await cloudinary.uploader.upload(req.files.registration.tempFilePath, {
//         folder: 'documents',
//         resource_type: 'auto'
//       });
//       registrationUrl = registrationResult.secure_url;
//       fs.unlinkSync(req.files.registration.tempFilePath); // Supprime le fichier temporaire
//     }

//     // Création du formulaire avec les données envoyées
//     const form = new Form({
//       nom,
//       prenom,
//       surnom,
//       telephone,
//       email,
//       passport: passportUrl,
//       registration: registrationUrl
//     });

//     await form.save(); // Sauvegarde dans la base de données

//     res.status(201).json({ success: true, data: form });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Créer une nouvelle entrée
// exports.createForm = async (req, res) => {
//   try {
//     const {
//       nationality,
//       nom,
//       prenom,
//       surnom,
//       telephone,
//       email
//     } = req.body;

//     // Validation des champs requis
//     if (!nationality || !nom || !prenom || !telephone || !email) {
//       return res.status(400).json({ success: false, message: 'Champs requis manquants' });
//     }

//     let uploadedFiles = {};

//     if (nationality === 'russe') {
//       // Vérification des fichiers requis pour les Russes
//       if (!req.files || !req.files.passport || !req.files.registration) {
//         return res.status(400).json({ success: false, message: 'Les fichiers passport et registration sont requis pour les Russes' });
//       }

//       // Upload du passport
//       const passportResult = await cloudinary.uploader.upload(req.files.passport.tempFilePath, {
//         folder: 'documents',
//         resource_type: 'auto'
//       });
//       uploadedFiles.passport = passportResult.secure_url;
//       fs.unlinkSync(req.files.passport.tempFilePath);

//       // Upload de la registration
//       const registrationResult = await cloudinary.uploader.upload(req.files.registration.tempFilePath, {
//         folder: 'documents',
//         resource_type: 'auto'
//       });
//       uploadedFiles.registration = registrationResult.secure_url;
//       fs.unlinkSync(req.files.registration.tempFilePath);

//     } else if (nationality === 'etranger') {
//       // Vérification des fichiers requis pour les étrangers
//       const requiredFiles = ['passport', 'translationPassport', 'migrationCard', 'registrationPages'];
//       for (let field of requiredFiles) {
//         if (!req.files || !req.files[field]) {
//           return res.status(400).json({ success: false, message: `Le fichier ${field} est requis pour les étrangers` });
//         }
//       }

//       // Upload des fichiers requis
//       for (let field of requiredFiles) {
//         const result = await cloudinary.uploader.upload(req.files[field].tempFilePath, {
//           folder: 'documents',
//           resource_type: 'auto'
//         });
//         uploadedFiles[field] = result.secure_url;
//         fs.unlinkSync(req.files[field].tempFilePath);
//       }

//       // Upload du visa si présent
//       if (req.files && req.files.visa) {
//         const visaResult = await cloudinary.uploader.upload(req.files.visa.tempFilePath, {
//           folder: 'documents',
//           resource_type: 'auto'
//         });
//         uploadedFiles.visa = visaResult.secure_url;
//         fs.unlinkSync(req.files.visa.tempFilePath);
//       }
//       // Upload du greenCard si présent
//       if (req.files && req.files.greenCard) {
//         const greenCardResult = await cloudinary.uploader.upload(req.files.visa.tempFilePath, {
//           folder: 'documents',
//           resource_type: 'auto'
//         });
//         uploadedFiles.visa = greenCardResult.secure_url;
//         fs.unlinkSync(req.files.greenCard.tempFilePath);
//       }
//       // Upload du patent si présent
//       if (req.files && req.files.patent) {
//         const patentResult = await cloudinary.uploader.upload(req.files.visa.tempFilePath, {
//           folder: 'documents',
//           resource_type: 'auto'
//         });
//         uploadedFiles.visa = patentResult.secure_url;
//         fs.unlinkSync(req.files.patent.tempFilePath);
//       }

//     } else {
//       return res.status(400).json({ success: false, message: 'Nationalité invalide' });
//     }

//     // Création du formulaire
//     const form = new Form({
//       nationality,
//       nom,
//       prenom,
//       surnom,
//       telephone,
//       email,
//       ...uploadedFiles
//     });

//     await form.save();

//     res.status(201).json({ success: true, data: form });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// Créer une nouvelle entrée
exports.createForm = async (req, res) => {
  try {
    const {
      nationality,
      nom,
      prenom,
      surnom,
      telephone,
      email
    } = req.body;

    // Validation des champs requis
    if (!nationality || !nom || !prenom || !telephone || !email) {
      return res.status(400).json({ success: false, message: 'Champs requis manquants' });
    }

    let uploadedFiles = {};

    // Vérification du fichier passport (requis pour tous)
    if (!req.files || !req.files.passport) {
      return res.status(400).json({ success: false, message: 'Le fichier passport est requis' });
    }

    // Upload du passport
    const passportResult = await cloudinary.uploader.upload(req.files.passport.tempFilePath, {
      folder: 'documents',
      resource_type: 'auto'
    });
    uploadedFiles.passport = passportResult.secure_url;
    fs.unlinkSync(req.files.passport.tempFilePath);

    if (nationality === 'russe') {
      // Vérification du fichier registration pour les Russes
      if (!req.files || !req.files.registration) {
        return res.status(400).json({ success: false, message: 'Le fichier registration est requis pour les Russes' });
      }

      // Upload de la registration
      const registrationResult = await cloudinary.uploader.upload(req.files.registration.tempFilePath, {
        folder: 'documents',
        resource_type: 'auto'
      });
      uploadedFiles.registration = registrationResult.secure_url;
      fs.unlinkSync(req.files.registration.tempFilePath);

    } else if (nationality === 'etranger') {
      // Vérification des fichiers requis pour les étrangers
      const requiredFiles = ['translationPassport', 'migrationCard', 'registrationPages'];
      for (let field of requiredFiles) {
        if (!req.files || !req.files[field]) {
          return res.status(400).json({ success: false, message: `Le fichier ${field} est requis pour les étrangers` });
        }
      }

      // Upload des fichiers requis
      for (let field of requiredFiles) {
        const result = await cloudinary.uploader.upload(req.files[field].tempFilePath, {
          folder: 'documents',
          resource_type: 'auto'
        });
        uploadedFiles[field] = result.secure_url;
        fs.unlinkSync(req.files[field].tempFilePath);
      }

      // Upload des fichiers optionnels
      const optionalFiles = ['visa', 'patent', 'greenCard'];
      for (let field of optionalFiles) {
        if (req.files && req.files[field]) {
          const result = await cloudinary.uploader.upload(req.files[field].tempFilePath, {
            folder: 'documents',
            resource_type: 'auto'
          });
          uploadedFiles[field] = result.secure_url;
          fs.unlinkSync(req.files[field].tempFilePath);
        }
      }

    } else {
      return res.status(400).json({ success: false, message: 'Nationalité invalide' });
    }

    // Création du formulaire
    const form = new Form({
      nationality,
      nom,
      prenom,
      surnom,
      telephone,
      email,
      ...uploadedFiles
    });

    await form.save();

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
    const form = await Form.findByIdAndDelete(req.params.id);

    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.status(200).json({ success: true, message: 'Form deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

