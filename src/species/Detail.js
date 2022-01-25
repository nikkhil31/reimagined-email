import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState } from "react";
import {
  FaEllipsisV,
  FaLongArrowAltLeft,
  FaReply,
  FaShare,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { useAppcontext } from "../context/AppProvider";
import { db } from "../firebase/config";
import Nav from "./Nav";

const Detail = () => {

  let { id } = useParams();

  const { state: { details: { messages: message, subject }, list }, dispatch } = useAppcontext()


  useEffect(() => {

    const q = query(collection(db, "email", id, 'message'), orderBy("createdAt"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const message = []
      querySnapshot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id })
      });
      const subject = list.find(e => e.id === id).subject
      console.log({ subject, messages: message });
      dispatch({ type: 'DETAILS', payload: { subject, messages: message, id } })
    });

    return unsub

  }, [id]);

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Nav />
    <main className="my-6 w-full pl-[17%] pr-10">
      <div className="h-12 flex bg-white shadow rounded-2xl items-center justify-between px-4">
        <Link to="/">
          <FaLongArrowAltLeft className="text-3xl font-semibold" />
        </Link>
        <span className="flex-1 ml-2 font-bold">{subject}</span>
        <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
          <FaEllipsisV className="text-sky-500" />
        </div>
      </div>

      {/* main area */}

      {
        message.map(m => (

          <div className="mt-3 bg-white rounded-2xl p-9 divide-y">
            {/* Mail area */}

            <div className="pt-3 mb-5">
              <div className="flex justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-500"></div>
                  <div className="ml-3 h-12">
                    <h4 className="font-bold h-1/2 text-lg">{m.from.name}</h4>
                    <span className="text-xs h-1/2 align-top">
                      {m.from.did}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="">
                    <span className="block text-xs">15 Nov 2020</span>
                    <span className="block text-xs text-right">14:45</span>
                  </div>
                  <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
                    <FaEllipsisV className="text-sky-500" />
                  </div>
                </div>
              </div>

              <div className="text-sm">
                {m.message}
              </div>
            </div>
          </div>

        ))
      }




      <div className="mt-8 space-x-3">
        <button
          className="bg-white py-2 px-8 rounded-xl font-semibold"
          onClick={() => dispatch({ type: 'COMPOSE', payload: 2 })}
        >
          Reply <FaReply className="ml-1 inline-block" />
        </button>
        <button
          className="bg-white py-2 px-8 rounded-xl font-semibold"
          onClick={() => dispatch({ type: 'COMPOSE', payload: 3 })}
        >
          Forword <FaShare className="ml-1 inline-block" />
        </button>
      </div>
    </main>
    </div>
  );
};

export default Detail;
