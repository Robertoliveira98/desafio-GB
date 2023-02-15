const githubAdapter = require("../adapters/github.adapter");
const linguagensModel = require('../models/linguagens.model');
const destaquesModel = require('../models/destaques.model');

class DestaquesService {
    async listarDestaquesPorLinguagem(params){
        let linguagem = _getValueOrDefault(params, "linguagem", "");
        return await githubAdapter.requestGithubApi(linguagem, "stars", "desc", 5, 1)
    }

    async salvarDestaquesLista(){
         
        await destaquesModel.remove();
        let listaLinguagens = await linguagensModel.find();
        let listaDestaques = [];

        let promise = listaLinguagens.map(async (linguagem) => {
            let response = await githubAdapter.requestGithubApi(linguagem.nome, "stars", "desc", 5, 1);
            let destaques = _getValueOrDefault(response, "data.items", []);
            listaDestaques = listaDestaques.concat(destaques);
        });
        await Promise.all(promise);

        listaDestaques.map(async (destaque) => {
            await destaquesModel.create({
                nome: _getValueOrDefault(destaque, "name", ""),
                criador: _getValueOrDefault(destaque, "owner.login", ""),
                descricao: _getValueOrDefault(destaque, "description", ""),
                url: _getValueOrDefault(destaque, "url", ""),
                linguagem: _getValueOrDefault(destaque, "language", ""),
                topicos: _getValueOrDefault(destaque, "topics", []),
                estrelas: _getValueOrDefault(destaque, "stargazers_count", 0)
            })
        });

    }

    async listarDestaques(){
        return await destaquesModel.aggregate().project({
            "nome": 1, 
            "criador": 1,
            "linguagem": 1
        });
    }

    async detalhesRepositorio(params){
        let id = _getValueOrDefault(params, "idRepo", "");
        return await destaquesModel.findById(id);
    }

}

function _getValueOrDefault(obj, path, defaultValue = undefined) {
    try {
        let prop = _getProp(obj, path);
        if (typeof prop === 'undefined') return defaultValue;
        return prop;
    } catch (error) {
        return defaultValue;
    }
}

function _getProp(obj, desc) {
    var arr = desc.split('.');
    while (arr.length) {
        obj = obj[arr.shift()];
    }
    return obj;
}

module.exports = new DestaquesService();