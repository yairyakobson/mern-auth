import API from "../../features/apiClient";

export const sendResetPasswordEmail = async(data: { email: string }) =>{
  try{
    const response = await API.post("/api/v1/password/forgot", data);
    return response.data;
  }
  catch(error){
    throw error;
  }
}