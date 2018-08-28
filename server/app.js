import express from 'express';
import routes from './routes/api'; //import routes/api.js to use in index.js
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './app.json';

mongoose.connect(`mongodb://${config.databaseUser}:${config.databasePassword}@ds233212.mlab.com:33212/finance-app`);
mongoose.Promise= global.Promise;

//set up express app
const app = express();

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//To serve images, CSS files, and JavaScript files in a directory named public
app.use(express.static('public'));

//Use bodyParse
app.use(bodyParser.json());

//Cross-Origin Resource Sharing (CORS) on ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'DELETE, POST, GET, PUT')
    next();
  });

//Use routes from './routes/api'
app.use('/api', routes);

//Use error handling
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.get('/api', function(req, res){
    console.log('GET request');
    res.send({name: 'finance-app'});
});

app.listen(process.env.PORT || 5000, function(){
    console.log('Yes, we are ready to listen for request');
});

export default app;