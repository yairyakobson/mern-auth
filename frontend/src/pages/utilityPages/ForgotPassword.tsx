import { useRef } from "react";

import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

const ForgotPassword = () =>{
  const resetPasswordRef = useRef<{
    email: string;
  }>({
    email: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in resetPasswordRef.current){
      resetPasswordRef.current[name as keyof typeof resetPasswordRef.current] = value;
    }
  };

  return(
    <>
      <ForgotPasswordForm
      resetPasswordHandler={inputHandler}
      resetPasswordRef={resetPasswordRef}/>
    </>
  );
};

export default ForgotPassword;