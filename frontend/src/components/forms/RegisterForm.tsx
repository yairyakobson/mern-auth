import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { RegisterFormProps } from "../../interfaces/registerInterface";
import { register } from "../../react-query/services/authApi/registerApi";
import useAuth from "../../hooks/useAuth";

const RegisterForm: React.FC<RegisterFormProps> = ({
  emailHandler,
  passwordHandler,
  confirmPasswordHandler,
  registerDataRef
}) =>{
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() =>{
    if(user){
      toast.error("You Are Already Logged In.", {
        duration: 2000
      });
      navigate("/");
    }
  }, [user]);

  const {
    mutate: createAccount,
    isPending,
  } = useMutation({
    mutationFn: register,
    onSuccess: () =>{
      toast.success("You've successfully registered");
      navigate("/login", {
        replace: true // Redirects you to the last directory you were
      });
    },
    onError: (err: Error) =>{
      toast.error(err.message);
    }
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAccount({
      email: registerDataRef?.current?.email,
      password: registerDataRef?.current?.password,
      confirmPassword: registerDataRef?.current?.confirmPassword
    });
  };

  return(
    <section className="flex items-center justify-center bg-gray-50">
      <section className="w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <section className="text-center">
          <h2 className="text-xl font-bold
          sm:text-2xl
          lg:text-3xl">Create a new account
          </h2>
        </section>

        <form onSubmit={submitHandler} className="space-y-6">
          <section>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900
            sm:text-base">Email address
            </label>
            <input name="email"
            type="email"
            id="email"
            defaultValue={registerDataRef?.current?.email}
            onChange={emailHandler}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm
            sm:text-sm
            md:text-base
            focus:border-indigo-500
            focus:ring-indigo-500"/>
          </section>

          <section>
            <section className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900
              sm:text-base">Password
              </label>
            </section>
            <input name="password"
            type="password"
            id="password"
            defaultValue={registerDataRef?.current?.password}
            onChange={passwordHandler}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm
            sm:text-sm
            md:text-base
            focus:border-indigo-500
            focus:ring-indigo-500"/>
            <p className="text-xs mt-2">Must be at least 6 characters long.</p>
          </section>

          <section>
            <section className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900
              sm:text-base">Confirm Password
              </label>
            </section>
            <input name="confirmPassword"
            type="password"
            id="confirm-password"
            defaultValue={registerDataRef?.current?.confirmPassword}
            onChange={confirmPasswordHandler}
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
            {isPending ? "Registering" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600
          hover:text-indigo-500">
            Login
          </Link>
        </p>
      </section>
    </section>
  );
}

export default RegisterForm;