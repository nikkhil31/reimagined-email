import React from "react";
import { FaInbox, FaRegBell, FaRegPaperPlane, FaRegStar } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="bg-sky-500 h-full w-[15%] rounded-r-3xl flex flex-col fixed">
      <h2 className="text-white font-bold text-2xl text-center pt-3 w-full">
        Logo
      </h2>
      <ul className="flex-1 space-y-3 mx-5 pt-14">
        <li className="text-white inline-flex items-center px-2 py-1 bg-white/25 w-full rounded">
          <FaInbox className="w-5 h-5" />
          <span className="ml-3 font-semibold">Inbox</span>
        </li>
        <li className="text-white inline-flex items-center px-2 py-1 w-full rounded">
          <FaRegStar className="w-5 h-5" />
          <span className="ml-3 font-semibold">Started</span>
        </li>
        <li className="text-white inline-flex items-center px-2 py-1 w-full rounded">
          <FaRegBell className="w-5 h-5" />
          <span className="ml-3 font-semibold">Important</span>
        </li>

        <li className="text-white inline-flex items-center px-2 py-1 w-full rounded">
          <FaRegPaperPlane className="w-5 h-5" />
          <span className="ml-3 font-semibold">Sent</span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
