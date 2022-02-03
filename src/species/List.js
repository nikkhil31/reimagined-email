import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import {
  FaBookmark,
  FaCheckCircle,
  FaCog,
  FaEllipsisV,
  FaRegCircle,
  FaRegStar,
  FaSearch,
  FaStar,
  FaTrashAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { useAppcontext } from "../context/AppProvider";
import Nav from "./Nav";
import { useRealtime } from "../hook/useRealtime";
import { useFirestore } from "../hook/useFirestore";

const List = () => {


  const [checked, setChecked] = useState([]);

  let navigate = useNavigate();

  const { state: { list, user }, dispatch } = useAppcontext()

  const constraints = []



  const q = query(collection(db, "email"), where("to", "==", user.id));


  const { documents, error } = useRealtime(q)

  const goToMassage = (id, subject) => {
    dispatch({ type: 'DETAILS', payload: { id, subject } })
    navigate(`/details/${id}`)
  }



  const { update } = useFirestore()

  const handleStar = async (id, typeArr) => {
    console.log(id, typeArr);
    const docRef = doc(db, "email", id);

    await update(docRef, {
      type: typeArr,
    })
  }

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Nav />
      <main className="my-6 w-full pl-[17%] pr-10">
        {/* Header */}
        <div className="flex space-x-3">
          <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
            {/* <FaCheckCircle className="text-sky-500" /> */}
            {documents.length === checked.length ? <FaCheckCircle className="text-sky-500" onClick={() => setChecked([])} /> : <FaRegCircle className="text-sky-500" onClick={() => setChecked(documents.map(d => d.id))} />}

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
              <div
                // to={`details/${email.id}`}
                // onClick={() => goToMassage(email.id, email.subject)}
                key={email.id}
                className="bg-white flex space-x-3 h-10 items-center px-3 rounded-lg cursor-pointer hover:shadow"
              >
                {
                  checked.includes(email.id) ? (<FaCheckCircle
                    className="text-sky-500"
                    onClick={e => setChecked(c => (c.filter(f => f !== email.id)))}
                  />) : (<FaRegCircle
                    className="text-sky-500"
                    onClick={e => setChecked(c => ([...c, email.id]))}
                  />)
                }

                {/* {
                  star.includes(email.id) ? (<FaStar className="text-sky-500" onClick={e => setStar(s => (s.filter(f => f !== email.id)))} />)
                    : (<FaRegStar className="text-sky-500" onClick={e => setStar(s => ([...s, email.id]))} />)
                } */}
                {
                  email.type.includes(0) ? (<FaStar className="text-sky-500" onClick={e => handleStar(email.id, email.type.filter(mail => mail !== 0))} />)
                    : (<FaRegStar className="text-sky-500" onClick={e => handleStar(email.id, [...email.type, 0])} />)
                }
                <div className="w-5 h-5"></div>
                <h3 className="w-40 font-bold" onClick={() => goToMassage(email.id, email.subject)}>{email.from_name}</h3>
                <h3 className="w-80 truncate font-bold" onClick={() => goToMassage(email.id, email.subject)}>
                  {email.subject}
                </h3>
                <p className="flex-1 truncate" onClick={() => goToMassage(email.id, email.subject)}>
                  {email.message}
                </p>
                <span className="font-bold" onClick={() => goToMassage(email.id, email.subject)}>14:03</span>
              </div>
            ))
          }

        </div>
      </main>
    </div>
  );
};

export default List;
