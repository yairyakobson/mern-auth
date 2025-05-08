import API from "../../features/apiClient";

export const logout = async () => await API.get("/api/v1/logout");