import React, { useState, useContext, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import ParkingLocations from "./ParkingLocations";
import { ParkingContext } from "../Layout/Layout";
type Props = {};

const Map = (props: Props) => {
  const [center, setCenter] = useState({
    lat: 59.31323345086049,
    lng: 18.07502720995736,
  });
  const [zoom, setZoom] = useState(11);
  const { currentLocation } = useContext(ParkingContext);

  useEffect(() => {
    if (currentLocation) {
      setCenter({
        lat: currentLocation?.lat || 0,
        lng: currentLocation?.lng || 0,
      });
      setZoom(16);
    } else {
      setCenter({ lat: 59.31323345086049, lng: 18.07502720995736 });
      setZoom(11);
    }
  }, [currentLocation]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={zoom}
        >
          <ParkingLocations />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
