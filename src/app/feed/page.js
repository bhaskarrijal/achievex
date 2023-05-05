"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import React from "react"
import LoggedInFeed from "./LoggedInFeed"
import LoggedOutFeed from "./LoggedOutFeed"

export default function Feed() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

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