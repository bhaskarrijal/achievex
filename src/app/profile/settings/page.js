"use client"

import LoadingComponent from "@/app/components/LoadingComponent"
import { useAuthContext } from "@/context/AuthContext"
import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import React from "react"

export default function Page() {
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

    if (!user) return <LoadingComponent />

    return (
        <>
            <div className="w-full rounded-3xl bg-gradient-to-tr from-secondary to-primary i">
                <h1 className="py-16 text-4xl font-bold text-center text-white">Settings</h1>
            </div>
        </>
    )
}