import React, { useEffect, useState } from 'react'
import { useBooking } from '../context/BookingContext';
import { filterBookingWithDay } from '../utils/getBookingForWeek';
import BookingList from '../components/BookingList';

export default function WholeMonthPage() {
  
  const {booking} = useBooking()
  const [bookingWithDay , setBookingWithDay] = useState([])

  useEffect(()=>{
    const result = filterBookingWithDay(booking.nextWeek)
    setBookingWithDay(result)
  },[booking])

  return <BookingList bookingWithDay={bookingWithDay} />
}