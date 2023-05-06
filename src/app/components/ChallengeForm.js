"use client"

import { useAuthContext } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { db } from '@/firebase/config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ChallengeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('ongoing');
    const [creatorName, setCreatorName] = useState('');
    const [creatorAvatar, setCreatorAvatar] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [privacy, setPrivacy] = useState('public');

    const { user } = useAuthContext();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const challenge = {
            title,
            description,
            duration,
            category,
            status,
            creator: {
                name: creatorName,
                avatar: creatorAvatar
            },
            difficulty,
            privacy,
            participants: [],
            createdAt: new Date()
        }



        if (privacy === 'public') {
            await addDoc(collection(db, "challenges"), challenge).then(() => {
                console.log("Document successfully written!");
            }
            ).catch((error) => {
                console.error("Error adding document: ", error);
            }
            )
        }


        await addDoc(collection(db, "users", user.uid, "challenges"), {
            title,
            description,
            duration,
            category,
            status,
            creator: {
                name: creatorName,
                avatar: creatorAvatar
            },
            difficulty,
            privacy,
            participants: [],
            createdAt: new Date()
        }, { merge: true }).then(() => {
            console.log("Document successfully written!");
        }
        ).catch((error) => {
            console.error("Error adding document: ", error);
        }).finally(() => {
            router.push("/feed");
        })
    }

    const { userData } = useData();

    useEffect(() => {
        if (userData) {
            setCreatorName(userData.name);
            setCreatorAvatar("https://avatars.dicebear.com/api/avataaars/" + userData.name + ".svg");
        }
    }, [userData]);

    return (
        <form onSubmit={handleSubmit} className="w-full mx-auto">
            <div className="mb-4">
                <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="duration" className="block mb-1 font-medium">Duration in Days</label>
                <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
                <label htmlFor="difficulty" className="block mb-1 font-medium">Difficulty</label>
                <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block mb-2 font-bold text-gray-700">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    defaultValue={''}
                >
                    <option disabled value="">Select a category</option>
                    <option value="health">Health</option>
                    <option value="fitness">Fitness</option>
                    <option value="productivity">Productivity</option>
                    <option value="learning">Learning</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="privacy" className="block mb-2 font-bold text-gray-700">Privacy</label>
                <select id="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>

                <p className="mt-2 text-sm text-gray-500">
                    {privacy === "public" ? "Anyone can join your challenge. You will get an invite link upon creation." : "Only people you invite can join your challenge."}
                </p>
            </div>

            <div className="flex w-full mt-6">
                <button className="w-full px-5 py-3 font-bold text-white uppercase transition duration-300 delay-150 bg-gradient-to-tr from-secondary to-primary hover:bg-gradient-to-bl rounded-2xl">
                    Create Challenge
                </button>
            </div>
        </form>
    );
}
export default ChallengeForm;
