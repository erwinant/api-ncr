const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const timeout = require('connect-timeout'); //express v4

//Cors
app.use(cors());
app.options('*', cors());
//registering view
app.set('views', 'server/views');
app.set('view engine', 'pug');
// API file for interacting with api route
//const api_asset = require('./server/routes/rasset');

// Parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// API location route

//our route
//app.use('/api/asset', api_asset);

app.use(timeout('150s'));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = '3003';
app.set('port', port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));