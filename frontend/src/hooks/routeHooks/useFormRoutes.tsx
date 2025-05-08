import { Route } from "react-router";

import Register from "../../pages/formPages/Register";
import Login from "../../pages/formPages/Login";

const useFormRoutes = () =>{
  return(
    <>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </>
  )
}

export default useFormRoutes;