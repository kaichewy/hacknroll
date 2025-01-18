import React, { useState } from "react";
import { mapClient } from "../features/map/map-api-client"; // Custom hook to fetch the longest route
import MapView from "../components/MapView"; // Component to render the map
import Loader from "../components/Loader"; // Reusable loader component
import ErrorMessage from "../components/ErrorMessage"; // Reusable error message component

const Home: React.FC = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const { route, fetchLongestRoute, loading, error } = useLongestRoute();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert("Please enter both origin and destination!");
      return;
    }
    fetchLongestRoute(origin, destination);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Find the Longest Route</h1>
      <p>
        Enter your starting location and destination to find the longest
        possible route.
      </p>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Origin:</strong>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Enter origin"
              style={{
                marginLeft: "10px",
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <strong>Destination:</strong>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              style={{
                marginLeft: "10px",
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Find Route
        </button>
      </form>

      {/* Display Loading Indicator */}
      {loading && <Loader />}

      {/* Display Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Display Route Details */}
      {route && (
        <div style={{ marginTop: "20px" }}>
          <h2>Route Details</h2>
          <p>
            <strong>Start:</strong> {route.legs[0].start_address}
          </p>
          <p>
            <strong>End:</strong> {route.legs[0].end_address}
          </p>
          <p>
            <strong>Distance:</strong> {route.legs[0].distance.text}
          </p>
          <p>
            <strong>Duration:</strong> {route.legs[0].duration.text}
          </p>
        </div>
      )}

      {/* Display Map */}
      {route && route.overview_polyline && (
        <MapView polyline={route.overview_polyline.points} />
      )}
    </div>
  );
};

export default Home;
