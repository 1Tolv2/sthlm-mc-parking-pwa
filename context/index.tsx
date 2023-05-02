import React from "react";
import AppContextProvider from "./AppContext";
import MapContextProvider from "./MapContext";
import ModalContextProvider from "./ModalContext";
import ParkingContextProvider from "./ParkingContext";

type Props = {
  children: JSX.Element;
};

const AppProvider = ({ children }: Props) => {
  return (
    <>
      <AppContextProvider>
        <ModalContextProvider>
          <ParkingContextProvider>
            <MapContextProvider>{children}</MapContextProvider>
          </ParkingContextProvider>
        </ModalContextProvider>
      </AppContextProvider>
    </>
  );
};

export default AppProvider;
