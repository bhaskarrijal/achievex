"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/firebase/config';

const UserContext = createContext();

export const DataContextProvider = ({ children }) => {
    let { user } = useAuthContext();

    let userId;

    const [userData, setUserData] = useState({});
    const [userChallenges, setUserChallenges] = useState([]);
    const [publicChallenges, setPublicChallenges] = useState([]);

    useEffect(() => {
        userId = user?.uid;
    }, []);

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

    // fetching private challenges
    useEffect(() => {
        if (userId) {
            const q = query(collection(db, "users", userId, "challenges"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setUserChallenges(data);
            });

            return unsubscribe;
        }
    }, [userId]);

    // fetching public challenges
    useEffect(() => {
        const q = query(collection(db, "challenges"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setPublicChallenges(data);

            console.log(data);
        });


        return unsubscribe;
    }, []);


    return (
        <UserContext.Provider value={{
            userData,
            userChallenges,
            publicChallenges
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useData = () => {
    return useContext(UserContext);
}