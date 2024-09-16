import React from 'react'

const rooms = ['A101' , 'A102' , 'Auditorium']

export default function BookingPage() {
  return (
    <div className='h-full relative'>
      <div className= 'relative top-0 left-0 h-20 flex justify-center items-center bg-[#EFEEEC]'>
        <h1 className='text-[54px] font-bold opacity-45'>Rooms</h1>
      </div>
      <div className='min-h-52 flex justify-center items-center'>
        <ul className='flex gap-10 text-2xl font-semibold'>
          {
            rooms.map((room , index)=>{
              return  <li key={index} className='hover:underline hover:opacity-100 opacity-45 transition-all'><a href={`/bookings/this-week?roomId=${room}`}>{room}</a></li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
