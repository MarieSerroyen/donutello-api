const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const bcrypt = require('bcrypt');
const { Validator } = require('node-input-validator');
const config = require('config');

//create user
const create = async (req, res) => {
    let user = new User();
    
    user.username = req.body.username;
    user.mail = req.body.mail;
    user.password = req.body.password;

    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    //hash and set password
    user.password = await bcrypt.hash(user.password, salt);

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
            }, config.get('jwt.secret'));

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
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (validPassword) {
            let token = jwt.sign({
                uid: user._id,
            }, config.get('jwt.secret'));
    
            let result = {
                status: 'success',
                message: 'Can login',
                data: {
                    "token": token,
                    "id": user._id
                }
            }
            res.json(result);
        } else {
            let result = {
                status: 'error',
                message: 'Deze email en wachtwoord combinatie bestaat niet, probeer het opnieuw.'
            }
            res.json(result);
        }
        
    } else {
        let result = {
            status: 'error',
            message: 'Deze email en wachtwoord combinatie bestaat niet, probeer het opnieuw.',
        }
        res.json(result);
    }
}

// change password user
const changePassword = async (req, res) => { 
    try {
        const v = new Validator(req.body, {
            old_password: 'required',
            new_password: 'required',
            confirm_password: 'required|same:new_password'
        });
    
        const matched = await v.check();
    
        if (!matched) {
            let result = {
                status: 'error',
                message: 'Nieuw wachtwoord en bevestig wachtwoord komen niet overeen.'
            }
            res.json(result);
        }

        let current_user = await User.findById(req.params.id);

        const validPassword = await bcrypt.compare(req.body.old_password, current_user.password);

        if (!validPassword) {
            let result = {
                status: 'error',
                message: 'Oud wachtwoord is niet correct.'
            }
            res.json(result);
        } else {
            //generate salt to hash password
            const salt = await bcrypt.genSalt(10);

            //hash and set password
            current_user.password = await bcrypt.hash(req.body.new_password, salt);

            current_user.save((err, user) => {
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
                        message: 'Wachtwoord is succesvol gewijzigd. U wordt automatisch uitgelogd.',
                        data: {
                            "user": user
                        }
                    }
                    res.json(result);
                }
            }); 
        }
    }
    catch (err) {
        console.log(err);
        let result = {
            status: 'error',
            message: err.message
        }
        res.json(result);
    }
}
  

module.exports.create = create;
module.exports.login = login;
module.exports.changePassword = changePassword;
