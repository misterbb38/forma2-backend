// // const mongoose = require('mongoose');

// // const formSchema = new mongoose.Schema({
// //   nom: {
// //     type: String,
// //     required: true,
// //   },
// //   prenom: {
// //     type: String,
// //     required: true,
// //   },
// //   surnom: {
// //     type: String,
// //     required: false,
// //   },
// //   telephone: {
// //     type: String,
// //     required: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //   },
// //   passport: {
// //     type: String,
// //     required: true,
// //   },
// //   registration: {
// //     type: String,
// //     required: true,
// //   }
// // }, { timestamps: true });

// // const Form = mongoose.model('Form', formSchema);
// // module.exports = Form;


// const mongoose = require('mongoose');

// const formSchema = new mongoose.Schema({
//   nationality: {
//     type: String,
//     enum: ['russe', 'etranger'],
//     required: true,
//   },
//   nom: {
//     type: String,
//     required: true,
//   },
//   prenom: {
//     type: String,
//     required: true,
//   },
//   surnom: {
//     type: String,
//     required: false,
//   },
//   telephone: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   // Documents pour les Russes
//   passport: {
//     type: String,
//   },
//   registration: {
//     type: String,
//   },
//   // Documents pour les étrangers
//   translationPassport: {
//     type: String,
//   },
//   visa: {
//     type: String,
//   },
//   migrationCard: {
//     type: String,
//   },
//   registrationPages: {
//     type: String,
//   },
//   patent: {
//     type: String,
//     required: false,
//   },
//   greenCard: {
//     type: String,
//     required: false,
//   },
// }, { timestamps: true });

// const Form = mongoose.model('Form', formSchema);
// module.exports = Form;


const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  nationality: {
    type: String,
    enum: ['russe', 'etranger'],
    required: true,
  },
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
    required: false,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // Documents pour tous
  passport: {
    type: String,
    required: true,
  },
  // Documents pour les Russes
  registration: {
    type: String,
    required: function() {
      return this.nationality === 'russe';
    },
  },
  // Documents pour les étrangers
  translationPassport: {
    type: String,
    required: function() {
      return this.nationality === 'etranger';
    },
  },
  visa: {
    type: String,
    required: false,
  },
  migrationCard: {
    type: String,
    required: function() {
      return this.nationality === 'etranger';
    },
  },
  registrationPages: {
    type: String,
    required: function() {
      return this.nationality === 'etranger';
    },
  },
  patent: {
    type: String,
    required: false,
  },
  greenCard: {
    type: String,
    required: false,
  },
  inn: {
    type: String,
    required: false,
  },
  snils: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
