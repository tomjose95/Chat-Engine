module.exports.home = (req, res) => {
  res.render("home", { title: "Home | Chat Engine" });
};

module.exports.chat = (req, res) => {
  res.render("chat", { title: "Chat | Chat Engine" });
};
