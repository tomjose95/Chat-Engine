module.exports.home = (req, res) => {
  res.render("home", { title: "Home | ChatZip" });
};

module.exports.chat = (req, res) => {
  res.render("chat", { title: "Chat | ChatZip" });
};

module.exports.signup = (req, res) => {
  res.render("sign-up", { title: "Sign Up | ChatZip" });
};
