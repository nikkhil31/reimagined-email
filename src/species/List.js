import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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
import { db } from "../firebase/config";
import { useAppcontext } from "../context/AppProvider";

const List = () => {



  const { state: { list: documents }, dispatch } = useAppcontext()



  // unsub()

  useEffect(() => {
    const q = query(collection(db, "email"), where("to", "==", "88PeGzo4wW8UPuLSK6T0"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const emails = []
      querySnapshot.forEach((doc) => {
        emails.push({ ...doc.data(), id: doc.id })
      });
      dispatch({ type: 'LIST', payload: emails })
    });

    return unsub
  }, []);


  return (
    <main className="my-6 w-full pl-[17%] pr-10">
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
          <span className="font-semibold text-sky-500">N</span>
        </div>
      </div>

      {/* Main Emails */}

      <div className="mt-6 space-y-2">

        {
          documents && documents.map(email => (
            <Link
              to={`details/${email.id}`}
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
              <h3 className="w-40 font-bold">{email.from_name}</h3>
              <h3 className="w-80 truncate font-bold">
                {email.subject}
              </h3>
              <p className="flex-1 truncate">
                {email.message}
              </p>
              <span className="font-bold">14:03</span>
            </Link>
          ))
        }








      </div>
    </main>
  );
};

export default List;
