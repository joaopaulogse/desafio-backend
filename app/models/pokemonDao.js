module.exports = class PokemonDao {

    constructor() {
        this._pokemons = require("./pokemon");
    }

    criar(objeto) {

        return new Promise((resolve, reject) => {
            if (!!objeto.tipo || !!objeto.treinador) { //objeto não pode ser nulo, nem undefined

                this._pokemons.create({
                    tipo: objeto.tipo,
                    treinador: objeto.treinador
                }, {
                    force: true
                }).then(result => {
                    delete result.dataValues.updatedAt;
                    delete result.dataValues.createdAt;
                    resolve(result.dataValues);
                    console.info(result.dataValues);
                }).catch(err => {
                    console.error(err);
                    reject("Erro ao criar: " + err);
                })
            } else {
                reject("Tipo ou Treinador nulo!");
            }
        })
    }

    alterar(id, treinador) {
        return new Promise((resolve, reject) => {
            if (!!treinador) {

                this._pokemons
                    .update({ treinador: treinador }, { where: { id: id } })
                    .then(result => {
                        resolve("Alterado com sucesso!");
                        console.info(result.dataValues);
                    }).catch(err => {
                        reject("Erro ao alterar: " + err);
                    })
            } else {
                reject("Treinador não pode ser nulo!")
            }
        })
    }
    deletar(id) {
        return new Promise((resolve, reject) => {
            this._pokemons
                .destroy({ where: { id: id } })
                .then(result => {
                    resolve("Deletado com Sucesso!");
                    console.info("Deletado com Sucesso");
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
                    delete result.dataValues.updatedAt;
                    delete result.dataValues.createdAt;
                    resolve(result.dataValues);
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
                    result.forEach(value => {
                        delete value.dataValues.updatedAt;
                        delete value.dataValues.createdAt;
                    });
                    resolve(result);
                }).catch(err => {
                    reject("Erro ao listar: " + err);
                })
        })
    }
    alteraNivel(id, nivel) {
        return new Promise((resolve, reject) => {
            this._pokemons
                .update({ nivel: nivel }, { where: { id, id } })
                .then(result => {
                    resolve("Nivel alterado");
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}