import React, { useRef, useEffect, useState } from "react";

interface MapComponentsProps {
  isLoaded: boolean; // Prop to check if the Google Maps API has loaded
  onFormSubmit: (start: string, end: string) => void; // Callback for form submission
}

const MapComponents: React.FC<MapComponentsProps> = ({ isLoaded, onFormSubmit }) => {
  const [startPoint, setStartPoint] = useState<string>(""); // Starting location
  const [endPoint, setEndPoint] = useState<string>(""); // Ending location
  const [error, setError] = useState<string | null>(null); // Error handling

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

  const handleSubmit = () => {
    if (!startPoint || !endPoint) {
      setError("Please enter both starting and ending locations.");
      return;
    }
    setError(null); // Clear any existing error
    onFormSubmit(startPoint, endPoint); // Pass data to the parent component
  };

  return (
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
      <h3>Find Directions</h3>
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
        onClick={handleSubmit}
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
  );
};

export default MapComponents;
