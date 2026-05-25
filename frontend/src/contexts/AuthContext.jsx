import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem("token")
  );

    const [user, setUser] = useState(() => {

  const storedUser = localStorage.getItem("user");

  return storedUser
    ? JSON.parse(storedUser)
    : null;

});
  

  function login(token, userData) {

    localStorage.setItem("token", token);

    
     localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

     setUser(userData);


    setIsLogin(true);
  }

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    setIsLogin(false);
  }

   const isAdmin =
    user?.role === "admin";


  return (
    <AuthContext.Provider
      value={{user, isLogin, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}