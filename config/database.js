var Sequelize = require("sequelize");
var config = require("./config");


var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASS, {
    host: config.DATABASE_URL,
    dialect: "mssql",
    dialectOptions: {
        encrypt: true
    },
    define: {
        schema: config.SCHEMA
    }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão ao Banco de Dados Estabelecida!');
    })
    .catch(err => {
        console.error('Sem Conexão ao Banco de Dados: ', err);
    });
module.exports = {
    connection: sequelize,
    Datatype: Sequelize
};