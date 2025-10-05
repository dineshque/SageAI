"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "firebase/auth";
import { signInWithEmail, signUpWithEmail, signOut, onAuthStateChanged } from "@/lib/firebase/auth";
import { getStudentProfile, createStudentProfile, updateStudentProfile as updateProfileInDb } from "@/lib/firebase/firestore";
import type { StudentProfile } from "@/lib/definitions";
import { Loader } from "lucide-react";


interface AuthContextType {
  user: User | null;
  studentProfile: StudentProfile | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<any>;
  signUp: (email: string, pass: string, profileData: Omit<StudentProfile, 'uid' | 'email'>) => Promise<any>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (data: Partial<StudentProfile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user: User | null) => {
      setLoading(true);
      if (user) {
        setUser(user);
        try {
          const profile = await getStudentProfile(user.uid);
          setStudentProfile(profile);
        } catch (error) {
           console.error("Failed to get student profile in auth context", error);
           setStudentProfile(null);
        }
      } else {
        setUser(null);
        setStudentProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const signIn = async (email: string, pass: string) => {
    return signInWithEmail(email, pass);
  };
  
  const signUp = async (email: string, pass: string, profileData: Omit<StudentProfile, 'uid' | 'email'>) => {
      const userCredential = await signUpWithEmail(email, pass);
      const user = userCredential.user;
      await createStudentProfile(user.uid, {
          ...profileData,
          uid: user.uid,
          email: user.email!,
      });
      // The profile will be set by the onAuthStateChanged listener
      return userCredential;
  };
  
  const signOutUser = async () => {
    await signOut();
    setUser(null);
    setStudentProfile(null);
  };
  
  const updateUserProfile = async (data: Partial<StudentProfile>) => {
    if (user) {
        await updateProfileInDb(user.uid, data);
        // Optimistically update the local state, or wait for a re-fetch.
        // For now, we'll re-fetch to ensure consistency.
        const updatedProfile = await getStudentProfile(user.uid);
        setStudentProfile(updatedProfile);
    }
  };

  const value = {
    user,
    studentProfile,
    loading,
    signIn,
    signUp,
    signOutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
        {loading ? (
             <div className="flex h-screen w-full items-center justify-center">
                <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : (
            children
        )}
    </AuthContext.Provider>
  );
}
