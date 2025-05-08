import API from "../../features/apiClient";

export const login = async(data: { email: string; password: string; }) =>{
  try{
    const response = await API.post("/api/v1/login", data);
    return response.data;
  }
  catch(error: unknown){
    console.log("Error caught:", error);

    // Checks if the error key is in the error object
    if(typeof error === "object" && error !== null && "error" in error){
      const serverMessage = (error as { error: string }).error;
      throw new Error(serverMessage);
    }
    throw new Error("An unexpected error occurred");
  }
};