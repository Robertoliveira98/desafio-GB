const gitHubAdapter = require('../../adapters/github.adapter');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
let sandbox = require('sandbox');
const axios = require('axios');

beforeEach(() => {
    sandbox = sinon.createSandbox();
});

afterEach(() => {
    sandbox.restore();
});

describe('Class GithubAdapter', () => {
    let linguagem = "Java";
    let sort = "stars";
    let order = "desc";
    let perPage = 5;
    let page = 1;
    describe('Method requestGithubApi', () => {
        it('Sucesso', async () => {
            let mock = {
                codigo: 200,
                data: {
                    count: 1,
                    items: [{
                        nome: "teste"
                    }]
                }
            }
            sandbox.stub(axios, "get").resolves(mock);
            const res = await gitHubAdapter.requestGithubApi(linguagem, sort, order, perPage, page);
            expect(res).to.deep.equal(mock);
        });
    });
});