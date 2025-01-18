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

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const mockPolylinePath = [
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: 1.3612, lng: 103.8863 },  // Mock stop 1
  { lat: 1.2838, lng: 103.8591 }, // Kuala Lumpur
];

const App: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "3.58",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // Center state to allow dynamic updates
  const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 }); // Initial center (Singapore)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleDirectionsCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      setDirections(response);
    } else {
      console.error(`Directions request failed with status: ${status}`);
    }
  };

  const waypoints = mockPolylinePath.slice(1, -1).map((point) => ({
    location: point,
    stopover: true,
  }));

  const handleCenterChanged = debounce(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()?.toJSON();
      if (
        newCenter &&
        (newCenter.lat !== center.lat || newCenter.lng !== center.lng)
      ) {
        setCenter(newCenter);
      }
    }
  }, 300); // Updates at most once every 300ms


  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
