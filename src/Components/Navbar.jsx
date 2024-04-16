import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around bg-slate-700 text-white py-5'>
        <div className="logo">
            <span className="font-bold text-xl mx-9">MyTasks</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar