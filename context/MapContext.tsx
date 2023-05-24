import React, { createContext, useContext, useState } from "react";
import { CoordinateItem } from "../types";

export const useMapContext = () => useContext(MapContext);

type MapView = {
  zoom: number;
  center: CoordinateItem;
};

interface MapCtx {
  resetMap: () => void;
  mapView: MapView;
  setMapView: React.Dispatch<React.SetStateAction<MapView>>;
}
const MapContext = createContext({} as MapCtx);

type Props = {
  children: React.ReactNode;
};

const MapContextProvider = ({ children }: Props) => {
  const [mapView, setMapView] = useState<MapView>({
    zoom: 11,
    center: { lat: 59.31323345086049, lng: 18.07502720995736 },
  });

  const resetMap = () => {
    setMapView({
      zoom: 11,
      center: { lat: 59.31323345086049, lng: 18.07502720995736 },
    });
  };

  return (
    <MapContext.Provider
      value={{
        resetMap,
        mapView,
        setMapView,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
