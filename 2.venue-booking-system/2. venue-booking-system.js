
/* Current Booking Data */
const bookingData = [
    {
      "id": 1,
      "roomId": "A101",
      "startTime": "2019-09-28 13:00:00",
      "endTime": "2019-09-28 14:00:00",
      "title": "Lunch with Petr"
    },
    {
      "id": 2,
      "roomId": "A101",
      "startTime": "2019-09-28 14:00:00",
      "endTime": "2019-09-28 15:00:00",
      "title": "Sales Weekly Meeting"
    },
    {
      "id": 3,
      "roomId": "A101",
      "startTime": "2019-09-28 16:00:00",
      "endTime": "2019-09-28 18:00:00",
      "title": "Anastasia Website Warroom"
    },
    {
      "id": 4,
      "roomId": "A101",
      "startTime": "2019-09-29 13:00:00",
      "endTime": "2019-09-29 14:00:00",
      "title": "One-on-One Session"
    },
    {
      "id": 5,
      "roomId": "A101",
      "startTime": "2019-09-29 16:00:00",
      "endTime": "2019-09-29 18:00:00",
      "title": "UGC Sprint Planning"
    },
    {
      "id": 6,
      "roomId": "A102",
      "startTime": "2019-09-30 09:00:00",
      "endTime": "2019-10-04 18:00:00",
      "title": "5-Day Design Sprint Workshop"
    },
    {
      "id": 7,
      "roomId": "Auditorium",
      "startTime": "2019-09-19 09:00:00",
      "endTime": "2019-09-23 19:00:00",
      "title": "Thai Tech Innovation 2019"
    },
    {
      "id": 8,
      "roomId": "A101",
      "startTime": "2019-09-28 10:00:00",
      "endTime": "2019-09-28 13:00:00",
      "title": "Raimonland project"
    },
    {
      "id": 9,
      "roomId": "A102",
      "startTime": "2019-09-30 18:00:00",
      "endTime": "2019-09-30 20:00:00",
      "title": "Management Meetinng"
    },
    {
      "id": 10,
      "roomId": "A101",
      "startTime": "2019-10-04 14:00:00",
      "endTime": "2019-10-06 11:00:00",
      "title": "3-day workshop Corgi costume"
    },

    // test case this year
    {
      "id": 11,
      "roomId": "A101",
      "startTime": "2024-09-15 14:00:00",
      "endTime": "2024-09-16 11:00:00",
      "title": "3-day workshop Corgi costume"
    },
    {
      "id": 12,
      "roomId": "A101",
      "startTime": "2024-09-22 14:00:00",
      "endTime": "2024-09-23 11:00:00",
      "title": "3-day workshop Corgi costume"
    },
    {
      "id": 13,
      "roomId": "A101",
      "startTime": "2024-09-14 14:00:00",
      "endTime": "2024-09-15 11:00:00",
      "title": "3-day workshop Corgi costume"
    }

]
  
// function check available rooms
const checkAvailability = (roomId, startTime, endTime) => {

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
        return "Start time must be before end time.";
    }

    // check fault input
    if(!roomId || !startTime || !endTime){
        return "roomId , startTime , endTime is require."
    }

    //find room data form roomId
    const bookingRoomData = bookingData.filter((booking)=>booking.roomId === roomId)

    //check available room
    const isAvailable = bookingRoomData.every((booking) => {
        const BookingStartTime = new Date(booking.startTime);
        const BookingEndTime = new Date(booking.endTime);

        // Check if new booking overlaps with the current booking
        return (end <= BookingStartTime || start >= BookingEndTime);
    });

    return isAvailable
}

// test case
let checkRoom1 = checkAvailability('A101' , '2019-10-04 13:00:00', '2019-10-04 14:00:00')
let checkRoom2 = checkAvailability('A102' , '2019-10-04 13:00:00', '2019-10-04 14:00:00')
let checkRoom3 = checkAvailability('Auditorium' , '2019-10-04 13:00:00', '2019-10-04 14:00:00')

console.log(checkRoom1)
console.log(checkRoom2)
console.log(checkRoom3)

  
const getBookingsForWeek = (roomId, weekNo) => {
  // Check if roomId is provided
  if (!roomId) {
    return 'roomId is required.';
  }

  //function to get week number
  const getWeekNumber = (date) => {

    //find first day fo the year
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

    //find past days of the year 
    const pastDaysOfYear = (date - firstDayOfYear + (firstDayOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) / 86400000;
    
    //Count past of week to currant week and return it
    return Math.floor((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Filter bookings by roomId
  const bookingsForRoom = bookingData.filter((booking) => booking.roomId === roomId);

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

// Example usage
const getBooking = getBookingsForWeek('A101', 37);
console.log(getBooking);


