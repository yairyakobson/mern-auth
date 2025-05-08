import { useRef } from "react";

import RegisterForm from "../../components/forms/RegisterForm";

const Register = () =>{
  const registerRef = useRef<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Input handler function to update values in registerRef
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if (name in registerRef.current){
      registerRef.current[name as keyof typeof registerRef.current] = value;
    }
  };

  return(
    <>
      <RegisterForm
      emailHandler={inputHandler}
      passwordHandler={inputHandler}
      confirmPasswordHandler={inputHandler}
      registerDataRef={registerRef}
      user={""}/>
    </>
  );
};

export default Register;