import React, { createContext, useContext, useState } from "react";
import { getParkingSpots } from "../components/api";
import { CoordinateItem, FeatureItem } from "../types";
import { useAppContext } from "./AppContext";

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
  resetParking: () => Promise<void>;
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

  const { setIsLoading } = useAppContext();

  const resetParking = async () => {
    const data = await getParkingSpots();
    if (data.features?.length > 0) setParkingSpots(data.features);
    setTargetedParkingSpot(null);
    setCurrentLocation(null);
    setIsLoading(false);
  };
  return (
    <ParkingContext.Provider
      value={{
        parkingSpots,
        setParkingSpots,
        targetedParkingSpot,
        setTargetedParkingSpot,
        currentLocation,
        setCurrentLocation,
        resetParking,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export default ParkingContextProvider;
