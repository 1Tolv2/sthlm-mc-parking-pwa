import React, { createContext, useContext, useState } from "react";
import { CoordinateItem, FeatureItem } from "../types";

export const useParkingContext = () => useContext(ParkingContext);

interface ParkingCtx {
  parkingSpots: FeatureItem[];
  setParkingSpots: React.Dispatch<React.SetStateAction<FeatureItem[]>>;
  targetedParkingSpot: FeatureItem | null;
  setTargetedParkingSpot: React.Dispatch<
    React.SetStateAction<FeatureItem | null>
  >;
  currentLocation: CoordinateItem | null;
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<CoordinateItem | null>
  >;
}

const ParkingContext = createContext({} as ParkingCtx);

type Props = {
  children: React.ReactNode;
};

const ParkingContextProvider = ({ children }: Props) => {
  const [parkingSpots, setParkingSpots] = useState<FeatureItem[]>([]);
  const [targetedParkingSpot, setTargetedParkingSpot] =
    useState<FeatureItem | null>(null);
  const [currentLocation, setCurrentLocation] = useState<CoordinateItem | null>(
    null
  );
  return (
    <ParkingContext.Provider
      value={{
        parkingSpots,
        setParkingSpots,
        targetedParkingSpot,
        setTargetedParkingSpot,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export default ParkingContextProvider;
