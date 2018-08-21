import express from 'express';
const router = express.Router();

//get a list of budget/finances from the db
router.get('/budget',function(req, res){
    res.send({type: 'GET'});
  });
  
export default router; //export router to use outside api.js file