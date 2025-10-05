import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import type { StudentProfile } from "../definitions";

const USERS_COLLECTION = "users";

export const createStudentProfile = (uid: string, data: StudentProfile) => {
  const docRef = doc(db, USERS_COLLECTION, uid);
  return setDoc(docRef, data);
};

export const getStudentProfile = async (uid: string): Promise<StudentProfile | null> => {
  const docRef = doc(db, USERS_COLLECTION, uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as StudentProfile;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting student profile: ", error);
    throw new Error("Could not retrieve student profile.");
  }
};

export const updateStudentProfile = (uid: string, data: Partial<StudentProfile>) => {
    const docRef = doc(db, USERS_COLLECTION, uid);
    return updateDoc(docRef, data);
};
