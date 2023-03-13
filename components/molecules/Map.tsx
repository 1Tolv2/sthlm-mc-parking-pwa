import React, { useEffect } from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import ParkingLocations from "./ParkingLocations";
import { CoordinateItem } from "../../types";

type Props = {
  states: any;
  mapStates: {
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    center: CoordinateItem | null;
    setCenter: React.Dispatch<React.SetStateAction<CoordinateItem | null>>;
  };
};

const Map = ({ states, mapStates }: Props) => {
  const { zoom, setZoom, center, setCenter } = mapStates;
  const { currentLocation } = states;

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
    <div style={{ height: "100vh", width: "100%" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center as any}
          zoom={zoom}
        >
          <ParkingLocations states={states} />
        </GoogleMap>
      ) : (
        <div className="flex justify-center items-center absolute w-screen h-screen bg-white z-30">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Map;
