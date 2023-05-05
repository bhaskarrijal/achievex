"use client"

import { useAuthContext } from "@/context/AuthContext"
import signOutFromApp from "@/firebase/auth/signout"
import { useRouter } from "next/navigation"
import React from "react"
import LoadingComponent from "../components/LoadingComponent"

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    if (!user) return <LoadingComponent />

    const handleSignOut = async () => {
        await signOutFromApp();
    }

    return (
        <>
            <div className="w-full rounded-3xl bg-gradient-to-tr from-secondary to-primary i">
                <h1 className="py-16 text-4xl font-bold text-center text-white">My Profile</h1>
            </div>

            <div className="flex flex-col w-full gap-5 py-10">
                <div className="flex flex-col w-full gap-5">
                    <h1 className="text-2xl font-bold text-primary">Profile</h1>
                    <div className="flex flex-col items-center w-full gap-5">
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Name</h1>
                            <h1 className="text-xl font-bold">{!user.displayName ? 'N/A' : user.displayName}</h1>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Email</h1>
                            <h1 className="text-xl font-bold">{user.email}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-5">
                    <h1 className="text-2xl font-bold text-primary">Account</h1>
                    <div className="flex flex-col items-center w-full gap-5">
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Password</h1>
                            <h1 className="text-xl font-bold">********</h1>
                        </div>
                    </div>
                </div>

                <button onClick={handleSignOut} className="px-5 py-3 font-bold text-white uppercase transition duration-300 delay-150 bg-gradient-to-tr from-red-900 to-red-500 hover:bg-gradient-to-bl rounded-2xl">Sign out</button>
            </div>
        </>
    )
}