const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donutSchema = new Schema({
    name: String,
    base: String,
    glaze: String,
    logo: String,
    cardType: String,
    topping: Boolean,
    amount: Number,
    date: Date,
    description: String,
    status: String,
    company: String,
    makerMail: String,
    donut: String
});

const Donut = mongoose.model('Donut', donutSchema);

module.exports = Donut;