import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useMapContext } from "../../../context/MapContext";
import ParkingLocations from "./ParkingLocations";
import { useParkingContext } from "../../../context/ParkingContext";
import LoadingModal from "../loading/LoadingModal";
import { useAppContext } from "../../../context/AppContext";
import { FeatureItem } from "../../../types";

type Props = {
  staticData: FeatureItem[] | null;
  children: React.ReactNode;
};
const Map = ({ staticData, children }: Props) => {
  const { zoom, setZoom, center, setCenter, resetMap } = useMapContext();
  const { currentLocation, setParkingSpots } = useParkingContext();
  const { isLoading, isInitialLoading } = useAppContext();

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
      staticData && setParkingSpots(staticData);
      resetMap();
    }
  }, [currentLocation]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      {isLoading && !isInitialLoading && <LoadingModal />}

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
