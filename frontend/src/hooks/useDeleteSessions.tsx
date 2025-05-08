import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SESSIONS } from "./useSessions";
import { deleteSessions } from "../react-query/services/sessionApi/deleteSessionsApi";
import { SessionProps } from "../interfaces/sessionInterface";

const useDeleteSessions = (sessionId: string) =>{
  const queryClient = useQueryClient();

  const { mutate, ...params } = useMutation({
    mutationFn: () =>deleteSessions(sessionId),
    onSuccess: () =>{
      queryClient.setQueryData(
        [SESSIONS], // Query key
        (cache: any) => cache.filter((session: SessionProps) => session._id !== sessionId) // Updater Function - Returns all sessions not equal to the id of the deleted session
      )
    }
  });

  return{
    deleteSession: mutate,
    ...params
  }
}

export default useDeleteSessions;