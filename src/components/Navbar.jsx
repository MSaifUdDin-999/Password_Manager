import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='mycontainer flex justify-around items-center px-4 h-14'>
                <div className='logo font-bold text-white text-2xl'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>

                <a
                    href="https://github.com/MSaifUdDin-999/Password_Manager"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1 w-fit cursor-pointer'
                >
                    <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar
