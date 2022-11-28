const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donutSchema = new Schema({
    name: String,
});

const Donut = mongoos.model('Donut', donutSchema);

module.exports = Donut;