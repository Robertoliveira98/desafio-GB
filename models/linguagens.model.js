var mongoose = require('mongoose'),
Schema = mongoose.Schema;


const linguagens = new Schema({
    nome: { type: String, default: '' } 
  });

module.exports = mongoose.model('linguagens', linguagens);
