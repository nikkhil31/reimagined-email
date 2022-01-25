import React, { useEffect, useState } from "react";
import {
  FaCompressAlt,
  FaEllipsisV,
  FaExpandAlt,
  FaTimes,
} from "react-icons/fa";
import classNames from "classnames/bind";
import { db } from "../firebase/config";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { useAppcontext } from "../context/AppProvider";
import { isComposeValid } from "../helper/validation";
import { useParams } from "react-router-dom";

const Compose = () => {
  const [expand, setExpand] = useState(false);
  const [form, setForm] = useState({ to: '', subject: '', message: '' });


  const [error, setError] = useState({});

  const { state: { compose, details: { messages, subject, id }, list }, dispatch } = useAppcontext()


  useEffect(() => {

    compose === 2 && setForm({ ...form, to: messages[0].from.did, subject: `Re: ${subject}` })

    compose === 3 && setForm({ ...form, message: messages.map(m => m.message).join('\n \n'), subject: `FWD: ${subject}` })

  }, [compose]);



  const handleSumit = async () => {

    if (!isComposeValid(form)) return setError()

    // return console.log(id);

    let to = {}
    const docRef = query(collection(db, "users"), where("email_id", "==", form.to));
    const getToMail = await getDocs(docRef);

    getToMail.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      to = { ...doc.data(), id: doc.id, }
    });

    if (JSON.stringify(to) === '{}') {
      return setError({ ...error, to: 'Email address not found!' })
    }


    // return to ? console.log(to) : console.log('notfound');

    // return console.log(form)
    const time = Timestamp.fromDate(new Date())

    let emailId = null

    if (compose !== 2) {

      const refEmail = collection(db, "email");
      const addedDoc = await addDoc(refEmail, {
        subject: form.subject,
        from: 'vqvh1UYh5Fq3czazmmLx',
        from_name: 'Nikhil Limbad',
        to: to.id,
        to_name: to.name,
        type: [0, 1],
        message: form.message.substring(0, 120),
        createdAt: time
      });

      emailId = addedDoc.id

    }

    if (compose === 2) {

      const docRef = doc(db, "email", id);

      await updateDoc(docRef, {
        subject: form.subject,
        createdAt: time
      });

      emailId = id
    }

    const refMessage = collection(db, "email", emailId, 'message');

    await addDoc(refMessage, {
      message: form.message,
      from: {
        name: 'Nikhil Limbad',
        did: 'nikhil@dmail',
      },
      createdAt: time
    })


    dispatch({ type: 'COMPOSE', payload: 0 })

    console.log('done')
  }


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
          "h-[550px] bg-white pb-10",
          {
            "rounded-t-2xl": !expand,
          },
          {
            "rounded-2xl": expand,
          },
          {
            "w-2/5": !expand,
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
            onClick={() => dispatch({ type: 'COMPOSE', payload: 0 })}
          />
        </div>
        <div className="flex flex-col m-5 space-y-4 h-full">
          <input
            type="text"
            className="bg-black/25 px-2 py-1 outline-none placeholder-black/75 font-semibold rounded focus:bg-white focus:border-sky-500 border-2"
            placeholder="To"
            value={form.to}
            onInput={e => setForm({ ...form, to: e.target.value })}
          />
          <input
            type="text"
            className="bg-black/25 px-2 py-1 outline-none placeholder-black/75 font-semibold rounded focus:bg-white focus:border-sky-500 border-2"
            placeholder="Subject"
            value={form.subject}
            onInput={e => setForm({ ...form, subject: e.target.value })}
          />
          <textarea
            className="bg-black/25 px-2 py-1 outline-none placeholder-black/75 font-semibold rounded h-3/5 focus:bg-white focus:border-sky-500 border-2"
            name="message"
            placeholder="Message"
            value={form.message}
            onInput={e => setForm({ ...form, message: e.target.value })}
          />

          <div className="flex justify-between">
            <button className="bg-sky-500 p-1 rounded px-5 text-white font-semibold" onClick={handleSumit}>
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
