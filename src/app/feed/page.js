"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import React from "react"
import LoggedInFeed from "./LoggedInFeed"
import LoggedOutFeed from "./LoggedOutFeed"
import { useData } from "@/context/DataContext"

export default function Feed() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const { userData } = useData()

    React.useEffect(() => {
        console.log(userData)
        if (!userData) {
            router.push('/onboarding')
        }
    }, [userData])

    return (
        <>
            {
                user ? (
                    <LoggedInFeed />
                )
                    :
                    <LoggedOutFeed />
            }
        </>
    )
}