import React from 'react';
import { format, differenceInDays, differenceInHours ,addDays } from 'date-fns';

export default function BookingList({ bookingWithDay }) {
  const today = format(new Date() , 'EEE, dd MMM')
  const tomorrow = format(addDays(new Date(), 1) , 'EEE, dd MMM')
  return (
    <>
      <div className='w-10 border-r h-full'></div>
      <div className='absolute top-32 left-0 w-full flex flex-col gap-5'>
        {bookingWithDay.length > 0 ? (
          bookingWithDay?.map((keyDate, index) => {
            const { date, booking } = keyDate;
            
            return (
              <React.Fragment key={index}>
                <h1 className='pl-20 py-2 w-full bg-[#F7F7F7] font-bold text-lg text-[#787878]'>
                  {
                    date === today ? `Today (${date})` : date === tomorrow ? `Tomorrow (${date})` : date
                  }
                </h1>
                <div>
                  {booking.length > 0 ? (
                    booking.map((bookingItem, bookingIndex) => {
                      const startTime = new Date(bookingItem.startTime);
                      const endTime = new Date(bookingItem.endTime);
                      
                      const isMultiDay = differenceInDays(endTime, startTime) > 0;
                      const endDateFormat = isMultiDay ? format(endTime, 'EEE, dd MMM') : format(endTime, 'HH:mm');

                      const hours = startTime.getHours();
                      let bgDot = '';
                      if (hours < 13) {
                        bgDot = 'bg-blue-500';
                      } else if (hours < 16) {
                        bgDot = 'bg-green-500';
                      } else {
                        bgDot = 'bg-orange-500';
                      }

                      // Calculate margin-top based on hours difference between consecutive bookings
                      const previousEndTime = booking[bookingIndex - 1]?.endTime;
                      const mt = previousEndTime ? differenceInHours(startTime, new Date(previousEndTime)) : 0;

                      return (
                        <div className={`flex gap-5 pl-9 ${mt > 0 ? `mt-12` : ''}`} key={bookingIndex}>
                          <div className={`w-2 h-2 rounded-full mt-2 ${bgDot}`}></div>
                          <div>
                            <p className='opacity-50'>{format(startTime, 'HH:mm')} - {endDateFormat}</p>
                            <p className='text-xl'>{bookingItem.title}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className='pl-9'>No bookings for this date.</p>
                  )}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className='flex w-full h-80 justify-center items-center'>
            <p>No booking.</p>
          </div>
        )}
      </div>
    </>
  );
}
