import { useData } from "@/context/DataContext";
import Link from "next/link";
import Empty from '../../../assets/illustrations/empty.svg'
import Image from "next/image";
import { arrayUnion, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";

export default function LoggedInFeed() {

    const { publicChallenges } = useData();

    return (
        <>
            <div className='flex justify-between w-full py-5'>
                <h1 className="text-3xl font-bold">Challenge Feed</h1>
                <div className="flex items-center gap-5">
                    <Link href="/my-challenges">
                        <button className="px-5 py-2 text-xl font-bold text-white bg-primary rounded-3xl hover:underline">My Challenges</button>
                    </Link>
                    <Link href="/new-challenge">
                        <i className="text-4xl bi bi-plus-circle-fill text-primary"></i>
                    </Link>
                </div>

            </div>
            {
                publicChallenges?.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full my-10">
                        <Image src={Empty} width={160} height={160} className="my-16" />
                        <h1 className="text-3xl font-bold text-center uppercase">No challenges available</h1>
                        <p className="mt-5 text-lg text-center">Create a new challenge to get started.</p>
                    </div>
                )
            }
            {
                publicChallenges.map((challenge, index) => {
                    return (
                        <Challenge key={index} {...challenge} />
                    )
                }
                )
            }
        </>
    )
}

export const Challenge = ({ id, title, description, duration, category, status, creator, difficulty, participants, privacy, mine }) => {

    const { user } = useAuthContext();

    const joinChallenge = async () => {
        await setDoc(doc(db, "challenges", id), {
            participants: arrayUnion(user.uid)
        }, { merge: true })
    }

    const deleteChallenge = async () => {
        if (privacy === 'public') {
            try {
                await deleteDoc(doc(db, "users", user.uid, "challenges", id));
                await deleteDoc(doc(db, "challenges", id));
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await deleteDoc(doc(db, "users", user.uid, "challenges", id));
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="w-full px-6 py-4 mb-6 bg-white border rounded-lg">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primary">
                    {title} {
                        privacy === 'public' ? (
                            <span className="px-3 py-1 ml-2 text-xs font-bold text-white uppercase rounded-full bg-primary">Public</span>
                        )
                            :
                            (
                                <span className="px-3 py-1 ml-2 text-xs font-bold text-white uppercase bg-red-600 rounded-full">Private</span>
                            )
                    }
                </h2>
                {status === 'ongoing' ? (
                    <span className="px-3 py-1 text-xs font-bold text-white uppercase bg-green-600 rounded-full">Ongoing</span>
                ) : (
                    <span className="px-3 py-1 text-xs font-bold text-white uppercase bg-gray-500 rounded-full">Completed</span>
                )}
            </div>
            <p className="mb-4 text-sm text-gray-600">{description}</p>
            <div className="flex items-center justify-start gap-5">
                <span className="text-xs font-bold text-gray-600 uppercase">
                    <i className="mr-2 bi bi-tag"></i>
                    {category}
                </span>
                <span className="text-xs font-bold text-gray-600 uppercase">
                    <i className="mr-2 bi bi-award"></i>
                    {difficulty}
                </span>
                <span className="text-xs font-bold text-gray-600 uppercase">
                    <i className="mr-2 bi bi-clock"></i>
                    {duration}
                </span>
                {/* <span className="text-xs font-bold text-gray-600 uppercase">
                    <i className="mr-2 bi bi-people"></i>
                    {participants} Participants
                </span> */}
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                    <img src={creator?.avatar} alt={creator?.name} className="w-8 h-8 mr-2 rounded-full" />
                    <span className="text-gray-600">{creator?.name}</span>
                </div>
                {
                    mine !== true && (
                        <>
                            {
                                status === 'ongoing' ? (
                                    <button
                                        className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-3xl hover:underline"
                                        onClick={joinChallenge}
                                    >
                                        Join
                                    </button>
                                ) : (
                                    <button className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-3xl hover:underline">View</button>
                                )
                            }
                        </>
                    )
                }
                {
                    mine === true && (
                        <div className="flex items-center gap-5">
                            <Link href={`/my-challenges/${id}`}>
                                <button className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-3xl hover:underline">View</button>
                            </Link>
                            <button
                                className="px-5 py-2 text-sm font-bold text-white bg-red-600 rounded-3xl hover:underline"
                                onClick={deleteChallenge}
                            >
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};