import React from "react"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ResetPasswordProps } from "../../interfaces/resetPasswordInterface";
import { sendResetPasswordEmail } from "../../react-query/services/utilityApi/resetPasswordApi";

const ForgotPasswordForm: React.FC<ResetPasswordProps> = ({
  resetPasswordHandler,
  resetPasswordRef
}) =>{

  const {
    mutate: sendPasswordReset,
    isPending
  } = useMutation({
    mutationFn: sendResetPasswordEmail,
    onSuccess: () =>{
      toast.success("A reset email was sent. Check your inbox");
    },
    onError: (err: unknown) =>{
      console.error("Error in onError handler:", err);

      // Checks the error structure 
      if(err && typeof err === "object" && "message" in err){
        const customError = err as { message: string };
        toast.error(customError.message || "An error occurred");
      }
      else{
        toast.error("An unknown error occurred.");
      }
    }
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPasswordReset({
      email: resetPasswordRef?.current?.email
    });
  };

  return(
    <section className="flex items-center justify-center bg-gray-50">
      <section className="w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <section className="text-center">
          <h2 className="text-xl font-bold
          sm:text-2xl
          lg:text-3xl">Reset your password
          </h2>
        </section>

        <form onSubmit={submitHandler} className="space-y-6">
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900
            sm:text-base">Email Address
            </label>
            <input name="email"
            type="email"
            id="email"
            defaultValue={resetPasswordRef?.current?.email}
            onChange={resetPasswordHandler}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm
            sm:text-sm
            md:text-base
            focus:border-indigo-500
            focus:ring-indigo-500"/>
          </section>

          <button
          type="submit"
          className="w-full rounded-md mt-6 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm
          sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
          hover:bg-indigo-500">
            {isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </section>
  )
}

export default ForgotPasswordForm;