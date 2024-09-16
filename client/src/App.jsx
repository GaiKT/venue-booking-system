import './App.css';
import BookingPage from './pages/BookingPage';
import ThisWeekPage from './pages/ThisWeekPage';
import NextWeekPage from './pages/NextWeekPage'; // Assuming you have this component
import WholeMonthPage from './pages/WholeMonthPage'; // Assuming you have this component
import Layout from './layouts/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/bookings",
      element: <BookingPage />,
    },
    {
      path: "/bookings/this-week",
      element: <Layout><ThisWeekPage /></Layout>,
    },
    {
      path: "/bookings/next-week",
      element: <Layout><NextWeekPage /></Layout>, 
    },
    {
      path: "/bookings/whole-month",
      element: <Layout><WholeMonthPage /></Layout>,
    }
  ]);

    return(
    <div className='h-screen w-screen py-[2%] px-[4%] bg-slate-400'>
      <BookingProvider>
        <RouterProvider router={router} />
      </BookingProvider>
    </div>
    )
  
}

export default App;
