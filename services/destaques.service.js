const githubAdapter = require("../adapters/github.adapter");
const linguagensModel = require('../models/linguagens.model');
const destaquesModel = require('../models/destaques.model');

class DestaquesService {

    async listarDestaquesPorLinguagem(params) {
        let linguagem = this._getValueOrDefault(params, "linguagem", "");
        let regex = new RegExp("^" + linguagem + "$", "i");
        let aggregate = [
            { $match: { linguagem: regex } },
            {
                $project: {
                    "nome": 1,
                    "criador": 1,
                    "linguagem": 1
                }
            }
        ];
        return await destaquesModel.aggregate(aggregate);
    }

    async salvarDestaquesLista(){

        let listaLinguagens = await linguagensModel.find();
        let listaDestaques = await this._getDestaquesPorLinguagens(listaLinguagens);

        if (listaDestaques.length > 0)
            await destaquesModel.remove();
        
        listaDestaques.map(async (destaque) => {
            await destaquesModel.create({
                nome: this._getValueOrDefault(destaque, "name", ""),
                criador: this._getValueOrDefault(destaque, "owner.login", ""),
                descricao: this._getValueOrDefault(destaque, "description", ""),
                url: this._getValueOrDefault(destaque, "url", ""),
                linguagem: this._getValueOrDefault(destaque, "language", ""),
                topicos: this._getValueOrDefault(destaque, "topics", []),
                estrelas: this._getValueOrDefault(destaque, "stargazers_count", 0)
            })
        });

        return listaDestaques.length > 0;

    }

    async _getDestaquesPorLinguagens(listaLinguagens){
        let listaDestaques = [];

        let promise = listaLinguagens.map(async (linguagem) => {
            let response = await githubAdapter.requestGithubApi(linguagem.nome, "stars", "desc", 5, 1);
            let destaques = this._getValueOrDefault(response, "data.items", []);
            listaDestaques = listaDestaques.concat(destaques);
        });
        await Promise.all(promise);

        return listaDestaques;
    }

    async listarDestaques(){
        return await destaquesModel.aggregate().project({
            "nome": 1, 
            "criador": 1,
            "linguagem": 1
        });
    }

    async detalhesRepositorio(params){
        let id = this._getValueOrDefault(params, "idRepo", "");
        return await destaquesModel.findById(id);
    }

    async getLinguagens(){
        return await linguagensModel.find();
    }
    

    _getValueOrDefault(obj, path, defaultValue = undefined) {
        try {
            let prop = this._getProp(obj, path);
            if (typeof prop === 'undefined') return defaultValue;
            return prop;
        } catch (error) {
            return defaultValue;
        }
    }

    _getProp(obj, desc) {
        var arr = desc.split('.');
        while (arr.length) {
            obj = obj[arr.shift()];
        }
        return obj;
    }
}

module.exports = new DestaquesService();