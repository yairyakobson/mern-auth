import { APP_ORIGIN } from "../../../constants/env";
import { NOT_FOUND, TOO_MANY_REQUESTS } from "../../../constants/httpCodes";
import { fiveMinutesAgo, oneHourFromNow } from "../../../utils/date";
import { getPasswordResetTemplate } from "../../../utils/email/templates/passwordResetTemplate";
import { sendForgotPasswordEmailToUser } from "../../../dataAccess/users";
import { resetPasswordCode, resetPasswordEmail } from "../../../dataAccess/verification";

import VerificationCodeType from "../../../constants/verificationCodeType";
import ForgotPasswordTypes from "../../../types/forgotPasswordTypes";
import appAssert from "../../../utils/appAssert";
import sendEmail from "../../../utils/email/sendEmail";

export const sendResetPasswordEmail = async(data: ForgotPasswordTypes) =>{
  try{
    const user = await sendForgotPasswordEmailToUser(data.email);
    appAssert(user, NOT_FOUND, "No such user exists");

    // Wait 5 minutes to send another reset password email
    const emailLimitRate = fiveMinutesAgo();

    const count = await resetPasswordEmail({
      userId: user?._id,
      type: VerificationCodeType.PasswordReset,
      createdAt: { $gt: emailLimitRate }
    });
    appAssert(count === 0, TOO_MANY_REQUESTS, "An email has already been sent. Try again later" );

    const resetPasswordExpiration = oneHourFromNow(); // The reset password will expire after 1 hour

    const verificationCode = await resetPasswordCode({
      userId: user?._id,
      type: VerificationCodeType.PasswordReset,
      expiresAt: resetPasswordExpiration
    });

    const url =
    `
    ${APP_ORIGIN}/password/reset?code=${verificationCode?._id}&exp=${resetPasswordExpiration.getTime()}
    `;
    const emailTemplate = getPasswordResetTemplate(url);

    await sendEmail({
      to: user.email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html
    });

    return{
      url,
      code: verificationCode._id,
      emailId: data.id
    }
  }
  catch(error: unknown){
    if(error instanceof Error){
      console.error(error.message);
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};