module.exports = class PokemonDao {

    constructor() {
        this._pokemons = require("./pokemon");
    }

    criar(objeto) {

        return new Promise((resolve, reject) => {

            this._pokemons.create({
                tipo: objeto.tipo,
                treinador: objeto.treinador
            }).then(result => {
                resolve("Cadastrado com sucesso!");
                console.info(result);
            }).catch(err => {
                console.error(err);
                reject("Erro ao criar: " + err);
            })
        })
    }

    alterar(id, treinador) {
        return new Promise((resolve, reject) => {
            this._pokemons
                .update({ treinador: treinador }, { where: { id: id } })
                .then(result => {
                    resolve("Alterado com sucesso!");
                    console.info(result);
                }).catch(err => {
                    reject("Erro ao alterar: " + err);
                })
        })
    }
    deletar(id) {
        return new Promise((resolve, reject) => {
            this._pokemons
                .destroy({ where: { id: id } })
                .then(result => {
                    resolve("Deletado com Sucesso!");
                    console.info(result);
                }).catch(err => {
                    reject("Erro ao deletar: ", err);
                });
        })
    }
    carregar(id) {
        return new Promise((resolve, reject) => {
            this._pokemons
                .findById(id)
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject("Erro ao buscar por id: " + err);
                })
        })
    }
    listar() {
        return new Promise((resolve, reject) => {
            this._pokemons
                .all()
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject("Erro ao listar: " + err);
                })
        })
    }
}