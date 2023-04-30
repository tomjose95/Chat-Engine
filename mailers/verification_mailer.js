const nodeMailer = require("../config/nodemailer");

exports.verification = (user) => {
  let htmlString = nodeMailer.renderTemplate(
    { user: user },
    "/verification/verified.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "99madfacts@gmail.com",
      to: user.email,
      subject: "ChatZip | User Verification !!!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      return;
    }
  );
};
