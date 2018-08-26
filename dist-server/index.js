'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _app = require('./app.json');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://' + _app2.default.databaseUser + ':' + _app2.default.databasePassword + '@ds233212.mlab.com:33212/finance-app'); //import routes/api.js to use in index.js

_mongoose2.default.Promise = global.Promise;

//set up express app
var app = (0, _express2.default)();

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//To serve images, CSS files, and JavaScript files in a directory named public
app.use(_express2.default.static('public'));

//Use bodyParse
app.use(_bodyParser2.default.json());

//Cross-Origin Resource Sharing (CORS) on ExpressJS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'DELETE, POST, GET, PUT');
    next();
});

//Use routes from './routes/api'
app.use('/api', _api2.default);

//Use error handling
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.get('/api', function (req, res) {
    console.log('GET request');
    res.send({ name: 'finance-app' });
});

app.listen(process.env.port || 5000, function () {
    console.log('Yes, we are ready to listen for request');
});