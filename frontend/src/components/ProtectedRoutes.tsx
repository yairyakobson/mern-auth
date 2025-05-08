import { Navigate, Outlet } from "react-router";

import useAuth from "../hooks/useAuth";

const ProtectedRoutes: React.FC = () =>{
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <section className="w-screen h-[90vh] flex-col">
      <section className="skeleton h-32 w-32"/>
    </section>
  ) : user ? (
     // Child routes
     <section className="min-h-screen">
      <Outlet/>
     </section>
   ) : (
    <Navigate to="/login"
    replace
    state={{
      redirectUrl: window.location.pathname // Redirects to the last visited page
    }}/>
   )
}

export default ProtectedRoutes;