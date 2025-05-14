import { APP_ORIGIN } from "../../../constants/env";
import { createRegisterSession } from "../../../dataAccess/sessions";
import { createUser } from "../../../dataAccess/users";
import { createVerificationCode } from "../../../dataAccess/verification";
import { Authentication } from "../../../types/authenticationTypes";
import { oneYearFromNow } from "../../../utils/date";
import { getVerifyEmailTemplate } from "../../../utils/email/templates/verifyEmailTemplate";
import { refreshTokenSignOptions } from "../../../utils/jwt/refreshTokenSignOptions";
import { signToken } from "../../../utils/jwt/signToken";

import VerificationCodeType from "../../../constants/verificationCodeType";
import { sendEmail } from "../../../utils/email/sendEmail";

export const createAccount = async(data: Authentication) =>{
  const user = await createUser({
    email: data?.email,
    password: data?.password
  });
  const userId = user._id;

  const emailVerify = await createVerificationCode({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  });

  const url = `${APP_ORIGIN}/email/verify/${emailVerify._id}`;

  // send verification email
  const { error } = await sendEmail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  // ignore email errors for now
  if (error) console.error(error);

  const session = await createRegisterSession({
    userId,
    userAgent: data?.userAgent
  });

  const accessToken = signToken({
    userId,
    sessionId: session?._id
  });

  const refreshToken = signToken(
    {
      sessionId: session?._id
    },
    refreshTokenSignOptions
  )

  return{
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}

// import { APP_ORIGIN } from "../../../constants/env";
// import { createRegisterSession } from "../../../dataAccess/sessions";
// import { createUser } from "../../../dataAccess/users";
// import { createVerificationCode } from "../../../dataAccess/verification";
// import { Authentication } from "../../../types/authenticationTypes";
// import { oneYearFromNow } from "../../../utils/date";
// import { getVerifyEmailTemplate } from "../../../utils/email/templates/verifyEmailTemplate";
// import { refreshTokenSignOptions } from "../../../utils/jwt/refreshTokenSignOptions";
// import { signToken } from "../../../utils/jwt/signToken";

// import VerificationCodeType from "../../../constants/verificationCodeType";
// import sendEmail from "../../../utils/email/sendEmail";

// export const createAccount = async(data: Authentication) =>{
//   const user = await createUser({
//     email: data?.email,
//     password: data?.password
//   });
//   const userId = user._id;

//   const emailVerify = await createVerificationCode({
//     userId,
//     type: VerificationCodeType.EmailVerification,
//     expiresAt: oneYearFromNow()
//   });

//   try{
//     const url = `${APP_ORIGIN}/email/verify/${emailVerify._id}`;
//     const emailTemplate = getVerifyEmailTemplate(url);

//     await sendEmail({
//       to: user.email,
//       subject: emailTemplate.subject,
//       text: emailTemplate.text,
//       html: emailTemplate.html
//     });
//   }
//   catch(error){
//     console.error(error);
//   }

//   const session = await createRegisterSession({
//     userId,
//     userAgent: data?.userAgent
//   });

//   const accessToken = signToken({
//     userId,
//     sessionId: session?._id
//   });

//   const refreshToken = signToken(
//     {
//       sessionId: session?._id
//     },
//     refreshTokenSignOptions
//   )

//   return{
//     user: user.omitPassword(),
//     accessToken,
//     refreshToken
//   }
// }