import { getWeek, isSameDay, isSameMonth, addWeeks , format } from 'date-fns';

export const getBookingsForWeek = (roomId, weekNo, bookingData) => {
  if (!roomId) {
    return 'roomId is required.';
  }

  const today = new Date();

  // Filter and sort only active bookings (startTime is in the future or endTime is ongoing)
  const bookingsForRoom = bookingData
    .filter((booking) => {
      const bookingEndTime = new Date(booking.endTime);
      
      // Only include bookings that are either ongoing or start in the future
      return bookingEndTime >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(a.startTime);
      const dateB = new Date(b.startTime);
  
      // Sort by proximity to today
      return Math.abs(dateA - today) - Math.abs(dateB - today);
    });
  

  // Initialize the result object
  const resultBooking = {
    today: [],
    thisWeek: [],
    nextWeek: [],
    thisMonth: []
  };

  // Filter bookings for today using date-fns `isSameDay`
  const toDayBooking = bookingsForRoom.filter((booking) => {
    const bookingStartTime = new Date(booking.startTime);
    return isSameDay(bookingStartTime, today);
  });

  // Filter bookings for this week using date-fns `getWeek`
  const bookingsForThisWeek = bookingsForRoom.filter((booking) => {
    const bookingStartTime = new Date(booking.startTime);
    return getWeek(bookingStartTime) === weekNo;
  });

  // Filter bookings for next week using `getWeek` and adding a week to the current date
  const nextWeek = addWeeks(today, 1);
  const nextWeekNo = getWeek(nextWeek);
  
  const bookingsForNextWeek = bookingsForRoom.filter((booking) => {
    const bookingStartTime = new Date(booking.startTime);
    return getWeek(bookingStartTime) === nextWeekNo;
  });

  // Filter bookings for this month using date-fns `isSameMonth`
  const bookingsForThisMonth = bookingsForRoom.filter((booking) => {
    const bookingStartTime = new Date(booking.startTime);
    return isSameMonth(bookingStartTime, today);
  });

  // Assign bookings to the corresponding keys
  resultBooking.today = toDayBooking;
  resultBooking.thisWeek = bookingsForThisWeek;
  resultBooking.nextWeek = bookingsForNextWeek;
  resultBooking.thisMonth = bookingsForThisMonth;

  return resultBooking;
};

export const filterBookingWithDay = (bookingArr) => {
  // Helper function to format date as 'EEE dd MMM'
  const formatDate = (date) => format(new Date(date), 'EEE, dd MMM');
  
  // Create a mapping of date strings to booking arrays
  const bookingMap = bookingArr.reduce((acc, booking) => {
      const dateStr = formatDate(booking.startTime);
      if (!acc[dateStr]) {
          acc[dateStr] = [];
      }
      acc[dateStr].push(booking);
      return acc;
  }, {});

  // Convert the mapping to the desired format
  const resultBooking = Object.entries(bookingMap).map(([date, bookings]) => ({
      date,
      booking: bookings
  }));

  return resultBooking;
};
