import './App.css'
import BookingPage from './pages/BookingPage';
import ThisWeekPage from './pages/ThisWeekPage';
import Layout from './layouts/Layout';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/bookings",
      element: <BookingPage/>,
    },
    {
      path: "/bookings/thisweek",
      element:  <Layout>
                  <ThisWeekPage/>
                </Layout>
    },
    {
      path: "/bookings/nextweek",
      element:  <Layout>
                  <ThisWeekPage/>
                </Layout>
    },
    {
      path: "/bookings/wholemonth",
      element:  <Layout>
                  <ThisWeekPage/>
                </Layout>
    }
  ]);
  
  createRoot(document.getElementById("root")).render(
    <div className=' h-screen w-screen py-[2%] px-[4%] bg-slate-400'>
      <RouterProvider router={router} />
    </div>
  );
  
  
}

export default App




