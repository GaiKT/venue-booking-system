import React, { useState } from 'react'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function BookingUpcoming({bookings , roomId}) {
    
    const [today , setToday] = useState(new Date())

  return (
    <>
        <div className='absolute top-0 right-0 h-20 w-5/6 bg-[#2EBAEE] shadow-lg'>
            <h1 className='absolute left-10 text-[54px] font-bold text-white'>{roomId}</h1>
        </div>
        <div className='mt-40 flex flex-col gap-6 text-white items-end text-lg'>
            <div className='w-5/6 flex flex-col gap-10'>
                <p>{roomId === 'Homepage' ? 'Welcome Venue Booker' : 'Upcoming'}</p>
                <p className='text-[64px] opacity-50'>{format(today , 'EEEE')}</p>
                <p className='text-[64px]'>{format(today , 'dd MMM')}</p>
            </div>
            <div className='w-5/6 mt-10 flex flex-col gap-5 text-base'>
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
                            <p className='text-lg'>{bookings.title}</p>
                        </div>
                        )
                    })
                    : <p className='mt-10'> {roomId === 'Homepage' ? 'Please select room.' : 'Today this room is not have booking.'} </p>
                }
            </div>
        </div>
        {
            roomId !== 'Homepage' &&
            <div className='flex justify-center font-bold text-lg text-white mt-10'>
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
