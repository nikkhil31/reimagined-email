import React, { useEffect, useState } from "react";
import {
  FaCompressAlt,
  FaEllipsisV,
  FaExpandAlt,
  FaTimes,
} from "react-icons/fa";
import classNames from "classnames/bind";
import { db } from "../firebase/config";
import { collection, doc } from "firebase/firestore";
import { useAppcontext } from "../context/AppProvider";
import { useFirestore } from "../hook/useFirestore";
import EmailFiled from "./EmailFiled";

const Compose = () => {
  const [expand, setExpand] = useState(false);
  const [form, setForm] = useState({ to: {}, subject: '', message: '' });
  const [valid, setValid] = useState(false);




  const { state: { compose, details: { messages, subject, id }, user }, dispatch } = useAppcontext()


  useEffect(() => {
    compose === 2 && setForm(f => ({ ...f, subject: subject }))

    compose === 3 && setForm(f => ({ ...f, message: messages.map(m => m.message).join('\n \n'), subject: subject }))

  }, [compose, messages, subject]);



  useEffect(() => {
    let isValid = true

    if (
      (form.subject === '' || form.message === '') ||
      (JSON.stringify(form.to) === '{}' || compose === 2)
    ) {

      isValid = false
    }

    setValid(isValid)
  }, [form, compose]);


  const { add, update } = useFirestore()

  const handleSumit = async () => {
    let emailId = null

    if (compose !== 2) {

      const refEmail = collection(db, "email");
      const addedDoc = await add(refEmail, {
        subject: form.subject,
        from: user.id,
        from_name: user.name,
        to: form.to.id,
        to_name: form.to.name,
        type: [],
        convey:[user.id,form.to.id],
        message: form.message.substring(0, 120),
      })

      emailId = addedDoc.id

    }

    if (compose === 2) {

      const docRef = doc(db, "email", id);

      await update(docRef, {
        flow: 0, // It suggets that email is made upon a reply!
      })

      emailId = id
    }

    const refMessage = collection(db, "email", emailId, 'message');

    await add(refMessage, {
      message: form.message,
      from: {
        name: user.name,
        did: user.email_id,
      },
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
        'z-30',
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

          {compose !== 2 && <EmailFiled form={form} setForm={setForm} />}


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
            <button className={`bg-sky-500 p-1 rounded px-5 text-white font-semibold ${valid ? 'bg-sky-500' : 'bg-stone-500'}`} onClick={handleSumit} disabled={!valid}>
              Send
            </button>
            <div className="w-8 h-8 border border-sky-500 rounded flex items-center justify-center">
              <FaEllipsisV className="text-sky-500" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Compose;
