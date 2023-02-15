const axios = require('axios');

class GithubAdapter {
    async requestGithubApi(linguagem, sort, order, perPage, page){
        let url = `https://api.github.com/search/repositories?q=language:${linguagem}`;

        if(sort)
            url = url + `&sort=${sort}`
        if(order)
            url = url + `&order=${order}`
        if(perPage)
            url = url + `&per_page=${perPage}`
        if(page)
            url = url + `&page=${page}`

        
        try {
            return await axios.get(url, { headers: {"Accept":"application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }})
        } catch (error) {
            console.error(error)
            throw {message: "Erro na requisição Github"}
        }
    }
}

module.exports = new GithubAdapter();