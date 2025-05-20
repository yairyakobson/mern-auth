import React, { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router";
import { RxCrossCircled } from "react-icons/rx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { NewPasswordProps } from "../../interfaces/newPasswordInterface";
import { setNewPassword } from "../../react-query/services/utilityApi/newPasswordApi";

const ResetPasswordForm: React.FC<NewPasswordProps> = ({
  newPasswordHandler,
  newPasswordRef
}) =>{
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const resetCode = searchParams.get("code");
  const resetCodeExpiration = Number(searchParams.get("exp")) * 1000;
  const currentDate = Date.now();

  const codeValidation = resetCode && resetCodeExpiration && resetCodeExpiration > currentDate;

  const {
    mutate: resetPassword,
    isError,
    isPending,
    error: mutationError
  } = useMutation({
    mutationFn: setNewPassword,
    onSuccess: () =>{
      if(codeValidation){
        toast.success("Reset Password was successful");
        navigate("/login", {
          replace: true
        });
      }
    },
    onError: (err: unknown) =>{
      console.error(err);
    }
  });

  useEffect(() =>{
    if(isError){
      const timeout = setTimeout(() =>{
        navigate("/login", { replace: true });
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isError, navigate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({
      verificationCode: resetCode,
      password: newPasswordRef?.current?.password
    });
  };

  return(
    <section className="flex items-center justify-center bg-gray-50">
      <section className={isError ? "" : "w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-lg shadow-lg"}>
        {mutationError && isError ? (
          <section role="alert" className="max-w-fit rounded-xl alert alert-error text-center p-4 text-red-600 bg-red-100">
            <RxCrossCircled className="inline-block" size="1.5rem"/>
            {mutationError instanceof Error ? mutationError.message : "Unknown error"}
          </section>
        ) : (
          <>
            <section className="text-center">
              <h2 className="text-xl font-bold
              sm:text-2xl
              lg:text-3xl">Create a new password
              </h2>
            </section>

            <form onSubmit={submitHandler} className="space-y-6">
              <section>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900
                sm:text-base">Your new password
                </label>
                <input name="password"
                type="password"
                id="password"
                defaultValue={newPasswordRef?.current?.password}
                onChange={newPasswordHandler}
                className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm
                sm:text-sm
                md:text-base
                focus:border-indigo-500
                focus:ring-indigo-500"/>
                <p className="text-xs mt-2">Must be at least 6 characters long.</p>
              </section>

              <button
              type="submit"
              className={`w-full rounded-md mt-6 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm
              sm:text-base
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
              hover:bg-indigo-500`}>
                {isPending ? "Resetting..." : "Reset"}
              </button>
            </form>
          </>
        )}
      </section>
    </section>
  )
}

export default ResetPasswordForm;