import React from "react";
import ExitButton from "./buttons/ExitButton";

type Props = {
  handleOnClose: () => void;
  content: string;
};

const Modal = ({ handleOnClose, content }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[90] flex justify-center items-center">
      <div className="relative w-fit h-fit bg-primary text-white drop-shadow">
        <div className="absolute right-4 top-4">
          <ExitButton color="white" handleOnClick={handleOnClose} />
        </div>
        <div className="text-base sm:text-lg font-tratex p-xl border-8 border-white rounded-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
