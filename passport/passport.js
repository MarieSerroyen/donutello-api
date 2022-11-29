const passport = require('passport');
const User = require('../models/user');

//Webtoken strategy (JWT
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //key uit de headers halen
opts.secretOrKey = 'VerySecretKey'; //key om te decrypten

passport.use(new JwtStrategy(opts, function(jwt_payload, done) { //payload/token binnen
    User.findOne({_id: jwt_payload.uid}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;