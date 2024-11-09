import React from 'react'
import deliver from '../assets/download.gif'
import Header from '../page/header'

export default function Succsus() {
    return (
        <div className='h-screen bg-white'>
            <Header />
            <div className='flex w-full justify-center'>
                <div className='lg:text-6xl text-2xl font-dynapuff  pt-20  text-green-600 '>Your Order is on the  way</div>

            </div>
            <div className='flex flex-col items-center justify-center'>
                <img src={deliver} className='pt-6' alt="" />
                <div className='px-4 py-3 text-lg rounded-xl w-fil text-white bg-green-600'>Go Back To Home</div>

            </div>
        </div >
    )
}
