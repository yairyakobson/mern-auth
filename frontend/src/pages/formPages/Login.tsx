import { useRef } from "react";

import LoginForm from "../../components/forms/LoginForm";

const Login = () =>{
  const loginRef = useRef<{
    email: string;
    password: string;
  }>({
    email: "",
    password: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in loginRef.current){
      loginRef.current[name as keyof typeof loginRef.current] = value;
    }
  };

  return(
    <>
      <LoginForm
      emailHandler={inputHandler}
      passwordHandler={inputHandler}
      loginDataRef={loginRef}
      user={""}/>
    </>
  );
}

export default Login;