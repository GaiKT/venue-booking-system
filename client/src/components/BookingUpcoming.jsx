import React, { useState } from 'react'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function BookingUpcoming({bookings , roomId}) {
    
    const [today , setToday] = useState(new Date())

  return (
    <>
        <div className='absolute top-0 right-0 h-20 w-5/6 bg-[#2EBAEE] shadow-md'>
            <h1 className='absolute left-6 text-[48px] font-bold text-white'>{roomId}</h1>
        </div>
        <div className='md:mt-40 mt-24 flex flex-col gap-6 text-white md:items-end items-center text-md'>
            <div className='w-5/6 flex md:flex-col md:gap-10 gap-5'>
                <p>{roomId === 'Homepage' ? 'Welcome Venue Booker' : 'Upcoming'}</p>
                <p className='md:text-[64px] text-xl opacity-50'>{format(today , 'EEEE')}</p>
                <p className='md:text-[64px] text-xl'>{format(today , 'dd MMM')}</p>
            </div>
            <div className='w-5/6 md:mt-10 flex flex-col gap-5 text-base max-md:pb-4'>
                {
                
                    bookings ?
                    bookings.map((bookings , index)=>{
                        const strTime = new Date(bookings.startTime)
                        const endTime = new Date(bookings.endTime)
                        let newEndTime = ''
                        if(strTime - endTime / (1000 * 60 * 60 * 24)  > 1){
                            newEndTime = format(bookings.endTime , 'EEEE dd MMM HH:mm')
                        }else{
                            newEndTime = format(bookings.endTime , 'HH:mm')
                        }
                        return (                
                        <div key={index}>
                            <p className='opacity-50'>{format(bookings.startTime , 'HH:mm')} - {newEndTime}</p>
                            <p className='text-md'>{bookings.title}</p>
                        </div>
                        )
                    })
                    : <p className='md:mt-10'> {roomId === 'Homepage' ? 'Please select room.' : 'Today this room is not have booking.'} </p>
                }
            </div>
        </div>
        {
            roomId !== 'Homepage' &&
            <div className='flex justify-center font-bold text-md text-white mt-10'>
                <Link to={'/bookings'}>
                    <button>
                        Back
                    </button>
                    </Link>
            </div>
        }
    </>
  )
}
