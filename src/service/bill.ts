import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  where,
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

export const getAllBill = async (): Promise<Bill[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "bills"));
    const newData: Bill[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        bill_number: data.bill_number,
        customer: data.customer,
        car_name: data.car_name,
        car_number: data.car_number,
        product_list: data.product_list,
      };
    });
    return newData;
  } catch (error) {
    throw error;
  }
};

export async function queryBillByDate(date: string): Promise<Bill[]> {
  const invoicesCollection = collection(db, "bills");
  const q = query(
    invoicesCollection,
    where("bill_number", ">=", `INV-${date}-000`),
    where("bill_number", "<=", `INV-${date}-999`)
  );

  try {
    const querySnapshot = await getDocs(q);
    const invoices: Bill[] = [];
    querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      if (data) {
        const bill: Bill = Object.assign({}, data) as Bill;
        invoices.push(bill);
      }
    });
    return invoices;
  } catch (error) {
    console.error("Error querying Firestore:", error);
    throw error;
  }
}
