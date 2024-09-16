import React, { useEffect} from 'react'
import NavBar from '../components/NavBar';
import { useSearchParams } from 'react-router-dom';
import BookingUpcoming from '../components/BookingUpcoming';
import { useBooking } from '../context/BookingContext';

const Layout = ({ children }) => {
  const {booking , getBooking} = useBooking();

  //get query params
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  useEffect(()=>{
    getBooking(roomId)
  },[])

  return (
    <section className='flex h-full w-full bg-white'>
        <div className='w-2/6 bg-[#46529D] h-full relative'>
            <BookingUpcoming bookings={booking.today} roomId={roomId}/>
        </div>
        <div className='w-4/6 h-full relative'>
            <NavBar/>
            <div className='h-full w-full relative shadow-lg overflow-y-auto'>
                {children}
            </div>
        </div>
    </section>
  );
}

export default Layout;