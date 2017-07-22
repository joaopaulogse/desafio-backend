var PokemonDao = require("../models/pokemonDao.js");
let _ = require("underscore");
module.exports = () => {

    let dao = new PokemonDao();
    var controllers = {};

    controllers.criar = function(req, res) {
        let objeto = {
            tipo: req.body.tipo,
            treinador: req.body.treinador
        };
        dao.criar(objeto)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.json({ "error": err });
            })

        //res.send("estou funcionando..");
    }
    controllers.alterar = function(req, res) {
        dao.alterar(req.params.id, req.body.treinador)
            .then(result => {
                res.status(204);
            })
            .catch(err => {
                res.status(500).json({ "error": err });
            })
    }
    controllers.delete = function(req, res) {
        dao.deletar(req.params.id)
            .then(result => {
                res.status(204);
            })
            .catch(err => {
                res.status(404).json({ "error": err });
            })
    }
    controllers.carregar = function(req, res) {
        dao.carregar(req.params.id)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json({ "error": err });
            })
    }
    controllers.listar = function(req, res) {
        dao.listar()
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json({ "error": err });
            })
            // res.json({ "messagem": "estou funcionando...." })
    }
    controllers.batalha = function(req, res) {
        var p1, p2;

        dao.carregar(req.params.pokemonAId).then(pokemon => { p1 = pokemon });
        dao.carregar(req.params.pokemonBId).then(pokemon => { p2 = pokemon });
        if (p1.nivel == p2.nivel) { //se o nivel igual
            let resultado = _.sample([p1, p2]);
            if (p1 == resultado) {
                res.json({
                    "vencedor": p1,
                    "perdedor": p2
                })
            } else if (p2 == resultado) {
                res.json({
                    "vencedor": p2,
                    "perdedor": p1
                })
            }
        } else { //SE TIVER ALGUM NIVEL MAIOR QUE O OUTRO
            let nivelMaior = Math.max(p1.nivel, p2.nivel);
            //FAZER A PARTE QUE PEGAR O OBJETO PELO NIVEL
            let resultado = _.sample([p1, p2, nivelMaior]); //66% DE CHANCE PRO NIVEL MAIOR (2/3)
            if (p1 == resultado) {
                res.json({
                    "vencedor": p1,
                    "perdedor": p2
                })
            } else if (p2 == resultado) {
                res.json({
                    "vencedor": p2,
                    "perdedor": p1
                })
            }
            //FAZER O TERCEIRO ELSE PRO NIVEL MAIOR
        }



    }

    return controllers;
}