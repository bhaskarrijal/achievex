"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    if (!user) return <h1>Loading...</h1>

    return (
        <h1>User Page</h1>
    )
}