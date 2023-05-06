"use client";

import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config"
import { addDoc, doc, setDoc } from "firebase/firestore"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react"

export default function Page() {
    const { user } = useAuthContext()
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [age, setAge] = React.useState('')
    const [gender, setGender] = React.useState('')
    const [interests, setInterests] = React.useState([])

    const router = useRouter()

    const handleDetailsForm = async (event) => {
        event.preventDefault()

        const selectedInterests = [...event.target.elements].filter(element => element.checked).map(element => element.value)
        setInterests(selectedInterests)

        console.log(
            name,
            username,
            age,
            gender,
            selectedInterests,
        )

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            username: username,
            age: age,
            gender: gender,
            interests: selectedInterests
        }).then(() => {
        }).catch((error) => {
            console.error("Error adding document: ", error);
        }
        ).finally(() => {
            router.push('/feed')
        })
    }
    return (
        <>
            <div class="grid grid-cols-1 md:grid-cols-1 mt-10 gap-10">
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

                            <h1 class="text-gray-800 font-bold text-2xl mb-1 mt-10">
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

                        </div>
                        {/* {siteError && <p class="text-red-500 text-sm font-bold mt-3">{siteError}</p>} */}
                        <button class="w-full mt-4 mb-2 bg-gradient-to-tr from-secondary to-primary text-white font-bold py-3 px-5 uppercase hover:bg-gradient-to-bl transition duration-300 rounded-2xl delay-150">SUBMIT</button>
                    </form>
                </div>
            </div>
        </>
    );
}