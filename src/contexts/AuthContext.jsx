import { createContext, useState, useEffect } from 'react';
import { validateAuthToken } from '../utils/validateAuthToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('userData'));
    
    if (token) {
      setAuthToken(token);
      validateAuthToken()
        .then(() => user && setUserData(user))
        .catch(error => console.log(error));
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setAuthToken(null);
    setUserData(null);
  }

  return (
    <AuthContext.Provider value={{ authToken, userData, signOut, setAuthToken, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
