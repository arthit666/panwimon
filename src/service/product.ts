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
import { db } from "../firebaseConfic";
import { Product } from "../pages/bill/Bill";

export const createProduct = async (
  product: Product
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef;
  } catch (error) {
    throw error;
  }
};

export const getAllProduct = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const newData: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        product_name: data.product_name || "",
        price: data.price || 0,
      };
    });
    return newData;
  } catch (error) {
    throw error;
  }
};

export const editProductById = async (
  productId: string,
  newData: Partial<Product>
): Promise<void> => {
  try {
    const productDocRef = doc(db, "products", productId);
    await updateDoc(productDocRef, newData);
  } catch (error) {
    throw error;
  }
};

export const deleteProductById = async (productId: string): Promise<void> => {
  try {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
  } catch (error) {
    throw error;
  }
};
