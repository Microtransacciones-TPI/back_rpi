// Require express and create an instance of it
const os = require('os')
const express = require('express');
const cors = require('cors')
const app = express();
const fetch = require("node-fetch");
const { config } = require('./config/index')
  
app.use(cors())
app.get('/test', function (req, res) {
    console.log(req.query)
    res.json({ test: "OK" })
    res.send('Name');
});


// URL: http://{url_rpi}:{port_rpi}/rpi?cardId=##:##:##:##&method=#&value=#####&storeXXXX
// CASES:
// 1: Consultar saldo /rpi?cardId=##:##:##:##&method=1
// 2: Recargar tarjeta /rpi?cardId=##:##:##:##&method=2&value=######&store=XXXXX
// 3: Realizar Compra /rpi?cardId=##:##:##:##&method=3&value=#####&store=XXXXX

app.get('/rpi', async function (req, res) {
    let query = req.query
    let meth = query.method
    let data = {value: query.value, store: query.store}
    let url = config.url_server + ':' + config.port_server + '/api/users'

    let options = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }
    let response = {}

    const userData = await fetch(`${url}/card/${query.cardId}`, options).then(res => res.json())
    let user  = userData.data;
    
    switch (meth) {
        case '1':
            response = {balance: user.balance}
            break;
        case '2':
            url = `${url}/${user._id}/${user.card}/transactions`
            options.method = 'PUT'
            options.body = JSON.stringify(data)
            response = await fetch(url, options).then(res => res.json())
            break;
        case '3':
            url = `${url}/${user._id}/${user.card}/transactions`
            options.method = 'PUT'
            data.value = -data.value
            options.body = JSON.stringify(data)
            response = await fetch(url, options).then(res => res.json())
            break;
        default:
            break;
    }
    console.log(url);
    

    res.json(response)
    res.end()
});

app.listen(config.port, function () {
    let nics = os.networkInterfaces()
    console.log(`Listening from: ${nics.lo[0].address}:${config.port}`);        
})