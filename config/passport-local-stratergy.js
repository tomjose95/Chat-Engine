const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user && bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
