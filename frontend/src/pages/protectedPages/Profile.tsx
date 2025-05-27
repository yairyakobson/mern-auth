import { PiWarningCircleLight } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";

const Profile = () =>{
  const { user } = useAuth();
  const data = {
    email: user?.email,
    creationDate: user?.createdAt as string,
    verified: user?.verified
  }

  const createdAt = new Date(data.creationDate).toLocaleDateString("en-US",
    { month: "long",
      day: "numeric",
      year: "numeric"
    });
  
  return(
    <>
      <section className="flex items-center justify-center bg-gray-50">
        <section className="w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <section className="text-center">
          <h2 className="text-2xl font-bold form-title
          md:text-3xl">My Account
          </h2>
        </section>

        <section>
          {data.verified ? (
            <>
              <p className="text-inherit text-center mb-2">
                <span className="text-[1.1rem] font-bold">
                  Email:{" "}
                </span>
                <span className="text-[1.1rem]">
                  {data.email}
                </span>
              </p>

              <p className="text-inherit text-center">
                <span className="text-[1.1rem] font-bold">
                  Created On:{" "}
                </span>
                <span className="text-[1.1rem]">
                  {createdAt}
                </span>
              </p>
            </>
          ) : (
            <section className="justify-items-center">
              <section role="alert" className="alert alert-warning max-w-fit rounded-xl">
                <PiWarningCircleLight size="1.5rem"/>
                <span>Verify your email!</span>
              </section>
            </section>
          )}
          </section>
        </section>
      </section>
    </>
  )
}

export default Profile;