'use client'
import React, { useMemo } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

function Page() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [siteError, setSiteError] = React.useState('')

    const [createdUser, setCreatedUser] = React.useState({})

    const [signUpSteps, setSignUpSteps] = React.useState(0)

    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()
        const user = await signUp(email, password).then((user) => {
            setCreatedUser(user)
            router.push('/onboarding')
        }).catch((error) => {
            setSiteError(error.message)
        })
    }

    // STEP 2

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [age, setAge] = React.useState('')
    const [gender, setGender] = React.useState('')

    const handleDetailsForm = async (event) => {
        event.preventDefault()
        console.log(
            name,
            username,
            age,
            gender,
            createdUser
        )
        await addDoc(doc(db, "users", createdUser.uid), {
            name: name,
            username: username,
            age: age,
            gender: gender,
        }).then(() => {
            setSignUpSteps(2)
        }).catch((error) => {
            setSiteError(error.message)
        }
        )
    }

    // STEP 3

    const [interests, setInterests] = React.useState([])

    const handleInterestsForm = async (event) => {
        event.preventDefault();
        const selectedInterests = [...event.target.elements].filter(element => element.checked).map(element => element.value)
        setInterests(selectedInterests)

        await setDoc(doc(db, "users", createdUser.uid), {
            interests: selectedInterests
        }, { merge: true }).then(() => {
            setSignUpSteps(3)
        }).catch((error) => {
            setSiteError(error.message)
        }
        )
        console.log(selectedInterests)
    }


    switch (signUpSteps) {
        case 0:
            return (
                <div class="grid grid-cols-1 md:grid-cols-2 mt-16 gap-10">
                    <div class="flex w-full bg-gradient-to-tr from-secondary to-primary i justify-around items-center rounded-3xl">
                        <div className="px-10">
                            <h1 class="text-white font-bold text-3xl font-sans">Already have achieveX account?</h1>
                            <p class="text-white mt-1">
                                Sign in now.
                            </p>
                            <Link href="/signin">
                                <button class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">SIGN IN</button>
                            </Link>
                        </div>
                    </div>
                    <div class="flex w-full justify-center items-center bg-white">
                        <form class="bg-white w-full" onSubmit={handleForm}>
                            <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello There!</h1>
                            <p class="text-sm font-normal text-gray-600 mb-7">Welcome to AchieveX!<br /> Enter your details to continue.</p>
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
                            <button class="w-full mt-4 mb-2 bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-5 uppercase hover:bg-gradient-to-bl transition duration-300 rounded-2xl delay-150">NEXT</button>
                        </form>
                    </div>
                </div>
            );

        case 1:
            return (
                <div class="grid grid-cols-1 md:grid-cols-2 mt-16 gap-10">
                    <div class="flex w-full bg-gradient-to-tr from-secondary to-primary i justify-around items-center rounded-3xl">
                        <div className="px-10">
                            <h1 class="text-white font-bold text-3xl font-sans">Already have achieveX account?</h1>
                            <p class="text-white mt-1">
                                Sign in now.
                            </p>
                            <Link href="/signin">
                                <button class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">SIGN IN</button>
                            </Link>
                        </div>
                    </div>

                    <div class="flex w-full justify-center items-center bg-white">
                        <form class="bg-white w-full" onSubmit={handleDetailsForm}>
                            <h1 class="text-gray-800 font-bold text-2xl mb-1">Your Details</h1>
                            <p class="text-sm font-normal text-gray-600 mb-7">
                                Enter your details to continue.
                            </p>
                            <div className="grid grid-cols-1 space-y-4">
                                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        class="pl-2 outline-none border-none w-full"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        class="pl-2 outline-none border-none w-full"
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        required
                                    />
                                </div>
                                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                                    <input
                                        onChange={(e) => setAge(e.target.value)}
                                        class="pl-2 outline-none border-none w-full"
                                        type="text"
                                        name="age"
                                        id="age"
                                        placeholder="Age"
                                        required
                                    />
                                </div>
                                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                                    <select
                                        onChange={(e) => setGender(e.target.value)}
                                        class="pl-2 outline-none border-none w-full"
                                        name="gender"
                                        id="gender"
                                        defaultValue={''}
                                        required
                                    >
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Non-binary</option>
                                        <option>Prefer not to say</option>
                                    </select>
                                </div>

                            </div>
                            {siteError && <p class="text-red-500 text-sm font-bold mt-3">{siteError}</p>}
                            <button class="w-full mt-4 mb-2 bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-5 uppercase hover:bg-gradient-to-bl transition duration-300 rounded-2xl delay-150">NEXT</button>
                        </form>
                    </div>
                </div>
            );

        case 2:
            return (
                <div class="grid grid-cols-1 md:grid-cols-2 mt-16 gap-10">
                    <div class="flex w-full bg-gradient-to-tr from-secondary to-primary i justify-around items-center rounded-3xl">
                        <div className="px-10">
                            <h1 class="text-white font-bold text-3xl font-sans">Already have achieveX account?</h1>
                            <p class="text-white mt-1">
                                Sign in now.
                            </p>
                            <Link href="/signin">
                                <button class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">SIGN IN</button>
                            </Link>
                        </div>
                    </div>

                    <div class="flex w-full justify-center items-center bg-white">
                        <form class="bg-white w-full" onSubmit={handleInterestsForm}>
                            <h1 class="text-gray-800 font-bold text-2xl mb-1">
                                What are you interested in?
                            </h1>
                            <p class="text-sm font-normal text-gray-600 mb-7">
                                Select all that apply.
                            </p>
                            <div className="grid grid-cols-1 space-y-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" name="interests" value="Programming" />
                                    <span className="ml-2">Programming</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" name="interests" value="Music" />
                                    <span className="ml-2">Music</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" name="interests" value="Sports" />
                                    <span className="ml-2">Sports</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" name="interests" value="Fitness" />
                                    <span className="ml-2">Fitness</span>
                                </label>
                            </div>

                            <button class="w-full mt-4 mb-2 bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-5 uppercase hover:bg-gradient-to-bl transition duration-300 rounded-2xl delay-150">SUBMIT</button>
                        </form>
                    </div>
                </div>
            );

        case 3:
            // redirect to home page
            router.push('/profile')

    }
}

export default Page;