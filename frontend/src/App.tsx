import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";

/**
 * App router
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route index element={<HomePage />} />
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Define map container style
const mapContainerStyle = {
  width: "100%",
  height: "100vh", // Full screen height
};

// Initial map center coordinates (e.g., Singapore)
const center = {
  lat: 1.3521,
  lng: 103.8198,
};

const App: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10} // Adjust zoom level
      >
        {/* Add additional map components here if needed */
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default App
// */
// export default App;
