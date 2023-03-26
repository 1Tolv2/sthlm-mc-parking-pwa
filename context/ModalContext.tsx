import React, { createContext, useContext, useState } from "react";
import Modal from "../components/molecules/Modal";

export const useModalContext = () => useContext(ModalContext);

interface ModalCtx {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalContext = createContext({} as ModalCtx);

type Props = {
  children: JSX.Element;
};

const ModalContextProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {isModalOpen && <Modal handleOnClose={() => setIsModalOpen(false)} />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
