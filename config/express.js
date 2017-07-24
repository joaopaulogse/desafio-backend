    var express = require("express");
    var bodyParser = require("body-parser");
    var load = require("express-load");
    module.exports = () => {

        var app = express();

        app.set('port', (process.env.PORT || 3000));

        app.use(express.static('public'));

        app.use("/doc", express.static("docApi"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        require("../app/routes/pokemonRouter")(app);

        app.use(function(req, res, next) {
            res.status(404).json({
                "error": "Essa url não existe consulte a documentação"
            })
            next();
        })

        return app;
    }