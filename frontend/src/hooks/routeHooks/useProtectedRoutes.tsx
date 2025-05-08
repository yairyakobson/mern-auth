import { Route } from "react-router";

import ProtectedRoutes from "../../components/ProtectedRoutes";
import About from "../../pages/protectedPages/About";
import Profile from "../../pages/protectedPages/Profile";
import Sessions from "../../pages/protectedPages/Sessions";

const useProtectedRoutes = () =>{
  return(
    <>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/about" element={<About/>}/>
      </Route>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/sessions" element={<Sessions/>}/>
      </Route>
    </>
  )
}

export default useProtectedRoutes;