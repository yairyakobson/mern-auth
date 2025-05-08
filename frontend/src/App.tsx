import { BrowserRouter, Routes } from "react-router";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import useRoutes from "./hooks/routeHooks/useRoutes";
import useFormRoutes from "./hooks/routeHooks/useFormRoutes";
import useProtectedRoutes from "./hooks/routeHooks/useProtectedRoutes";
import useUtilityRoutes from "./hooks/routeHooks/useUtilityRoutes";

const routes: React.ReactNode = useRoutes();
const formRoutes: React.ReactNode = useFormRoutes();
const protectedRoutes: React.ReactNode = useProtectedRoutes();
const utilityRoutes: React.ReactNode = useUtilityRoutes();

function App(){
  return(
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {routes}
          {formRoutes}
          {protectedRoutes}
          {utilityRoutes}
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center"/>
    </>
  )
}

export default App;