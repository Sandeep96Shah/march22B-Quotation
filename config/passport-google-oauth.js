const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '230865726135-knjkkpbh22ijv94nq8fb3kub7ph4t7t0.apps.googleusercontent.com',// e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8000/success",
    },

    async (accessToken, refreshToken, profile, done) => {
        // find a user
       try{
        console.log(profile);
        const user = User.findOne({email: profile.emails[0].value});
            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }
       }catch(error){
            console.log('error in google strategy-passport', err);
       }
    }
));

//clientID: '460543320305-d9ia9r1pfndsu6oikcrb19h8fo4idmo8.apps.googleusercontent.com',

// module.exports = passport;

