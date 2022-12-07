const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donutSchema = new Schema({
    name: String,
    base: String,
    glaze: String,
    logo: String,
    cardType: String,
    topping: String,
    amount: Number,
    date: Date,
    description: String,
    status: String,
    company: String,
    makerMail: String,
    donutImage: String
});

const Donut = mongoose.model('Donut', donutSchema);

module.exports = Donut;