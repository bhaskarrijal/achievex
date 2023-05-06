"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/firebase/config';

const UserContext = createContext();

export const DataContextProvider = ({ children }) => {
    let { user } = useAuthContext();

    let userId;

    const [userData, setUserData] = useState({});

    useEffect(() => {
        userId = user?.uid;
    }, [])

    useEffect(() => {
        if (userId) {
            const q = query(doc(db, "users", userId));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.data();
                setUserData(data);
            });

            return unsubscribe;
        }
    }, [userId]);



    return (
        <UserContext.Provider value={{
            userData
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useData = () => {
    return useContext(UserContext);
}