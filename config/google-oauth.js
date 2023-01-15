const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../model/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "230865726135-knjkkpbh22ijv94nq8fb3kub7ph4t7t0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/success",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("profile", profile);
        const user = User.findOne({ email: profile.emails[0].value });
        console.log("user", user);
        if (user) {
          return done(null, user);
        } else {
           User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "123456789",
          }, function(err, user){
            return done(null, user);
          });

        }
      } catch (error) {
        console.log("error", error);
        return done(error);
      }
    }
  )
);
