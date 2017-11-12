import * as http from 'http';

import App from './app';

const port = normalizePort(process.env.PORT || 3005);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    let prt = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(prt)) {
        return val;
    } else if (prt >= 0) {
        return prt;
    } else {
        return false;
    }
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}