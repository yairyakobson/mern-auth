import API from "../../features/apiClient";

export const register = async (data: {
  email: string;
  password: string;
  confirmPassword: string
}) =>{
  try{
    const response = await API.post("/api/v1/register", data);
    return response.data;
  }
  catch(error){
    throw error; // Rethrow error so React Query can handle it
  }
};