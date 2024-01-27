import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Customer } from "../pages/customers/CustomerCreate";
import { db } from "../firebaseConfic";

export const createCustomer = async (
  customer: Customer
): Promise<DocumentReference<DocumentData, DocumentData>> => {
    try {
        const docRef = await addDoc(collection(db, "customers"), customer);
        return docRef;
    } catch (error) {
        throw error;
    }
 
};

export const getAllCustomer = async (): Promise<Customer[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "customers"));
    const newData: Customer[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        address: data.address || "",
        phone: data.phone || "",
      };
    });
    return newData;
  } catch (error) {
    throw error;
  }
};

export const editCustomerById = async (
  customerId: string,
  newData: Partial<Customer>
): Promise<void> => {
    try {
      const customerDocRef = doc(db, "customers", customerId);
    await updateDoc(customerDocRef, newData);
  } catch (error) {
    throw error;
  }
};

export const deleteCustomerById = async (customerId: string): Promise<void> => {
    try {
      const customerDocRef = doc(db, "customers", customerId);
    await deleteDoc(customerDocRef);
  } catch (error) {
    throw error;
  }
};
