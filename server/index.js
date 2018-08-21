import express from 'express';
import routes from './routes/api'; //import routes/api.js to use in index.js
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/financial-app');
mongoose.Promise= global.Promise;

//set up express app
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'DELETE, POST, GET, PUT')
    next();
  });
app.use('/api', routes);
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.get('/api', function(req, res){
    console.log('GET request');
    res.send({name: 'finance-app'});
});

app.listen(process.env.port || 5000, function(){
    console.log('Yes, we are ready to listen for request');
});