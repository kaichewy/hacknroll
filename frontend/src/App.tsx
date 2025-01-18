import React, { useRef, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

import { debounce } from "lodash";


const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const App: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "3.58",
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // Center state to allow dynamic updates
  const [center, setCenter] = useState({ lat: 1.3521, lng: 103.8198 }); // Initial center (Singapore)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const origin = { lat: 1.3521, lng: 103.8198 }; // Singapore
  const destination = { lat: 3.139, lng: 101.6869 }; // Kuala Lumpur

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
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center} // Bind center to state
      zoom={7} // Initial zoom level
      onLoad={handleMapLoad}
      onCenterChanged={handleCenterChanged} // Capture map center changes
      options={{
        zoomControl: true,
        mapTypeControl: true,
      }}
    >
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: google.maps.TravelMode.TRANSIT,
        }}
        callback={handleDirectionsCallback}
      />

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: false, // Optional: Prevent DirectionsRenderer from adding default markers
            preserveViewport: true, // Prevent map center and zoom changes
          }}
        />
      )}
    </GoogleMap>
  );
};

export default App;
