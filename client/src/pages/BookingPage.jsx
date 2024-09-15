import React from 'react'
import { Link } from "react-router-dom";

const rooms = ['A101' , 'A102' , 'Auditorium']

export default function BookingPage() {
  return (
    <>
        <div>HomePage</div>
        <ul>
            <h1>Rooms</h1>
            {
              rooms.map((room)=>{
                return  <li>
                            <Link to={`/bookings/thisweek?roomId=${room}`}>{room}</Link>
                        </li>
              })
            }
        </ul>
    </>
  )
}
