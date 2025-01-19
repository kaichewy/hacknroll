import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import MapComponents from "../features/map/map-components";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

const FormPage: React.FC = () => {
  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  const handleFormSubmit = (start: string, end: string) => {
    navigate("/map", { state: { start, end } }); // Navigate to the map page with form data
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps API...</div>;
  }

  return <MapComponents isLoaded={isLoaded} onFormSubmit={handleFormSubmit} />;
};

export default FormPage;
