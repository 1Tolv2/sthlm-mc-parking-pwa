import React, { PropsWithChildren, createContext, useState } from "react";
import { FeatureItem } from "../../types";
const ParkingContext = createContext({});

export default function Layout({
  children,
}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
  const [parkingSpots, setParkingSpots] = useState<FeatureItem[]>([]);

  return (
    <ParkingContext.Provider value={{ parkingSpots, setParkingSpots }}>
      <main className="flex flex-col justify-between h-screen w-screen bg-neutral p-md">
        {children}
      </main>
    </ParkingContext.Provider>
  );
}

export { ParkingContext };
