"use client"

import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
    const { userData } = useData()
    const router = useRouter()

    useEffect(() => {
        console.log(userData)
        if (!userData) {
            router.push('/onboarding')
        }
    }, [userData])

    return (
        <>
            Dashboard
        </>
    )
}