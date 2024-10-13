import React from 'react'
import PulseLoader from './PulseLoader'

const FullScreenLoader = ({title}:{title?:string}) => {
    return (
        <div className=' flex h-screen bg-black justify-center items-center flex-col'>
            <h1 className='text-white'><PulseLoader /></h1>
            <p className='text-white my-2'>{title}</p>
        </div>
    )
}

export default FullScreenLoader