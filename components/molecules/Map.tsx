import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMapContext } from "../../context/MapContext";
import ParkingLocations from "./ParkingLocations";
import { useParkingContext } from "../../context/ParkingContext";

type Props = {};

const Map = (props: Props) => {
  const { zoom, setZoom, center, setCenter } = useMapContext();
  const { currentLocation } = useParkingContext();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_APP_GOOGLE_MAPS_API_KEY || "",
  });

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
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center as any}
          zoom={zoom}
        >
          <ParkingLocations />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
