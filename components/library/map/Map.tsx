import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMapContext } from "../../../context/MapContext";
import ParkingLocations from "./ParkingLocations";
import { useParkingContext } from "../../../context/ParkingContext";

type Props = {
  children: React.ReactNode;
};
const Map = ({ children }: Props) => {
  const { zoom, setZoom, center, setCenter } = useMapContext();
  const { currentLocation } = useParkingContext();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
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
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center as google.maps.LatLngLiteral}
          zoom={zoom}
          options={{ disableDefaultUI: true }}
        >
          <ParkingLocations />
        </GoogleMap>
      )}
      {children}
    </div>
  );
};

export default Map;
