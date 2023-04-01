import React from "react";
import ExitButton from "../library/ExitButton";

type Props = {
  handleOnClose: () => void;
  content: string;
};

const Modal = ({ handleOnClose, content }: Props) => {
  return (
    <div className="absolute w-screen h-screen z-[90] flex justify-center items-center">
      <div className="relative w-fit h-fit bg-primary text-white drop-shadow">
        <div className="absolute right-4 top-4">
          <ExitButton handleOnClick={handleOnClose} />
        </div>
        <div className="text-base sm:text-lg font-tratex p-xl border-8 border-white rounded-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
