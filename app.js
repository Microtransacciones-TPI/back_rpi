// Require express and create an instance of it
var express = require('express');
var cors = require('cors')
var http = require('http')
var app = express();

// on the request to root (localhost:3000/)
app.use(cors())
app.get('/test', function (req, res) {
    console.log(req.query)
    res.json({ test: "OK" })
    res.send('Name');
});

http.createServer(app).listen(3000)