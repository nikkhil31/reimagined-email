import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const checkEmailExists = async (email) => {
    let to = {}
    const docRef = query(collection(db, "users"), where("email_id", "==", email));
    const getToMail = await getDocs(docRef);

    getToMail.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      to = { ...doc.data(), id: doc.id, }
    });

    if (JSON.stringify(to) === '{}') {
      return { status:0, message: 'Not found!' }
    }

    return { status:1, data: to , message: 'Email address already exits!' }
}