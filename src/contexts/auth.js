import React, { createContext, useState, useContext } from "react";
import api from "../services/api";
import { socket } from "../services/socket";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  async function signUp(nickName, email, password, userAlreadyExists) {
    const response = await api.post("users", {
      nickName,
      email,
      password,
    });

    if (!(response.data.user === "")) {
      const { nickName } = response.data.user;
      localStorage.setItem("user", nickName);
      localStorage.setItem("password", password);

      //update socket connection
      socket.emit("login", nickName);

      setUser(nickName);
      return true;
    } else {
      alert(userAlreadyExists);
    }
  }

  async function signIn(nickName, password, userNotFound, incorrectPassword) {
    const response = await api.get("users", {
      params: { nickName, password },
    });

    if (response.data) {
      if (response.data === "incorrect") {
        alert(incorrectPassword);
      } else {
        localStorage.setItem("user", nickName);
        localStorage.setItem("ESSENCIA:token", response.data.token);

        //update socket connection
        socket.emit("login", nickName);

        setUser(nickName);
        return true;
      }
    } else {
      alert(userNotFound);
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  function signedApiCall(method, url, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api[method](url, params);

        resolve(response);
      } catch (error) {
        if (error.response.status === 401) {
          signOut();
        }

        reject();
      }
    });
  }

  const values = {
    signed: !!user,
    user,
    signUp,
    signIn,
    signOut,
    signedApiCall,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
