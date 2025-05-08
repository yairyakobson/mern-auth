import API from "../../features/apiClient";

export const deleteSessions = async(id: string) =>{
  return API.delete(`/api/v1/sessions/${id}`);
}