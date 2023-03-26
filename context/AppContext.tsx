import React, { createContext, useContext, useState } from "react";

export const useAppContext = () => useContext(AppContext);

interface AppCtx {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isInitialLoading: boolean;
  setIsInitialLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const AppContext = createContext({} as AppCtx);

type Props = {
  children: React.ReactNode;
};

const AppContextProvider = ({ children }: Props) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{ isInitialLoading, setIsInitialLoading, isLoading, setIsLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
