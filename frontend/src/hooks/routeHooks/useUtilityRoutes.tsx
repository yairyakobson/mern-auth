import { Route } from "react-router";

import VerifyEmail from "../../pages/utilityPages/VerifyEmail";
import ForgotPassword from "../../pages/utilityPages/ForgotPassword";
import ResetPassword from "../../pages/utilityPages/ResetPassword";

const useUtilityRoutes = () =>{
  return(
    <>
      <Route path="/email/verify/:code" element={<VerifyEmail/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/password/reset" element={<ResetPassword/>}/>
    </>
  )
}

export default useUtilityRoutes;