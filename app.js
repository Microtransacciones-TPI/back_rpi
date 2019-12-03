// Require express and create an instance of it
var express = require('express');
const fetch = require("node-fetch");
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

app.get('/rpi', async function (req, res) {
    let query = req.query

    let url = "http://35.239.188.219:3000/name"

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    }).then(res => res.json())
    .then(json => console.log(json));

    res.setHeader("Content-Type", "application/json");
    res.json({ test: "OK" })
    res.end()
});

http.createServer(app).listen(3000)