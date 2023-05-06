import ChallengeForm from "../components/ChallengeForm"

export default function NewChallenge() {
    return (
        <>
            <div className='flex flex-col justify-between w-full py-5'>
                <h1 className="text-3xl font-bold">Create New Challenge</h1>
                <p className='text-gray-500'>
                    Fill in the form below to create a new challenge.
                </p>
            </div>
            <ChallengeForm />
        </>
    )
}