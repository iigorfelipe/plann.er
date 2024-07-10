import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TripDetailsPage from "./pages/trip-details";
import CreateTripPage from "./pages/create-trip";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </>
  )
}

export default App
