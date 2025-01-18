import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Polygon,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 1.3615, // Approximate center of Singapore
  lng: 103.7899,
};

const MapComponents: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA7t8jIObDN260IvzAh_eGho53EKMUBnF0", // Replace with your API key
    libraries: ["places", "geometry"],
  });

  const [ellipseCoords, setEllipseCoords] = useState<google.maps.LatLngLiteral[]>([]);
  const [cafes, setCafes] = useState<any[]>([]);

  const mapRef = useRef<google.maps.Map | null>(null);

  const point1 = { lat: 1.3415945963701963, lng: 103.7310746034368 }; // Start point
  const point2 = { lat: 1.381440274111866, lng: 103.84878826128727 }; // End point

  useEffect(() => {
    if (isLoaded) {
      // Compute midpoint
      const midpoint = {
        lat: (point1.lat + point2.lat) / 2,
        lng: (point1.lng + point2.lng) / 2,
      };

      // Compute the shortest distance between the two points (semi-major axis)
      const semiMajorAxis =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(point1),
          new google.maps.LatLng(midpoint)
        );

      // Compute semi-minor axis (height of the ellipse is the distance, width = 1.5x height)
      const semiMinorAxis = semiMajorAxis * 1.5;

      // Generate ellipse points
      const ellipsePoints = [];
      for (let angle = 0; angle < 360; angle += 10) {
        const theta = (angle * Math.PI) / 180;
        const latOffset = (semiMajorAxis * Math.cos(theta)) / 111320; // Convert meters to degrees
        const lngOffset =
          (semiMinorAxis * Math.sin(theta)) /
          (111320 * Math.cos((midpoint.lat * Math.PI) / 180));
        ellipsePoints.push({
          lat: midpoint.lat + latOffset,
          lng: midpoint.lng + lngOffset,
        });
      }

      setEllipseCoords(ellipsePoints);

      // Find cafes
      findCafes(midpoint, semiMajorAxis * 2);
    }
  }, [isLoaded]);

  const findCafes = (location: google.maps.LatLngLiteral, radius: number) => {
    if (!mapRef.current) return;

    const service = new google.maps.places.PlacesService(mapRef.current);

    service.nearbySearch(
      {
        location,
        radius, // Radius in meters
        type: "cafe",
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Filter cafes inside the ellipse
          const filteredCafes = results.filter((place) => {
            const location = place.geometry?.location;
            if (location) {
              const point = { lat: location.lat(), lng: location.lng() };
              return google.maps.geometry.poly.containsLocation(
                new google.maps.LatLng(point),
                new google.maps.Polygon({ paths: ellipseCoords })
              );
            }
            return false;
          });

          setCafes(filteredCafes);
        }
      }
    );
  };

  return isLoaded ? (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={(map: google.maps.Map) => {
          mapRef.current = map;
        }}
      >
        {/* Draw Ellipse */}
        {ellipseCoords.length > 0 && (
          <Polygon
            paths={ellipseCoords}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            }}
          />
        )}

        {/* Pin Cafes */}
        {cafes.map((cafe, index) => (
          <Marker
            key={index}
            position={{
              lat: cafe.geometry.location.lat(),
              lng: cafe.geometry.location.lng(),
            }}
            title={cafe.name}
          />
        ))}
      </GoogleMap>

      {/* Display Cafes */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          maxHeight: "200px",
          overflowY: "scroll",
        }}
      >
        <strong> Cafes Found: </strong>
        {cafes.length === 0 ? (
          <p>No cafes found within the region.</p>
        ) : (
          cafes.map((cafe, index) => (
            <div key={index}>
              <strong>{cafe.name}</strong>
              <p>{cafe.vicinity}</p>
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponents;
