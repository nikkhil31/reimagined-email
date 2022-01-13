import React from "react";
import {
  FaBookmark,
  FaCheckCircle,
  FaCog,
  FaEllipsisV,
  FaRegCircle,
  FaRegStar,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <main className="mx-5 my-6 w-full ml-64 mr-6">
      {/* Header */}
      <div className="flex space-x-3">
        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          {/* <FaCheckCircle className="text-sky-500" /> */}
          <FaRegCircle className="text-sky-500" />
        </div>

        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <FaEllipsisV className="text-sky-500" />
        </div>

        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <FaTrashAlt className="text-sky-500" />
        </div>

        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <FaBookmark className="text-sky-500" />
        </div>

        <div className="flex-1 h-8 border border-sky-500 rounded flex items-center justify-center px-2">
          <input
            name="search"
            placeholder="Search emails"
            className="w-full border-none outline-none bg-inherit pl-1"
          />
          <FaSearch className="text-sky-500" />
        </div>

        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <FaCog className="text-sky-500" />
        </div>

        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <spna className="font-semibold text-sky-500">N</spna>
        </div>
      </div>

      {/* Main Emails */}

      <div className="mt-6 space-y-2">
        <Link
          to="/details"
          className="bg-white flex space-x-3 h-10 items-center px-3 rounded-lg cursor-pointer hover:shadow"
        >
          <FaRegCircle
            className="text-sky-500"
            onClick={(e) => {
              e.preventDefault();
              console.log("hii");
            }}
          />
          <FaRegStar className="text-sky-500" />
          <div className="w-5 h-5"></div>
          <h3 className="w-40 font-bold">LinkedIn</h3>
          <h3 className="w-80 truncate font-bold">
            Gaurav, looking for a new job?
          </h3>
          <p className="w-96 truncate">
            Choose multiple job titles and locations you’re interested in.
          </p>
          <span className="font-bold">14:03</span>
        </Link>

        <Link
          to="/details"
          className="bg-white flex space-x-3 h-10 items-center px-3 rounded-lg cursor-pointer hover:shadow"
        >
          <FaRegCircle className="text-sky-500" />
          <FaRegStar className="text-sky-500" />
          <div className="w-5 h-5"></div>
          <h3 className="w-40">Rich Dad</h3>
          <h3 className="w-80 truncate">Wow! Did you see that?</h3>
          <p className="w-96 truncate">
            Yesterday was the 10th annual Rich Dad Predictions Event and the
            feedback has been incredible!
          </p>
          <span>14:03</span>
        </Link>
      </div>
    </main>
  );
};

export default List;
