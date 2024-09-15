import React, { useEffect, useState } from 'react'
import { data } from '../assets/mookup-db.js'
import { getBookingsForWeek , getWeekNumber } from '../utils/getBookingForWeek'
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function BookingUpcoming() {
    const [bookings , setBooking] = useState([])
    const [today , setToday] = useState(new Date())

    //get query params
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');

    const setFormatTime = (dateTime) => {
        const date = new Date(dateTime);
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 

        const timeString = `${hours}:${minutes}`; 
        return timeString
    }

    useEffect(()=>{
        const currantWeekNo = getWeekNumber(today)
        const todayBooking = getBookingsForWeek( roomId , currantWeekNo , data)
        setBooking( todayBooking.today)
    },[])

  return (
    <>
        <div className='absolute top-0 right-0 h-20 w-5/6 bg-[#2EBAEE] shadow-lg'>
            <h1 className='absolute left-10 text-[54px] font-bold text-white'>{roomId}</h1>
        </div>
        <div className='mt-40 flex flex-col gap-6 text-white items-end text-lg'>
            <div className='w-5/6 flex flex-col gap-10'>
                <p>Upcoming</p>
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
                            newEndTime = setFormatTime(bookings.endTime)
                        }
                        return (                
                        <div key={index}>
                            <p className='opacity-50'>{setFormatTime(bookings.startTime)} - {newEndTime}</p>
                            <p className='text-lg'>{bookings.title}</p>
                        </div>
                        )
                    })
                    : <p className='mt-10'> Today this room is not have booking. </p>
                }
            </div>
        </div>
    </>
  )
}
