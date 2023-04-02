import React, { createContext, useContext, useState } from "react";
import Modal from "../components/library/Modal";

export const useModalContext = () => useContext(ModalContext);

interface ModalCtx {
  modalContent: string;
  setModalContent: React.Dispatch<React.SetStateAction<string>>;
}
const ModalContext = createContext({} as ModalCtx);

type Props = {
  children: JSX.Element;
};

const ModalContextProvider = ({ children }: Props) => {
  const [modalContent, setModalContent] = useState<string>("");

  return (
    <ModalContext.Provider value={{ modalContent, setModalContent }}>
      {modalContent && (
        <Modal
          handleOnClose={() => setModalContent("")}
          content={modalContent}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
