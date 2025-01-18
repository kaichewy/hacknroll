import React from "react";

type MapViewProps = {
  polyline: string;
};

const MapView: React.FC<MapViewProps> = ({ polyline }) => {
  // Placeholder for actual map implementation
  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        backgroundColor: "#f0f0f0",
        marginTop: "20px",
        textAlign: "center",
        lineHeight: "400px",
      }}
    >
      Map will be rendered here with polyline: {polyline}
    </div>
  );
};

export default MapView;
