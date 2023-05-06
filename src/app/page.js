"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import bg from "../../assets/bg.jpg"
import Link from "next/link"

export default function Home() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user !== null) router.push("/feed")
    }, [user])

    return (
        <>
            <div
                className="container flex flex-col items-center justify-center w-full h-[480px] gap-5 bg-cover bg-top bg-no-repeat"
                style={
                    {
                        backgroundImage: `url(${bg.src})`,
                    }
                }>
                <h1 className='text-5xl font-bold text-primary'>WELCOME TO ACHIEVEX!</h1>
                <Link href='/signup'>
                    <button className='px-4 py-2 mt-4 text-base uppercase bg-white rounded-lg text-primary hover:bg-white/90'>
                        Get Started
                    </button>
                </Link>
            </div>
        </>
    );
}