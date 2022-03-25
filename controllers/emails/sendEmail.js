const nodemailer = require("nodemailer");
const Email = require("../../models/emails/emailOtpSchema");
const ApiError = require("../../error/ApiError");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const { v4: uuidv4 } = require("uuid");

const sendEmail = (req, res) => {
  const emailPayload = req.body;
  const transid = uuidv4();

  const max = 999999;
  const min = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  const newEmailPayload = {
    transid: transid,
    email: emailPayload.email,
    otp: randomNumber,
  };

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const emailSubject = `${emailPayload.subject}`;
  const emailTemplate = "otpMail"

  // send mail with defined transport object
  // if (emailPayload?.id === "1" || emailPayload?.id === undefined) {
  //   const emailTemplate = "otpMail";
  // }

  const mailOptions = {
    from: process.env.EMAIL,
    to: emailPayload.email,
    subject: emailSubject,
    template: emailTemplate,
    context: {
      otp: randomNumber,
      project: emailPayload.project,
    },
  };

  try {
    const newEmail = new Email(newEmailPayload);
    newEmail.save(emailPayload);
  } catch (err) {
    ApiError.internalServerError("Database Query Error");
    return;
  }
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) ApiError.internalServerError("Error in sending email");
    else
      res.status(200).json({
        message: "OTP sent successfully",
        transid: transid,
      });
  });
};

module.exports = sendEmail;
