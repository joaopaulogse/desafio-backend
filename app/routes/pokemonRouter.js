var controller = require("../controllers/pokemonController")();


module.exports = (app) => {
    /**
     * @api {post} /pokemons Cadastra Treinador com Pokemon
     * @apiName API Pokemon
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiSuccessExample {json} Success-Response:
     *   200 - OK
     *     {
     *         "id": 1,
     *          "tipo": "pikachu",
     *          "treinador": "Thiago",
     *          "nivel": 1
     *     }
     */
    app.post("/pokemons", controller.criar);

    /**
     * @api {put} /pokemons/:id Altera treinador
     * @apiName API Pokemon
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiParam {Number} id Pokemon unique ID.
     *
     * @apiSuccessExample {json} Success-Response:
     *   204 - No Content
     *     
     */
    app.put("/pokemons/:id", controller.alterar);

    /**
     * @api {delete} /pokemons/:id Deleta 
     * @apiName API Pokemon
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiParam {Number} id Pokemon unique ID.
     *
     * @apiSuccessExample {json} Success-Response:
     *   204 - No Content
     *     
     */
    app.delete("/pokemons/:id", controller.delete);

    /**
     * @api {get} /pokemons/:id Busca por ID
     * @apiName API Pokemon
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiParam {Number} id Pokemon unique ID.
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *          "id": 1,
     *          "tipo": "pikachu",
     *          "treinador": "João",
     *          "nivel": 1
     *     }
     */
    app.get("/pokemons/:id", controller.carregar);

    /**
     * @api {get} /pokemons Lista Todos
     * @apiName API Pokemon
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiSuccessExample {json} Success-Response:
     *     {
     *          "id": 1,
     *          "tipo": "pikachu",
     *          "treinador": "João",
     *          "nivel": 1
     *     }
     */
    app.get("/pokemons", controller.listar);
    /**
     * 
     */
    app.post("/batalhar/:pokemonAId/:pokemonBId", controller.batalha);

}