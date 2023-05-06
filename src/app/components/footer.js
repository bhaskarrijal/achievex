import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='flex justify-between w-full py-5 mt-16 border-t'>
                <p className='text-center text-gray-500'>
                    <span className='font-medium text-primary'>achieveX</span>
                    {' '}
                    © {new Date().getFullYear()}</p>
                <p className='text-center text-gray-500'>Made by
                    {' '}
                    <span className='font-medium text-primary'>The Catalysts</span>
                </p>
            </div>
        </>
    )
}

export default Footer