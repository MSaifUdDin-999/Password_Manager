import React from 'react'

const Footer = () => {
    return (
        <div className='w-full bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0'>
            <div className='logo font-bold text-white text-2xl'>
                <span className='text-green-500'> &lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Coded with <img className='w-7 mx-2' src="/icons/heart.png" alt="" /> by &nbsp;
                <a href="https://portfolio-m-saif-ud-din.vercel.app/" target="_blank" rel="noopener noreferrer"> <b>M Saif Ud Din</b></a>
            </div>
        </div>
    )
}

export default Footer
