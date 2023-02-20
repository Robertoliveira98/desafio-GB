const destaquesService = require("../../services/destaques.service");
const destaquesModel = require("../../models/destaques.model");
const linguagensModel = require("../../models/linguagens.model");
const githubAdapter = require("../../adapters/github.adapter");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
let sandbox = require("sandbox");

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  sandbox.restore();
});

describe("Class DestaquesService", () => {
  describe("Method listarDestaquesPorLinguagem", () => {
    it("Sucesso", async () => {
      let mockParams = {
        linguagem: "Java",
      };

      let mockResponse = {
        codigo: 200,
        data: {
          nome: "Teste",
          linguagem: "Java",
        },
      };

      sandbox.stub(destaquesService, "_getValueOrDefault").returns("Java");
      sandbox.stub(githubAdapter, "requestGithubApi").resolves(mockResponse);
      const response = await destaquesService.listarDestaquesPorLinguagem(
        mockParams
      );
      expect(response).to.deep.equal(mockResponse);
    });
  });

  describe("Method salvarDestaquesLista", () => {
    it("return true", async () => {
      let mockLinguagens = ["Java", "JavaScript"];

      let mockDestaques = [
        {
          nome: "Teste",
          linguagem: "Java",
        },
        {
          nome: "Teste",
          linguagem: "JavaScript",
        },
      ];

      sandbox.stub(destaquesModel, "remove").resolves();
      sandbox.stub(linguagensModel, "find").resolves(mockLinguagens);
      sandbox
        .stub(destaquesService, "_getDestaquesPorLinguagens")
        .resolves(mockDestaques);
      const stub = sandbox.stub(destaquesModel, "create").resolves();
      sandbox.stub(destaquesService, "_getValueOrDefault").returns("");
      const response = await destaquesService.salvarDestaquesLista();
      expect(stub.calledTwice).to.be.true;
      expect(response).to.deep.equal(true);
    });

    it("return false", async () => {
      let mockLinguagens = ["Java", "JavaScript"];

      let mockDestaques = [];

      sandbox.stub(destaquesModel, "remove").resolves();
      sandbox.stub(linguagensModel, "find").resolves(mockLinguagens);
      sandbox
        .stub(destaquesService, "_getDestaquesPorLinguagens")
        .resolves(mockDestaques);
      const stub = sandbox.stub(destaquesModel, "create").resolves();
      const response = await destaquesService.salvarDestaquesLista();
      expect(stub.calledOnce).to.be.false;
      expect(response).to.deep.equal(false);
    });
  });

  describe("Method salvarDestaquesLista", () => {
    it("return lista", async () => {
      let mockLinguagens = [{ nome: "Java" }, { nome: "JavaScript" }];
      let mockDestaques = {
        items: [
          {
            nome: "Teste",
            linguagem: "Java",
          },
          {
            nome: "Teste",
            linguagem: "JavaScript",
          },
        ],
      };

      const stub = sandbox
        .stub(githubAdapter, "requestGithubApi")
        .resolves(mockDestaques);
      sandbox
        .stub(destaquesService, "_getValueOrDefault")
        .returns(mockDestaques.items);

      const response = await destaquesService._getDestaquesPorLinguagens(
        mockLinguagens
      );
      expect(stub.calledTwice).to.be.true;
      expect(response).to.deep.equal(
        mockDestaques.items.concat(mockDestaques.items)
      );
    });
    it("return lista vazia", async () => {
      let mockLinguagens = [{ nome: "Java" }, { nome: "JavaScript" }];
      let mockDestaques = {
        items: [],
      };

      const stub = sandbox
        .stub(githubAdapter, "requestGithubApi")
        .resolves(mockDestaques);
      sandbox
        .stub(destaquesService, "_getValueOrDefault")
        .returns(mockDestaques.items);

      const response = await destaquesService._getDestaquesPorLinguagens(
        mockLinguagens
      );
      expect(stub.calledTwice).to.be.true;
      expect(response).to.deep.equal(mockDestaques.items.concat([]));
    });
  });

  describe("Method listarDestaques", () => {
    it("return lista", async () => {
      let mockDestaques = [
        {
          nome: "teste",
          criador: "nome criador",
          linguageem: "Java",
        },
      ];
      const stub = sandbox.stub(destaquesModel, "aggregate").returns({
        project: () => {
          return Promise.resolve(mockDestaques);
        },
      });

      const response = await destaquesService.listarDestaques();
      expect(stub.calledOnce).to.be.true;
      expect(response).to.deep.equal(mockDestaques);
    });
  });

  describe("Method detalhesRepositorio", () => {
    it("return detalhes", async () => {
      let mockParams = {
        idRepo: "123",
      };

      let mockDetalhes = {
        nome: "teste",
        criador: "nome criador",
        linguageem: "Java",
      };

      sandbox.stub(destaquesService, "_getValueOrDefault").returns("123");
      sandbox.stub(destaquesModel, "findById").resolves(mockDetalhes);

      const response = await destaquesService.detalhesRepositorio(mockParams);
      expect(response).to.deep.equal(mockDetalhes);
    });
    it("id não encontrado", async () => {
      let mockParams = {};

      sandbox.stub(destaquesService, "_getValueOrDefault").returns("");
      sandbox.stub(destaquesModel, "findById").resolves(undefined);

      const response = await destaquesService.detalhesRepositorio(mockParams);
      expect(response).to.deep.equal(undefined);
    });
  });

  describe("Method getLinguagens", () => {
    it("return lista", async () => {
      let mockLinguagens = [
        {
          nome: "teste",
        },
        {
          nome: "teste2",
        },
      ];
      const stub = sandbox.stub(linguagensModel, "find").resolves(mockLinguagens);

      const response = await destaquesService.getLinguagens();
      expect(stub.calledOnce).to.be.true;
      expect(response).to.deep.equal(mockLinguagens);
    });
  });

  describe("Method _getValueOrDefault", () => {
    it("sucesso", async () => {
      let mock = {
        nome: "teste",
        criador: "nome criador",
        linguageem: "Java",
      };

      sandbox.stub(destaquesService, "_getProp").returns("teste");

      const response = await destaquesService._getValueOrDefault(
        mock,
        "nome",
        "teste"
      );
      expect(response).to.deep.equal("teste");
    });
    it("value undefined", async () => {
      let mock = {
        nome: "teste",
        criador: "nome criador",
        linguageem: "Java",
      };

      sandbox.stub(destaquesService, "_getProp").returns(undefined);

      const response = await destaquesService._getValueOrDefault(
        mock,
        "path",
        "teste"
      );
      expect(response).to.deep.equal("teste");
    });
  });

  describe("Method _getProp", () => {
    it("sucesso", async () => {
      let mock = {
        nome: "teste",
        criador: "nome criador",
        linguageem: "Java",
      };

      const response = await destaquesService._getProp(mock, "nome");
      expect(response).to.deep.equal("teste");
    });
  });
});
