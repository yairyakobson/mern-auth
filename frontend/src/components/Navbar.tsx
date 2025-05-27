import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

import { logout } from "../react-query/services/authApi/logoutApi";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () =>{
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() =>{
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleResize = () =>{
      if(mediaQuery.matches){
        setIsOpen(false);
      }
    };
    mediaQuery.addEventListener("change", handleResize);

    return () =>{
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return(
    <nav className="bg-gray-300 shadow-sm mb-20 p-2">
      <section className="flex items-center justify-between">
        <a href="/" className="text-xl font-semibold p-2">User Authenticator</a>
        <button className="sm:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes/> : <FaBars/>}
        </button>

        <ul className="hidden sm:flex gap-6">
          <li className="hover:bg-sky-50 rounded-xl px-2 p-1">
            <Link to="/sessions">Sessions</Link>
          </li>
          <li className="hover:bg-sky-50 rounded-xl px-2 p-1">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:bg-sky-50 rounded-xl px-2 p-1">
            <Link to="/about">About</Link>
          </li>
          {!user && (
            <>
              <li className="hover:bg-sky-50 rounded-xl px-2 p-1">
                <Link to="/register">Register</Link>
              </li>
              <li className="hover:bg-sky-50 rounded-xl px-2 p-1">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          <li>
            <button onClick={() => signOut()}
            hidden={!user}
            className="hover:bg-red-400 rounded-xl px-2 p-1">Logout</button>
          </li>
        </ul>
      </section>

      {isOpen && (
        <>
          <ul className="flex flex-col gap-4 mt-2">
            <li>
              <Link to="/sessions"
              className="hover:bg-sky-50 rounded-xl p-2">Sessions</Link>
            </li>
            <li>
              <Link to="/profile"
              className="hover:bg-sky-50 rounded-xl p-2">Profile</Link>
            </li>
            <li>
              <Link to="/about"
              className="hover:bg-sky-50 rounded-xl p-2">About</Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link to="/register"
                  className="hover:bg-sky-50 rounded-xl p-2">Register</Link>
                </li>
                <li>
                  <Link to="/login"
                  className="hover:bg-sky-50 rounded-xl p-2">Login</Link>
                </li>
              </>
            )}
            <li>
              <button onClick={() => signOut()}
              hidden={!user}
              className="hover:bg-red-400 rounded-xl p-2">Logout</button>
            </li>
          </ul>
        </>
      )}
    </nav>
  )
}

export default Navbar;