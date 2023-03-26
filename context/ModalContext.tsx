import React, { createContext, useContext, useState } from "react";
import { CoordinateItem } from "../types";
import Modal from "../components/molecules/Modal";

export const useModalContext = () => useContext(ModalContext);

type ModalConfig = {
  isOpen: boolean;
};

interface ModalCtx {
  modalConfig: ModalConfig;
  setModalConfig: React.Dispatch<React.SetStateAction<ModalConfig>>;
}
const ModalContext = createContext({} as ModalCtx);

type Props = {
  children: JSX.Element;
};

const ModalContextProvider = ({ children }: Props) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
  });

  return (
    <ModalContext.Provider value={{ modalConfig, setModalConfig }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
