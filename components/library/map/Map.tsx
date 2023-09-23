import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@christopherpickering/react-leaflet-markercluster/dist/styles.min.css";
import { useAppContext } from "../../../context/AppContext";
import { useParkingContext } from "../../../context/ParkingContext";
import { useMapContext } from "../../../context/MapContext";

import LoadingModal from "../loading/LoadingModal";
import ParkingLocations from "./ParkingLocations";

type Props = {
  children: React.ReactNode;
};
const ChangeMapView = () => {
  const map = useMap();
  const { mapView } = useMapContext();

  useEffect(() => {
    map.setView(
      [mapView.center?.lat || 0, mapView.center?.lng || 0],
      mapView.zoom
    );
  }, [mapView]);

  return null;
};

const Map = ({ children }: Props) => {
  const { isLoading, isInitialLoading } = useAppContext();
  const { currentLocation } = useParkingContext();

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      {isLoading && !isInitialLoading && <LoadingModal />}
      <MapContainer
        id="leaflet-map"
        className="relative map w-full h-full !z-10"
        center={[currentLocation?.lat || 0, currentLocation?.lng || 0]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
    contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ParkingLocations />
        <ChangeMapView />
      </MapContainer>
      {children}
    </div>
  );
};

export default Map;
