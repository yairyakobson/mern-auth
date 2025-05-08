import API from "../../features/apiClient";

export const setNewPassword = async(data: {
  password: string;
  verificationCode: string | null
}) =>{
  try{
    const response = await API.post("/api/v1/password/reset", data);
    console.log('Reset password response:', response);
    return response.data;
  }
  catch(error: unknown){
    console.error("Full error object:", error);
    if(error && typeof error === "object" && "error" in error){
      const serverError = (error as { error: string }).error;
      throw new Error(serverError);
    }
    throw new Error("An unknown error occurred.");
  }
}