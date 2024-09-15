import React from 'react'

export default function NavBar() {
  return (
    <nav className='w-full top-0 h-20 bg-[#EFEEEC] absolute z-50'>
        <ul className='flex gap-10 text-2xl w-fit absolute left-10 bottom-0 h-11'>
            <li className='opacity-50 hover:opacity-100 border-b-4 hover:border-b-[#46529D] transition-all'>
                <a href="#">THIS WEEK</a>
            </li>
            <li className='opacity-50 hover:opacity-100 border-b-4 hover:border-b-[#46529D] transition-all'>
                <a href="#">NEXT WEEK</a>
            </li>
            <li className='opacity-50 hover:opacity-100 border-b-4 hover:border-b-[#46529D] transition-all'>
                <a href="#">WHOLE MONTH</a>
            </li>
        </ul>
    </nav>
  )
}
