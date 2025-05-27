import { RxCrossCircled } from "react-icons/rx";
import useDeleteSessions from "../hooks/useDeleteSessions";
import { SessionProps } from "../interfaces/sessionInterface";

const SessionCard = ({ session }: { session: SessionProps }) =>{
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { deleteSession } = useDeleteSessions(_id);
  
  return (
    <section className="flex border mb-3">
      <section className="flex-1 p-4">
        <h2 className="card-title mb-1 px-1 session-date text-xl">
          {new Date(createdAt).toLocaleString("en-US",
            { month: "long",
              day: "numeric",
              year: "numeric"
            })}
            {" "}
          ({new Date(createdAt).toLocaleTimeString()})
          {isCurrent ? (
            <section className="badge badge-success sticky">Current Session</section>
          ) : (
            <button className="btn btn-sm ml-auto text-xl text-red-400 bg-transparent border-transparent"
            onClick={() => deleteSession()}>
              <RxCrossCircled size="1.5rem"/>
            </button>
          )}
        </h2>
        <p className="text-[1.1rem] mt-2 bg-base-300 p-3 session-info">{userAgent}</p>
      </section>
    </section>
  )
}

export default SessionCard;