import { Route } from "react-router";

import Home from "../../pages/Home";

const useRoutes = () =>{
  return(
    <>
      <Route path="/" element={<Home/>}/>
    </>
  )
}

export default useRoutes;