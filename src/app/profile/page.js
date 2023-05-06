"use client"

import { useAuthContext } from "@/context/AuthContext"
import signOutFromApp from "@/firebase/auth/signout"
import { useRouter } from "next/navigation"
import React from "react"
import LoadingComponent from "../components/LoadingComponent"
import { useData } from "@/context/DataContext"

export default function Page() {
    const { user } = useAuthContext()
    const { userData } = useData()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    if (!user) return <LoadingComponent />

    const handleSignOut = async () => {
        await signOutFromApp();
    }

    React.useEffect(() => {
        console.log(userData)
        if (!userData) {
            router.push('/onboarding')
        }
    }, [userData])

    return (
        <>
            <div className="w-full rounded-3xl bg-gradient-to-tr from-secondary to-primary i">
                <h1 className="py-16 text-4xl font-bold text-center text-white">My Profile</h1>
            </div>

            <div className="flex flex-col w-full gap-5 py-10">
                <div className="flex flex-col w-full gap-5">
                    <h1 className="text-2xl font-bold text-primary">Profile</h1>
                    {/* <div className="flex flex-col items-center w-full gap-5">
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Name</h1>
                            <h1 className="text-xl font-bold">{!userData?.name ? 'N/A' : userData?.name}</h1>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Username</h1>
                            <h1 className="text-xl font-bold">{!userData?.username ? 'N/A' : userData?.username}</h1>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Age</h1>
                            <h1 className="text-xl font-bold">{!userData?.age ? 'N/A' : userData?.age}</h1>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Interests</h1>
                            <h1 className="text-xl font-bold">{!userData?.interests ?
                                'N/A' : userData?.interests.map((interest, index) => {
                                    if (index === userData?.interests.length - 1) return interest
                                    else return interest + ', '
                                })}</h1>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <h1 className="text-xl font-bold">Email</h1>
                            <h1 className="text-xl font-bold">{user.email}</h1>
                        </div>
                    </div> */}


                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500 ">
                            <tbody>
                                <tr class="bg-white border">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Name
                                    </th>
                                    <td class="px-6 py-4">
                                        {!userData?.name ? 'N/A' : userData?.name}
                                    </td>
                                </tr>
                                <tr class="bg-white border">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Username
                                    </th>
                                    <td class="px-6 py-4">
                                        {!userData?.username ? 'N/A' : userData?.username}
                                    </td>
                                </tr>
                                <tr class="bg-white border">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Age
                                    </th>
                                    <td class="px-6 py-4">
                                        {!userData?.age ? 'N/A' : userData?.age}
                                    </td>
                                </tr>
                                <tr class="bg-white border">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        Interests
                                    </th>
                                    <td class="px-6 py-4">
                                        {!userData?.interests ?
                                            'N/A' : userData?.interests.map((interest, index) => {
                                                if (index === userData?.interests.length - 1) return interest
                                                else return interest + ', '
                                            })}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <button onClick={handleSignOut} className="px-5 py-3 font-bold text-white uppercase transition duration-300 delay-150 bg-gradient-to-tr from-red-900 to-red-500 hover:bg-gradient-to-bl rounded-2xl">Sign out</button>
            </div>
        </>
    )
}