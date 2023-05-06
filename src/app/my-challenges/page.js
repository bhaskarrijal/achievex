import MyChallenges from "../components/MyChallenges";

export default function Page() {
    return (
        <>
            <div className='flex justify-between w-full py-5'>
                <h1 className="text-3xl font-bold">My Challenges</h1>
            </div>
            <MyChallenges mine={true} />
        </>
    )
}