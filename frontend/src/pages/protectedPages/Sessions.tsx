import { useEffect } from "react";
import { toast } from "sonner";

import { SessionProps } from "../../interfaces/sessionInterface";

import useAuth from "../../hooks/useAuth";
import useSessions from "../../hooks/useSessions";
import SessionCard from "../../components/SessionCard";

const Sessions = () =>{
  const { user } = useAuth();
  const { sessions, isPending, isSuccess, isError } = useSessions();

  useEffect(() =>{
    if(!user || isError){
      toast.error("Unable to get sessions", {
        duration: 1500
      });
    }
  }, [user]);

  return(
    <section className="mt-8">
      <h1 className="mb-6 text-center font-bold text-4xl">My Sessions</h1>
      {isPending && (
        <section className="skeleton h-32 w-32"/>
      )}
      {isSuccess && (
        <section className="card bg-base-100 items-center">
          <section className="card-body">
            <section className="card-actions justify-end"/>
            {sessions?.map((session: SessionProps) => (
              <SessionCard key={session._id} session={session} />
            ))}
          </section>
        </section>
      )}
    </section>
  )
}

export default Sessions;