import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null); 
    useEffect(()=> {
        if(!user){
            axios.get('http://localhost:4000/profile', { headers: { 'Cache-Control': 'no-cache' } });

        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
