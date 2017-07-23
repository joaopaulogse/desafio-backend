    var app = require("./config/express")();
    var http = require("http").createServer(app);
    //require("./config/database");;

    http.listen(app.get("port"), () => {
        console.log("Servidor rodando na Porta: ", app.get("port"));
    })