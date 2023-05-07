const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "/assets",
  session_cookie_key: "chatEngineScerectKey",
  db: "mongodb://localhost/chatengineDB",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "99madfacts@gmail.com",
      pass: "sqzjstwcuhneaasv",
    },
  },
  google_client_id:
    "510063482791-ioi9rcqi3lrp5a48jjii58culgc1f3cg.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/auth/google/callback",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.ASSET_PATH,
  session_cookie_key: process.env.CHAT_ENGINE_SESSION_COOKIE_KEY,
  db: process.env.CHAT_ENGINE_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CHAT_ENGINE_USER_GMAIL_USERNAME,
      pass: process.env.CHAT_ENGINE_USER_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CHAT_ENGINE_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CHAT_ENGINE_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CHAT_ENGINE_GOOGLE_CALL_BACK_URL,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.CHAT_ENGINE_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CHAT_ENGINE_ENVIRONMENT);
