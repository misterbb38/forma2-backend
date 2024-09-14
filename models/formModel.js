const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  surnom: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
