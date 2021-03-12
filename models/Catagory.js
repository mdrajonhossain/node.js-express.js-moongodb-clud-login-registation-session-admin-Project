const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const CatagorySchema = new Schema({
    catagoryname: String,
    date: { type: Date, default: Date.now }
})





const Catagory = mongoose.model('Catagory', CatagorySchema)

module.exports = Catagory
