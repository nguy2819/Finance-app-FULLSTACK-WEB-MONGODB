'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

//create Finance Schema
var FinanceSchema = new Schema({
    month: {
        type: String,
        required: [true, 'Month field is required']
    },
    homebills: {
        type: String,
        required: [true, 'Home and utilities are required']
    },
    loans: {
        type: String
    },
    grocery: {
        type: String,
        required: [true, 'Grocery field is required']
    },
    eatingout: {
        type: String
    },
    transportationfees: {
        type: String
    },
    shopping: {
        type: String
    },
    medicalbills: {
        type: String
    }
});

//create Finance model
var Finance = _mongoose2.default.model('finance', FinanceSchema);

exports.default = Finance;