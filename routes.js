const controllers = require('./controllers');
const destaquesController = require('./controllers/destaques.controller');
const { populaLinguagens } = require('./middleware/destaques.middleware');

module.exports = function (app) {

    app.get('/', controllers.index);

    app.get('/listarDestaquesApi/:linguagem', (req, res, next) => {
         destaquesController.listarDestaquesPorLinguagem(req, res, next);
    });

    app.get('/salvarDestaques', populaLinguagens, (req, res, next) => {
        destaquesController.salvarDestaquesLista(req, res, next);
    });

    app.get('/listarDestaques', (req, res, next) => {
        destaquesController.listarDestaques(req, res, next);
    });

    app.get('/detalhes/:idRepo', (req, res, next) => {
        destaquesController.destalhesRepositorio(req, res, next);
    });
  

}