const destaquesService = require('../../services/destaques.service');
const linguagensModel = require("../../models/linguagens.model");
const app = require("../../app");
const sinon = require('sinon');
const chai = require('chai');
const request = require("supertest");
const expect = chai.expect;
let sandbox = require('sandbox');

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  sandbox.restore();
});

describe('Class DestaquesController', () => {

  describe('Method listarDestaquesPorLinguagem', () => {
    it('Sucesso', async () => {

      let mock = {
        data: [
          {
            nome: "teste",
            criador: "nome criador",
            linguageem: "Java"
          }
        ]
      }

      sandbox.stub(destaquesService, "listarDestaquesPorLinguagem").resolves(mock);
      const res = await request(app).get("/listarDestaquesApi/Java");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(mock.data);
    });

    it('error', async () => {
      let error = {
        mensagem: "error"
      }
      sandbox.stub(destaquesService, "listarDestaquesPorLinguagem").rejects({message: "error"});
      const res = await request(app).get("/listarDestaquesApi/Java");
      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal(error);
    });
  });

  describe('Method salvarDestaquesLista', () => {
    it('Sucesso', async () => {

      let mock = {
        data: [
          {
            nome: "teste",
            criador: "nome criador",
            linguageem: "Java"
          }
        ]
      }

      sandbox.stub(destaquesService, "salvarDestaquesLista").resolves(true);
      const res = await request(app).get("/salvarDestaques");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({sucesso: true});
    });
    it('Error', async () => {
      let error = {
        mensagem: "Erro na API GitHub"
      }

      sandbox.stub(destaquesService, "salvarDestaquesLista").rejects();
      const res = await request(app).get("/salvarDestaques");
      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal(error);
    });
  });

  describe('Method listarDestaques', () => {
    it('Sucesso', async () => {

      let mock = [
          {
            nome: "teste",
            criador: "nome criador",
            linguageem: "Java"
          },
          {
            nome: "teste",
            criador: "nome criador",
            linguageem: "Java"
          }
        ];

      sandbox.stub(destaquesService, "listarDestaques").resolves(mock);
      const res = await request(app).get("/listarDestaques");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(mock);
    });
    it('Error', async () => {

      let error = {
        mensagem: "Erro ao requisitar lista de repositorios"
      }

      sandbox.stub(destaquesService, "listarDestaques").rejects();
      const res = await request(app).get("/listarDestaques");
      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal(error);
    });
  });

  describe('Method destalhesRepositorio', () => {
    it('Sucesso', async () => {

      let mock = {
        nome: "teste",
        criador: "nome criador",
        linguageem: "Java"
      };

      sandbox.stub(destaquesService, "detalhesRepositorio").resolves(mock);
      const res = await request(app).get("/detalhes/123");
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(mock);
    });
    it('Error Id não encontrado', async () => {
      let error = {
        mensagem: "Id não encontrado"
      }

      sandbox.stub(destaquesService, "detalhesRepositorio").resolves(undefined);
      const res = await request(app).get("/detalhes/123");
      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal(error);
    });
    it('Error', async () => {
      let error = {
        mensagem: "Erro ao requisitar detalhes do repositorio"
      }

      sandbox.stub(destaquesService, "detalhesRepositorio").rejects();
      const res = await request(app).get("/detalhes/123");
      expect(res.status).to.equal(500);
      expect(res.body).to.deep.equal(error);
    });
  });

	describe('Method getLinguagens', () => {
		it('Sucesso', async () => {

			let mock = [
				{
					nome: "teste",
				},
				{
					nome: "teste1",
				},
				{
					nome: "teste2",
				},
				{
					nome: "teste3",
				},
				{
					nome: "teste4",
				}
			];

			sandbox.stub(destaquesService, "getLinguagens").resolves(mock);
			const res = await request(app).get("/linguagens");
			expect(res.status).to.equal(200);
			expect(res.body).to.deep.equal(mock);
		});
		it('Error', async () => {

			let error = {
				mensagem: "Erro ao requisitar lista de linguagens"
			}

			sandbox.stub(destaquesService, "getLinguagens").rejects();
			const res = await request(app).get("/linguagens");
			expect(res.status).to.equal(500);
			expect(res.body).to.deep.equal(error);
		});
	});
});
