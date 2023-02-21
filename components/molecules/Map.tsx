import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ParkingLocations from "./ParkingLocations";
type Props = {};

const Map = (props: Props) => {
  const [center] = useState({
    lat: 59.31323345086049,
    lng: 18.07502720995736,
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
        >
          <ParkingLocations />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
