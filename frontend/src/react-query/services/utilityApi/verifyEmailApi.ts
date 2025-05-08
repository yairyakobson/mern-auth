import API from "../../features/apiClient";

export const verifyEmail = async(verificationCode: string | undefined) =>{
  return API.get(`/api/v1/email/verify/${verificationCode}`);
}