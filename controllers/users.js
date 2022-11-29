const User = require('../models/user');

//create user
const create = (req, res) => {
    let user = new User();
    
    user.mail = req.body.mail;
    user.password = req.body.password;

    user.save((err, user) => {
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
                message: 'User created',
                data: {
                    user: user
                }
            }
            res.json(result);
        }
    }); 
}

module.exports.create = create;