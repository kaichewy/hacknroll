import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

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
        {/* Add additional map components here if needed */}
      </GoogleMap>
    </LoadScript>
  );
};

export default App;
