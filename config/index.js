require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    cors: process.env.CORS,
    url_server: process.env.URL_SERVER,
    port_server: process.env.PORT_SERVER
}

module.exports = {config}