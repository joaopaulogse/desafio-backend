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
        console.log(req.body.treinador);
        dao.alterar(req.params.id, req.body.treinador)
            .then(result => {
                res.status(204).send(result);
            })
            .catch(err => {
                res.status(500).json({ "error": err });
            })
    }
    controllers.delete = function(req, res) {
        dao.deletar(req.params.id)
            .then(result => {
                res.status(204).send(result);
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

        dao.carregar(req.params.pokemonAId).then(p1 => {
            dao.carregar(req.params.pokemonBId).then(p2 => {
                if (p1.nivel == p2.nivel) { //se o nivel igual
                    let resultado = _.sample([p1, p2]);
                    if (p1 == resultado) {
                        let resultadoBatalha = {
                            "vencedor": p1,
                            "perdedor": p2
                        };
                        ajustaNiveis(resultadoBatalha);
                        resultadoBatalha.
                        res.json(resultadoBatalha);
                    } else if (p2 == resultado) {
                        let resultadoBatalha = {
                            "vencedor": p2,
                            "perdedor": p1
                        };
                        ajustaNiveis(resultadoBatalha);
                        res.json(resultadoBatalha);
                    }
                } else { //SE TIVER ALGUM NIVEL MAIOR QUE O OUTRO
                    let nivelMaior = Math.max(p1.nivel, p2.nivel);
                    let objetoVantagem;
                    if (nivelMaior == p1.nivel) {
                        objetoVantagem = p1;
                    } else {
                        objetoVantagem = p2;
                    }
                    console.log("Oponente com vantagem: ", objetoVantagem);

                    //FAZER A PARTE QUE PEGAR O OBJETO PELO NIVEL
                    let resultado = _.sample([p1, p2, objetoVantagem]); //66% DE CHANCE PRO NIVEL MAIOR (2/3)
                    if (p1 == resultado) {
                        let resultadoBatalha = {
                            "vencedor": p1,
                            "perdedor": p2
                        };
                        ajustaNiveis(resultadoBatalha);
                        res.json(resultadoBatalha);
                    } else if (p2 == resultado) {
                        let resultadoBatalha = {
                            "vencedor": p2,
                            "perdedor": p1
                        };
                        ajustaNiveis(resultadoBatalha);
                        res.json(resultadoBatalha);
                    } else if (objetoVantagem == resultado && objetoVantagem == p1) {
                        let resultadoBatalha = {
                            "vencedor": objetoVantagem,
                            "perdedor": p2
                        };
                        ajustaNiveis(resultadoBatalha);
                        res.json(resultadoBatalha);
                    } else if (objetoVantagem == resultado && objetoVantagem == p2) {
                        let resultadoBatalha = {
                            "vencedor": objetoVantagem,
                            "perdedor": p1
                        };
                        ajustaNiveis(resultadoBatalha);
                        res.json(resultadoBatalha);
                    }
                }
            });
        });
    }

    function ajustaNiveis(resultadoBatalha) {
        dao.alteraNivel(resultadoBatalha.vencedor.id, resultadoBatalha.vencedor.nivel + 1)
            .then(result => { console.info("Vencedor: ", result) });
        if (resultadoBatalha.perdedor.nivel - 1 == 0) {
            dao.deletar(resultadoBatalha.perdedor.id).then(result => {
                console.info("Oponente zerou o nivel, e foi deletado!");
            })
        } else {
            dao.alteraNivel(resultadoBatalha.perdedor.id, resultadoBatalha.perdedor.nivel - 1)
                .then(result => {
                    console.log("Perderdor: ", result);
                })
        }
    }
    return controllers;
}