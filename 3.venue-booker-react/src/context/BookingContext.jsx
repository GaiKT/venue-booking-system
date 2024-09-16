import React, { useState } from 'react';
import { getBookingsForWeek} from '../utils/getBookingForWeek';
import { getWeek } from 'date-fns';
import { data } from '../assets/mookup-db';

// Create the context
const BookingContext = React.createContext();

const BookingProvider = ({ children }) => {
  // Initialize booking state
  const [booking, setBooking] = useState({
    today: [],
    thisWeek: [],
    nextWeek: [],
    thisMonth: []
  });

  // Define the getBooking function
  const getBooking = (roomId) => {
    const today = new Date();
    const thisWeekNo = getWeek(today);
    const newBooking = getBookingsForWeek(roomId, thisWeekNo, data);
    
    setBooking({
      today: newBooking.today,
      thisWeek: newBooking.thisWeek,
      nextWeek: newBooking.nextWeek,
      thisMonth: newBooking.thisMonth
    });
  };

  // Pass booking and getBooking to the context provider
  return (
    <BookingContext.Provider value={{ booking, getBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
const useBooking = () => React.useContext(BookingContext);

export { BookingProvider, useBooking };
