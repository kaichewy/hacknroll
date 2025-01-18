import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

// Mock polyline path with multiple waypoints
const mockPolylinePath = [
  { lat: 1.3521, lng: 103.8198 }, // Singapore (Origin)
  { lat: 2.5, lng: 101.7 },       // Stop 1
  { lat: 2.917, lng: 101.650 },   // Stop 2
  { lat: 3.139, lng: 101.6869 },  // Kuala Lumpur (Destination)
];

const App: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "3.58",
  });

  const [directionsArray, setDirectionsArray] = useState<google.maps.DirectionsResult[]>([]);

  const handleDirectionsCallback = (
    index: number,
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK && response) {
      setDirectionsArray((prev) => {
        const newDirections = [...prev];
        newDirections[index] = response;
        return newDirections;
      });
    } else {
      console.error(`Directions request failed with status: ${status}`);
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Divide the route into segments (origin, stop 1, stop 2, destination)
  const segments = [];
  for (let i = 0; i < mockPolylinePath.length - 1; i++) {
    segments.push({
      origin: mockPolylinePath[i],
      destination: mockPolylinePath[i + 1],
    });
  }

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={mockPolylinePath[0]} zoom={7}>
      {segments.map((segment, index) => (
        <DirectionsService
          key={index}
          options={{
            origin: segment.origin,
            destination: segment.destination,
            travelMode: google.maps.TravelMode.TRANSIT,
          }}
          callback={(response, status) => handleDirectionsCallback(index, response, status)}
        />
      ))}

      {directionsArray.map((directions, index) => (
        <DirectionsRenderer
          key={index}
          directions={directions}
          options={{
            suppressMarkers: false,
            preserveViewport: true,
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default App;
