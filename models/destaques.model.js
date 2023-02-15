var mongoose = require('mongoose'),
Schema = mongoose.Schema;


const destaques = new Schema({
    linguagem: { type: String, default: '' },
    nome: { type: String, default: '' },
    criador: { type: String, default: '' },
    descricao: { type: String, default: '' },
    url: { type: String, default: '' },
    linguagem: { type: String, default: '' },
    topicos: { type: Array, default: [] },
    estrelas: { type: Number, default: 0 },
    data: { type: Date, default: Date.now }
  });

  destaques.index({'linguagem': 1});

module.exports = mongoose.model('destaques', destaques);
