import { useQuery } from "@tanstack/react-query";

import { getSessions } from "../react-query/services/sessionApi/getSessionsApi";
import { SessionProps } from "../interfaces/sessionInterface";

export const SESSIONS = "session"

const useSessions = ( options = {} ) =>{
  const { data: sessions, ...params } = useQuery<SessionProps[]>({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...options
  });

  return{
    sessions,
    ...params
  }
}

export default useSessions;