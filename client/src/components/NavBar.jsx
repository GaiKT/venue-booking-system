import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function NavBar() {
    const currentUrl = window.location.pathname;
    const activePage = currentUrl.split('/')[2]; // Extract the active page from the URL path
    const tab = ['this-week', 'next-week', 'whole-month'];

    // Get query params
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');

    return (
        <nav className='w-full top-0 h-20 bg-[#EFEEEC] absolute z-50'>
            <ul className='flex gap-10 lg:text-2xl md:text-sm text-base w-fit absolute left-10 bottom-0 h-11'>
                {   
                    tab.map((tab, index) => {

                        return(            
                            <li 
                                key={index} 
                                className={
                                    'hover:opacity-100 border-b-4 transition-all ' + 
                                    (activePage === tab ? 'border-b-[#46529D] opacity-100' : 'border-b-transparent opacity-50')
                                }
                            >
                                <Link to={`/bookings/${tab}?roomId=${roomId}`}>
                                    {tab.split('-').join(' ').toUpperCase()}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
