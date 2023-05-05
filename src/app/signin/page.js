'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [siteError, setSiteError] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            error.code === "auth/user-not-found" && setSiteError("User not found!")
            error.code === "auth/wrong-password" && setSiteError("Wrong password!")

            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (
        <>
            <div class="grid grid-cols-1 md:grid-cols-2 mt-16 w-full gap-10">
                <div class="flex w-full bg-gradient-to-tr from-secondary to-primary i justify-around items-center rounded-3xl">
                    <div className="px-10">
                        <h1 class="text-white font-bold text-3xl font-sans">Don't have achieveX account?</h1>
                        <p class="text-white mt-1">
                            Sign up now.
                        </p>
                        <Link href="/signup">
                            <button type="submit" class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">SIGN UP</button>
                        </Link>
                    </div>
                </div>
                <div class="flex w-full justify-end items-center bg-white">
                    <form class="w-full bg-white" onSubmit={handleForm}>
                        <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                        <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input onChange={(e) => setEmail(e.target.value)} class="pl-2 outline-none border-none" type="text" name="email" id="email" placeholder="Email Address" required />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                            </svg>
                            <input onChange={(e) => setPassword(e.target.value)} class="pl-2 outline-none border-none" type="password" name="password" id="password" placeholder="Password" required />
                        </div>
                        {siteError && <p class="text-red-500 text-sm font-bold mt-3">{siteError}</p>}
                        <button class="w-full mt-4 mb-2 bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-5 uppercase hover:bg-gradient-to-bl transition duration-300 rounded-2xl delay-150">Sign in</button>
                        <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;