var mongoose = require('mongoose'),
Schema = mongoose.Schema;


const destaques = new Schema({
    linguagem: { type: String, default: '' },
    titulo: { type: String, default: '' },
    link: { type: String, default: '' },
    data: { type: Date, default: Date.now }
  });

  destaques.index({'linguagem': 1});

module.exports = mongoose.model('destaques', destaques);
