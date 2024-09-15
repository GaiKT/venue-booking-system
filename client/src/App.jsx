import './App.css';
import BookingPage from './pages/BookingPage';
import ThisWeekPage from './pages/ThisWeekPage';
import NextWeekPage from './pages/NextWeekPage'; // Assuming you have this component
import WholeMonthPage from './pages/WholeMonthPage'; // Assuming you have this component
import Layout from './layouts/Layout';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      element: <Layout><NextWeekPage /></Layout>, // Use NextWeekPage component
    },
    {
      path: "/bookings/whole-month",
      element: <Layout><WholeMonthPage /></Layout>, // Use WholeMonthPage component
    }
  ]);

  createRoot(document.getElementById("root")).render(
    <div className='h-screen w-screen py-[2%] px-[4%] bg-slate-400'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
