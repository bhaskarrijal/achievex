"use client"

import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Empty from '../../../assets/illustrations/empty.svg'
import { Challenge } from "../feed/LoggedInFeed"
import Image from "next/image"

export default function MyChallenges({ mine }) {
    const { userData, userChallenges } = useData()
    const router = useRouter()

    useEffect(() => {
        console.log(userData)
        if (!userData) {
            router.push('/onboarding')
        }
    }, [userData])

    return (
        <>
            {
                userChallenges.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full my-10">
                        <Image src={Empty} width={160} height={160} className="my-16" />
                        <h1 className="text-3xl font-bold text-center uppercase">No challenges available</h1>
                        <p className="mt-5 text-lg text-center">Create a new challenge to get started.</p>
                    </div>
                )
            }
            {
                userChallenges.map((challenge, index) => {
                    return (
                        <Challenge mine={mine} key={index} {...challenge} />
                    )
                }
                )
            }
        </>
    )
}