import { useQuery } from "@tanstack/react-query";

import { getUser } from "../react-query/services/authApi/userApi";

export const AUTH = "auth"

const useAuth = ( options = {} ) =>{
  const { data: user, ...params } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity, // Stores the user's query in the cache
    ...options // In case the user passed any overwrites
  });

  return{
    user,
    ...params
  }
}

export default useAuth;