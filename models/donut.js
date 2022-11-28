const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donutSchema = new Schema({
    name: String,
    base: String,
    glaze: String,
    logo: String,
    sprinkles: Boolean,
    amount: Number,
    date: Date,
    description: String,
    status: String
});

const Donut = mongoose.model('Donut', donutSchema);

module.exports = Donut;