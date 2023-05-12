import React, { useEffect } from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import { useMapContext } from "../../../context/MapContext";
import ParkingLocations from "./ParkingLocations";
import { useParkingContext } from "../../../context/ParkingContext";
import LoadingModal from "../loading/LoadingModal";
import { useAppContext } from "../../../context/AppContext";

type Props = {
  children: React.ReactNode;
};
const Map = ({ children }: Props) => {
  const { zoom, setZoom, center, setCenter } = useMapContext();
  const { currentLocation } = useParkingContext();
  const { isLoading, isInitialLoading, setIsLoading, setIsInitialLoading } =
    useAppContext();

  useEffect(() => {
    if (currentLocation) {
      setCenter({
        lat: currentLocation?.lat || 0,
        lng: currentLocation?.lng || 0,
      });
      setZoom(16);
    }
    setIsLoading(false);
    setIsInitialLoading(false);
  }, [currentLocation]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      {isLoading && !isInitialLoading && <LoadingModal />}
      <MapContainer
        className="map w-full h-full"
        center={[center.lat || 0, center.lng || 0]}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
          contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[center.lat || 0, center.lng || 0]}></Marker> */}
        {/* <MapView /> */}
      </MapContainer>

      {/* {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center as google.maps.LatLngLiteral}
          zoom={zoom}
          options={{ disableDefaultUI: true }}
        >
          <ParkingLocations />
        </GoogleMap>
      )} */}
      {children}
    </div>
  );
};

export default Map;
