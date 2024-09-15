export const getBookingsForWeek = (roomId, weekNo , bookingData) => {
    // Check if roomId is provided
    if (!roomId) {
      return 'roomId is required.';
    }

    // Filter bookings by roomId
    const bookingsForRoom = bookingData.filter((booking) => booking.roomId === roomId);
    
    //function to get week number
    const getWeekNumber = (date) => {
  
    //find first day fo the year
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        
    //find past days of the year 
    const pastDaysOfYear = (date - firstDayOfYear + (firstDayOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) / 86400000;
            
    //Count past of week to currant week and return it
    return Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // Filter bookings that fall within the specified week number
    const bookingsForThisWeek = bookingsForRoom.filter((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      const bookingWeekNo = getWeekNumber(bookingStartTime);
      return bookingWeekNo === weekNo;
    });
  
    //Filter bookings next week
    const bookingsForNextWeek = bookingsForRoom.filter((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      const bookingWeekNo = getWeekNumber(bookingStartTime);
      return bookingWeekNo === weekNo + 1;
    });
  
    //Filter Today booking
    const toDayBooking = bookingsForThisWeek.filter((booking)=>{
      const bookingStartTime = new Date(booking.startTime).getDate();
      return bookingStartTime === new Date().getDate()
    })
  
    //Make object for return
    const resultBooking = {
      thisWeek : [...bookingsForThisWeek] ,
      nextWeek : [...bookingsForNextWeek] ,
      today : [...toDayBooking]
    }
  
    return bookingsForThisWeek.length > 0 || bookingsForNextWeek.length > 0 ? resultBooking : `No bookings found for room ${roomId} in week ${weekNo}.`;
  };


export const getWeekNumber = (date) => {
  
//find first day fo the year
const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    
//find past days of the year 
const pastDaysOfYear = (date - firstDayOfYear + (firstDayOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) / 86400000;
        
//Count past of week to currant week and return it
return Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};