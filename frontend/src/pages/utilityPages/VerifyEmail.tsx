import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

import { verifyEmail } from "../../react-query/services/utilityApi/verifyEmailApi";

const VerifyEmail = () =>{
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code)
  });

  return(
    <section className="min-h-screen justify-center">
      <section className="container max-w-md mx-auto py-12 px-6 text-center">
        {isPending ? (
          <span className="loading loading-spinner loading-lg"/>
        ) : (
          <section className="stack items-center">
            <section role="alert" className={`max-w-fit rounded-xl ${isSuccess ? "alert alert-success" : ""}`}>
              {isSuccess && <RxCheckCircled size="1.5rem"/>}
              {isSuccess && (
                <span>Email Verified!</span>
              )
              }
            </section>
            {isError && (
              <section role="alert" className={`max-w-fit rounded-xl ${isError && "alert alert-error"}`}>
                <RxCrossCircled size="1.5rem"/>The link is either invalid or expired.
              </section>
            )}
          </section>
        )}
        <br/>
        {isSuccess && (
          <Link to="/" replace
          className="text-blue-500">Return to homepage</Link>
        )}
        {isError && (
          <>
            <Link to="/password/forgot" replace
            className="text-blue-500">Create a new link</Link>
            <br/>
            <Link to="/" replace
            className="text-blue-500">Return to homepage</Link>
          </>
        )}
      </section>
    </section>
  )
}

export default VerifyEmail;