// valida se existem as 5 linguagens no banco e insere caso nãs existam
const linguagensModel = require('../models/linguagens.model');
const populaLinguagens = async (req, res, next) => {
    let listaLinguagens = await linguagensModel.find();

    if (listaLinguagens && listaLinguagens.length < 5) {
        await linguagensModel.remove();
        await linguagensModel.insertMany([
            {
                "nome": "Swift"
            },
            {
                "nome": "C"
            },
            {
                "nome": "JavaScript"
            },
            {
                "nome": "Python"
            },
            {
                "nome": "Java"
            }
        ]);
    }
    next();
}

module.exports = {
    populaLinguagens
}