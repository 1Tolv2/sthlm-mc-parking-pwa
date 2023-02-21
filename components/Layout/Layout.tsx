import React, { PropsWithChildren, createContext, useState } from "react";
import { FeatureItem } from "../../types";

interface ModalCtx {
  currentParkingSpot: FeatureItem | null;
  setCurrentParkingSpot: React.Dispatch<
    React.SetStateAction<FeatureItem | null>
  >;
  parkingSpots: FeatureItem[];
  setParkingSpots: React.Dispatch<React.SetStateAction<FeatureItem[]>>;
}
const ParkingContext = createContext<ModalCtx>({} as ModalCtx);

export default function Layout({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  const [parkingSpots, setParkingSpots] = useState<FeatureItem[]>([]);
  const [currentParkingSpot, setCurrentParkingSpot] =
    useState<FeatureItem | null>(null);

  return (
    <ParkingContext.Provider
      value={{
        parkingSpots,
        setParkingSpots,
        currentParkingSpot,
        setCurrentParkingSpot,
      }}
    >
      <main className="relative h-screen w-screen bg-neutral">{children}</main>
    </ParkingContext.Provider>
  );
}

export { ParkingContext };
