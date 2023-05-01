const User = require("./../models/user");
const bcrypt = require("bcrypt");

const verifyMailer = require("./../mailers/verification_mailer");
const { findByIdAndUpdate } = require("./../models/user");
module.exports.home = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/chat");
  }
  res.render("home", { title: "Home | ChatZip" });
};

module.exports.chat = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  let user = await User.find({});

  res.render("chat", { title: "Chat | ChatZip", users: user });
};

module.exports.signup = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/chat");
  }
  res.render("sign-up", { title: "Sign Up | ChatZip" });
};

module.exports.create = async (req, res) => {
  if (req.body.password != req.body.confirmPassword) {
    console.log("password MissMatch :>> ");
    return res.redirect("/sign-up");
  }
  User.findOne({ email: req.body.email }, async (error, user) => {
    if (error) {
      console.log("Error:>>", error);
      return res.redirect("/sign-up");
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      User.create(
        {
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          isVerified: req.body.isVerified,
          avatar: req.body.avatar,
        },
        (error, user) => {
          if (error) {
            console.log("Error in creating User", error);
            return res.redirect("/sign-up");
          }
          verifyMailer.verification(user);

          return res.redirect("/");
        }
      );
    }
  });
};
module.exports.verified = async (req, res) => {
  try {
    console.log("object :>> ", req.params.id);
    userId = req.params.id;
    console.log("userId :>> ", userId);
    // let user = await User.findOne({ _id: userId });

    let updateuser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isVerified: true }
    );
    console.log("updateuser :>> ", updateuser);

    return res.redirect("/chat");
  } catch (e) {
    console.log("Error in verfication :>> ", e);
  }
};
module.exports.createSession = async (req, res) => {
  return res.redirect("/chat");
};
module.exports.sendMail = async (req, res) => {
  User.findOne({ id: req.params.id }, (error, user) => {
    if (error) {
      console.log("error in validation :>> ", error);
    }

    verifyMailer.verification(user);
  });

  res.redirect("/chat");
};

module.exports.destorySession = async (req, res) => {
  req.logout(function (error) {
    if (error) {
      console.log(error);
      res.redirect("/");
    }

    return res.redirect("/");
  });
};

module.exports.update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*****Multer Error: ", err);
        }

        user.username = req.body.username;

        if (req.file) {
          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
          console.log("user.avatar :>> ", user.avatar);
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  }
};
