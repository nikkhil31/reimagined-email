import React from "react";
import { FaInbox, FaRegBell, FaRegPaperPlane, FaRegStar } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAppcontext } from "../context/AppProvider";

const Nav = () => {

  const { dispatch } = useAppcontext()

  return (
    <nav className="bg-sky-500 h-full w-[15%] rounded-r-3xl flex flex-col fixed">
      <h2 className="text-white font-bold text-2xl text-center pt-3 w-full">
        Logo
      </h2>


      <ul className="flex-1 space-y-3 mx-5 pt-14">

        <li className="text-white inline-flex items-center justify-center bg-white/25 w-full py-1 rounded-3xl mb-5 hover:shadow-2xl cursor-pointer" onClick={() => dispatch({ type: "COMPOSE", payload: 1 })}>
          {/* <FaInbox className="w-5 h-5" /> */}
          <span className="font-semibold">Compose</span>
        </li>

        <NavLink  to='/' className={({ isActive }) => `text-white inline-flex items-center px-2 py-1 hover:bg-white/25 w-full rounded cursor-pointer ${isActive ? 'bg-white/25' : ''}`}>
          <FaInbox className="w-5 h-5" />
          <span className="ml-3 font-semibold">Inbox</span>
        </NavLink>
        <NavLink  to='/stared' className={({ isActive }) => `text-white inline-flex items-center px-2 py-1 hover:bg-white/25 w-full rounded cursor-pointer ${isActive ? 'bg-white/25' : ''}`} >
          <FaRegStar className="w-5 h-5" />
          <span className="ml-3 font-semibold">Started</span>
        </NavLink>
        <NavLink to='/important' className={({ isActive }) => `text-white inline-flex items-center px-2 py-1 hover:bg-white/25 w-full rounded cursor-pointer ${isActive ? 'bg-white/25' : ''}`}>
          <FaRegBell className="w-5 h-5" />
          <span className="ml-3 font-semibold">Important</span>
        </NavLink>

        <NavLink to='/sent' className={({ isActive }) => `text-white inline-flex items-center px-2 py-1 hover:bg-white/25 w-full rounded cursor-pointer ${isActive ? 'bg-white/25' : ''}`}>
          <FaRegPaperPlane className="w-5 h-5" />
          <span className="ml-3 font-semibold">Sent</span>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
