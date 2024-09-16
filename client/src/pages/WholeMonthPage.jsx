import React from 'react'
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { setFormatTime } from '../utils/getBookingForWeek';

export default function WholeMonthPage() {

  const {booking , getBooking} = useBooking()

  return (
    <>
      <div className='w-10 border-r h-full'></div>
      <div className='absolute top-32 left-0 w-full flex flex-col gap-5'> 
        {
          booking?.thisMonth.map((booking , index)=>{
            return(
            <React.Fragment key={index}>                  
              <h1 className='pl-20 py-2 w-full bg-[#F7F7F7] font-bold text-lg text-[#787878]'>
                {format(booking.startTime , 'EEE, dd MMM')}
              </h1>
              <div>
                <div className='flex gap-5 pl-9'>
                    <div className='w-2 h-2 rounded-full bg-green-500 mt-2'></div>
                  <div>
                    <p className='opacity-50'>{setFormatTime(booking.startTime)} - {format(booking.endTime , 'EEE dd MMM')}</p>
                    <p className='text-xl'>{booking.title}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
            )
          })            
        }

      </div>
    </>
  )
}
