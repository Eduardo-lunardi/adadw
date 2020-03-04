const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');




const connection = mysql.createConnection({
    host      : 'localhost',
    port      : '3306',
    user      : 'root',
    password  : '',
    database  : 'mydb',
});

connection.connect(function(err) {
    if(err){
        console.error('erro conectando banco: ' + err.stack);
        return;
    }
    console.log('Banco conectado');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//rotas
app.get('/ola', function (req, res) {
    res.send('');
});

app.get('/json', function(req, res) {
    connection.query('select * from eventos',
    function(error, results, fields) {
        if(error)
        res.json(error);
        else
            res.json(results);
            connection.end();
            console.log('executou!');
    }); 
});

app.get('/json', function (req, res) {
    let retorno = {ola: "mundo"}
        res.send(retorno);
    });

app.post('/enviar', function (req, res) {
    console.log(req.body)
        res.send('ok'); 
        connection.query('insert into eventos(desc, dataHora) values (req, res)',
        function(error, results, fields) {
            if(error)
            res.json(error);
            else
                res.json(results);
                connection.end();
                console.log('executou!');
    });

app.listen(80, function () {
    console.log('Excample app listening on port 9090:');
});
});