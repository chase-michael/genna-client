import { createContext, useState } from 'react'

const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
    const [userInput, setUserInput] = useState({
        displayName: '',
        email: '',
        password: '',
        profileImage: undefined
    });

    return (
        <UserInputContext.Provider value={{ userInput, setUserInput }}>
            {children}
        </UserInputContext.Provider>
        );
    };
  
export default UserInputContext;