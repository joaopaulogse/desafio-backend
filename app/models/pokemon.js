var { connection, Datatype } = require("../../config/database");

var Pokemons = connection.define("pokemon", {
    id: {
        type: Datatype.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    tipo: {
        type: Datatype.ENUM,
        values: ["charizard", "mewtwo", "pikachu"]
    },
    treinador: {
        type: Datatype.STRING
    },
    nivel: {
        type: Datatype.INTEGER,
        defaultValue: 1
    }
}, {

});
// Pokemons.sync({ force: true }).then(() => {
//     // return Pokemons.create({
//     //     id: 1,
//     //     tipo: "pikachu",
//     //     treinador: "João",
//     //     nivel: 1
//     // })
// })
module.exports = Pokemons;