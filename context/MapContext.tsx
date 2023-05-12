import React, { createContext, useContext, useState } from "react";
import { CoordinateItem } from "../types";

export const useMapContext = () => useContext(MapContext);

interface MapCtx {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  center: CoordinateItem;
  setCenter: React.Dispatch<React.SetStateAction<CoordinateItem>>;
  resetMap: () => void;
}
const MapContext = createContext({} as MapCtx);

type Props = {
  children: React.ReactNode;
};

const MapContextProvider = ({ children }: Props) => {
  const [zoom, setZoom] = useState<number>(11);
  const [center, setCenter] = useState<CoordinateItem>({
    lat: 59.31323345086049,
    lng: 18.07502720995736,
  });

  const resetMap = () => {
    setZoom(12);
    setCenter({ lat: 59.31323345086049, lng: 18.07502720995736 });
  };

  return (
    <MapContext.Provider value={{ zoom, setZoom, center, setCenter, resetMap }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
