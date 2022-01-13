import React, { useState } from "react";
import {
  FaCompressAlt,
  FaEllipsisV,
  FaExpandAlt,
  FaTimes,
} from "react-icons/fa";
import classNames from "classnames/bind";

const Compose = ({ setCompose }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={classNames(
        "bg-black/50",
        "h-screen",
        "w-screen",
        "fixed",
        "flex",
        { "items-center": expand },
        { "justify-center": expand },
        { "items-end": !expand },
        { "justify-end": !expand },
        { "pr-5": !expand }
      )}
    >
      <div
        className={classNames(
          "h-4/5 bg-white pb-10",
          {
            "rounded-t-2xl": !expand,
          },
          {
            "rounded-2xl": expand,
          },
          {
            "w-2/4": !expand,
          },
          { "w-3/5": expand }
        )}
      >
        <div className="bg-black h-10 rounded-t-2xl flex items-center justify-between px-4 space-x-4">
          <h3 className="text-white font-semibold flex-1">New Message</h3>
          {!expand && (
            <FaExpandAlt
              className="text-white hover:bg-white/50 w-6 h-6 p-1 rounded cursor-pointer"
              onClick={() => setExpand(!expand)}
            />
          )}
          {expand && (
            <FaCompressAlt
              className="text-white hover:bg-white/50 w-6 h-6 p-1 rounded cursor-pointer"
              onClick={() => setExpand(!expand)}
            />
          )}
          <FaTimes
            className="text-white hover:bg-white/50 w-6 h-6 p-1 rounded cursor-pointer"
            onClick={() => setCompose(false)}
          />
        </div>
        <div className="flex flex-col m-5 space-y-4 h-full">
          <input
            type="text"
            className="bg-black/25 px-2 py-1 outline-none placeholder-black/75 font-semibold rounded focus:bg-white focus:border-sky-500 border-2"
            placeholder="To"
          />
          <input
            type="text"
            className="bg-black/25 px-2 py-1 outline-none placeholder-black/75 font-semibold rounded focus:bg-white focus:border-sky-500 border-2"
            placeholder="Subject"
          />
          <textarea
            className="bg-black/25 px-2 py-1 outline-none placeholder-black/75 font-semibold rounded h-3/5 focus:bg-white focus:border-sky-500 border-2"
            name="message"
            placeholder="Message"
          />

          <div className="flex justify-between">
            <button className="bg-sky-500 p-1 rounded px-5 text-white font-semibold">
              Send
            </button>
            <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
              <FaEllipsisV className="text-sky-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
