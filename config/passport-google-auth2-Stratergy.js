const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("./../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "510063482791-ioi9rcqi3lrp5a48jjii58culgc1f3cg.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        error,
        user
      ) {
        if (error) {
          console.log("Error in Login with google strategy :>> ", error);
          return;
        }
        console.log("profile :>> ", profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              username: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
              isVerified: false,
            },
            (error, user) => {
              if (error) {
                console.log(
                  "Error in creating user with google strategy :>> ",
                  error
                );
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
