import React from "react";
import { FaInbox, FaRegBell, FaRegPaperPlane, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
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

        <Link to='/' className="text-white inline-flex items-center px-2 py-1 bg-white/25 w-full rounded cursor-pointer">
          <FaInbox className="w-5 h-5" />
          <span className="ml-3 font-semibold">Inbox</span>
        </Link>
        <Link to='/stared' className="text-white inline-flex items-center px-2 py-1 w-full rounded hover:bg-white/25 cursor-pointer">
          <FaRegStar className="w-5 h-5" />
          <span className="ml-3 font-semibold">Started</span>
        </Link>
        <li className="text-white inline-flex items-center px-2 py-1 w-full rounded hover:bg-white/25 cursor-pointer">
          <FaRegBell className="w-5 h-5" />
          <span className="ml-3 font-semibold">Important</span>
        </li>

        <li className="text-white inline-flex items-center px-2 py-1 w-full rounded hover:bg-white/25 cursor-pointer">
          <FaRegPaperPlane className="w-5 h-5" />
          <span className="ml-3 font-semibold">Sent</span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
