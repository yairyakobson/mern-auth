import { UserProps } from "../../../interfaces/userInterface";
import API from "../../features/apiClient";

export const getUser = async(): Promise<UserProps> => API.get("/api/v1/user");