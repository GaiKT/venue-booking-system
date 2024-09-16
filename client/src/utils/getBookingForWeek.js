export const getBookingsForWeek = (roomId, weekNo, bookingData) => {
  if (!roomId) {
      return 'roomId is required.';
  }

  // Helper function to get the week number
  const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      return Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const today = new Date();
  const todayStr = today.toDateString();

  // Filter bookings by roomId
  const bookingsForRoom = bookingData.filter((booking) => booking.roomId === roomId);

  // Initialize the result object
  const resultBooking = {
      today: [],
      thisWeek: [],
      nextWeek: [],
      thisMonth: []
  };

  // Filter bookings for today
  const toDayBooking = bookingsForRoom.filter((booking) => {
      const bookingStartTime = new Date(booking.startTime).toDateString();
      return bookingStartTime === todayStr;
  });

  // Filter bookings for this week
  const bookingsForThisWeek = bookingsForRoom.filter((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      const bookingWeekNo = getWeekNumber(bookingStartTime);
      return bookingWeekNo === weekNo;
  });

  // Filter bookings for next week
  const bookingsForNextWeek = bookingsForRoom.filter((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      const bookingWeekNo = getWeekNumber(bookingStartTime);
      return bookingWeekNo === weekNo + 1;
  });

  // Filter bookings for this month
  const bookingsForThisMonth = bookingsForRoom.filter((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      return bookingStartTime.getMonth() === today.getMonth() && bookingStartTime.getFullYear() === today.getFullYear();
  });

  // Assign bookings to the corresponding keys
  resultBooking.today = toDayBooking;
  resultBooking.thisWeek = bookingsForThisWeek;
  resultBooking.nextWeek = bookingsForNextWeek;
  resultBooking.thisMonth = bookingsForThisMonth;

  return resultBooking;
};


export const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};


export const setFormatTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 

    const timeString = `${hours}:${minutes}`; 
    return timeString
}