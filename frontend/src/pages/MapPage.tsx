import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { debounce } from "lodash";
import { Coordinate, RouteRequest } from "../features/map/map-types";
import mapClient from "../features/map/map-api-client";

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
  // const PolylinePath = [startCoords, endCoords]; // make this the return value of axios call
  const [polylinePath, setPolylinePath] = useState<Coordinate[]>([]);
  // State management
  const [center, setCenter] = useState( startCoords ); // Initial center (Singapore)
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    const routeReq: RouteRequest = {
      src: startCoords,
      dst: endCoords,
    };

    const getDirections = async () => {
      try {
        const res = await mapClient.getRoute(routeReq);

        if (res.type === "success" && res.data) {
          const coords = res.data;
          setPolylinePath(coords);
        } else {
          throw new Error(res.error);
        }
      } catch (err) {
        console.error("[FormPage.handleFormSubmit] Failed to get route", err);
      }
    }

    getDirections();
  }, [startCoords, endCoords])

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
  const waypoints = polylinePath.slice(1, -1).map((point) => ({
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
          origin: polylinePath[0],
          destination: polylinePath[polylinePath.length - 1],
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
