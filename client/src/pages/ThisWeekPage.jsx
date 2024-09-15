import React, { useEffect, useState } from 'react'
import { data } from '../assets/mookup-db.js'
import { getBookingsForWeek , getWeekNumber } from '../utils/getBookingForWeek'
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function ThisWeekPage() {
  const [bookings , setBooking] = useState([])
  const [today , setToday] = useState(new Date())
  const [bookingWithDay , setBookingWithDay] = useState([])

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

  const groupBookingsByStartDate = () => {
    // Helper function to format date as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Initialize an empty object to store grouped bookings
    const groupedBookings = {};

    bookings.forEach((booking) => {
        const startDate = new Date(booking.startTime);
        const startDayStr = formatDate(startDate);

        // Initialize the array if it doesn't exist
        if (!groupedBookings[startDayStr]) {
            groupedBookings[startDayStr] = [];
        }

        // Add booking to the array for the corresponding start date
        groupedBookings[startDayStr].push(booking);
    });

    // Convert the groupedBookings object to an array
    const bookingsArray = Object.entries(groupedBookings).map(([date, bookings]) => ({
        date,
        bookings
    }));

    // Update state or handle the bookingsArray as needed
    setBookingWithDay(bookingsArray);
};

  useEffect(()=>{
      const currantWeekNo = getWeekNumber(today)
      const todayBooking = getBookingsForWeek( roomId , currantWeekNo , data)
      setBooking(todayBooking.thisWeek)
      groupBookingsByStartDate()
  },[])

  return (
          <>
            <div className='w-10 border-r h-full'></div>
            <div className='absolute top-32 left-0 w-full flex flex-col gap-5'> 
              {
                bookingWithDay.map((date , index)=>{
                  return(
                  <React.Fragment key={index}>                  
                    <h1 className='pl-20 py-2 w-full bg-[#F7F7F7] font-bold text-lg text-[#787878]'>
                      {format(today , 'EEEE, dd MMM') ===  format(date.date , 'EEEE, dd MMM') ? `Today (${format(date.date , 'EEEE, dd MMM')})` : format(date.date , 'EEEE, dd MMM')}
                    </h1>
                    <div>
                      {
                        date.bookings?.map((booking , index)=>{
                          const strTime = new Date(booking.startTime)
                          const endTime = new Date(booking.endTime)
                            let newEndTime = ''
                            if(strTime - endTime / (1000 * 60 * 60 * 24)  > 1){
                                newEndTime = format(booking.endTime , 'EEEE dd MMM HH:mm')
                            }else{
                                newEndTime = setFormatTime(booking.endTime)
                            }
                          return (
                            <div key={index} className='flex gap-5 pl-9'>
                              <div className='w-2 h-2 rounded-full bg-green-500 mt-2'></div>
                              <div>
                                <p className='opacity-50'>{setFormatTime(booking.startTime)} - {newEndTime}</p>
                                <p className='text-xl'>{booking.title}</p>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </React.Fragment>
                  )
                })            
              }

            </div>
          </>
  )
}
