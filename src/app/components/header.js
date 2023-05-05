"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../../assets/brand/Original.png'
import { useAuthContext } from '@/context/AuthContext'
import signOutFromApp from '@/firebase/auth/signout'

const Header = () => {
    const { user } = useAuthContext()

    return (
        <>
            <div class="w-full container mx-auto py-6">

                <div class="w-full flex items-center justify-between">
                    <Link href="/" className='w-auto'>
                        <div class="flex items-center gap-5">
                            <Image src={Logo} alt="Logo" width={200} height={200} className='w-[80px] h-auto' />
                            <div className='flex flex-col'>
                                <h1 class="text-3xl text-primary font-bold">achieveX</h1>
                                <h3 class="text-base uppercase text-secondary font-bold">Get your goals done</h3>
                            </div>
                        </div>
                    </Link>
                    {
                        user ? (
                            <>
                                <div class="w-1/2 flex items-center gap-5 justify-end">
                                    <Link href="/dashboard" className='flex items-center gap-2'>
                                        <i class="bi bi-app-indicator text-primary text-2xl cursor-pointer"></i>
                                        <span className='text-primary hover:underline'>Dashboard</span>
                                    </Link>
                                    <Link href="/profile" className='flex items-center gap-2'>
                                        <i class="bi bi-person-fill text-primary text-2xl cursor-pointer"></i>
                                        <span className='text-primary hover:underline'>Profile</span>
                                    </Link>
                                    <Link href="/profile/settings" className='flex items-center gap-2'>
                                        <i class="bi bi-gear-fill text-primary text-2xl cursor-pointer"></i>
                                        <span className='text-primary hover:underline'>Settings</span>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div class="w-1/2 flex items-center justify-end">
                                <Link href="/signup">
                                    <button class="text-secondary no-underline hover:text-secondary-dark hover:underline py-2 px-4 uppercase">Sign up</button>
                                </Link>
                                <Link href="/signin">
                                    <button class="bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-5 uppercase hover:bg-gradient-to-bl transition duration-300 rounded-2xl delay-150">Sign in</button>
                                </Link>
                            </div>
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default Header