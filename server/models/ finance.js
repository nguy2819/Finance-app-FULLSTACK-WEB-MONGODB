import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//create Finance Schema
const FinanceSchema = new Schema({
    month: {
        type: String,
        required: [true, 'Month field is required'],
    },
    homebills: {
        type: String, 
        required: [true, 'Home and utilities are required'],
    },
    loans: {
        type: String, 
    },
    grocery: {
        type: String,
        required: [true, 'Grocery field is required'],
    },
    eatingout: {
        type: String,
    },
    transportationfees: {
        type: String,
    },
    shopping: {
        type: String,
    },
    medicalbills: {
        type: String,
    },
});

//create Finance model
const Finance = mongoose.model('finance', FinanceSchema);

export default Finance;