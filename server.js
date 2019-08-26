const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const timeout = require('connect-timeout'); //express v4
const fileUpload = require('express-fileupload');
//Cors
app.use(cors());
app.options('*', cors());
//registering view
app.set('views', 'views');
app.set('view engine', 'pug');
// API file for interacting with api route
const api_enum = require('./route/renum');
const api_location = require('./route/rlocation');
const api_project = require('./route/rproject');
const api_report = require('./route/rreport');
const api_reportphoto = require('./route/rreportphoto');
const api_reportprogress = require('./route/rreportprogress');
const api_reportprogressdetail = require('./route/rreportprogressdetail');
const api_rules = require('./route/rrules');
const api_pic = require('./route/rpic');
const api_users = require('./route/rusers');
const api_pushnotif = require('./route/rpushnotif');
const api_reporting = require('./route/rreportting');
//fileupload
app.use(fileUpload());
// Parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// API location route

//our route
app.use('/api/enum', api_enum);
app.use('/api/location', api_location);
app.use('/api/project', api_project);
app.use('/api/report', api_report);
app.use('/api/reportphoto', api_reportphoto);
app.use('/api/reportprogress', api_reportprogress);
app.use('/api/reportprogressdetail', api_reportprogressdetail);
app.use('/api/rules', api_rules);
app.use('/api/pic', api_pic);
app.use('/api/users', api_users);
app.use('/api/pushnotif', api_pushnotif);
app.use('/api/reporting', api_reporting);

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