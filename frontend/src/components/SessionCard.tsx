import { RxCrossCircled } from "react-icons/rx";
import useDeleteSessions from "../hooks/useDeleteSessions";
import { SessionProps } from "../interfaces/sessionInterface";

const SessionCard = ({ session }: { session: SessionProps }) =>{
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { deleteSession } = useDeleteSessions(_id);
  
  return (
    <section className="flex border mb-3">
      <section className="flex-1">
        <p className="font-bold text-sm mb-1 p-2">
          {new Date(createdAt).toLocaleString("en-US",
            { month: "long",
              day: "numeric",
              year: "numeric"
            })}
            {" "}
          ({new Date(createdAt).toLocaleTimeString()})
          {isCurrent && " (current session)"}
        </p>
        <p className="bg-gray-200 text-xs p-3">
          {userAgent}
        </p>
      </section>
      {!isCurrent && (
        <button className="btn btn-sm ml-4 self-center text-xl text-red-400 bg-base-100 border-transparent"
        onClick={() => deleteSession()}>
          <RxCrossCircled size="1.5rem"/>
        </button>
      )}
    </section>
  )
}

export default SessionCard;