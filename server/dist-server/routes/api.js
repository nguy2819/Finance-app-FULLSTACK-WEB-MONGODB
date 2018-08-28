'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _finance = require('../models/ finance');

var _finance2 = _interopRequireDefault(_finance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//get a list of budget/finances from the db
router.get('/budget', async function (req, res) {
    var finances = await _finance2.default.find({}).exec();
    res.send(finances);
});

router.post('/budget', function (req, res, next) {
    _finance2.default.create(req.body).then(function (finance) {
        res.send(finance);
    }).catch(next);
});

router.delete('/budget/:id', function (req, res, next) {
    _finance2.default.findByIdAndRemove({ _id: req.params.id }).then(function (finance) {
        res.send(finance);
    });
});

router.put('/budget/:id', function (req, res, next) {
    _finance2.default.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        _finance2.default.findOne({ _id: req.params.id }).then(function (finance) {
            res.send(finance);
        });
    });
});

exports.default = router; //export router to use outside api.js file