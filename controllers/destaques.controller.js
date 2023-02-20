const service = require('../services/destaques.service');
class DestaquesController {

    async listarDestaquesPorLinguagem(req, res, next){

        try {
            let response = await service.listarDestaquesPorLinguagem(req.params);

            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({mensagem: error.message});
        }
    }
    
    async salvarDestaquesLista(req, res, next){

        try {
            let sucesso = await service.salvarDestaquesLista();
            res.status(200).json({sucesso});
        } catch (error) {
            res.status(500).json({mensagem: "Erro na API GitHub"});
        }
    }

    async listarDestaques(req, res, next){

        try {
            let listaDestaques = await service.listarDestaques();
            res.status(200).json(listaDestaques);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao requisitar lista de repositorios"});
        }
    }
    
    async destalhesRepositorio(req, res, next){
        try {
            let detalhes = await service.detalhesRepositorio(req.params);
            if (detalhes)
                res.status(200).json(detalhes);
            else 
                res.status(500).json({mensagem: "Id não encontrado"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao requisitar detalhes do repositorio"});
        }
    }

    async getLinguagens(req, res, next) {

        try {
            let linguagens = await service.getLinguagens();
            res.status(200).json(linguagens);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao requisitar lista de linguagens" });
        }
    }
}
module.exports = new DestaquesController();