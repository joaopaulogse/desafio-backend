var controller = require("../controllers/pokemonController")();


module.exports = (app) => {
    /**
     * @api {post} /pokemons Cadastra Treinador com Pokemon
     * 
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiParam {String} tipo Tipo Pokemon "charizard", "mewtwo" ou "pikachu".
     * @apiParam {String} treinador Nome do treinador
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
     * 
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
     * 
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
     *
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
     * 
     * @apiVersion 0.1.0
     * @apiGroup Pokemons
     *
     * @apiSuccessExample {json} Success-Response:
     *     [
     *         {
     *             "id": 1,
     *             "tipo": "pikachu",
     *             "treinador": "João",
     *             "nivel": 3
     *         },
     *         {
     *             "id": 4,
     *             "tipo": "charizard",
     *             "treinador": "Paulo",
     *             "nivel": 1
     *         },
     *         {
     *             "id": 5,
     *             "tipo": "charizard",
     *             "treinador": "Teste",
     *             "nivel": 1
     *         },
     *         {
     *             "id": 8,
     *             "tipo": "mewtwo",
     *             "treinador": "Fulano",
     *             "nivel": 2
     *         }
     *     ]
     */
    app.get("/pokemons", controller.listar);
    /**
     * @api {post} /batalhar/:pokemonAId/:pokemonBId Batalha
     * @apiDescription Realiza batalha entre 2 pokemons
     * O algoritmo que determina o pokemon vencedor deve ser aleatório, 
     * levando em conta uma probabilidade maior para o pokemon com nível maior. 
     * Ou seja, em uma batalha entre um pokemon A nível 1 contra um pokemon B nível 2, 
     * as chances do pokemon nível dois ganhar é igual a 2/3 (66%). 
     * Pokemons com os mesmos níveis devem ter probabilidades iguais de ganhar. 
     * Os níveis dos pokemons devem ser atualizados na tabela de pokemons.
     * 
     * @apiVersion 0.2.0
     * @apiGroup Pokemons
     *
     * @apiParam {Number} pokemonAId Pokemon unique ID.
     * @apiParam {Number} pokemonBId Pokemon unique ID.
     *
     * @apiSuccessExample {json} Success-Response:
     *       {
     *          "vencedor": {
     *               "id": 8,
     *               "tipo": "mewtwo",
     *               "treinador": "Joãozinho",
     *               "nivel": 2 // subiu de nivel
     *           },
     *           "perdedor": {
     *               "id": 5,
     *               "tipo": "charizard",
     *               "treinador": "Mariazinha",
     *               "nivel": 0 // foi deletado!
     *           }
     *       }
     */
    app.post("/batalhar/:pokemonAId/:pokemonBId", controller.batalha);

}