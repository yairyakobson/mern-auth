import { useRef } from "react";

import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

const ResetPassword = () =>{
  const newPasswordRef = useRef<{
    password: string;
  }>({
    password: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in newPasswordRef.current){
      newPasswordRef.current[name as keyof typeof newPasswordRef.current] = value;
    }
  };

  return(
    <>
      <ResetPasswordForm
      newPasswordHandler={inputHandler}
      newPasswordRef={newPasswordRef}/>
    </>
  );
};

export default ResetPassword;