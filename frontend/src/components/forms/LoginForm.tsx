import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { LoginFormProps } from "../../interfaces/loginInterface";
import { login } from "../../react-query/services/authApi/loginApi";
import useAuth from "../../hooks/useAuth";

const LoginForm: React.FC<LoginFormProps> = ({
  emailHandler,
  passwordHandler,
  loginDataRef
}) =>{
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectUrl = location.state?.redirectUrl || "/"

  useEffect(() =>{
    if(user){
      toast.error("You Are Already Logged In.", {
        duration: 2000
      });
      navigate("/");
    }
  }, [user]);

  const {
    mutate: signIn,
    isPending
  } = useMutation({
    mutationFn: login,
    onSuccess: () =>{
      toast.success(`Welcome Back`, {
        duration: 1000
      });
      navigate(redirectUrl, {
        replace: true // Redirects you to the last directory you were
      });
      return user;
    },
    onError: (err: Error) =>{
      console.error("Login failed:", err);
      toast.error(err.message);
    }
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    signIn({
      email: loginDataRef?.current?.email,
      password: loginDataRef?.current?.password,
    });
  }

  return(
    <section className="flex items-center justify-center bg-gray-50">
      <section className="w-full max-w-md space-y-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <section className="text-center">
          <h2 className="text-2xl font-bold form-title
          md:text-3xl">Sign in to your account
          </h2>
        </section>

        <form onSubmit={submitHandler} className="space-y-6">
          <section>
            <label htmlFor="email" className="block text-base font-medium text-gray-900 form-label">Email Address
            </label>
            <input name="email"
            type="email"
            id="email"
            defaultValue={loginDataRef?.current?.email}
            onChange={emailHandler}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm
            md:text-base
            focus:border-indigo-500
            focus:ring-indigo-500"/>
          </section>

          <section>
            <section className="flex items-center justify-between">
              <label htmlFor="password" className="block text-base font-medium text-gray-900 form-label">Password
              </label>
            </section>
            <input name="password"
            type="password"
            id="password"
            defaultValue={loginDataRef?.current?.password}
            onChange={passwordHandler}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm
            focus:border-indigo-500
            focus:ring-indigo-500"/>
          </section>
          <Link to="/password/forgot" className="text-base font-medium text-indigo-600
          hover:text-indigo-500">Forgot password?
          </Link>

          <button
          type="submit"
          className="w-full rounded-md mt-6 bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
          hover:bg-indigo-500">
            {isPending ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 font-medium
        md:text-[1rem]
        lg:text-[1rem]">
          Not a member?{" "}
          <Link to="/register" className="text-indigo-600 font-medium
          hover:text-indigo-500">Sign Up
          </Link>
        </p>
      </section>
    </section>
  );
}

export default LoginForm;