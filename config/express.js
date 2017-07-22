    var express = require("express");
    var bodyParser = require("body-parser");
    var load = require("express-load");
    module.exports = () => {

        var app = express();
        app.use("/doc", express.static("docApi"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        require("../app/routes/pokemonRouter")(app);

        return app;
    }