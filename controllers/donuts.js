const Donut = require('../models/donut');

//create donut
const create = (req, res) => {
    let donut = new Donut();
    donut.name = req.body.name;
    donut.base = req.body.base;
    donut.glaze = req.body.glaze;
    donut.logo = req.body.logo;
    donut.cardType = req.body.cardType;
    donut.sprinkles = req.body.sprinkles;
    donut.amount = req.body.amount;
    donut.date = Date.now();
    donut.description = req.body.description;
    donut.status = req.body.status;
    donut.company = req.body.company;
    donut.makerMail = req.body.makerMail;

    donut.save((err, donut) => {
        if(err) {
            console.log(err);
            let result = {
                status: 'error',
                message: err.message
            }
            res.json(result);
        } else {
            let result = {
                status: 'success',
                message: 'Donut created',
                data: {
                    "donut": donut
                }
            }
            res.json(result);
        }
    }); 
}

const updateDonutStatus = (req, res) => {
    Donut.findByIdAndUpdate(
        { _id: req.params.id }, 
        { status: req.body.status }, 
        { new: true }, 
        (err, donut) => {
            if (err) {
                console.log(err);
                let result = {
                    status: 'error',
                    message: err.message
                }
                res.json(result);
            } else {
                let result = {
                    status: 'success',
                    message: 'Status updated',
                    data: {
                        "donut": donut
                    }
                }
                res.json(result);
            }
    });
}

// delete donut by id
const deleteDonut = (req, res) => {
    Donut.findByIdAndRemove(req.params.id, (err, donut) => {
        if (err) {
            console.log(err);
            let result = {
                status: 'error',
                message: err.message
            }
            res.json(result);
        } else {
            let result = {
                status: 'success',
                message: 'Donut deleted',
                data: {
                    "donut": donut
                }
            }
            res.json(result);
        }
    });
}

const getDonuts = (req, res) => {
    let query = {};
    
    if (req.query.id) {
        query.id = req.query.id;
    }
    if (req.query.company) {
        const company = req.query.company;
        const response = {
            status: 'success',
            message: 'Donuts retrieved',
            data: {
                "donuts": company
            }
        }
        res.json(response);
    }
    if (req.query.datetime) {
        const datetime = req.query.datetime;
        const response = {
            status: 'success',
            message: 'Donuts retrieved',
            data: {
                "donuts": datetime
            }
        }
        res.json(response);
    }

    Donut.find (query,(err, donuts) => {
        if (err) {
            console.log(err);
            let result = {
                status: 'error',
                message: err.message
            }
            res.json(result);
        } else {
            let result = {
                status: 'success',
                message: 'Donuts found',
                data: {
                    "donuts": donuts
                }
            }
            res.json(result);
        }
    });
}

module.exports.create = create;
module.exports.updateDonutStatus = updateDonutStatus;
module.exports.deleteDonut = deleteDonut;
module.exports.getDonuts = getDonuts;
