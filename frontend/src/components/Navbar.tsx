import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

import { logout } from "../react-query/services/authApi/logoutApi";
import useAuth from "../hooks/useAuth";

const Navbar = () =>{
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  });

  return(
    <section className="navbar bg-gray-300 shadow-sm mb-20">
      <section className="flex-1">
        <a href="/" className="btn btn-ghost bg-transparent border-transparent text-xl">User Authenticator</a>
      </section>
      <section className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/sessions">Sessions</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register" hidden={user ? true : false}>Register</Link>
          </li>
          <li>
            <Link to="/login" hidden={user ? true : false}>Login</Link>
          </li>
          <li>
            <button onClick={() => signOut()}
              hidden={!user}>Logout</button>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default Navbar;