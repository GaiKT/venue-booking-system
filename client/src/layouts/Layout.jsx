import React from 'react';
import NavBar from '../components/NavBar';
import BookingUpcoming from '../components/BookingUpcoming';

const Layout = ({ children }) => {
  return (
    <section className='flex h-full w-full bg-white'>
        <div className='w-2/6 bg-[#46529D] h-full relative'>
            <BookingUpcoming/>
        </div>
        <div className='w-4/6 h-full relative'>
            <NavBar/>
            <div className='h-full w-full relative shadow-lg'>
                {children}
            </div>
        </div>
    </section>
  );
}

export default Layout;