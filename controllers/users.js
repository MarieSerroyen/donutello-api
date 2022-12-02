const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const bcrypt = require('bcrypt');
const { Validator } = require('node-input-validator');

//create user
const create = async (req, res) => {
    let user = new User();
    
    user.mail = req.body.mail;
    user.password = req.body.password;

    //generate salt to hash password
   // const salt = await bcrypt.genSalt(10);

    //hash and set password
    //user.password = await bcrypt.hash(user.password, salt);

    user.save((err, user) => {
        if(err) {
            console.log(err);
            let result = {
                status: 'error',
                message: err.message
            }
            res.json(result);
        } else {
            //console.log(user._id)
            let token = jwt.sign({
                uid: user._id,
            }, "VerySecretKey");

            let result = {
                status: 'success',
                message: 'User created',
                data: {
                    "token": token                    
                }
            }
            res.json(result);
        }
    }); 
}

const login = async (req, res) => {
    const user = await User.findOne({ mail: req.body.mail });

    if (user) {
        let token = jwt.sign({
            uid: user._id,
        }, "VerySecretKey");

        let result = {
            status: 'success',
            message: 'User found in database',
            data: {
                "token": token
            }
        }
        res.json(result);
    } else {
        let result = {
            status: 'error',
            message: 'User not found in database',
        }
        res.json(result);
    }

}

// change password user
const changePassword = async (req, res) => { 

    const v = new Validator(req.body, {
        old_password: 'required',
        new_password: 'required',
        confirm_password: 'required|same:new_password'
    });

    const matched = await v.check();

    if (!matched) {
        let result = {
            status: 'error',
            message: v.errors
        }
        res.json(result);
    }

    let password = req.body.password;
    
    const checkPassword = await User.findOne({ password: password });


    //generate salt to hash password
    //const salt = await bcrypt.genSalt(10);
    //hash and set password
    //password = await bcrypt.hash(password, salt);
    User.findByIdAndUpdate(
        { _id: req.params.id }, 
        { password: password }, 
        { new: true }, 
        (err, user) => {
          
            if (!checkPassword) {
                console.log(err);
                let result = {
                    status: 'error',
                    message: err.message
                }
                res.json(result);
            } else {
                 
                let result = {
                    status: 'success',
                    message: 'Password updated',
                  

                }
                res.json(result);
            }
    });
}
  

module.exports.create = create;
module.exports.login = login;
module.exports.changePassword = changePassword;
