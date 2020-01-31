import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserProfile } from "../utils";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async user => {
      if (user) {
        const userProfile = await createUserProfile(user);
        setUser(userProfile);
        setAuthLoading(false);
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, auth, authLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
