# Full-stack web application
> ![finance-app](https://user-images.githubusercontent.com/36870689/45045502-6e490c80-b030-11e8-864b-83ffa3ff568c.png)


## Create SERVER first:

### Step 1: MongoDB 
- If you already have MongoDB, just need to run this "mongod --dbpath data/" in your based-terminal
- If you do not have MongoDB yet, you can download it and check my ["REST-API-practice-NinjaDB"](https://github.com/nguy2819/REST-API-practice-NinjaDB) repository on Github for step by step. 
- If your computer is running and linked with MongoDB, you don't need to worry. 

### Step 2: Create a package.json
- npm init -y

### Step 3: Install express.nodejs
- npm install express --save
- Check inside your package.json has: 
```
"dependencies": {"express": "^4.16.3"}
```

### Step 4: Create a file "index.js" inside a new folder "server"
- In index.js: import [express](https://expressjs.com/en/4x/api.html#express)
```
import  express from 'express';

//set up express app
const app = express();
```

### Step 5: Create a directory - named "routes" with a file - named "api.js"
- In api.js: [express.Router](https://expressjs.com/en/4x/api.html#express.router)
```
import express from 'express';
const router = express.Router();

//get a list of budget/finance from the db
router.get('/finance',function(req, res){
    res.send({type: 'GET'});
  });
  
export default router; //export router to use outside api.js file
```
- In index.js:
```
import routes from '../routes/api'; //import routes/api.js to use in index.js

//set up express app
const app = express();
app.use('/api', routes);

app.get('/api',function(req, res){
  console.log('GET request');
  res.send({name: 'Tien'})
});

//listen for request
app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests');
})
```

### Step 6: Install middleware [body-parser](https://www.npmjs.com/package/body-parser) 
- In index.js

```
import bodyParser from 'body-parser';

//set up express app
const app = express();
app.use(bodyParser.json())
app.use('/api', routes);
```
- The purpose is to transfer from binary 00111001111 to json ('string')- which human can read.

### Step 7: Install [Mongoose](https://mongoosejs.com/docs/)
- npm install mongoose --save
- Adds a layer of methods to easily save, edit, retreive, and delete data from MongoDB
- Allows us to create our Models and Schemas easily
- Created directory (named models) and a file in it (named finance.js):

- In finance.js:
```
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//create Finance Schema
```

## [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin.
- A web application makes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, and port) than its own origin.

## [CORS on ExpressJS](https://enable-cors.org/server_expressjs.html)
- In index.js:
```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
```
## [To run server](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o) 
- in package.json, under scripts:
```
 "start-server": "npm run build-server && node dist-server/index.js",
 "build-server": "rimraf dist-server/ && babel ./server --out-dir dist-server/ --ignore ./node_modules,./.babelrc,./package.json,./npm-debug.log --copy-files"
```
- A new start command and a new build command. ["start": "npm run build && node dist/index.js"](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o)

## SUM: what we need to Install in this project
* Express
* Mongoose
* Body-parser
* babel-cli
* babel-preset-es2015
* rimraf 
```
npm install --save-dev babel-cli babel-preset-es2015 rimraf
```

- We're using the Babel compiler to compile our ES6 code to ES5.
- The Babel compiler will allow us to use the new JavaScript features in our Express app. 
