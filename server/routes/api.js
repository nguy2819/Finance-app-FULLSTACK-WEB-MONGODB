import express from 'express';
import Finance from '../models/ finance';

const router = express.Router();

//get a list of budget/finances from the db
router.get('/budget',async function(req, res){
    const finances = await Finance.find({}).exec();
    res.send(finances);
  });

router.post('/budget', function(req, res, next){
    Finance.create(req.body).then(function(finance){
    res.send(finance);
    }).catch(next);
});

router.delete('/budget/:id', function(req, res, next){
    Finance.findByIdAndRemove({_id: req.params.id}).then(function(finance){
    res.send(finance);
    });
});

router.put('/budget/:id', function(req, res, next){
    Finance.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Finance.findOne({_id: req.params.id}).then(function(finance){
            res.send(finance);
        })
    });
});

export default router; //export router to use outside api.js file