"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function Home() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user !== null) router.push("/feed")
    }, [user])

    return (
        <>
            Not logged in
        </>
    );
}

export const metadata = {
    title: 'AchieveX - Get your goals done',
}