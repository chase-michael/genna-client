import { createContext, useState, useEffect } from 'react';
import { validateAuthToken } from '../utils/validateAuthToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

  const signIn = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    validateAuthToken()
      .then(validated => {
        localStorage.setItem('userData', JSON.stringify(validated));
        setUserData(validated);
      })
      .catch(error => console.log(error));
  }

  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setAuthToken(null);
    setUserData(null);
  }

  return (
    <AuthContext.Provider value={{ authToken, userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
