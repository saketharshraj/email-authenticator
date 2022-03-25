const ApiError = require("../../error/ApiError");
const Email = require("../../models/emails/emailOtpSchema");

const verifyEmail = async (req, res, next) => {
  const emailPayload = req.body;
  const { email, otp, transid } = emailPayload;

  if (!otp || !email || !transid) {
    next(
      ApiError.badRequest(
        "All fields are required. Either email or otp or transaction id is missing"
      )
    );
    return;
  }

  try {
    const emailOtp = await Email.findOne({
      $and: [{ transid: transid }, { email: email }],
    }).then();

    if (emailOtp == null) {
      next(ApiError.badRequest("Either OTP is expired or not generated"));
      return;
    }

    if (emailOtp.otp !== otp) {
      next(ApiError.badRequest("Wrong OTP"));
      return;
    }

    if (emailOtp.otp === otp) {
      await Email.deleteOne({ transid: transid });
      res.status(200).json({
        message: "Email verified successfully",
      });
    }
    next();
  } catch (err) {
    next(ApiError.internalServerError("Database Query Error"));
    return;
  }
};

module.exports = verifyEmail;
