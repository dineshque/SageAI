import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): Promise<import("firebase/auth").User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const onAuthStateChanged = (callback: (user: import("firebase/auth").User | null) => void) => {
    return firebaseOnAuthStateChanged(auth, callback);
}

export { auth };
