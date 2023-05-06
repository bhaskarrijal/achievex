"use client";

import { useData } from "@/context/DataContext"
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Page(
    { params }
) {

    const { userChallenges } = useData()
    const cid = params.id

    // filter userChallenges by cid and return the challenge
    const challenge = userChallenges.filter(challenge => challenge.id === cid)

    console.log(challenge)

    return (
        <>
            <ChallengeCard {...challenge[0]} />
        </>
    )
}

function ChallengeCard(props) {
    const { title, description, duration, category, status, creator, difficulty, privacy, participants } = props;

    // state to store daily progress updates
    const [dailyUpdates, setDailyUpdates] = useState([]);

    // handler for form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // get the form data
        const formData = new FormData(event.target);

        // create a new daily update object with the form data
        const newUpdate = {
            date: formData.get("date"),
            progress: formData.get("progress")
        };

        // add the new daily update to the list of daily updates
        setDailyUpdates([...dailyUpdates, newUpdate]);

        // reset the form
        event.target.reset();

        await setDoc(doc(db, "challenges", id), {
            dailyUpdates: arrayUnion(newUpdate)
        }, { merge: true })

    };

    return (
        <>
            <div className="p-6 bg-white border rounded-lg">
                <h2 className="mb-2 text-2xl font-bold">{title}</h2>
                <p className="mb-4 text-base text-gray-700">{description}</p>
                <div className="flex flex-row mb-4">

                    <div className="w-1/2">
                        <p className="mb-1 text-sm text-gray-500">Duration</p>
                        <p className="text-sm font-medium uppercase">{duration}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="mb-1 text-sm text-gray-500">Category:</p>
                        <p className="text-lg font-medium uppercase">{category}</p>
                    </div>
                </div>
                <div className="flex flex-row mb-4">
                    <div className="w-1/2">
                        <p className="mb-1 text-sm text-gray-500">Status:</p>
                        <p className="text-lg font-medium uppercase">{status}</p>
                    </div>
                    <div className="w-1/2">
                        <p className="mb-1 text-sm text-gray-500">Difficulty:</p>
                        <p className="text-lg font-medium uppercase">{difficulty}</p>
                    </div>
                </div>
                <div className="flex flex-row mb-4">
                    <div className="w-1/2">
                        <p className="mb-1 text-sm text-gray-500">Privacy:</p>
                        <p className="text-lg font-medium uppercase">{privacy}</p>
                    </div>
                    {
                        privacy === 'public' ? (
                            <div className="w-1/2">
                                <p className="mb-1 text-sm text-gray-500">Participants:</p>
                                <p className="text-lg font-medium">{participants.length}</p>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </div>
                <div className="flex flex-row items-center">
                    <img src={creator?.avatar} alt={creator?.name} className="w-10 h-10 mr-2 rounded-full" />
                    <p className="text-sm text-gray-500">{creator?.name}</p>
                </div>

            </div>
            <div className="flex flex-col justify-center p-6 mt-4 border rounded-md">
                <h2 className="text-2xl font-bold">Progress</h2>

                {
                    status === 'ongoing' ? (
                        <form className="mt-4" onSubmit={handleFormSubmit}>
                            <div className="flex flex-row gap-3 mb-4">
                                <div className="w-1/2">
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Date:</label>
                                    <input type="date" id="date" name="date" className="w-full px-3 py-2 border rounded-md" required />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="progress" className="block mb-2 text-sm font-medium text-gray-700">Progress:</label>
                                    <input type="text" id="progress" name="progress" className="w-full px-3 py-2 border rounded-md" required />
                                </div>
                            </div>
                            <button type="submit" className="px-4 py-2 text-white rounded-md bg-primary">
                                Add Daily Update
                            </button>
                        </form>
                    ) : (
                        <></>
                    )
                }

                <div className="mt-4">
                    {
                        dailyUpdates.length > 0 ? (
                            <ul>
                                {
                                    dailyUpdates.map((update, index) => (
                                        <li key={index} className="flex flex-row mb-2">
                                            <span className="mr-2 font-medium">{update.date}:</span>
                                            <span>{update.progress}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <p className="text-gray-500">No daily updates yet.</p>
                        )
                    }
                </div>
            </div>
        </>
    );
}

