import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { debounce } from "lodash";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const mockPolylinePath = [
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: 2.917, lng: 101.650 },  // Mock stop 1
  { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
];




const libraries = ["places"];

const App: React.FC = () => {
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //   version: "3.58",
  //   libraries,
  // });
  const { state } = useLocation();
  const { startCoords, endCoords } = state || {}; // Retrieve geocoded coordinates
  const mapRef = useRef<google.maps.Map | null>(null);
  const PolylinePath = [startCoords, endCoords];
  // State management
  const [center, setCenter] = useState( startCoords ); // Initial center (Singapore)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

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

  // Convert polyline coordinates to waypoints
  const waypoints = PolylinePath.slice(1, -1).map((point) => ({
    location: point,
    stopover: true,
  }));

  // if (loadError) {
  //   return <div>Error loading Google Maps API</div>;
  // }

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center} // Bind center to state // Initial zoom level
      onLoad={handleMapLoad}
      onCenterChanged={handleCenterChanged} // Capture map center changes
      options={{
        zoomControl: true,
        mapTypeControl: true,
      }}
    >
      <DirectionsService
        options={{
          origin: PolylinePath[0],
          destination: PolylinePath[PolylinePath.length - 1],
          travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, TRANSIT, etc.
          waypoints, // Pass the waypoints
          optimizeWaypoints: true, // Optional: Optimize the route for efficiency
        }}
        callback={handleDirectionsCallback}
      />

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true, // Optional: Prevent DirectionsRenderer from adding default markers
            preserveViewport: true, // Prevent map center and zoom changes
          }}
        />
      )}
    </GoogleMap>
    </div>
  );
};

export default App;
