const express = require("express");
const passport = require("passport");
const multer = require("multer");
const upload = multer();
const router = express.Router();
console.log("Index router Loaded");
const HomeController = require("./../controllers/Home_Controller");
router.get("/", HomeController.home);
router.get("/chat", HomeController.chat);
router.get("/sign-up", HomeController.signup);
router.post("/create", HomeController.create);
router.get("/sign-out", HomeController.destorySession);
router.get("/verified/:id", HomeController.verified);
router.post("/chatsave", upload.none(), HomeController.chatsave);
router.post("/update/:id", passport.checkAuthentication, HomeController.update);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "back" }),
  HomeController.createSession
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  HomeController.createSession
);
module.exports = router;
