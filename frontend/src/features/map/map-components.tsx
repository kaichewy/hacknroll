import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 1.3521, // Centered on Singapore
  lng: 103.8198,
};

interface MapComponentsProps {
  isLoaded: boolean;
}

const MapComponents: React.FC<MapComponentsProps> = ({ isLoaded }) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const autocompleteStartRef = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteEndRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (isLoaded && startInputRef.current && endInputRef.current) {
      const options = {
        fields: ["geometry", "formatted_address"],
        types: ["geocode"],
      };

      // Initialize Autocomplete for Start Input
      autocompleteStartRef.current = new window.google.maps.places.Autocomplete(
        startInputRef.current!,
        options
      );
      autocompleteStartRef.current.addListener("place_changed", () => {
        const place = autocompleteStartRef.current!.getPlace();
        if (place.geometry) {
          setStartPoint(place.formatted_address || "");
        }
      });

      // Initialize Autocomplete for End Input
      autocompleteEndRef.current = new window.google.maps.places.Autocomplete(
        endInputRef.current!,
        options
      );
      autocompleteEndRef.current.addListener("place_changed", () => {
        const place = autocompleteEndRef.current!.getPlace();
        if (place.geometry) {
          setEndPoint(place.formatted_address || "");
        }
      });
    }
  }, [isLoaded]);

  // Function to Fetch Directions
  const fetchDirections = () => {
    if (!startPoint || !endPoint) {
      setError("Please enter both starting and ending locations.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startPoint,
        destination: endPoint,
        travelMode: google.maps.TravelMode.TRANSIT, // Public Transport Mode
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          setError(null);
        } else {
          setError("Could not fetch directions. Please try again.");
        }
      }
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Google Map */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Render Directions */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      {/* Input and Controls */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          ref={startInputRef}
          type="text"
          placeholder="Enter starting location"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <input
          ref={endInputRef}
          type="text"
          placeholder="Enter destination"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={fetchDirections}
          style={{
            padding: "10px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Get Directions
        </button>
        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      </div>
    </div>
  );
};

export default MapComponents;
