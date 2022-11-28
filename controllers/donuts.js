const Donut = require('../models/donut');

//create donut
function create(req, res) {
    let name = req.body.name;

    let donut = new Donut();
    donut.name = name;

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
                    donut: donut
                }
            }
            res.json(result);
        }
    }); 
}

module.exports.create = create;