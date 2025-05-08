import { SessionProps } from "../../../interfaces/sessionInterface";
import API from "../../features/apiClient";

export const getSessions = async(): Promise<SessionProps[]> => API.get("/api/v1/sessions");