const express = require("express");
const routes = express.Router();
const verifyEmail = require("../controllers/emails/emailVerfier");
const sendEmail = require("../controllers/emails/sendEmail");

routes.post("/verify-email", verifyEmail);

routes.post("/send-email", sendEmail);

module.exports = routes;
