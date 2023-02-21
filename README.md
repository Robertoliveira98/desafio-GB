
# Banco de dados
MongoDB v4.4.6

Executar em http://localhost:27017

Nome do banco: "desafioGB"

# Instalação
Node v14.16.0

```bash 
npm install
```

# Execução

```bash
npm start
```

Executado em http://localhost:3000.

# Endpoints

## GET http://localhost:3000/linguagens
Retorna as linguagens usadas para exibir a lista de repositórios destaques.
Linguagens default são: JavaScript, Python, C, Java e Swift.

## GET http://localhost:3000/salvarDestaques
Faz requisição para API do GitHub para pegar os repositórios para as linguagens salvas e armazena o resultado no banco de dados.

## GET http://localhost:3000/listarDestaques
Retorna lista de todos os repositórios destaques.

## GET http://localhost:3000/listarDestaques/:linguagem
Retorna lista de todos os repositórios destaques por linguagem.

## GET http://localhost:3000/detalhes/:idRepo
Retorna detalhes do repositório pelo id.

# Testes unitários
```bash
npm test
```
