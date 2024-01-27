import {
    DocumentData,
    DocumentReference,
    addDoc,
    collection,
  } from "firebase/firestore";
import { db } from "../firebaseConfic";
import { Bill } from "../pages/bill/Bill";
  
  export const createBill = async (
    bills: Bill
  ): Promise<DocumentReference<DocumentData, DocumentData>> => {
      try {
          const docRef = await addDoc(collection(db, "bills"), bills);
          return docRef;
      } catch (error) {
          throw error;
      }
  };