const User = require('../model/user');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'M07QtTL9qT'
};
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log('jwt_payload', jwt_payload)
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

CLIENT_ID = '460543320305-d9ia9r1pfndsu6oikcrb19h8fo4idmo8.apps.googleusercontent.com';
CLIENT_SECRET = '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';