    var app = require("./config/express")();
    var http = require("http").createServer(app);
    //require("./config/database");;

    http.listen(3000, () => {
        console.log("Servidor rodando ...");
    })