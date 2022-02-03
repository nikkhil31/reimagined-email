import { collection, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppcontext } from '../context/AppProvider';
import { db } from '../firebase/config';
import { useFirestore } from '../hook/useFirestore';

function EmailFiled({ form, setForm }) {


    const { state: { user } } = useAppcontext()

    const { find } = useFirestore()


    const [suggestion, setSuggestion] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState({ id: null });

    const handelInput = async (value) => {
        if (value.length < 3) return setSuggestion([])

        // console.log(isPending);
        setSuggestion([])
        setIsLoading(true)
        const docRef = query(collection(db, "users"),
            where("email_id", ">=", value),
            where("email_id", "<=", value + '\uf8ff'),
            where('email_id', '!=', user.email_id));
        const results = await find(docRef)
        setIsLoading(false)
        setSuggestion(results)
    }

    const handleSelectEmail = (email) => {
        let data = { id: email.id, title: email.email_id, name: email.name }
        setEmail(data)
        setForm(form => ({ ...form, to: data }))
        setSuggestion([])
    }

    const handleRemove = () => {
        setEmail({ id: null })
        setForm(form => ({ ...form, to: {} }))
        setSuggestion([])
    }

    return <div
        type="text"
        className="bg-black/25 px-2 py-1 rounded focus:bg-white focus:border-sky-500 border-2 relative"
    >
        {
            email.id && (
                <div><span className="bg-white font-semibold px-2 rounded-md inline-block align-middle">{email.title} <FaTimes
                    className="text-black hover:text-black/70 w-4 h-4 rounded inline-block cursor-pointer"
                    onClick={handleRemove}
                /></span></div>
            )
        }


        {

            !email.id && (< input type='text' className='outline-none placeholder-black/75 bg-transparent font-semibold' placeholder='To' onInput={e => handelInput(e.target.value)} />)
        }
        {
            suggestion.length > 0 || isLoading ? (

                <div className="absolute border-2 border-sky-500 bg-white rounded w-full left-0 top-10 px-2 py-1 divide-y">
                    {
                        suggestion.map(s => (
                            <p className="py-1 cursor-pointer" onClick={() => handleSelectEmail(s)}>{s.email_id}</p>
                        ))
                    }

                    {isLoading && (
                        <div className="flex justify-center items-center py-1">
                            <div style={{ "borderTopColor": "transparent" }}
                                className="w-5 h-5 border-2 border-blue-400 border-solid rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            ) : ''
        }
    </div>;
}

export default EmailFiled;
